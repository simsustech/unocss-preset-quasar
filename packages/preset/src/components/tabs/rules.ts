import type { Rule } from '@unocss/core'

export const tabsRules = [
  [
    /^q-tabs$/,
    function* (_, { symbols }) {
      // .q-tabs
      yield {
        display: 'flex',
        'align-items': 'center',
        // Reference: `flex: 0 1 auto !important; transition: color 0.3s,
        // background-color 0.3s; position: relative`.
        flex: '0 1 auto !important',
        transition: 'color 0.3s, background-color 0.3s',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'background-color': 'var(--q-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-tab`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-tab--full`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '52px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical`,
        // Reference: the rail swaps the flex track for a block box; without
        // `display: block !important` the base `display: flex` won and the rail
        // rendered horizontally.
        height: '100%',
        display: 'block !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical .q-tab`,
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tab__indicator`,
        height: 'unset',
        width: '2px',
        'min-height': '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tabs--dense .q-tab__content`,
        'min-width': '24px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tabs--not-scrollable .q-tabs__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tabs__arrow`,
        'text-align': 'center',
        width: '100%',
        height: '36px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tabs__arrow--left`,
        top: '0',
        left: '0',
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tabs__arrow--right`,
        left: '0',
        right: '0',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-tabs__content`,
        height: '100%',
        display: 'block !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--scrollable`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--scrollable.q-tabs__arrows--inside .q-tabs__arrow--faded`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--scrollable.q-tabs__arrows--outside .q-tabs__arrow--faded`,
        opacity: '30%',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--scrollable.q-tabs__arrows--outside.q-tabs--horizontal`,
        'padding-left': '36px',
        'padding-right': '36px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--scrollable.q-tabs__arrows--outside.q-tabs--vertical`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '36px',
        'padding-bottom': '36px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        display: 'flex',
        'align-items': 'center',
        flex: '1 1 auto',
        // Reference: `flex: 1 1 auto; overflow: hidden` (scrolling is driven by
        // the arrow controls, not by an overflow scroller).
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content--align-center`,
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content--align-justify`,
        'justify-content': 'space-between'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content--align-justify .q-tab`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content--align-left`,
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content--align-right`,
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__indicator`,
        position: 'absolute',
        bottom: 0,
        height: '2px',
        'background-color': 'var(--q-primary)',
        transition:
          'left var(--q-duration-short) var(--q-easing-standard), width var(--q-duration-short) var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--not-scrollable.q-tabs__arrows--outside`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--not-scrollable .q-tabs__arrow`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--not-scrollable .q-tabs__content`,
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow`,
        cursor: 'pointer',
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '32px',
        'min-width': '36px',
        'text-shadow': '0 0 3px #fff, 0 0 1px #fff, 0 0 1px #000',
        transition: 'opacity 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__offset`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-tabs__content`,
        'overflow-x': 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-tabs__arrow`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-tabs__arrow--left`,
        top: '0',
        left: '0 /* rtl:ignore */',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-tabs__arrow--right`,
        top: '0',
        right: '0 /* rtl:ignore */',
        bottom: '0'
      }
    }
  ],
  [
    /^q-tab$/,
    function* (_, { symbols }) {
      // .q-tab
      // AUD-024 fold: two yields targeted `.q-tab`, one now. The port's layout and
      // cursor declarations stay; dist's literal box and transition win where the
      // two overlapped (the token pair was losing that cascade already).
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        cursor: 'pointer',
        'user-select': 'none',
        // quasar: dist states the tab's box and transition literally.
        'padding-inline': '16px',
        'padding-block': '0',
        'text-decoration': 'none',
        'min-height': '48px',
        'white-space': 'nowrap',
        transition: 'color 0.3s, background-color 0.3s',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--active .q-tab__indicator`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inactive`,
        opacity: '0.85'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--full`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '72px',
        height: '72px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-caps`,
        'text-transform': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-badge`,
        top: '3px',
        right: '-12px'
      }
      yield {
        // The focus helper is inset to match the indicator pill, not the tab.
        [symbols.selector]: (selector) => `${selector} > .q-focus-helper`,
        'border-radius': 'var(--shape-corner-large) !important',
        height: 'calc(80%) !important',
        width: 'calc(80%) !important',
        top: 'calc(10%) !important',
        left: 'calc(10%) !important',
        position: 'absolute !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inactive`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: 0.4,
        cursor: 'not-allowed'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.5em',
        'margin-right': 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        'font-size': 'var(--q-size-icon)',
        width: '24px',
        height: '24px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.875em',
        'font-weight': 500
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'font-size': 'var(--q-label-large-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.715em',
        'font-weight': 'var(--fontWeight-medium)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__indicator`,
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__indicator`,
        'border-radius': 'var(--radius-2xl)',
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--q-bg-opacity), transparent)',
        opacity: '0%',
        width: '56px',
        height: '32px',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': 'unset',
        left: 'calc(50% - 28px)',
        top: '0.5em',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'padding-inline': '0',
        'padding-block': 'var(--q-space-xs)',
        'min-width': '40px',
        height: 'inherit',
        position: 'relative',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content .q-chip--floating`,
        top: '0',
        right: '-16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content--inline .q-tab__icon + .q-tab__label`,
        'padding-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__alert`,
        'border-radius': '50%',
        'background-color': 'currentColor',
        height: '10px',
        width: '10px',
        top: '7px',
        right: '-9px',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__alert-icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '18px',
        top: '2px',
        right: '-12px',
        position: 'absolute'
      }
    }
  ],
  [
    /^mobile$/,
    function* (_, { symbols }) {
      // .mobile
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-tabs--scrollable.q-tabs--mobile-without-arrows.q-tabs__arrows--outside`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__arrow`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content`,
        'border-radius': 'inherit'
      }
    }
  ]
] as Rule[]
