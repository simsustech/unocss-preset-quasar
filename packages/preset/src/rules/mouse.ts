import type { ComponentRule } from './types.js'

/**
 * Mouse/pointer utilities — ported from core/mouse.unocss.ts.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition
 * - Pointer-events-all as a rule (was a rule in original)
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

export const mouseRules: ComponentRule[] = [
  // --- Pointer events ---
  rule(/^pointer-events-all$/, () => ({ pointerEvents: 'all' })),
  rule(/^no-pointer-events$/, () => ({ pointerEvents: 'none' })),

  // --- User selection ---
  rule(/^non-selectable$/, () => ({ userSelect: 'none' })),

  // --- Scroll ---
  rule(/^scroll$/, () => ({ overflow: 'auto' })),
  rule(/^scroll-x$/, () => ({ overflowX: 'auto' })),
  rule(/^scroll-y$/, () => ({ overflowY: 'auto' })),
  rule(/^no-scroll$/, () => ({ overflow: 'hidden' })),

  // --- Cursor ---
  rule(/^cursor-inherit$/, () => ({ cursor: 'inherit' })),
  rule(/^cursor-pointer$/, () => ({ cursor: 'pointer' }))
]
