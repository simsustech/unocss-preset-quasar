import type { Preflight } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'
import {
  tokens as defaultTokens,
  type DesignTokens,
  type QuasarStyleEntry,
  type TokenBlock
} from './_tokens.js'

export type { QuasarStyleEntry } from './_tokens.js'

export function mergeTokens(user?: Partial<DesignTokens>): DesignTokens {
  if (!user) return defaultTokens
  const deep = (target: any, source: any): any => {
    const out = { ...target }
    for (const key of Object.keys(source))
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      )
        out[key] = deep(target[key] || {}, source[key])
      else out[key] = source[key]
    return out
  }
  return deep(defaultTokens, user) as DesignTokens
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

/**
 * Default values for every token. When a token is missing from a style
 * block, its default is emitted so the CSS property has no visual effect
 * (transparent, none, 0, inherit).
 */
const DEFAULTS: Record<string, string> = {
  // Color tokens → transparent/none have no visual effect
  primary: 'transparent',
  onPrimary: 'inherit',
  primaryContainer: 'transparent',
  secondary: 'transparent',
  onSecondary: 'inherit',
  secondaryContainer: 'transparent',
  surface: 'transparent',
  surfaceContainer: 'transparent',
  surfaceContainerLow: 'transparent',
  surfaceContainerHigh: 'transparent',
  surfaceContainerHighest: 'transparent',
  outline: 'transparent',
  onSurface: 'inherit',
  onPrimaryContainer: 'inherit',
  onSecondaryContainer: 'inherit',
  onSurfaceVariant: 'inherit',
  darkSecondary: 'transparent',
  darkOutline: 'transparent',
  darkInverseSurface: 'transparent',
  darkTertiaryContainer: 'transparent',
  // Shape defaults → 0 = no radius
  radiusXs: '0',
  radiusSm: '0',
  radiusMd: '0',
  radiusLg: '0',
  radiusXl: '0',
  radiusFull: '0',
  radiusCircle: '0',
  // Sizing defaults → 0 = no size (element collapses without other styles)
  spaceXs: '0',
  spaceSm: '0',
  spaceMd: '0',
  spaceLg: '0',
  spaceXl: '0',
  sizeIcon: '0',
  sizeSm: '0',
  sizeMd: '0',
  sizeLg: '0',
  // Type defaults → inherit/preserve natural rendering
  fontXs: 'inherit',
  fontSm: 'inherit',
  fontMd: 'inherit',
  fontLg: 'inherit',
  fontXl: 'inherit',
  fontLead: 'inherit',
  hoverOpacity: '0',
  linearProgressSpeed: '0s',
  paginationGutterChild: '0',
  paginationGutterParent: '0',
  virtualScrollItemHeight: '0',
  virtualScrollItemWidth: '0',
  // Component-specific defaults → no visual effect
  toggleFontSize: 'inherit',
  toggleDenseFontSize: 'inherit',
  toggleTrackBg: 'transparent',
  toggleTrackOutline: 'none',
  toggleTrackOpacity: '1',
  toggleTrackBorderRadius: '0',
  toggleTrackHeight: 'auto',
  toggleInnerWidth: 'auto',
  // QBtn
  btnBg: 'transparent',
  btnColor: 'inherit',
  btnTextTransform: 'none',
  btnRadius: '0',
  btnMinWidth: 'auto',
  btnPaddingX: '0',
  btnFontSize: '14px',
  btnLineHeight: '1.715em',
  btnShadow: 'none',
  btnPressedShadow: 'none',
  btnPressedShadowLg: 'none',
  btnOutlineColor: 'inherit',
  btnOutlineBorder: 'currentColor',
  btnFlatColor: 'inherit',
  btnFlatPaddingX: '0',
  btnPushRadius: '0',
  btnPushBorderBottom: 'none',
  btnRoundedRadius: '0',
  btnRoundRadius: '0',
  btnSquareRadius: '0',
  btnDensePadding: '0.175em',
  fabBg: 'transparent',
  fabColor: 'inherit',
  fabRadius: '0',
  fabSize: '56px',
  fabMiniSize: '40px',
  // Position-engine runtime variables (set dynamically by Quasar at runtime)
  peTop: '0px',
  peLeft: '0px'
}

/** Emit CSS custom properties for one style block, filling defaults */
const emit = (bodyClass: string, block: TokenBlock): string => {
  const lines: string[] = []
  const all = {
    ...DEFAULTS,
    ...block.color,
    ...block.shape,
    ...block.sizing,
    ...block.type,
    ...block.component
  }
  for (const [key, val] of Object.entries(all))
    lines.push(`  --q-${kebab(key)}: ${val};`)
  return `body.${bodyClass} {\n${lines.join('\n')}\n}`
}

/** Emit dark overrides: swap --light- → --dark- for color/component keys */
const emitDark = (bodyClass: string, block: TokenBlock): string => {
  const lines: string[] = []
  const all = {
    ...block.color,
    ...block.component
  }
  for (const [key, val] of Object.entries(all))
    lines.push(`  --q-${kebab(key)}: ${val.replace(/--light-/g, '--dark-')};`)
  return `body.body--dark.${bodyClass} {\n${lines.join('\n')}\n}`
}

/**
 * Token preflight. Reads the style entries from the UnoCSS theme
 * (`theme.quasar.tokens`, injected by the preset's `extendTheme`) so
 * users can override token values with plain UnoCSS theme config.
 *
 * Emits one `body.quasar-style-{name}` CSS-variable block per entry plus
 * `.body--dark` overrides. Switching the body class swaps styles at
 * runtime; shortcuts reference the `--q-*` vars.
 */
export function createTokenPreflight(): Preflight<QuasarTheme> {
  return {
    getCSS: ({ theme }) => {
      const entries = (
        theme.quasar as { tokens?: QuasarStyleEntry[] } | undefined
      )?.tokens
      if (!entries?.length) return ''
      const parts: string[] = ['/* ===== Quasar Design Tokens ===== */']
      for (const entry of entries)
        parts.push(emit(`quasar-style-${entry.name}`, entry.tokens))
      parts.push('/* ===== Dark mode overrides ===== */')
      for (const entry of entries)
        parts.push(emitDark(`quasar-style-${entry.name}`, entry.tokens))
      return parts.join('\n\n')
    }
  }
}
