import type { Preflight } from '@unocss/core'

/**
 * img component styles — auto-generated from quasar.css.
 * Contains all .q-img selector blocks (variants, states, pseudo-elements).
 */
export const imgComponentPreflight: Preflight = {
  getCSS: () => `.q-img {
  position: relative;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}

.q-img__loading .q-spinner {
  font-size: 50px;
}

.q-img__container {
  border-radius: inherit;
  font-size: 0;
}

.q-img__image {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.q-img__image--with-transition {
  transition: opacity 0.28s ease-in;
}

.q-img__image--loaded {
  opacity: 1;
}

.q-img__content {
  border-radius: inherit;
  pointer-events: none;
}

.q-img__content > div {
  pointer-events: all;
  position: absolute;
  padding: 16px;
  color: #fff;
  background: rgba(0, 0, 0, 0.47);
}

.q-img--no-menu .q-img__image,
.q-img--no-menu .q-img__placeholder {
  pointer-events: none;
}

`
}
