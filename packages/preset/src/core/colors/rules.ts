import type { ComponentRule } from '../../rules/types.js'

/**
 * Color utilities — ported from core/colors.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (text-red-500)
 * - Maps directly to --q-* custom properties emitted by the token preflight
 * - Generates text- and bg- for all quasar color tokens
 */

/** Single rule entry helper — keeps the tuple type [RegExp, matcher] */
function rule(regex: RegExp, matcher: ComponentRule[1]): ComponentRule {
  // `ComponentRule` is a union of static and dynamic shapes and the matcher
  // type covers both; the cast selects the dynamic member.
  return [regex, matcher] as ComponentRule
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
  'dark-page'
  // 'light', 'white' and 'black' are deliberately absent. They are wind4
  // palette names, not `--q-*` tokens, so generating `text-white`/`bg-white`
  // here emitted `color: var(--q-white)` — a variable the theme never defines.
  // Invalid declarations silently fall back to the inherited colour, which is
  // why avatars rendered black letters on a coloured circle. wind4 already
  // ships working utilities for these via its own `--colors-*` palette.
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

/**
 * Brand colours whose utility the reference also scopes to dark mode
 * (`body.body--dark .bg-primary` …). The roles already flip through `--q-*`,
 * so the value is the same token; the dark-scoped selector is what the
 * reference emits, and it is what a dark override in app CSS has to beat.
 */
const darkScopedColorTokens = ['primary', 'secondary', 'accent'] as const

/** Generate text-{color} and bg-{color} rules for a list of token names */
function generateColorRules(
  tokens: readonly string[],
  darkScoped = false
): ComponentRule[] {
  const rules: ComponentRule[] = []
  for (const name of tokens) {
    if (!darkScoped) {
      rules.push(
        rule(new RegExp(`^text-${name}$`), () => ({
          color: `var(--q-${name})`
        })),
        rule(new RegExp(`^bg-${name}$`), () => ({
          'background-color': `var(--q-${name})`
        }))
      )
      continue
    }
    // Both yields stay in one generator: UnoCSS keeps only the last rule per
    // regex, so a second rule for the same token would silently drop the first.
    for (const [prefix, property] of [
      ['text', 'color'],
      ['bg', 'background-color']
    ] as const) {
      rules.push(
        rule(new RegExp(`^${prefix}-${name}$`), function* (_, { symbols }) {
          yield { [property]: `var(--q-${name})` }
          yield {
            [symbols.selector]: (sel: string) => `.body--dark ${sel}`,
            [property]: `var(--q-${name})`
          }
        })
      )
    }
  }
  return rules
}

/** The brand tokens are generated above; the rest plainly. */
const plainColorTokens = colorTokens.filter(
  (name) => !(darkScopedColorTokens as readonly string[]).includes(name)
)

export const colorRules: ComponentRule[] = [
  // --- Quasar color tokens ---
  ...generateColorRules(plainColorTokens),
  ...generateColorRules(darkScopedColorTokens, true),

  // --- MD3 color role tokens ---
  ...generateColorRules(md3Tokens)
]
