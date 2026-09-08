import type { Preflight } from '@unocss/core'

/**
 * menu component styles — auto-generated from quasar.css.
 * Contains all .q-menu selector blocks (variants, states, pseudo-elements).
 */
export const menuComponentPreflight: Preflight = {
  getCSS: () => `.q-menu {
  position: fixed !important;
  display: inline-block;
  width: max-content;
  max-width: 95vw;
  max-height: 65vh;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  background: #fff;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 0;
  z-index: 6000;
}

.q-menu--square {
  border-radius: 0;
}

.q-menu--dark {
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}

body.electron .q-menu, body.electron .q-dialog__inner > *, body.electron .q-notification, body.electron .q-tooltip {
  -webkit-app-region: no-drag;
}

`
}
