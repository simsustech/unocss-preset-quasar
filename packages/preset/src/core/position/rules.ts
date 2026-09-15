import type { ComponentRule } from '../../rules/types.js'

/**
 * Position utilities — ported from core/position.unocss.ts as self-contained CSS.
 *
 * Modernizations vs the original:
 * - Raw CSS declarations instead of Wind4 utility composition (fixed top-0 right-0)
 * - inset: 0 shorthand instead of top/right/bottom/left: 0
 * - Logical properties (margin-inline-end/start) for RTL support on on-left/on-right
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

export const positionRules: ComponentRule[] = [
  // --- Fixed positions ---
  rule(/^fixed-full$/, () => ({ position: 'fixed', inset: 0 })),
  rule(/^fixed-center$/, () => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  })),
  rule(/^fixed-top$/, () => ({ position: 'fixed', top: 0, left: 0, right: 0 })),
  rule(/^fixed-bottom$/, () => ({
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0
  })),
  rule(/^fixed-left$/, () => ({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0
  })),
  rule(/^fixed-right$/, () => ({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0
  })),
  rule(/^fixed-top-left$/, () => ({ position: 'fixed', top: 0, left: 0 })),
  rule(/^fixed-top-right$/, () => ({ position: 'fixed', top: 0, right: 0 })),
  rule(/^fixed-bottom-left$/, () => ({
    position: 'fixed',
    bottom: 0,
    left: 0
  })),
  rule(/^fixed-bottom-right$/, () => ({
    position: 'fixed',
    bottom: 0,
    right: 0
  })),

  // --- Absolute positions ---
  rule(/^absolute-full$/, () => ({ position: 'absolute', inset: 0 })),
  rule(/^absolute-center$/, () => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  })),
  rule(/^absolute-top$/, () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  })),
  rule(/^absolute-bottom$/, () => ({
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  })),
  rule(/^absolute-left$/, () => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  })),
  rule(/^absolute-right$/, () => ({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0
  })),
  rule(/^absolute-top-left$/, () => ({
    position: 'absolute',
    top: 0,
    left: 0
  })),
  rule(/^absolute-top-right$/, () => ({
    position: 'absolute',
    top: 0,
    right: 0
  })),
  rule(/^absolute-bottom-left$/, () => ({
    position: 'absolute',
    bottom: 0,
    left: 0
  })),
  rule(/^absolute-bottom-right$/, () => ({
    position: 'absolute',
    bottom: 0,
    right: 0
  })),

  // --- Fullscreen ---
  rule(/^fullscreen$/, () => ({
    position: 'fixed',
    inset: 0,
    'border-radius': 0,
    'max-width': '100vw',
    'max-height': '100vh',
    'z-index': 6000
  })),

  // --- Relative ---
  rule(/^relative-position$/, () => ({ position: 'relative' })),

  // --- Vertical alignment ---
  rule(/^vertical-top$/, () => ({ 'vertical-align': 'top' })),
  rule(/^vertical-middle$/, () => ({ 'vertical-align': 'middle' })),
  rule(/^vertical-bottom$/, () => ({ 'vertical-align': 'bottom' })),

  // --- On-left / On-right (logical properties for RTL) ---
  rule(/^on-left$/, () => ({ 'margin-inline-end': '12px' })),
  rule(/^on-right$/, () => ({ 'margin-inline-start': '12px' })),

  // --- QPositionEngine (positioning engine for popups) ---
  rule(/^q-position-engine$/, () => ({
    'margin-top': 'var(--q-pe-top, 0px)',
    'margin-left': 'var(--q-pe-left, 0px)',
    'will-change': 'auto'
  }))
]
