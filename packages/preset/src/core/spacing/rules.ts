import type { ComponentRule } from '../../rules/types.js'

/**
 * Spacing utilities — ported from core/size.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (!p-4, !m-4)
 * - CSS custom properties (--q-space-*) for spacing values
 * - Logical properties (padding-inline, margin-inline) for RTL support
 * - All combinations generated programmatically (sides × sizes)
 */

const sizes = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const

/** Map size name to --q-space-* custom property */
const space = (size: string) => `var(--q-space-${size})`

/** CSS value — strings or unitless numbers (e.g. margin: 0) */
type CSSValue = string | number

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, CSSValue>
): ComponentRule {
  return [regex, matcher]
}

/** Side → CSS property mapping for padding and margin */
const sides: Record<string, string> = {
  a: '', // all sides → just "padding" / "margin"
  t: '-top',
  b: '-bottom',
  l: '-left',
  r: '-right',
  x: '-inline', // logical
  y: '-block' // logical
}

/** Build padding/margin rules for all sides × all sizes */
function buildSpacingRules(prefix: 'padding' | 'margin'): ComponentRule[] {
  const rules: ComponentRule[] = []
  for (const size of sizes) {
    for (const [side, suffix] of Object.entries(sides)) {
      const propName = side === 'a' ? prefix : `${prefix}${suffix}`
      rules.push(
        rule(new RegExp(`^q-${prefix.charAt(0)}${side}-${size}$`), () => ({
          [propName]: space(size)
        }))
      )
    }
  }
  return rules
}

export const spacingRules: ComponentRule[] = [
  // --- q-p{a|t|b|l|r|x|y}-{size} ---
  ...buildSpacingRules('padding'),

  // --- q-m{a|t|b|l|r|x|y}-{size} ---
  ...buildSpacingRules('margin'),

  // --- Auto margins ---
  rule(/^q-ml-auto$/, () => ({ 'margin-left': 'auto' })),
  rule(/^q-mr-auto$/, () => ({ 'margin-right': 'auto' })),
  rule(/^q-mt-auto$/, () => ({ 'margin-top': 'auto' })),
  rule(/^q-mb-auto$/, () => ({ 'margin-bottom': 'auto' })),
  rule(/^q-mx-auto$/, () => ({ 'margin-inline': 'auto' })),
  rule(/^q-my-auto$/, () => ({ 'margin-block': 'auto' })),

  // --- Fit / Full / Window ---
  rule(/^fit$/, () => ({ width: '100%', height: '100%' })),
  rule(/^full-width$/, () => ({ width: '100%', 'margin-inline': 0 })),
  rule(/^full-height$/, () => ({ height: '100%' })),
  rule(/^window-width$/, () => ({ 'margin-inline': 0, width: '100vw' })),
  rule(/^window-height$/, () => ({ 'margin-block': 0, height: '100vh' }))
]
