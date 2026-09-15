import type { Rule } from '@unocss/core'

export const drawerRules = [
  [
    /^q-drawer$/,
    () => ({
      position: 'fixed',
      top: '0',
      bottom: '0',
      width: '300px',
      'background-color': 'var(--q-surface)',
      'box-shadow': 'var(--q-elevation-3)',
      'z-index': '1000'
    })
  ],
  [
    /^q-drawer--left$/,
    () => ({
      left: '0'
    })
  ],
  [
    /^q-drawer--right$/,
    () => ({
      right: '0'
    })
  ],
  [
    /^q-drawer__content$/,
    () => ({
      height: '100%',
      'overflow-y': 'auto'
    })
  ],
  [
    /^q-drawer--left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-drawer--left .q-layout__shadow:after`,
        right: '10px'
      }
    }
  ],
  [
    /^q-drawer--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-drawer--right .q-layout__shadow:after`,
        left: '10px'
      }
    }
  ],
  [
    /^q-drawer--on-top$/,
    function* () {
      yield { 'z-index': '3000' }
    }
  ],
  [
    /^q-drawer-container$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-drawer--mini-animate) .q-drawer--mini`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item`,
        'text-align': 'center',
        'justify-content': 'center',
        'padding-left': '0',
        'padding-right': '0',
        'min-width': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section`,
        'text-align': 'center',
        'justify-content': 'center',
        'padding-left': '0',
        'padding-right': '0',
        'min-width': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__label`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section--main`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section--side ~ .q-item__section--side`,
        display: 'none'
      }
    }
  ],
  [
    /^q-drawer--mini$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-mini-drawer-hide`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-expansion-item__content`,
        display: 'none'
      }
    }
  ],
  [
    /^q-drawer--mini-animate$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-drawer__content`,
        'overflow-x': 'hidden !important',
        'white-space': 'nowrap'
      }
    }
  ],
  [
    /^q-drawer--standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-mini-drawer-only`,
        display: 'none'
      }
    }
  ],
  [
    /^q-drawer--mobile$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-mini-drawer-only`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-mini-drawer-hide`,
        display: 'none'
      }
    }
  ],
  [
    /^q-drawer__backdrop$/,
    function* () {
      yield { 'z-index': '2999 !important', 'will-change': 'background-color' }
    }
  ],
  [
    /^q-drawer__opener$/,
    function* () {
      yield {
        'z-index': '2001',
        height: '100%',
        width: '15px',
        'user-select': 'none',
        '-webkit-user-select': 'none'
      }
    }
  ]
] as Rule[]
