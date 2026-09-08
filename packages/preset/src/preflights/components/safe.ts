import type { Preflight } from '@unocss/core'

/**
 * safe component styles — auto-generated from quasar.css.
 * Contains all .q-safe selector blocks (variants, states, pseudo-elements).
 */
export const safeComponentPreflight: Preflight = {
  getCSS: () => `body.q-safe-area-padding {
  --q-safe-area-inset-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));
  --q-safe-area-inset-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));
}

`
}
