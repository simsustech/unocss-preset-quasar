import type { Preflight } from '@unocss/core'

/**
 * infinite component styles — auto-generated from quasar.css.
 * Contains all .q-infinite selector blocks (variants, states, pseudo-elements).
 */
export const infiniteComponentPreflight: Preflight = {
  getCSS: () => `.q-infinite-scroll__sentinel {
  height: 1px;
  margin-top: -1px;
  pointer-events: none;
}

.q-infinite-scroll--reverse .q-infinite-scroll__sentinel {
  margin-top: 0;
  margin-bottom: -1px;
}

.q-infinite-scroll--no-anchoring {
  overflow-anchor: none;
}

`
}
