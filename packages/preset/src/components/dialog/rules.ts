import type { Rule } from '@unocss/core'

/**
 * Media families for the dialog. A UnoCSS rule body cannot carry an at-rule (a
 * nested `'@media …'` key is stringified as `[object Object]`), so the two
 * breakpoints the reference states for the edge-anchored variants are emitted
 * as text, the way the other media families in `src/index.ts` are.
 *
 * Below 600px the top/bottom variants span the viewport; above it the minimized
 * variant caps its content box at 560px.
 */
export const dialogMediaCss =
  '@media (max-width: 599.98px){' +
  '.q-dialog__inner--top{padding-left:0;padding-right:0}' +
  '.q-dialog__inner--bottom{padding-left:0;padding-right:0}' +
  '.q-dialog__inner--top > div{width:100% !important}' +
  '.q-dialog__inner--bottom > div{width:100% !important}' +
  '}' +
  '@media (min-width: 600px){.q-dialog__inner--minimized > div{max-width:560px}}'

/**
 * Platform and safe-area overrides. These selectors are keyed off runtime body
 * classes (`body.platform-ios`, `body.q-ios-padding`) that never appear in the
 * scanned source, so no rule matcher can reach them.
 */
export const dialogPlatformCss =
  'body.platform-ios .q-dialog__inner--minimized > div{max-height:calc(100vh - 108px)}' +
  'body.platform-android:not(.native-mobile) .q-dialog__inner--minimized > div{max-height:calc(100vh - 108px)}' +
  'body.platform-android.native-mobile .q-dialog__inner--top .q-select__dialog{max-height:calc(100vh - 24px) !important}' +
  'body.platform-android:not(.native-mobile) .q-dialog__inner--top .q-select__dialog{max-height:calc(100vh - 80px) !important}' +
  'body.platform-ios.native-mobile .q-dialog__inner--top > div{border-radius:4px}' +
  'body.platform-ios.native-mobile .q-dialog__inner--top .q-select__dialog--focused{max-height:47vh !important}' +
  'body.platform-ios:not(.native-mobile) .q-dialog__inner--top .q-select__dialog--focused{max-height:50vh !important}' +
  'body.q-ios-padding .q-dialog__inner{padding-top:env(safe-area-inset-top) !important;padding-bottom:env(safe-area-inset-bottom) !important}' +
  'body.q-ios-padding .q-dialog__inner > div{max-height:calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important}'

export const dialogRules = [
  [
    /^q-dialog$/,
    function* (_, { symbols }) {
      // .q-dialog
      yield {
        position: 'fixed',
        inset: '0',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'z-index': 6000
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__backdrop`,
        position: 'absolute',
        inset: '0',
        // The reference states `var(--dark-surface) 32%` — a surface role that
        // stays dark in both schemes, which is what `--q-dark` carries.
        'background-color':
          'color-mix(in oklab, var(--q-dark) 32%, transparent)',
        'pointer-events': 'all !important',
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px',
        'z-index': '-1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '90vw',
        'max-height': '90vh',
        'border-radius': 'var(--q-radius-lg)',
        'background-color': 'var(--q-surface)',
        // interfaces_and_modals.json: outer_ambient_shadow_mapping = level_3.
        'box-shadow': 'var(--q-elevation-level3)',
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner>div`,
        'pointer-events': 'all !important',
        padding: '24px',
        'border-radius': 'var(--q-corner-extra-large)',
        'min-width': '280px',
        'max-width': '560px',
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner>.q-card`,
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)',
        // Cancel the card's own shadow: inside a dialog the card is a panel,
        // not a floating surface. wind4's shadow chain resolves to none.
        'box-shadow':
          'var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__inner>.q-card>.q-card__actions .q-btn--rectangle`,
        'min-width': '64px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--maximized`,
        'max-width': '100vw',
        'max-height': '100vh',
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--maximized>div`,
        'border-radius': '0 !important',
        height: '100%',
        width: '100%',
        'max-height': '100vh',
        'max-width': '100vw',
        top: '0 !important',
        left: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--bottom`,
        'align-self': 'flex-end',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__inner--bottom:not(.q-dialog__inner--animating)>div`,
        'border-bottom-left-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--top`,
        'align-self': 'flex-start',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--left`,
        'justify-self': 'flex-start',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__inner--left:not(.q-dialog__inner--animating)>div`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--right`,
        'justify-self': 'flex-end',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__inner--right:not(.q-dialog__inner--animating)>div`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--center`,
        'align-self': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--full`,
        'max-width': '100vw',
        'max-height': '100vh',
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--modal`
        // Modal dialog
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--seamless`
        // Seamless dialog
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inner`
        // Inner dialog
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        'font-size': '1.25rem',
        'font-weight': '500',
        'line-height': '1.75rem',
        'letter-spacing': '0.0125em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        'font-size': '4rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--square>div`,
        'border-radius': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--minimized`,
        padding: '24px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--minimized>div`,
        'max-height': 'calc(100vh - 48px)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--fullwidth>div`,
        width: '100% !important',
        'max-width': '100% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--fullheight>div`,
        height: '100% !important',
        'max-height': '100% !important'
      }
    }
  ],
  [
    /^q-dialog-plugin$/,
    function* (_, { symbols }) {
      // .q-dialog-plugin
      yield {
        width: '400px',
        // Reference `.q-dialog-plugin { min-width: 280px }`: below that the
        // action row wraps.
        'min-width': '280px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-card__section + .q-card__section`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__form`,
        'max-height': '50vh'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--progress`,
        'text-align': 'center'
      }
    }
  ],
  [
    /^q-bottom-sheet$/,
    function* (_, { symbols }) {
      // .q-bottom-sheet
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
] as Rule[]
