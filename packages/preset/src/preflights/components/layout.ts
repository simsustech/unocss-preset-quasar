import type { Preflight } from '@unocss/core'

/**
 * layout component styles — auto-generated from quasar.css.
 * Contains all .q-layout selector blocks (variants, states, pseudo-elements).
 */
export const layoutComponentPreflight: Preflight = {
  getCSS: () => `.q-layout {
  width: 100%;
  outline: 0;
}

.q-layout-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.q-layout-container .q-layout {
  min-height: 100%;
}

.q-layout-container > div {
  transform: translate3d(0, 0, 0);
}

.q-layout-container > div > div {
  min-height: 0;
  max-height: 100%;
}

.q-layout__shadow {
  width: 100%;
}

.q-layout__shadow:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2), 0 0px 10px rgba(0, 0, 0, 0.24);
}

.q-layout__section--marginal {
  background-color: var(--q-primary);
  color: #fff;
}

.q-layout, .q-header, .q-footer, .q-page {
  position: relative;
}

body.body--dark .q-layout__shadow:after {
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2), 0 0px 10px rgba(255, 255, 255, 0.24);
}

body.platform-ios .q-layout--containerized {
  position: unset !important;
}

`
}
