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
      yield {
        position: 'fixed',
        inset: '0',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'z-index': 6000
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-dialog__backdrop$/,
    () => ({
      position: 'absolute',
      inset: '0',
      // The reference states `var(--dark-surface) 32%` — a surface role that
      // stays dark in both schemes, which is what `--q-dark` carries.
      'background-color': 'color-mix(in oklab, var(--q-dark) 32%, transparent)',
      'pointer-events': 'all !important',
      'outline-style': 'var(--un-outline-style)',
      'outline-width': '0px',
      'z-index': '-1'
    })
  ],
  [
    /^q-dialog__inner$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '90vw',
        'max-height': '90vh',
        'border-radius': 'var(--q-radius-lg)',
        'background-color': 'var(--q-surface)',
        'box-shadow': 'var(--q-elevation-5)',
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px'
      }
      // The content box the caller slots in carries the dialog's own box: the
      // padding, the radius scale and the width band.
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        'pointer-events': 'all !important',
        padding: '24px',
        'border-radius': 'var(--q-corner-extra-large)',
        'min-width': '280px',
        'max-width': '560px',
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}>.q-card`,
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)',
        // Cancel the card's own shadow: inside a dialog the card is a panel,
        // not a floating surface. wind4's shadow chain resolves to none.
        'box-shadow':
          'var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}>.q-card>.q-card__actions .q-btn--rectangle`,
        'min-width': '64px'
      }
    }
  ],
  [
    /^q-dialog__inner--maximized$/,
    function* (_, { symbols }) {
      yield {
        'max-width': '100vw',
        'max-height': '100vh',
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        'border-radius': '0 !important',
        height: '100%',
        width: '100%',
        'max-height': '100vh',
        'max-width': '100vw',
        top: '0 !important',
        left: '0 !important'
      }
    }
  ],
  [
    /^q-dialog__inner--bottom$/,
    function* (_, { symbols }) {
      yield {
        'align-self': 'flex-end',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-dialog__inner--animating)>div`,
        'border-bottom-left-radius': '0',
        'border-bottom-right-radius': '0'
      }
    }
  ],
  [
    /^q-dialog__inner--top$/,
    function* (_, { symbols }) {
      yield {
        'align-self': 'flex-start',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
    }
  ],
  [
    /^q-dialog__inner--left$/,
    function* (_, { symbols }) {
      yield {
        'justify-self': 'flex-start',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-dialog__inner--animating)>div`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
    }
  ],
  [
    /^q-dialog__inner--right$/,
    function* (_, { symbols }) {
      yield {
        'justify-self': 'flex-end',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-dialog__inner--animating)>div`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
    }
  ],
  [
    /^q-dialog__inner--center$/,
    () => ({
      'align-self': 'center'
    })
  ],
  [
    /^q-dialog__inner--full$/,
    () => ({
      'max-width': '100vw',
      'max-height': '100vh',
      'border-radius': '0'
    })
  ],
  [
    /^q-dialog--modal$/,
    () => ({
      // Modal dialog
    })
  ],
  [
    /^q-dialog--seamless$/,
    () => ({
      // Seamless dialog
    })
  ],
  [
    /^q-dialog--inner$/,
    () => ({
      // Inner dialog
    })
  ],
  [
    /^q-dialog__title$/,
    function* () {
      yield {
        'font-size': '1.25rem',
        'font-weight': '500',
        'line-height': '1.75rem',
        'letter-spacing': '0.0125em'
      }
    }
  ],
  [
    /^q-dialog__progress$/,
    function* () {
      yield { 'font-size': '4rem' }
    }
  ],
  [
    /^q-dialog__inner--square$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        'border-radius': '0 !important'
      }
    }
  ],
  [
    /^q-dialog__inner--minimized$/,
    function* (_, { symbols }) {
      yield { padding: '24px' }
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        'max-height': 'calc(100vh - 48px)'
      }
    }
  ],
  [
    /^q-dialog__inner--fullwidth$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        width: '100% !important',
        'max-width': '100% !important'
      }
    }
  ],
  [
    /^q-dialog__inner--fullheight$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        height: '100% !important',
        'max-height': '100% !important'
      }
    }
  ],
  [
    /^q-dialog-plugin$/,
    function* (_, { symbols }) {
      yield {
        width: '400px',
        // Reference `.q-dialog-plugin { min-width: 280px }`: below that the
        // action row wraps.
        'min-width': '280px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-card__section + .q-card__section`,
        'padding-top': '0'
      }
    }
  ],
  [
    /^q-dialog-plugin__form$/,
    function* () {
      yield { 'max-height': '50vh' }
    }
  ],
  [
    /^q-dialog-plugin--progress$/,
    function* () {
      yield { 'text-align': 'center' }
    }
  ],
  [
    // QBottomSheet renders `q-dialog q-bottom-sheet`; the reference overrides the
    // unstyled entry for it, and that override has no other owner in `src/`.
    /^q-bottom-sheet$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
] as Rule[]
