import type { Preflight } from '@unocss/core'

/**
 * ripple component styles — auto-generated from quasar.css.
 * Contains all .q-ripple selector blocks (variants, states, pseudo-elements).
 */
export const rippleComponentPreflight: Preflight = {
  getCSS: () => `.q-ripple {
  position: absolute;
  top: 0;
  left: 0 /* rtl:ignore */;
  width: 100%;
  height: 100%;
  color: inherit;
  border-radius: inherit;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  contain: strict;
}

.q-ripple__inner {
  position: absolute;
  top: 0;
  left: 0 /* rtl:ignore */;
  opacity: 0;
  color: inherit;
  border-radius: 50%;
  background: currentColor;
  pointer-events: none;
  will-change: transform, opacity;
}

.q-ripple__inner--enter {
  transition: transform 0.225s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-ripple__inner--leave {
  transition: transform 0.225s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

`
}
