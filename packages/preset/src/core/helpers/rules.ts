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
  rule(/^rounded-borders$/, () => ({ 'border-radius': '4px' })),
  rule(/^border-radius-inherit$/, () => ({ 'border-radius': 'inherit' })),

  // --- Transitions ---
  rule(/^no-transition$/, () => ({ transition: 'none' })),
  rule(/^transition-0$/, () => ({ transition: '0s' })),

  // --- Glossy effect ---
  rule(/^glossy$/, () => ({
    'background-image':
      'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.12) 51%, rgba(0, 0, 0, 0.04)) !important'
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
  rule(/^q-body--force-scrollbar-x$/, () => ({ 'overflow-x': 'scroll' })),
  rule(/^q-body--force-scrollbar-y$/, () => ({ 'overflow-y': 'scroll' })),

  // --- Input spinner ---
  rule(/^q-no-input-spinner::-webkit-outer-spin-button$/, () => ({
    margin: 0,
    '-webkit-appearance': 'none'
  })),
  rule(/^q-no-input-spinner::-webkit-inner-spin-button$/, () => ({
    margin: 0,
    '-webkit-appearance': 'none'
  })),
  rule(/^q-no-input-spinner$/, () => ({
    '-moz-appearance': 'textfield'
  })),

  // --- Link ---
  rule(/^q-link$/, () => ({
    outline: 0,
    'text-decoration': 'none'
  })),
  rule(/^q-link--focusable:focus-visible$/, () => ({
    outline: 'auto'
  })),

  // --- Focus helpers (keyboard focus rings; plan requires focus screenshots) ---
  // Source: quasar.css `.q-focusable:focus-visible > .q-focus-helper` group.
  // Synthetic owning token `q-focus-helper` (safelisted): Quasar adds these
  // classes dynamically, so extractor output can't be relied upon.
  [
    /^q-focus-helper$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      // Base: invisible absolute overlay (quasar.css:12073). Without this,
      // helper spans render as visible blocks (stray pills in toolbars).
      // background:transparent is load-bearing — currentColor here tints
      // every hoverable/clickable surface on hover.
      // helper spans render as visible blocks (stray pills in toolbars).
      yield {
        [symbols.selector]: (sel: string) => `${sel}`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'pointer-events': 'none',
        'border-radius': 'inherit',
        background: 'transparent',
        opacity: 0,
        outline: 0
      }
      // Hover ring: NOT `opacity: 0.15` alone — with no :before/:after overlay
      // the helper paints currentColor over the FULL 100%x100% box, which is
      // what turned whole pages purple on hover. Squash the tints onto the
      // pseudo-elements like quasar.css (12123-12132) and keep the base flat.
      yield {
        [symbols.selector]: (sel: string) =>
          `.q-hoverable:hover > ${sel}, .q-focusable:focus-visible > ${sel}, .q-manual-focusable--focused > ${sel}`,
        background: 'currentColor',
        opacity: 0.15
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `.q-hoverable:hover > ${sel}:before, .q-focusable:focus-visible > ${sel}:before, .q-manual-focusable--focused > ${sel}:before`,
        background: '#000',
        opacity: 0.1
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `.q-hoverable:hover > ${sel}:after, .q-focusable:focus-visible > ${sel}:after, .q-manual-focusable--focused > ${sel}:after`,
        background: '#fff',
        opacity: 0.4
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel}, .q-focusable, .q-manual-focusable, .q-hoverable`,
        outline: 0
      }
    }
  ]
]
