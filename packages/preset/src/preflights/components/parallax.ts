import type { Preflight } from '@unocss/core'

/**
 * parallax component styles — auto-generated from quasar.css.
 * Contains all .q-parallax selector blocks (variants, states, pseudo-elements).
 */
export const parallaxComponentPreflight: Preflight = {
  getCSS: () => `.q-parallax {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
}

.q-parallax__media > img, .q-parallax__media > video {
  position: absolute;
  left: 50% /* rtl:ignore */;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  will-change: transform;
  display: none;
}

`
}
