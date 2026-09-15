import type { ComponentRule } from '../../rules/types.js'

/**
 * Visibility utilities — ported from core/visibility.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (!m-0, !p-0)
 * - Preserves !important where quasar.css uses it
 *
 * Note: responsive breakpoint hides (xs-hide, gt-xs, etc.) and q-focus-helper
 * styles are in preflights/visibility.ts since they need @media queries and
 * pseudo-elements that UnoCSS rules can't produce.
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

export const visibilityRules: ComponentRule[] = [
  // --- No-* resets ---
  rule(/^no-margin$/, () => ({ margin: 0 })),
  rule(/^no-padding$/, () => ({ padding: 0 })),
  rule(/^no-border$/, () => ({ border: 0 })),
  rule(/^no-border-radius$/, () => ({ 'border-radius': 0 })),
  rule(/^no-box-shadow$/, () => ({ 'box-shadow': 'none' })),
  rule(/^no-outline$/, () => ({ outline: 0 })),

  // --- Ellipsis ---
  rule(/^ellipsis$/, () => ({
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    overflow: 'hidden'
  })),
  rule(/^ellipsis-2-lines$/, () => ({
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  })),
  rule(/^ellipsis-3-lines$/, () => ({
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical'
  })),

  // --- Disabled ---
  rule(/^disabled$/, () => ({
    outline: 0,
    cursor: 'not-allowed',
    opacity: 0.6
  })),

  // --- Readonly ---
  rule(/^readonly$/, () => ({ cursor: 'default' })),

  // --- Transparent ---
  rule(/^transparent$/, () => ({ 'background-color': 'transparent' })),

  // --- Invisible ---
  rule(/^invisible$/, () => ({
    visibility: 'hidden',
    transition: 'none',
    animation: 'none'
  })),

  // --- Overflow ---
  rule(/^overflow-hidden-y$/, () => ({ 'overflow-y': 'hidden' })),

  // --- Z-index ---
  rule(/^z-top$/, () => ({ 'z-index': 7000 })),
  rule(/^z-max$/, () => ({ 'z-index': 9998 })),

  // --- Focusable helpers (outline reset) ---
  rule(/^q-focus-helper$/, () => ({ outline: 0 })),
  rule(/^q-focusable$/, () => ({ outline: 0 })),
  rule(/^q-manual-focusable$/, () => ({ outline: 0 })),
  rule(/^q-hoverable$/, () => ({ outline: 0 }))
]
