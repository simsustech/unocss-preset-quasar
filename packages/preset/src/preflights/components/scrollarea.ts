import type { Preflight } from '@unocss/core'

/**
 * scrollarea component styles — auto-generated from quasar.css.
 * Contains all .q-scrollarea selector blocks (variants, states, pseudo-elements).
 */
export const scrollareaComponentPreflight: Preflight = {
  getCSS: () => `.q-scrollarea {
  position: relative;
  contain: size;
  overflow: clip;
  display: flow-root;
}

.q-scrollarea__bar, .q-scrollarea__thumb {
  opacity: 0.2;
  transition: opacity 0.3s;
  will-change: opacity;
  cursor: grab;
}

.q-scrollarea__bar--v, .q-scrollarea__thumb--v {
  right: 0;
  width: 10px;
}

.q-scrollarea__bar--h, .q-scrollarea__thumb--h {
  bottom: 0;
  height: 10px;
}

.q-scrollarea__bar--invisible, .q-scrollarea__thumb--invisible {
  opacity: 0 !important;
  pointer-events: none;
}

.q-scrollarea__thumb {
  background: #000;
  border-radius: 3px;
}

.q-scrollarea__thumb:hover {
  opacity: 0.3;
}

.q-scrollarea__thumb:active {
  opacity: 0.5;
}

.q-scrollarea__content {
  min-height: 100%;
  min-width: 100%;
}

.q-scrollarea--dark .q-scrollarea__thumb {
  background: #fff;
}

`
}
