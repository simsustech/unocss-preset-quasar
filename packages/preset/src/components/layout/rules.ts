import type { Rule } from '@unocss/core'

export const layoutRules = [
  [
    /^q-layout$/,
    function* (_, { symbols }) {
      // .q-layout
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'min-height': '100vh',
        // Reference: `outline-style: var(--un-outline-style)` (wind4's `solid`
        // default), `outline-width: 0px; width: 100%; position: relative`.
        'outline-style': 'solid',
        'outline-width': '0px',
        width: '100%',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.platform-ios ${selector}--containerized`,
        position: 'unset !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--view`
        // View
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section`,
        display: 'flex',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container`,
        flex: '1',
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`
        // Content
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__shadow`,
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__shadow:after`,
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
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__shadow:after`,
        'box-shadow':
          '0 0 10px 2px rgba(255, 255, 255, 0.2), 0 0px 10px rgba(255, 255, 255, 0.24)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--marginal`,
        'background-color': 'var(--q-surface-container-low)',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__section--marginal`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body:not(.q-body--layout-animate) ${selector}--prevent-focus`,
        visibility: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.q-ios-padding ${selector}--standard .q-header > .q-toolbar:nth-child(1)`,
        'padding-top': 'env(safe-area-inset-top)',
        'min-height': 'calc(env(safe-area-inset-top) + 50px)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.q-ios-padding ${selector}--standard .q-header > .q-tabs:nth-child(1) .q-tabs__content`,
        'padding-top': 'env(safe-area-inset-top)',
        'min-height': 'calc(env(safe-area-inset-top) + 50px)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.q-ios-padding ${selector}--standard .q-footer > .q-toolbar:last-child`,
        'padding-bottom': 'env(safe-area-inset-bottom)',
        'min-height': 'calc(env(safe-area-inset-bottom) + 50px)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.q-ios-padding ${selector}--standard .q-footer > .q-tabs:nth-last-child(1 of :not(.q-layout__shadow)) .q-tabs__content`,
        'padding-bottom': 'env(safe-area-inset-bottom)',
        'min-height': 'calc(env(safe-area-inset-bottom) + 50px)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.q-ios-padding ${selector}--standard .q-drawer--top-padding .q-drawer__content`,
        'padding-top': 'env(safe-area-inset-top)',
        'min-height': 'calc(env(safe-area-inset-top) + 50px)'
      }
    }
  ],
  [
    /^q-layout-container$/,
    function* (_, { symbols }) {
      // .q-layout-container
      yield {
        position: 'relative',
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-layout`,
        'min-height': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > div`,
        transform: 'translate3d(0, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > div > div`,
        'min-height': '0',
        'max-height': '100%'
      }
    }
  ],
  [
    /^q-page$/,
    function* (_, { symbols }) {
      // .q-page
      yield { position: 'relative' }
    }
  ],
  [
    /^q-body$/,
    function* (_, { symbols }) {
      // .q-body
      yield {
        [symbols.selector]: (selector) => `${selector}--dialog`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--drawer-toggle`,
        overflow: 'hidden !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--layout-animate .q-drawer`,
        transition:
          'transform 0.12s, width 0.12s, top 0.12s, bottom 0.12s !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--layout-animate .q-drawer__backdrop`,
        transition: 'background-color 0.12s !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--layout-animate .q-layout__section--marginal`,
        transition: 'transform 0.12s, left 0.12s, right 0.12s !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--layout-animate .q-page-container`,
        transition:
          'padding-top 0.12s, padding-right 0.12s, padding-bottom 0.12s, padding-left 0.12s !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--layout-animate .q-page-sticky`,
        transition:
          'transform 0.12s, left 0.12s, right 0.12s, top 0.12s, bottom 0.12s !important'
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
