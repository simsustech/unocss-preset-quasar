import type { ComponentRule } from './types.js'

/**
 * Orientation utilities — ported from core/orientation.unocss.ts.
 *
 * Flip transforms for horizontal/vertical mirroring.
 */

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, string | number>
): ComponentRule {
  return [regex, matcher]
}

export const orientationRules: ComponentRule[] = [
  rule(/^flip-horizontal$/, () => ({ transform: 'scaleX(-1)' })),
  rule(/^flip-vertical$/, () => ({ transform: 'scaleY(-1)' }))
]
