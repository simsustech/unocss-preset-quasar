import type { ComponentRule } from '../../rules/types.js'

/**
 * Color utilities — ported from core/colors.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (text-red-500)
 * - Maps directly to --q-* custom properties emitted by the token preflight
 * - Generates text- and bg- for all quasar color tokens
 */

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, string>
): ComponentRule {
  return [regex, matcher]
}

/** Quasar color names → --q-* custom property */
const colorTokens = [
  'primary',
  'secondary',
  'accent',
  'positive',
  'negative',
  'info',
  'warning',
  'dark',
  'dark-page',
  'light',
  'white',
  'black'
] as const

/** MD3 color role tokens (from @poupe/material-color-utilities) */
const md3Tokens = [
  'on-primary',
  'primary-container',
  'on-primary-container',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'background',
  'on-background',
  'surface',
  'on-surface',
  'surface-variant',
  'on-surface-variant',
  'surface-dim',
  'surface-bright',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'outline',
  'outline-variant',
  'inverse-surface',
  'inverse-on-surface',
  'inverse-primary',
  'shadow',
  'scrim'
] as const

/** Generate text-{color} and bg-{color} rules for a list of token names */
function generateColorRules(tokens: readonly string[]): ComponentRule[] {
  const rules: ComponentRule[] = []
  for (const name of tokens) {
    rules.push(
      rule(new RegExp(`^text-${name}$`), () => ({
        color: `var(--q-${name})`
      })),
      rule(new RegExp(`^bg-${name}$`), () => ({
        backgroundColor: `var(--q-${name})`
      }))
    )
  }
  return rules
}

export const colorRules: ComponentRule[] = [
  // --- Quasar color tokens ---
  ...generateColorRules(colorTokens),

  // --- MD3 color role tokens ---
  ...generateColorRules(md3Tokens)
]
