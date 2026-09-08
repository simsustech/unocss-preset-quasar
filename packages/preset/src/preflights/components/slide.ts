import type { Preflight } from '@unocss/core'

/**
 * slide component styles — auto-generated from quasar.css.
 * Contains all .q-slide selector blocks (variants, states, pseudo-elements).
 */
export const slideComponentPreflight: Preflight = {
  getCSS: () => `.q-slide-item {
  position: relative;
  background: white;
}

.q-slide-item__left, .q-slide-item__right, .q-slide-item__top, .q-slide-item__bottom {
  visibility: hidden;
  font-size: 14px;
  color: #fff;
}

.q-slide-item__left .q-icon, .q-slide-item__right .q-icon, .q-slide-item__top .q-icon, .q-slide-item__bottom .q-icon {
  font-size: 1.714em;
}

.q-slide-item__left {
  background: #4caf50;
  padding: 8px 16px;
}

.q-slide-item__left > div {
  transform-origin: left center;
}

.q-slide-item__right {
  background: #ff9800;
  padding: 8px 16px;
}

.q-slide-item__right > div {
  transform-origin: right center;
}

.q-slide-item__top {
  background: #2196f3;
  padding: 16px 8px;
}

.q-slide-item__top > div {
  transform-origin: top center;
}

.q-slide-item__bottom {
  background: #9c27b0;
  padding: 16px 8px;
}

.q-slide-item__bottom > div {
  transform-origin: bottom center;
}

.q-slide-item__content {
  background: inherit;
  transition: transform 0.2s ease-in;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}

`
}
