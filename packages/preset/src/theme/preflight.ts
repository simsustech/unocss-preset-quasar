import type { Preflight } from '@unocss/core'
import type { ColorBlock } from './colors.js'
import type { StyleEntry, TokenBlock } from './types.js'

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
      // 1. Colors on :root (shared)
      parts.push(
        renderColorBlock(':root', params.colors.light, params.colors.quasar)
      )
      // 2. Default style tokens on body (NOT :root: runtime setThemeColors
      // writes --light-*/--dark-* onto document.body, so --q-* aliases that
      // reference them must resolve against body to pick up the overrides)
      parts.push(renderTokenBlock('body', params.defaultStyle.tokens))
      // 2b. Shadow color primitives + computed shadow tokens on body,
      // mirroring quasar.css so var(--q-shadow-*) references resolve
      parts.push(renderShadowBlock('body'))
      // 3. Per-style overrides (only diffs from default)
      for (const style of params.styles) {
        const diff = diffTokens(params.defaultStyle.tokens, style.tokens)
        if (Object.keys(diff).length > 0) {
          parts.push(renderTokenBlock(`body.quasar-style-${style.name}`, diff))
        }
      }
      // 4. Dark overrides: ONLY color tokens (shape/typography/etc are same in dark)
      parts.push(renderColorDarkBlock('body.body--dark', params.colors.dark))
      // 4a. Dark overrides for the Quasar brand aliases (--q-dark-page etc.
      // would otherwise keep resolving to the light palette in dark mode)
      parts.push(renderQuasarDarkBlock('body.body--dark', params.colors))
      // 4b. Dark tokens on :root (for .q-dark utility to reference)
      parts.push(
        renderColorBlock(':root', params.colors.dark, undefined, '-dark')
      )
      for (const style of params.styles) {
        // Per-style dark: only if style has color overrides (it doesn't — colors are shared)
        // This block is for completeness; colors are shared so no per-style dark overrides needed
        void style
      }
      return parts.join('\n\n')
    }
  }
}

function renderColorBlock(
  selector: string,
  colors: TokenBlock['color'],
  quasar?: ColorBlock['quasar'],
  suffix = ''
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  --q${suffix}-${kebab(key)}: ${value};`)
  }
  if (quasar) {
    for (const [key, value] of Object.entries(quasar)) {
      lines.push(`  --q${suffix}-${key}: ${value};`)
    }
  }
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

function renderTokenBlock(
  selector: string,
  tokens: Partial<TokenCategories> | TokenCategories
): string {
  const lines: string[] = []
  for (const [_category, categoryTokens] of Object.entries(tokens)) {
    if (!categoryTokens) continue
    for (const [key, value] of Object.entries(asRecord(categoryTokens))) {
      lines.push(`  --q-${kebab(key)}: ${value};`)
    }
  }
  return `${selector} {\n${lines.join('\n')}\n}`
}

function diffTokens(
  defaultTokens: TokenCategories,
  styleTokens: TokenCategories
): Partial<TokenCategories> {
  const diff: Record<string, Record<string, string>> = {}
  for (const [category, categoryTokens] of Object.entries(styleTokens)) {
    const defaultCategory = defaultTokens[category as keyof TokenCategories]
    const categoryDiff: Record<string, string> = {}
    for (const [key, value] of Object.entries(asRecord(categoryTokens))) {
      if (asRecord(defaultCategory)[key] !== value) {
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
