import type { Preflight } from '@unocss/core'

/**
 * loading component styles — auto-generated from quasar.css.
 * Contains all .q-loading selector blocks (variants, states, pseudo-elements).
 */
export const loadingComponentPreflight: Preflight = {
  getCSS: () => `.q-loading-bar {
  position: fixed;
  z-index: 9998;
  transition: transform 0.5s cubic-bezier(0, 0, 0.2, 1), opacity 0.5s;
  background: #f44336;
}

.q-loading-bar--top {
  left: 0 /* rtl:ignore */;
  right: 0 /* rtl:ignore */;
  top: 0;
  width: 100%;
}

.q-loading-bar--bottom {
  left: 0 /* rtl:ignore */;
  right: 0 /* rtl:ignore */;
  bottom: 0;
  width: 100%;
}

.q-loading-bar--right {
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
}

.q-loading-bar--left {
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}

.q-loading {
  color: #000;
  position: fixed !important;
}

.q-loading__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  z-index: -1;
  background-color: #000;
  transition: background-color 0.28s;
}

.q-loading__box {
  border-radius: 4px;
  padding: 18px;
  color: #fff;
  max-width: 450px;
}

.q-loading__message {
  margin: 40px 20px 0;
  text-align: center;
}

`
}
