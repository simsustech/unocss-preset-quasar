import type { Rule } from '@unocss/core'

export const drawerRules = [
  [
    /^q-drawer$/,
    function* (_, { symbols }) {
      // .q-drawer
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
        // The drawer's width is not an inline `width`: QDrawer's own runtime
        // writes `--q-drawer-width` as a custom property on the element
        // (`quasar.client.js`, `"--q-drawer-width": `${size.value}px``), and
        // quasar.css binds it here. The preset replaces quasar.css, so it has
        // to make the same binding — without it the drawer has no width and
        // collapses to its content, whatever `width` prop was passed.
        width: 'var(--q-drawer-width)',
        'z-index': '1000'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'border-color': 'rgba(255, 255, 255, 0.28)',
        'background-color': 'var(--q-surface-container-low)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__content .q-list > .q-router-link--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__content .q-list .q-router-link--active`,
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--left`,
        transform: 'translateX(-100%)',
        left: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--left .q-layout__shadow:after`,
        right: '10px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--left .q-layout__shadow`,
        left: '10px',
        right: '-10px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--left.q-drawer--bordered`,
        'border-right': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--right`,
        transform: 'translateX(100%)',
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--right .q-layout__shadow:after`,
        left: '10px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--right .q-layout__shadow`,
        left: '-10px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--right.q-drawer--bordered`,
        'border-left': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        height: '100%',
        'overflow-y': 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'padding-block': '14px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > *`,
        'padding-inline': '28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > .q-list`,
        'padding-inline': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content > .q-scrollarea`,
        'padding-inline': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content .q-list .q-item`,
        'border-radius': '32px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content .q-list > .q-router-link--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content .q-list .q-router-link--active`,
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--on-top`,
        'z-index': '7000'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini .q-mini-drawer-hide`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini .q-expansion-item__content`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--mini`,
        'border-radius': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--mini .q-tab__label`,
        'font-size': 'var(--q-body-small-size)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini .q-tabs--vertical .q-tab`,
        'padding-inline': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini > .q-drawer__content`,
        'padding-block': '9px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini > .q-drawer__content > *`,
        'padding-inline': '4px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini-animate .q-drawer__content`,
        'overflow-x': 'hidden !important',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-mini-drawer-only`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mobile .q-mini-drawer-only`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mobile .q-mini-drawer-hide`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--mobile`,
        'border-start-end-radius': 'var(--q-corner-large)',
        'border-end-end-radius': 'var(--q-corner-large)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__backdrop`,
        'z-index': '6999',
        'will-change': 'background-color'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__opener`,
        'z-index': '2001',
        height: '100%',
        width: '15px',
        'user-select': 'none',
        '-webkit-user-select': 'none'
      }
    }
  ],
  [
    /^q-drawer-container$/,
    function* (_, { symbols }) {
      // .q-drawer-container
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.q-drawer--mini-animate) .q-drawer--mini`,
        padding: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item`,
        'text-align': 'center',
        'justify-content': 'center',
        'padding-left': '0',
        'padding-right': '0',
        'min-width': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section`,
        'text-align': 'center',
        'justify-content': 'center',
        'padding-left': '0',
        'padding-right': '0',
        'min-width': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__label`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section--main`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section--side ~ .q-item__section--side`,
        display: 'none'
      }
    }
  ]
] as Rule[]
