import type { Rule } from '@unocss/core'

export const drawerRules = [
  [
    /^q-drawer$/,
    function* (_, { symbols }) {
      yield {
        // Reference: `border-start-end-radius: var(--shape-corner-large);
        // border-end-end-radius: …; background-color: …surface-container-low;
        // top: 0; bottom: 0; position: absolute; z-index: 1000`.
        // The rewrite pinned `position: fixed; width: 300px; box-shadow:
        // elevation-3`, which overrode the width Quasar sets inline from the
        // drawer's `width` prop and floated the drawer over the page content.
        'border-start-end-radius': 'var(--q-corner-large)',
        'border-end-end-radius': 'var(--q-corner-large)',
        'background-color': 'var(--q-surface-container-low)',
        top: '0',
        bottom: '0',
        position: 'absolute',
        'z-index': '1000'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'border-color': 'rgba(255, 255, 255, 0.28)',
        'background-color': 'var(--q-surface-container-low)'
      }
    }
  ],
  [
    /^q-drawer--left$/,
    () => ({
      transform: 'translateX(-100%)',
      left: '0'
    })
  ],
  [
    /^q-drawer--right$/,
    () => ({
      transform: 'translateX(100%)',
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
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow:after`,
        right: '10px'
      }
    }
  ],
  [
    /^q-drawer--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow:after`,
        left: '10px'
      }
    }
  ],
  [
    /^q-drawer--on-top$/,
    function* () {
      // Reference: 7000 (above the drawer container's 3000 stack).
      yield { 'z-index': '7000' }
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
      yield { 'z-index': '6999', 'will-change': 'background-color' }
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
  ],
  // Dark: active router links inside the drawer's list take primary, and the
  // deeper descendant scope uses the secondary container as a row fill.
  [
    /^q-drawer$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__content .q-list > .q-router-link--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__content .q-list .q-router-link--active`,
        'background-color': 'var(--q-secondary-container)'
      }
    }
  ],
  // --- Reference parity: layout offsets, borders and content padding ---
  [
    /^q-drawer$/,
    function* (_, { symbols }) {
      // The unstyled style entry drops the drawer's surface.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-drawer--left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow`,
        left: '10px',
        right: '-10px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-drawer--bordered`,
        'border-right': '1px solid rgba(0, 0, 0, 0.12)'
      }
    }
  ],
  [
    /^q-drawer--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout__shadow`,
        left: '-10px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-drawer--bordered`,
        'border-left': '1px solid rgba(0, 0, 0, 0.12)'
      }
    }
  ],
  [
    /^q-drawer--mini$/,
    function* (_, { symbols }) {
      yield { 'border-radius': '0 !important' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tab__label`,
        'font-size': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-tabs--vertical .q-tab`,
        'padding-inline': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-drawer__content`,
        'padding-block': '9px !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-drawer__content > *`,
        'padding-inline': '4px !important'
      }
    }
  ],
  [
    /^q-drawer--mobile$/,
    () => ({
      'border-start-end-radius': 'var(--q-corner-large)',
      'border-end-end-radius': 'var(--q-corner-large)'
    })
  ],
  [
    /^q-drawer__content$/,
    function* (_, { symbols }) {
      yield { 'padding-block': '14px' }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        'padding-inline': '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-list`,
        'padding-inline': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-scrollarea`,
        'padding-inline': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-list .q-item`,
        'border-radius': '32px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-list > .q-router-link--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-list .q-router-link--active`,
        'background-color': 'var(--q-secondary-container)'
      }
    }
  ]
] as Rule[]
