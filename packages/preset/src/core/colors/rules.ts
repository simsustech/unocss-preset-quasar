import type { ComponentRule } from '../../rules/types.js'
import { defaultTheme } from '../../theme/quasar-theme.js'

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

/**
 * The on-colour that pairs with each dark-scoped brand token. Quasar's
 * `color="<name>"` prop hard-codes `text-white` alongside the fill, which is
 * only correct in light mode — these are the tokens the dark scheme answers
 * with instead.
 */
const DARK_ON_TOKEN: Record<string, string> = {
  primary: 'on-primary',
  secondary: 'on-secondary',
  // `accent` is Quasar's alias for the MD3 tertiary role.
  accent: 'on-tertiary'
}

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
          // Quasar's `color="primary"` prop paints `bg-primary text-white`.
          // The brand tokens flip to light tints in dark mode, so that white
          // label measured 1.71:1 on the primary fill (audit 2026-10-06, the
          // 404 CTA and the pagination button). Pair the surface with the
          // on-colour the way `.q-badge` and a `.q-btn-toggle > .q-btn-item`
          // already do — and the way `.q-btn` itself declares it through
          // `--q-btn-color: var(--q-on-primary)`.
          const on = DARK_ON_TOKEN[name]
          if (property === 'background-color' && on) {
            yield {
              [symbols.selector]: (sel: string) =>
                `.body--dark ${sel}.text-white`,
              color: `var(--q-${on})`
            }
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

// --- The one name the engine shadows with its own family ---
//
// mini's `light-blue` is a second spelling of its Tailwind `sky` family
// (`lightblue` / `lightBlue` / `sky` are a single theme entry whose `DEFAULT` is
// `#38bdf8`), and it resolves the *bare* name against that family instead of our
// palette — which is why the reference's `#03a9f4` never reached the class. The
// suffixed keys are unaffected: `bg-light-blue-5` looks our own key up directly.
//
// The preset therefore emits these two classes itself. `enforce: 'post'`
// displaces the engine's rule for exactly them (measured: one rule per class,
// ours, in either preset order), so nothing is duplicated. The value comes from
// the palette rather than a literal, and the `--q-*-opacity` reads keep the
// opacity modifier working the way the engine's own utility had it.
const lightBlue = defaultTheme.colors['light-blue']

export const colorRules: ComponentRule[] = [
  // --- Quasar color tokens ---
  ...generateColorRules(plainColorTokens),
  ...generateColorRules(darkScopedColorTokens, true),

  // --- MD3 color role tokens ---
  ...generateColorRules(md3Tokens),

  // --- Names the engine would otherwise resolve itself ---
  rule(/^bg-light-blue$/, () => ({
    'background-color': `color-mix(in srgb, ${lightBlue} var(--q-bg-opacity), transparent)`
  })),
  rule(/^text-light-blue$/, () => ({
    color: `color-mix(in srgb, ${lightBlue} var(--q-text-opacity), transparent)`
  }))
]
