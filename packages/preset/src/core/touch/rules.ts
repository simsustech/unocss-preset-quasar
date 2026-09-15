import type { ComponentRule } from '../../rules/types.js'

/**
 * Touch utilities — ported from core/touch.unocss.ts.
 *
 * Touch-specific helpers for pointer events and user selection.
 */

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, string | number>
): ComponentRule {
  return [regex, matcher]
}

export const touchRules: ComponentRule[] = [
  rule(/^q-touch$/, () => ({ 'user-select': 'none' })),
  rule(/^q-touch-x$/, () => ({ 'touch-action': 'pan-x' })),
  rule(/^q-touch-y$/, () => ({ 'touch-action': 'pan-y' }))
]
