import type { Preflight } from '@unocss/core'

/**
 * splitter component styles — auto-generated from quasar.css.
 * Contains all .q-splitter selector blocks (variants, states, pseudo-elements).
 */
export const splitterComponentPreflight: Preflight = {
  getCSS: () => `.q-splitter__panel {
  position: relative;
  z-index: 0;
}

.q-splitter__panel > .q-splitter {
  width: 100%;
  height: 100%;
}

.q-splitter__separator {
  background-color: rgba(0, 0, 0, 0.12);
  user-select: none;
  -webkit-user-select: none;
  position: relative;
  z-index: 1;
}

.q-splitter__separator:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.q-splitter__separator-area > * {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.q-splitter--dark .q-splitter__separator {
  background-color: rgba(255, 255, 255, 0.28);
}

.q-splitter--vertical > .q-splitter__panel {
  height: 100%;
}

.q-splitter--vertical.q-splitter--active {
  cursor: col-resize;
}

.q-splitter--vertical > .q-splitter__separator {
  width: 1px;
}

.q-splitter--vertical > .q-splitter__separator > div {
  left: -6px;
  right: -6px;
}

.q-splitter--vertical.q-splitter--workable > .q-splitter__separator {
  cursor: col-resize;
}

.q-splitter--horizontal > .q-splitter__panel {
  width: 100%;
}

.q-splitter--horizontal.q-splitter--active {
  cursor: row-resize;
}

.q-splitter--horizontal > .q-splitter__separator {
  height: 1px;
}

.q-splitter--horizontal > .q-splitter__separator > div {
  top: -6px;
  bottom: -6px;
}

.q-splitter--horizontal.q-splitter--workable > .q-splitter__separator {
  cursor: row-resize;
}

.q-splitter__before, .q-splitter__after {
  overflow: auto;
}

`
}
