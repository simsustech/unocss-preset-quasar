import type { Preflight } from '@unocss/core'
import type { ColorBlock } from './colors.js'
import type { StyleEntry, TokenBlock, TokenValue } from './types.js'
import { engineNamespaceTokens, quasarDefaults } from './engine.js'

/**
 * Emit CSS custom properties.
 * - Colors on :root (shared, from sourceColor)
 * - Default style tokens on body (zero-config; body so runtime setThemeColors
 *   overrides on document.body win over build-time values)
 * - Per-style overrides on body.quasar-style-{name} (only tokens that differ from default)
 * - Dark overrides on body.body--dark (default) and body.body--dark.quasar-style-{name}
 */
export function createTokenPreflight(params: {
  colors: ColorBlock
  defaultStyle: StyleEntry
  styles: StyleEntry[]
}): Preflight {
  return {
    getCSS: () => {
      const parts: string[] = []
      // 1. Scheme roles + Quasar aliases on :root (shared).
      //
      // The roles are what the component rules reference (`color-mix(… var(--light-*)
      // …)`), and the reference defines them here rather than relying on a runtime
      // `setThemeColors()` call: a `var()` with no definition makes the whole
      // declaration invalid, so an undefined role does not fall back — it drops.
      parts.push(
        renderColorBlock(
          ':root',
          params.colors.light,
          params.colors.quasar,
          '',
          'light'
        )
      )
      // The dark block emits ONLY the `--dark-*` roles: `--q-*` is the light
      // palette's alias set and re-emitting it from the dark palette here would
      // clobber every light value (`--q-surface-container-low` became `#1c1b1e`,
      // so cards rendered near-black in light mode). The dark values reach
      // `--q-*` through `body.body--dark` and the `-dark` infix block below.
      parts.push(renderRoleBlock(':root', params.colors.dark, 'dark'))
      // 1a. Shape roles, as the md3 entry states them.
      parts.push(renderShapeRoles(':root', params.defaultStyle.tokens))
      // 1b. The engine's theme namespaces, plus the defaults we own for the
      // declarations that read engine-internal names. Our rules reference
      // `--spacing` and friends (`calc(var(--spacing) * N)`, the corner radii,
      // the font weights) and a Quasar-only page never makes the engine emit
      // them — it emits a different block, or none at all. See
      // `engineNamespaceTokens` / `quasarDefaults` for the measurements.
      parts.push(
        renderNamespaceBlock(':root'),
        renderQuasarDefaultsBlock(':root')
      )
      // 2. Default style tokens on body (NOT :root: runtime setThemeColors
      // writes --light-*/--dark-* onto document.body, so --q-* aliases that
      // reference them must resolve against body to pick up the overrides)
      parts.push(renderTokenBlock('body', params.defaultStyle.tokens))
      // 2b. Shadow color primitives + computed shadow tokens on body,
      // mirroring quasar.css so var(--q-shadow-*) references resolve
      parts.push(renderShadowBlock('body'))
      // 2c. Quasar variables our rules name that quasar.css carries defaults for.
      // They have to be stated — this preset replaces quasar.css — or the
      // declarations using them are invalid and the property falls back to its
      // initial value: no shimmer on a skeleton, no motion on a transition.
      // Components whose JS sets them at runtime still override these.
      parts.push(
        'body {\n' +
          '  --q-skeleton-speed: 1500ms;\n' +
          '  --q-transition-duration: .3s;\n' +
          '  --q-transition-easing: cubic-bezier(0.215, 0.61, 0.355, 1);\n' +
          '}'
      )
      // 3. Per-style overrides (only diffs from default)
      for (const style of params.styles) {
        const diff = diffTokens(params.defaultStyle.tokens, style.tokens)
        if (Object.keys(diff).length > 0) {
          parts.push(renderTokenBlock(`body.quasar-style-${style.name}`, diff))
        }
      }
      // 4. Dark overrides: ONLY color tokens (shape/typography/etc are same in dark)
      parts.push(renderColorDarkBlock('body.body--dark', params.colors.dark))
      // 4d. The default style's dark-side token values. A token may carry its
      // own dark value (see `TokenValue`), and without this only the *other*
      // styles got theirs — their diff is emitted in 4c, while the default
      // style's own dark side had nowhere to go. There is no colour category
      // here to clobber: `TokenBlock.color` is shared, not per-style, and its
      // dark counterparts are emitted in 4 above.
      parts.push(
        renderTokenBlock('body.body--dark', params.defaultStyle.tokens, 'dark')
      )
      // 4a. Dark overrides for the Quasar brand aliases (--q-dark-page etc.
      // would otherwise keep resolving to the light palette in dark mode)
      parts.push(renderQuasarDarkBlock('body.body--dark', params.colors))
      // 4b. Dark tokens on :root (for .q-dark utility to reference)
      parts.push(
        renderColorBlock(':root', params.colors.dark, undefined, '-dark')
      )
      // 4c. Per-style dark: the combination the reference emits for every style
      // entry, so `body.body--dark.quasar-style-md2` resolves the same tokens as
      // `body.body--dark` rather than falling back to the light palette.
      for (const style of params.styles) {
        const selector = `body.body--dark.quasar-style-${style.name}`
        parts.push(renderColorDarkBlock(selector, params.colors.dark))
        parts.push(renderQuasarDarkBlock(selector, params.colors))
        // The dark side of this style's tokens. The selector is a superset of
        // `body.quasar-style-<name>`, so these win in dark mode.
        const darkDiff = diffTokens(
          params.defaultStyle.tokens,
          style.tokens,
          'dark'
        )
        if (Object.keys(darkDiff).length > 0) {
          parts.push(renderTokenBlock(selector, darkDiff, 'dark'))
        }
      }
      return parts.join('\n\n')
    }
  }
}

