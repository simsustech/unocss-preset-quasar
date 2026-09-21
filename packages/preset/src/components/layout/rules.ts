import type { Rule } from '@unocss/core'

export const layoutRules = [
  [
    /^q-layout$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'min-height': '100vh',
      // Reference: `outline-style: var(--un-outline-style)` (wind4's `solid`
      // default), `outline-width: 0px; width: 100%; position: relative`.
      'outline-style': 'solid',
      'outline-width': '0px',
      width: '100%',
      position: 'relative'
    })
  ],
  [
    /^q-layout--containerized$/,
    function* (_, { symbols }) {
      // On iOS the container is not a fixed-height box: Quasar measures the
      // visual viewport instead, so the container's own positioning is dropped.
      yield {
        [symbols.selector]: (sel) => `body.platform-ios ${sel}`,
        position: 'unset !important'
      }
    }
  ],
  [
    /^q-layout--view$/,
    () => ({
      // View
    })
  ],
  [
    /^q-layout__section$/,
    () => ({
      display: 'flex',
      'flex-direction': 'row'
    })
  ],
  [
    /^q-layout__container$/,
    () => ({
      flex: '1',
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-layout__content$/,
    () => ({
      // Content
    })
  ],
  [
    /^q-layout__shadow$/,
    function* (_, { symbols }) {
      // Reference: the shadow container is full width and stretched over the
      // layout; without this the `:after` shadow only covered its own box.
      yield { width: '100%' }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'box-shadow':
          '0 0 10px 2px rgba(0, 0, 0, 0.2), 0 0px 10px rgba(0, 0, 0, 0.24)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}:after`,
        'box-shadow':
          '0 0 10px 2px rgba(255, 255, 255, 0.2), 0 0px 10px rgba(255, 255, 255, 0.24)'
      }
    }
  ],
  [
    /^q-layout-container$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout`,
        'min-height': '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transform: 'translate3d(0, 0, 0)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div > div`,
        'min-height': '0',
        'max-height': '100%'
      }
    }
  ],
  [
    /^q-layout__section--marginal$/,
    function* (_, { symbols }) {
      // Spec: md.sys.color.surface-container-low (same token the navigation
      // drawer uses). Was painting --q-primary with white text, and the class
      // was missing from the safelist so it never emitted at all.
      yield {
        'background-color': 'var(--q-surface-container-low)',
        color: 'var(--q-on-surface)'
      }
      // Dark: marginal section colour.
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)'
      }
    }
  ],
  // NOTE: /^q-header$/ and /^q-footer$/ were declared here as well as in the
  // header/footer modules. The engine keeps one rule per regex, so the later
  // declarations won and the bases were lost — do not reintroduce them here.
  [
    /^q-page$/,
    function* () {
      yield { position: 'relative' }
    }
  ],

  // --- Reference parity: body state classes, iOS padding, layout media ---
  [
    /^q-body--dialog$/,
    () => ({
      overflow: 'hidden'
    })
  ],
  [
    /^q-body--drawer-toggle$/,
    () => ({
      overflow: 'hidden !important'
    })
  ],
  [
    /^q-body--layout-animate$/,
    function* (_, { symbols }) {
      // While the layout animates, every moving part transitions together.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-drawer`,
        transition:
          'transform 0.12s, width 0.12s, top 0.12s, bottom 0.12s !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-drawer__backdrop`,
        transition: 'background-color 0.12s !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout__section--marginal`,
        transition: 'transform 0.12s, left 0.12s, right 0.12s !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-page-container`,
        transition:
          'padding-top 0.12s, padding-right 0.12s, padding-bottom 0.12s, padding-left 0.12s !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-page-sticky`,
        transition:
          'transform 0.12s, left 0.12s, right 0.12s, top 0.12s, bottom 0.12s !important'
      }
    }
  ],
  [
    /^q-layout--prevent-focus$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body:not(.q-body--layout-animate) ${sel}`,
        visibility: 'hidden'
      }
    }
  ],
  [
    /^q-layout--standard$/,
    function* (_, { symbols }) {
      // iOS safe-area padding: Quasar adds `q-ios-padding` to <body> and the
      // layout's first/last bars grow by the inset. `env()` is the only way to
      // read the inset, and the 20px/70px fallbacks are Quasar's own numbers.
      yield {
        [symbols.selector]: (sel) =>
          `body.q-ios-padding ${sel} .q-header > .q-toolbar:nth-child(1)`,
        'padding-top': 'env(safe-area-inset-top)',
        'min-height': 'calc(env(safe-area-inset-top) + 50px)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.q-ios-padding ${sel} .q-header > .q-tabs:nth-child(1) .q-tabs__content`,
        'padding-top': 'env(safe-area-inset-top)',
        'min-height': 'calc(env(safe-area-inset-top) + 50px)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.q-ios-padding ${sel} .q-footer > .q-toolbar:last-child`,
        'padding-bottom': 'env(safe-area-inset-bottom)',
        'min-height': 'calc(env(safe-area-inset-bottom) + 50px)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.q-ios-padding ${sel} .q-footer > .q-tabs:nth-last-child(1 of :not(.q-layout__shadow)) .q-tabs__content`,
        'padding-bottom': 'env(safe-area-inset-bottom)',
        'min-height': 'calc(env(safe-area-inset-bottom) + 50px)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `body.q-ios-padding ${sel} .q-drawer--top-padding .q-drawer__content`,
        'padding-top': 'env(safe-area-inset-top)',
        'min-height': 'calc(env(safe-area-inset-top) + 50px)'
      }
    }
  ]
] as Rule[]

/**
 * `.q-layout-padding` — the page gutter Quasar applies per window class.
 *
 * Emitted as CSS text with the responsive visibility and orientation families
 * (assembled in `src/index.ts`): a class rule cannot carry a media query, and
 * the paddings are the reference's own numbers (8 / 16 / 24px).
 */
export const layoutMediaCss: string = [
  '@media (max-width: 599.98px){.q-layout-padding{padding:8px}}',
  '@media (min-width: 600px) and (max-width: 1439.98px){.q-layout-padding{padding:16px}}',
  '@media (min-width: 1440px){.q-layout-padding{padding:24px}}'
].join('\n')
