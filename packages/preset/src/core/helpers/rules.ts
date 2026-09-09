import type { ComponentRule } from '../../rules/types.js'

/**
 * Helper utilities — ported from core/helpers.unocss.ts.
 *
 * Miscellaneous utilities: rounded borders, transitions, glossy effect,
 * placeholders, body mixins, input spinners, and links.
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

export const helpersRules: ComponentRule[] = [
  // --- Border radius ---
  rule(/^rounded-borders$/, () => ({ borderRadius: '4px' })),
  rule(/^border-radius-inherit$/, () => ({ borderRadius: 'inherit' })),

  // --- Transitions ---
  rule(/^no-transition$/, () => ({ transition: 'none' })),
  rule(/^transition-0$/, () => ({ transition: '0s' })),

  // --- Glossy effect ---
  rule(/^glossy$/, () => ({
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0) 50%, rgba(0,0,0,0.12) 51%, rgba(0,0,0,0.04))'
  })),

  // --- Placeholder ---
  rule(/^q-placeholder::placeholder$/, () => ({
    color: 'inherit',
    opacity: 0.7
  })),

  // --- Body mixins ---
  rule(/^q-body--fullscreen-mixin$/, () => ({
    position: 'fixed',
    inset: 0
  })),
  rule(/^q-body--prevent-scroll$/, () => ({
    position: 'fixed',
    inset: 0
  })),
  rule(/^q-body--force-scrollbar-x$/, () => ({ overflowX: 'scroll' })),
  rule(/^q-body--force-scrollbar-y$/, () => ({ overflowY: 'scroll' })),

  // --- Input spinner ---
  rule(/^q-no-input-spinner::-webkit-outer-spin-button$/, () => ({
    margin: 0,
    WebkitAppearance: 'none'
  })),
  rule(/^q-no-input-spinner::-webkit-inner-spin-button$/, () => ({
    margin: 0,
    WebkitAppearance: 'none'
  })),
  rule(/^q-no-input-spinner$/, () => ({
    MozAppearance: 'textfield'
  })),

  // --- Link ---
  rule(/^q-link$/, () => ({
    outline: 0,
    textDecoration: 'none'
  })),
  rule(/^q-link--focusable:focus-visible$/, () => ({
    outline: 'auto'
  }))
]
