import type { Rule } from '@unocss/core'

export const tabsRules = [
  [
    /^q-tabs$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
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
    () => ({
      // Dense padding
    })
  ],
  [
    /^q-tabs--vertical$/,
    () => ({
      'flex-direction': 'column'
    })
  ],
  [
    /^q-tabs--scrollable$/,
    () => ({
      overflow: 'hidden'
    })
  ],
  [
    /^q-tabs__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'overflow-x': 'auto',
      flex: '1 1 auto'
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
    () => ({
      'justify-content': 'space-between'
    })
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
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: 'var(--q-space-sm) var(--q-space-md)',
      'min-height': 'var(--q-item-min-height)',
      cursor: 'pointer',
      'user-select': 'none',
      transition: 'color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tab--active$/,
    () => ({
      color: 'var(--q-primary)'
    })
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
    () => ({
      'font-size': '1.5em',
      'margin-right': 'var(--q-space-xs)'
    })
  ],
  [
    /^q-tab__label$/,
    () => ({
      'font-size': '0.875em',
      'font-weight': 500
    })
  ][
    (/^q-tabs--not-scrollable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}.q-tabs__arrows--outside`,
        paddingLeft: '0',
        paddingRight: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__arrow`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs__content`,
        borderRadius: 'inherit'
      }
    })
  ],
  [
    /^mobile$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--scrollable.q-tabs--mobile-without-arrows.q-tabs__arrows--outside`,
        paddingLeft: '0',
        paddingRight: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__arrow`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content`,
        borderRadius: 'inherit'
      }
    }
  ],
  [
    /^q-tabs__arrow$/,
    function* () {
      yield {
        cursor: 'pointer',
        fontSize: '32px',
        minWidth: '36px',
        textShadow: '0 0 3px #fff, 0 0 1px #fff, 0 0 1px #000',
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
        overflowX: 'auto'
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
  ]
] as Rule[]
