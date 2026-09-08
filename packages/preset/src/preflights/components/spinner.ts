import type { Preflight } from '@unocss/core'

/**
 * spinner component styles — auto-generated from quasar.css.
 * Contains all .q-spinner selector blocks (variants, states, pseudo-elements).
 */
export const spinnerComponentPreflight: Preflight = {
  getCSS: () => `.q-spinner {
  vertical-align: middle;
  content-visibility: auto;
}

.q-spinner-mat .path {
  stroke-dasharray: 1, 200 /* rtl:ignore */;
  stroke-dashoffset: 0 /* rtl:ignore */;
  transform-origin: 25px 25px;
  animation: q-spin 2s linear infinite, q-mat-dash 1.5s ease-in-out infinite;
}

.q-spinner-comment circle:nth-of-type(1) {
  animation: q-comment-typing1 1s linear infinite;
}

.q-spinner-comment circle:nth-of-type(2) {
  animation: q-comment-typing2 1s linear infinite;
}

.q-spinner-comment circle:nth-of-type(3) {
  animation: q-comment-typing3 1s linear infinite;
}

.q-spinner-dots circle {
  animation: q-dots-pulse 0.8s linear infinite;
}

.q-spinner-grid circle {
  animation: q-grid-fade 1s linear infinite;
}

.q-spinner-hearts path[fill-opacity] {
  animation: q-hearts-pulse 1.4s linear infinite;
}

.q-spinner-infinity path {
  animation: q-infinity-dash 2s linear infinite;
}

.q-spinner-ios line {
  animation: q-ios-fade 750ms linear infinite;
}

.q-spinner-puff circle {
  animation: q-puff-expand 1.8s cubic-bezier(0.165, 0.84, 0.44, 1) infinite, q-puff-fade 1.8s cubic-bezier(0.3, 0.61, 0.355, 1) infinite;
}

.q-spinner-radio g > * {
  animation: q-radio-fade 1s linear infinite;
}

.q-spinner-rings circle {
  animation: q-rings-expand 3s linear infinite;
}

.q-spinner-rings circle:nth-of-type(3) {
  animation: q-rings-center 1.5s linear infinite;
}

`
}