function renderColorBlock(
  selector: string,
  colors: TokenBlock['color'],
  quasar?: ColorBlock['quasar'],
  suffix = '',
  /** Emit `--<prefix>-<role>` alongside each `--q-<role>` (the scheme roles). */
  rolePrefix?: string
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --q${suffix}-${kebab(key)}: ${value};`)
    if (rolePrefix) {
      lines.push(`  --${rolePrefix}-${kebab(key)}: ${value};`)
    }
  }
  if (quasar) {
    for (const [key, value] of Object.entries(quasar)) {
      lines.push(`  --q${suffix}-${key}: ${value};`)
    }
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

/**
 * The shape roles the reference states at `:root`
 * (`--shape-corner-extra-small` … `--shape-corner-extra-large`), taken from the
 * default style entry's corner scale. The `radius*` aliases are named separately
 * so they are not emitted twice.
 */
/**
 * The scheme roles alone (`--light-*` / `--dark-*`), with no `--q-*` aliases.
 *
 * Used for the dark palette, which must not touch the `--q-*` names: those are
 * the light aliases, and writing the dark values there makes every light-mode
 * component render with dark surfaces.
 */
function renderRoleBlock(
  selector: string,
  colors: TokenBlock['color'],
  prefix: 'light' | 'dark'
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --${prefix}-${kebab(key)}: ${value};`)
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}
function renderShapeRoles(selector: string, tokens: TokenCategories): string {
  const shape = asRecord(asRecord(tokens).shape ?? {})
  const lines: string[] = []
  for (const [key, value] of Object.entries(shape)) {
    if (!key.startsWith('corner') || key === 'cornerCircle') continue
    if (key === 'cornerFull' && !value) continue
    lines.push(`  --shape-${kebab(key)}: ${value};`)
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

/** The engine's theme namespaces, which it emits only alongside its own utilities. */
function renderNamespaceBlock(selector: string): string {
  const lines = Object.entries(engineNamespaceTokens).map(
    ([prop, value]) => `  ${prop}: ${value};`
  )
  return `${selector} {\n${lines.join('\n')}\n}`
}

/** Our own defaults for the declarations that read engine-internal names. */
function renderQuasarDefaultsBlock(selector: string): string {
  const lines = Object.entries(quasarDefaults).map(
    ([prop, value]) => `  ${prop}: ${value};`
  )
  return `${selector} {\n${lines.join('\n')}\n}`
}
/** Shadow primitives + computed shadow tokens, mirroring quasar.css body block */
function renderShadowBlock(selector: string): string {
  const lines = [
    '  --q-shadow-color: #000;',
    '  --q-dark-shadow-color: #fff;',
    '  --q-shadow-umbra: color-mix(in srgb, var(--q-shadow-color) 20%, transparent);',
    '  --q-shadow-penumbra: color-mix(in srgb, var(--q-shadow-color) 14%, transparent);',
    '  --q-shadow-ambient: color-mix(in srgb, var(--q-shadow-color) 12%, transparent);',
    '  --q-shadow-inset: color-mix(in srgb, var(--q-shadow-color) 70%, transparent);',
    '  --q-shadow-layout: color-mix(in srgb, var(--q-shadow-color) 24%, transparent);',
    '  --q-dark-shadow-umbra: color-mix(in srgb, var(--q-dark-shadow-color) 20%, transparent);',
    '  --q-dark-shadow-penumbra: color-mix(in srgb, var(--q-dark-shadow-color) 14%, transparent);',
    '  --q-dark-shadow-ambient: color-mix(in srgb, var(--q-dark-shadow-color) 12%, transparent);',
    '  --q-dark-shadow-inset: color-mix(in srgb, var(--q-dark-shadow-color) 70%, transparent);',
    '  --q-dark-shadow-layout: color-mix(in srgb, var(--q-dark-shadow-color) 24%, transparent);'
  ]
  return `${selector} {\n${lines.join('\n')}\n}`
}

function renderColorDarkBlock(
  selector: string,
  colors: TokenBlock['color']
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --q-${kebab(key)}: ${value};`)
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

/**
 * Quasar brand aliases remapped to the dark palette. Mirrors the `quasar`
 * block of generateColorTokens (primary/secondary/accent/dark-page/dark)
 * so --q-dark-page etc. resolve dark under body.body--dark. The harmonized
 * status colors (positive/negative/info/warning) are identical in both
 * schemes, like quasar.css constants, so they are left untouched.
 */
function renderQuasarDarkBlock(selector: string, colors: ColorBlock): string {
  const dark = asRecord(colors.dark)
  // NOTE: --q-primary/--q-secondary are already swapped by renderColorDarkBlock
  // above (identical values); only aliases with no Material-key equivalent go here.
  const pairs: Array<[string, string]> = [
    ['--q-accent', dark['tertiary']],
    ['--q-dark-page', dark['background']],
    ['--q-dark', dark['surface']]
  ]
  const lines = pairs.map(([prop, value]) => `  ${prop}: ${value};`)
  return `${selector} {\n${lines.join('\n')}\n}`
}

type TokenCategories = Omit<TokenBlock, 'color'>

// SAFETY: every token category is a Record<string,string> at runtime; the typed
// interfaces (ShapeTokens, TypographyTokens, ...) have no index signature.
const asRecord = (o: unknown): Record<string, string> =>
  o as Record<string, string>

/**
 * The light or dark side of a token value.
 *
 * SAFETY: token records are indexed as `unknown`, so the parameter is widened at
 * the boundary, but every value inside a `TokenBlock` is a `TokenValue` and a
 * value that is not a `{ light, dark }` pair is returned unchanged.
 */
export function tokenValue(
  value: unknown,
  mode: 'light' | 'dark' = 'light'
): TokenValue {
  if (
    value !== null &&
    typeof value === 'object' &&
    'light' in value &&
    'dark' in value
  ) {
    return (value as { light: string; dark: string })[mode]
  }
  // SAFETY: a value that is not a pair is one the `TokenBlock` already stored as
  // a `TokenValue` (see the signature note above); the cast only restores that.
  return value as TokenValue
}

/** Role shorthand: `[weight] size[/line-height] family`. */
const FONT_ROLE =
  /^(?:(\d{3})\s+)?(\d+(?:\.\d+)?(?:px|em|rem))\s*(?:\/\s*([^\s]+))?\s+(.+)$/

function renderTokenBlock(
  selector: string,
  tokens: Partial<TokenCategories> | TokenCategories,
  mode: 'light' | 'dark' = 'light'
): string {
  const lines: string[] = []
  for (const [category, categoryTokens] of Object.entries(tokens)) {
    if (!categoryTokens) continue
    for (const [key, value] of Object.entries(asRecord(categoryTokens))) {
      lines.push(`  --q-${kebab(key)}: ${tokenValue(value, mode)};`)
      if (category !== 'typography' || typeof value !== 'string') continue
      // A typography role is a font shorthand (`400 16px/24px Roboto`) and the
      // components need its parts individually — a rule that sets only
      // `font-size` cannot reference a shorthand. The parts are derived here
      // rather than restated per style, so a role stays the single source of
      // truth for every style. Keys that are not shorthands (`fontFamily`, the
      // state opacities) simply do not match the pattern.
      const role = FONT_ROLE.exec(value)
      if (role === null) continue
      const [, weight, size, lineHeight, family] = role
      if (weight !== undefined) {
        lines.push(`  --q-${kebab(key)}-weight: ${weight};`)
      }
      lines.push(`  --q-${kebab(key)}-size: ${size};`)
      if (lineHeight !== undefined) {
        lines.push(`  --q-${kebab(key)}-line-height: ${lineHeight};`)
      }
      lines.push(`  --q-${kebab(key)}-family: ${family};`)
    }
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

function diffTokens(
  defaultTokens: TokenCategories,
  styleTokens: TokenCategories,
  mode: 'light' | 'dark' = 'light'
): Partial<TokenCategories> {
  const diff: Record<string, Record<string, unknown>> = {}
  for (const [category, categoryTokens] of Object.entries(styleTokens)) {
    const defaultCategory = defaultTokens[category as keyof TokenCategories]
    const categoryDiff: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(asRecord(categoryTokens))) {
      if (
        tokenValue(asRecord(defaultCategory)[key], mode) !==
        tokenValue(value, mode)
      ) {
        categoryDiff[key] = value
      }
    }
    if (Object.keys(categoryDiff).length > 0) {
      diff[category] = categoryDiff
    }
  }
  return diff as Partial<TokenCategories>
}

function kebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
