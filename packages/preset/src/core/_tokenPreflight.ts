import type { Preflight } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'
import {
  tokens as defaultTokens,
  type DesignTokens,
  type TokenBlock
} from './_tokens.js'

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
  toggleInnerWidth: 'auto'
}

/** Emit CSS custom properties for one style block, filling defaults */
const emit = (bodyClass: string, block: TokenBlock): string => {
  const lines: string[] = []
  const all = {
    ...DEFAULTS,
    ...block.color,
    ...block.shape,
    ...block.sizing,
    ...block.type
  }
  for (const [key, val] of Object.entries(all))
    lines.push(`  --q-${kebab(key)}: ${val};`)
  return `body.${bodyClass} {\n${lines.join('\n')}\n}`
}

/** Emit dark overrides: swap --light- → --dark- for color keys */
const emitDark = (bodyClass: string, block: TokenBlock): string => {
  const lines: string[] = []
  for (const [key, val] of Object.entries(block.color))
    lines.push(`  --q-${kebab(key)}: ${val.replace(/--light-/g, '--dark-')};`)
  return `body.body--dark.${bodyClass} {\n${lines.join('\n')}\n}`
}

export function createTokenPreflight(
  tokens: DesignTokens
): Preflight<QuasarTheme> {
  return {
    getCSS: () => `
/* ===== Quasar Design Tokens ===== */

${emit('quasar-style-md3', tokens.md3)}

${emit('quasar-style-md2', tokens.md2)}

${emit('quasar-style-unstyled', tokens.unstyled)}

/* ===== Dark mode overrides ===== */
${emitDark('quasar-style-md3', tokens.md3)}

${emitDark('quasar-style-md2', tokens.md2)}`
  }
}
