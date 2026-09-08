import type { Preflight } from '@unocss/core'

/**
 * responsive component styles — auto-generated from quasar.css.
 * Contains all .q-responsive selector blocks (variants, states, pseudo-elements).
 */
export const responsiveComponentPreflight: Preflight = {
  getCSS: () => `.q-responsive {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.q-responsive__filler {
  width: inherit;
  max-width: inherit;
  height: inherit;
  max-height: inherit;
}

.q-responsive__content {
  border-radius: inherit;
}

.q-responsive__content > * {
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
}

`
}
