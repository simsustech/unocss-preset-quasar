import type { Preflight } from '@unocss/core'

/**
 * document component styles — auto-generated from quasar.css.
 * Contains all .q-document selector blocks (variants, states, pseudo-elements).
 */
export const documentComponentPreflight: Preflight = {
  getCSS: () => `.q-document--prevent-scroll {
  overscroll-behavior: none !important;
}

.q-document--clip-scroll {
  overflow: hidden !important;
}

.q-document--reserve-scrollbar {
  scrollbar-gutter: stable !important;
}

.q-document--pin-body body {
  position: fixed !important;
}

`
}
