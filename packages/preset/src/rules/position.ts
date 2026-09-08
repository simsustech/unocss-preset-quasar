import type { ComponentRule } from './types.js'

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
    borderRadius: 0,
    maxWidth: '100vw',
    maxHeight: '100vh',
    zIndex: 6000
  })),

  // --- Relative ---
  rule(/^relative-position$/, () => ({ position: 'relative' })),

  // --- Vertical alignment ---
  rule(/^vertical-top$/, () => ({ verticalAlign: 'top' })),
  rule(/^vertical-middle$/, () => ({ verticalAlign: 'middle' })),
  rule(/^vertical-bottom$/, () => ({ verticalAlign: 'bottom' })),

  // --- On-left / On-right (logical properties for RTL) ---
  rule(/^on-left$/, () => ({ marginInlineEnd: '12px' })),
  rule(/^on-right$/, () => ({ marginInlineStart: '12px' })),

  // --- QPositionEngine (positioning engine for popups) ---
  rule(/^q-position-engine$/, () => ({
    marginTop: 'var(--q-pe-top, 0px)',
    marginLeft: 'var(--q-pe-left, 0px)',
    willChange: 'auto'
  }))
]
