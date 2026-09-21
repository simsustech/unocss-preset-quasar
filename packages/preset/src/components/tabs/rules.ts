import type { Rule } from '@unocss/core'

export const tabsRules = [
  [
    /^q-tabs$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      // Reference: `flex: 0 1 auto !important; transition: color 0.3s,
      // background-color 0.3s; position: relative`.
      flex: '0 1 auto !important',
      transition: 'color 0.3s, background-color 0.3s',
      position: 'relative'
    })
  ],
  [
    /^q-tabs--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-tabs--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab`,
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab--full`,
        'min-height': '52px'
      }
    }
  ],
  [
    /^q-tabs--vertical$/,
    function* (_, { symbols }) {
      yield {
        // Reference: the rail swaps the flex track for a block box; without
        // `display: block !important` the base `display: flex` won and the rail
        // rendered horizontally.
        height: '100%',
        display: 'block !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab`,
        'padding-inline': '8px',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab__indicator`,
        height: 'unset',
        width: '2px',
        'min-height': '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs--dense .q-tab__content`,
        'min-width': '24px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--not-scrollable .q-tabs__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow`,
        'text-align': 'center',
        width: '100%',
        height: '36px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow--left`,
        top: '0',
        left: '0',
        right: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow--right`,
        left: '0',
        right: '0',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__content`,
        height: '100%',
        display: 'block !important'
      }
    }
  ],
  [
    /^q-tabs--scrollable$/,
    function* (_, { symbols }) {
      yield {
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-tabs__arrows--inside .q-tabs__arrow--faded`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-tabs__arrows--outside .q-tabs__arrow--faded`,
        opacity: '30%',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-tabs__arrows--outside.q-tabs--horizontal`,
        'padding-left': '36px',
        'padding-right': '36px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-tabs__arrows--outside.q-tabs--vertical`,
        'padding-top': '36px',
        'padding-bottom': '36px'
      }
    }
  ],
  [
    /^q-tabs__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      flex: '1 1 auto',
      // Reference: `flex: 1 1 auto; overflow: hidden` (scrolling is driven by
      // the arrow controls, not by an overflow scroller).
      overflow: 'hidden'
    })
  ],
  [
    /^q-tabs__content--align-center$/,
    () => ({
      'justify-content': 'center'
    })
  ],
  [
    /^q-tabs__content--align-justify$/,
    function* (_, { symbols }) {
      yield {
        'justify-content': 'space-between'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab`,
        flex: '1 1 auto'
      }
    }
  ],
  [
    /^q-tabs__content--align-left$/,
    () => ({
      'justify-content': 'flex-start'
    })
  ],
  [
    /^q-tabs__content--align-right$/,
    () => ({
      'justify-content': 'flex-end'
    })
  ],
  [
    /^q-tabs__indicator$/,
    () => ({
      position: 'absolute',
      bottom: 0,
      height: '2px',
      'background-color': 'var(--q-primary)',
      transition:
        'left var(--q-duration-short) var(--q-easing-standard), width var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tab$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        padding: 'var(--q-space-sm) var(--q-space-md)',
        'min-height': 'var(--q-item-min-height)',
        cursor: 'pointer',
        'user-select': 'none',
        transition: 'color var(--q-duration-short) var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        'padding-inline': '16px',
        'padding-block': '0',
        'text-decoration': 'none',
        'min-height': '48px',
        'white-space': 'nowrap',
        transition: 'color 0.3s, background-color 0.3s',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--active .q-tab__indicator`,
        opacity: '100%'
      }
      yield { [symbols.selector]: (sel) => `${sel}--inactive`, opacity: '0.85' }
      yield {
        [symbols.selector]: (sel) => `${sel}--full`,
        'min-height': '72px',
        height: '72px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--no-caps`,
        'text-transform': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-badge`,
        top: '3px',
        right: '-12px'
      }
      yield {
        // The focus helper is inset to match the indicator pill, not the tab.
        [symbols.selector]: (sel) => `${sel} > .q-focus-helper`,
        'border-radius': 'var(--shape-corner-large) !important',
        height: 'calc(80%) !important',
        width: 'calc(80%) !important',
        top: 'calc(10%) !important',
        left: 'calc(10%) !important',
        position: 'absolute !important'
      }
    }
  ],
  [
    /^q-tab--active$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-tab--inactive$/,
    () => ({
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-tab--disabled$/,
    () => ({
      opacity: 0.4,
      cursor: 'not-allowed'
    })
  ],
  [
    /^q-tab__icon$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '1.5em',
        'margin-right': 'var(--q-space-xs)'
      }
      yield {
        'font-size': '24px',
        width: '24px',
        height: '24px'
      }
    }
  ],
  [
    /^q-tab__label$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '0.875em',
        'font-weight': 500
      }
      yield {
        'font-size': '14px',
        'line-height': '1.715em',
        'font-weight': 'var(--fontWeight-medium)'
      }
    }
  ],
  [
    /^q-tabs--not-scrollable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}.q-tabs__arrows--outside`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__content`,
        'border-radius': 'inherit'
      }
    }
  ],
  [
    /^mobile$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--scrollable.q-tabs--mobile-without-arrows.q-tabs__arrows--outside`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__arrow`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content`,
        'border-radius': 'inherit'
      }
    }
  ],
  [
    /^q-tabs__arrow$/,
    function* () {
      yield {
        cursor: 'pointer',
        'font-size': '32px',
        'min-width': '36px',
        'text-shadow': '0 0 3px #fff, 0 0 1px #fff, 0 0 1px #000',
        transition: 'opacity 0.3s'
      }
    }
  ],
  [
    /^q-tabs__offset$/,
    function* () {
      yield { display: 'none' }
    }
  ],
  [
    /^q-tabs--horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__content`,
        'overflow-x': 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow--left`,
        top: '0',
        left: '0 /* rtl:ignore */',
        bottom: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow--right`,
        top: '0',
        right: '0 /* rtl:ignore */',
        bottom: '0'
      }
    }
  ],
  [
    /^q-tab__indicator$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        'border-radius': 'var(--radius-2xl)',
        'background-color':
          'color-mix(in oklab, var(--q-secondary-container) var(--un-bg-opacity), transparent)',
        opacity: '0%',
        width: '56px',
        height: '32px',
        'min-height': 'unset',
        left: 'calc(50% - 28px)',
        top: '0.5em',
        position: 'absolute'
      }
    }
  ],

  [
    /^q-tab__content$/,
    function* (_, { symbols }) {
      yield {
        'padding-inline': '0',
        'padding-block': '4px',
        'min-width': '40px',
        height: 'inherit',
        position: 'relative',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip--floating`,
        top: '0',
        right: '-16px'
      }
    }
  ],
  [
    /^q-tab__content--inline$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab__icon + .q-tab__label`,
        'padding-left': '8px'
      }
    }
  ],
  [
    /^q-tab__alert$/,
    () => ({
      'border-radius': '50%',
      'background-color': 'currentColor',
      height: '10px',
      width: '10px',
      top: '7px',
      right: '-9px',
      position: 'absolute'
    })
  ],
  [
    /^q-tab__alert-icon$/,
    () => ({
      'font-size': '18px',
      top: '2px',
      right: '-12px',
      position: 'absolute'
    })
  ]
] as Rule[]
