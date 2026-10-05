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
        color: 'var(--q-item-active-color)' // md3: on-secondary-container
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__content .q-list .q-router-link--active`,
        'background-color': 'var(--q-secondary-container)'
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
        // quasar: this value is Quasar's own, not a forked token
        'padding-block': '14px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > *`,
        // quasar: this value is Quasar's own, not a forked token
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
        // quasar: this value is Quasar's own, not a forked token
        'border-radius': '32px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content .q-list > .q-router-link--active`,
        // md3 list spec (specs/reference/normalized/md3-lists.json):
        // label/selected_text_color_token = md.sys.color.on-secondary-container.
        // The background above is secondary-container, so primary text was a
        // token mismatch — this pairs with --q-item-active-bg like .q-item--active.
        color: 'var(--q-item-active-color)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content .q-list .q-router-link--active`,
        'background-color': 'var(--q-secondary-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--on-top`,
        // ADR 0007 (overlay layering scale): the overlay/mobile drawer sits
        // above the marginals (2000, opener 2001) and below the dialog/menu
        // tier (6000). 3000 is quasar.css's own value, so the ordering now
        // matches upstream.
        //
        // It has to clear the marginals: the drawer's box spans the full
        // viewport height — Md3Layout lays the shell out as `view="lHh …"`, so
        // Quasar skips the `top` offset it applies when the drawer is *not* in
        // the header row — and at 1500 both marginals painted over it. The app
        // bar covered the drawer's close button and the fixed bottom nav
        // covered its last nav item, neither of them reachable
        // (`tests/md3-layout.spec.ts` in the harness).
        //
        // It still has to stay under dialogs: the reference bundle's 7000 is
        // what consumers had to patch out with `!important`, because an open
        // drawer then covered their modals.
        'z-index': '3000'
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
        // quasar: this value is Quasar's own, not a forked token
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
        // quasar: this value is Quasar's own, not a forked token
        'padding-block': '9px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--mini > .q-drawer__content > *`,
        // quasar: this value is Quasar's own, not a forked token
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
        // ADR 0007: one step below the overlay drawer itself — quasar.css's
        // 2999 against its 3000 (the reference bundle says 6999 / 7000).
        //
        // `!important` is the reference's, not decoration. Quasar renders this
        // element with the `fullscreen` class as well (`.fullscreen` carries
        // `z-index: 6000`, faithfully ported in core/position/rules.ts), and both
        // selectors are one class, so without the flag the later `.fullscreen`
        // wins and the backdrop lands at 6000 — above the app bar at 2000 —
        // covering the header's controls whenever the drawer is open at mobile
        // width. Dropping the flag was the port gap; quasar.css is
        // `.q-drawer__backdrop { z-index: 2999 !important }`.
        'z-index': '2999 !important',
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
