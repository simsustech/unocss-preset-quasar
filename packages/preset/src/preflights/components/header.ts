import type { Preflight } from '@unocss/core'

/**
 * header component styles — auto-generated from quasar.css.
 * Contains all .q-header selector blocks (variants, states, pseudo-elements).
 */
export const headerComponentPreflight: Preflight = {
  getCSS: () => `.q-header--hidden {
  transform: translateY(-110%);
}

.q-header--bordered {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.q-header .q-layout__shadow {
  bottom: -10px;
}

.q-header .q-layout__shadow:after {
  bottom: 10px;
}

.q-header, .q-footer {
  z-index: 2000;
}

body.body--dark .q-header, body.body--dark .q-footer, body.body--dark .q-drawer {
  border-color: rgba(255, 255, 255, 0.28);
}

`
}
