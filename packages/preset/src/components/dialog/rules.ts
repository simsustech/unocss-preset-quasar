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
  '@media (min-width: 600px){.q-dialog__inner--minimized > div{max-width:560px}}' +
  // The bottom sheet ships through this plugin too (see the q-bottom-sheet rules
  // below): its grid item widens to a quarter above the same breakpoint.
  '@media (min-width: 600px){.q-bottom-sheet__item{flex:0 0 25%}}'

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
        [symbols.selector]: (selector) => `${selector}__backdrop`,
        position: 'absolute',
        inset: '0',
        // The reference's own scrim: `rgba(0, 0, 0, 0.4)`, scheme-independent.
        // This was `color-mix(… var(--q-dark) 32%, transparent)` on the belief
        // that `--q-dark` stays dark in both schemes — but it is the MD3 *surface*
        // role (light `#fcfcff`; `theme/colors.ts` derives dark from light.surface),
        // so in the light scheme the scrim was a 32% white veil over the page.
        'background-color': 'rgba(0, 0, 0, 0.4)',
        'pointer-events': 'all !important',
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px',
        'z-index': '-1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        position: 'relative',
        display: 'flex',
        // Row direction, as stock Quasar renders it: the runtime class list is
        // `… fixed-full flex-center` (QDialog.js) and `flex-center` sets
        // `justify-content/align-items: center` on the default row axis. That
        // row axis is load-bearing — `flex-shrink` acts on the MAIN axis, so a
        // child wider than this box (the Dialog plugin's `.q-dialog-plugin` is a
        // fixed `width: 400px`) shrinks to fit a phone viewport. A `column`
        // direction here moved the shrink to the vertical axis and let the card
        // spill off a 375px screen by 31px (`(90vw - 400px) / 2`).
        // No size clamp here — and never re-add one for "fit". Under Quasar's
        // runtime `fixed-full` (`position: fixed; inset: 0`) a max-* clamp makes
        // this box over-constrained: left/top win, so the centering box pinned to
        // (0, 0) at 90vw × 90vh and `flex-center` centred cards inside that
        // off-centre box — drift of exactly 5vw/5vh (measured left 45.7 vs right
        // 100.3 at 546×1146; ResponsiveDialog 32 vs 160 at 1280). Neither the
        // reference bundle nor stock Quasar sizes this inner: fitting belongs to
        // `__inner>div` (`max-width: 560px`), `--minimized>div`
        // (`max-height: calc(100vh - 48px)`) and the row-flex shrink above.
        'border-radius': 'var(--q-radius-lg)',
        // No surface here. Quasar renders this box as `… standard fixed-full
        // flex-center` (QDialog.js), i.e. inset 0 — the whole viewport — and stock
        // Quasar gives it no background: the card below is the dialog's surface.
        // Painting `var(--q-surface)` on this full-viewport box put a giant white
        // rounded panel behind every dialog; its ambient shadow belongs with that
        // surface, so it lives on the card.
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
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
          'color-mix(in oklab, var(--q-surface-container-high) var(--q-bg-opacity), transparent)',
        // The surface carries the MD3 ambient shadow: interfaces_and_modals.json,
        // outer_ambient_shadow_mapping = level_3. The engine chain used to be the
        // *whole* value, cancelling the card's shadow while the inner carried the
        // elevation — wrong surface once the inner stopped painting one. Keeping
        // the chain alongside level_3 (a) preserves the engine reads that
        // `engine-reads.test.ts` treats as a contract and (b) paints nothing extra:
        // in this stack the chain resolves to none.
        'box-shadow':
          'var(--q-elevation-level3), var(--un-inset-shadow, var(--q-inset-shadow)), var(--un-inset-ring-shadow, var(--q-inset-ring-shadow)), var(--un-ring-offset-shadow, var(--q-ring-offset-shadow)), var(--un-ring-shadow, var(--q-ring-shadow)), var(--un-shadow, var(--q-shadow))'
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
        // quasar: this value is Quasar's own, not a forked token
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
        // quasar: this value is Quasar's own, not a forked token
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
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '0 !important',
        'padding-bottom': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--left`,
        'justify-self': 'flex-start',
        // quasar: this value is Quasar's own, not a forked token
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
        // quasar: this value is Quasar's own, not a forked token
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
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--seamless`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inner`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.25rem',
        'font-weight': 'var(--fontWeight-medium)',
        'line-height': '1.75rem',
        'letter-spacing': '0.0125em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '4rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--square>div`,
        // quasar: this value is Quasar's own, not a forked token
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
      // .q-bottom-sheet and its members. The sheet ships through the Dialog
      // plugin, so its classes are safelisted per plugin (pluginSafelistMap)
      // rather than reached through the scanned source. Declarations mirror
      // quasar/dist/quasar.css verbatim.
      yield {
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar`,
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--list`,
        width: '400px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--list .q-icon, ${selector}--list img`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '24px',
        width: '24px',
        height: '24px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid`,
        width: '700px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid ${selector}__item`,
        // quasar: these values are Quasar's own, not forked tokens
        padding: '8px',
        'text-align': 'center',
        'min-width': '100px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--grid .q-icon, ${selector}--grid img, ${selector}--grid ${selector}__empty-icon`,
        // quasar: these values are Quasar's own, not forked tokens
        'font-size': '48px',
        width: '48px',
        height: '48px',
        'margin-bottom': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--grid .q-separator`,
        margin: '12px 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__item`,
        flex: '0 0 33.3333%'
      }
    }
  ]
] as Rule[]
