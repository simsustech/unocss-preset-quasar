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

  // Quasar 2.31's scroll lock writes `q-document--*` on <html>; the older
  // `q-body--*` mixins above are kept for runtimes that still emit them, since
  // the class name is chosen by Quasar's JavaScript, not by this sheet.
  // Declarations mirror quasar/dist/quasar.css verbatim.
  rule(/^q-document--prevent-scroll$/, () => ({
    'overscroll-behavior': 'none !important'
  })),
  rule(/^q-document--clip-scroll$/, () => ({
    overflow: 'hidden !important'
  })),
  rule(/^q-document--reserve-scrollbar$/, () => ({
    'scrollbar-gutter': 'stable !important'
  })),
  [
    /^q-document--pin-body$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield { 'min-height': '100%' }
      yield {
        [symbols.selector]: (sel: string) => `${sel} body`,
        position: 'fixed !important'
      }
    }
  ],

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

  // --- Electron drag handles ---
  // Reference scopes these to `body.electron`: the frameless-window drag region
  // is the element's own `-webkit-app-region`, and any interactive child opts
  // back out so it stays clickable.
  [
    /^q-electron-drag$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) => `body.electron ${sel}`,
        '-webkit-user-select': 'none',
        '-webkit-app-region': 'drag'
      }
      yield {
        [symbols.selector]: (sel: string) => `body.electron ${sel} .q-btn-item`,
        '-webkit-app-region': 'no-drag'
      }
    }
  ],
  [
    /^q-electron-drag--exception$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) => `body.electron ${sel}`,
        '-webkit-app-region': 'no-drag'
      }
    }
  ],

  // --- Link ---
  // Reference `.q-link { outline-style: var(--un-outline-style); outline-width: 0px;
  // text-decoration: none }` — the longhands, not the `outline` shorthand, so the
  // reset lines up with every other focusable surface.
  rule(/^q-link$/, () => ({
    'outline-style': 'var(--un-outline-style)',
    'outline-width': '0px',
    'text-decoration': 'none'
  })),
  rule(/^q-link--focusable:focus-visible$/, () => ({
    outline: 'auto'
  })),

  // --- Focus helpers ---
  //
  // Reference shape (transcribed from `specs/reference/raw/reference-bundle.css.txt`):
  // the *geometry* of the helper is desktop-scoped (`body.desktop .q-focus-helper`),
  // while the bare class only resets the outline through the wind4 longhands. The
  // preset previously emitted the geometry unconditionally, so the reference's
  // `body.desktop …` selectors were missing and the bare `.q-focus-helper` was
  // missing `outline-style`/`outline-width`.
  //
  // `background: transparent` is kept on the bare class as an extra: it is not in
  // the reference, but without it the spans paint `currentColor` over their full
  // 100%x100% box (stray pills in toolbars). Extras are not part of the gate's
  // contract and this one is load-bearing for rendering.
  [
    /^q-focus-helper$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) => `${sel}`,
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px',
        background: 'transparent'
      }
      yield {
        [symbols.selector]: (sel: string) => `body.desktop ${sel}`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'pointer-events': 'none',
        'border-radius': 'inherit',
        opacity: 0,
        transition:
          'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (sel: string) => `body.desktop ${sel}--round`,
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (sel: string) => `body.desktop ${sel}--rounded`,
        // quasar: this value is Quasar's own, not a forked token
        'border-radius': '4px'
      }
      // Hover ring: NOT `opacity: 0.15` alone — with no :before/:after overlay
      // the helper paints currentColor over the FULL 100%x100% box, which is
      // what turned whole pages purple on hover. Squash the tints onto the
      // pseudo-elements like quasar.css and keep the base flat.
      yield {
        [symbols.selector]: (sel: string) => `body.desktop ${sel}:before`,
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        'border-radius': 'inherit',
        transition:
          'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (sel: string) => `body.desktop ${sel}:after`,
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        'border-radius': 'inherit',
        transition:
          'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
    }
  ],
  // --- Focusable / hoverable / manual-focusable ---
  //
  // The reference resets each wrapper's outline through the wind4 longhands and
  // then drives the helper's tint from the *wrapper's* state. Quasar's runtime
  // toggles `:focus-visible` where the reference bundle still uses `:focus`, so
  // both states are emitted for the focusable pair.
  //
  // One matcher per regex: the two states share a single generator, yields are
  // additive, so no regex is registered twice (a duplicate would silently shadow
  // the earlier matcher).
  [
    /^q-focusable$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) => `${sel}`,
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px'
      }
      for (const state of [':focus', ':focus-visible']) {
        yield {
          [symbols.selector]: (sel: string) =>
            `body.desktop ${sel}${state} > .q-focus-helper`,
          background: 'currentColor',
          opacity: 0.15
        }
        yield {
          [symbols.selector]: (sel: string) =>
            `body.desktop ${sel}${state} > .q-focus-helper:after`,
          opacity: 0.4
        }
        yield {
          [symbols.selector]: (sel: string) =>
            `body.desktop ${sel}${state} > .q-focus-helper:before`,
          opacity: 0.1
        }
      }
    }
  ],
  [
    /^q-hoverable$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) => `${sel}`,
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `body.desktop ${sel}:hover > .q-focus-helper`,
        background: 'currentColor',
        opacity: 0.15
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `body.desktop ${sel}:hover > .q-focus-helper:after`,
        opacity: 0.4
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `body.desktop ${sel}:hover > .q-focus-helper:before`,
        opacity: 0.1
      }
    }
  ],
  [
    /^q-manual-focusable$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) => `${sel}`,
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px'
      }
    }
  ],
  [
    /^q-manual-focusable--focused$/,
    function* (_, { symbols }: any): Generator<any, void, any> {
      yield {
        [symbols.selector]: (sel: string) =>
          `body.desktop ${sel} > .q-focus-helper`,
        background: 'currentColor',
        opacity: 0.15
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `body.desktop ${sel} > .q-focus-helper:after`,
        opacity: 0.4
      }
      yield {
        [symbols.selector]: (sel: string) =>
          `body.desktop ${sel} > .q-focus-helper:before`,
        opacity: 0.1
      }
    }
  ]
]
