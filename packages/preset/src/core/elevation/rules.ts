import type { ComponentRule } from '../../rules/types.js'

/**
 * Elevation system — ported from core/elevation.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Uses --q-elevation-level* custom properties (no hardcoded shadow values)
 * - Both .elevation-N and .q-elevation-N map to the same token
 * - z-index utilities use literal values (no tokens exist yet)
 */

/** CSS value — strings or unitless numbers */
type CSSValue = string | number

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, CSSValue>
): ComponentRule {
  return [regex, matcher]
}

/** Generate elevation-1 through elevation-5 (and q-elevation-*) rules */
const elevationRules: ComponentRule[] = Array.from(
  { length: 5 },
  (_, i): ComponentRule => {
    const level = i + 1
    return [
      new RegExp(`^(?:q-)?elevation-${level}$`),
      () => ({ 'box-shadow': `var(--q-elevation-level${level})` })
    ]
  }
)

export const elevationRuleList: ComponentRule[] = [
  // --- Shadow none ---
  rule(/^shadow-none$/, () => ({ 'box-shadow': 'none' })),
  rule(/^no-shadow$/, () => ({ 'box-shadow': 'none' })),

  // --- Elevation levels 1-5 (both .elevation-N and .q-elevation-N) ---
  ...elevationRules,

  // --- Z-index utilities ---
  rule(/^z-marginals$/, () => ({ 'z-index': 2000 })),
  rule(/^z-notify$/, () => ({ 'z-index': 9500 })),
  rule(/^z-fullscreen$/, () => ({ 'z-index': 6000 })),
  rule(/^z-inherit$/, () => ({ 'z-index': 'inherit' }))
]
