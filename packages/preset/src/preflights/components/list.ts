import type { Preflight } from '@unocss/core'

/**
 * list component styles — auto-generated from quasar.css.
 * Contains all .q-list selector blocks (variants, states, pseudo-elements).
 */
export const listComponentPreflight: Preflight = {
  getCSS: () => `.q-list--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-list--separator > .q-item-type + .q-item-type,
.q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.q-list--padding {
  padding: 8px 0;
}

.q-list--dense > .q-item, .q-item--dense {
  min-height: 32px;
  padding: 2px 16px;
}

.q-list--dark.q-list--separator > .q-item-type + .q-item-type,
.q-list--dark.q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type {
  border-top-color: rgba(255, 255, 255, 0.28);
}

.q-list--dark, .q-item--dark {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.28);
}

.q-list--dark .q-item__section--side:not(.q-item__section--avatar), .q-item--dark .q-item__section--side:not(.q-item__section--avatar) {
  color: color-mix(in srgb, currentColor 70%, transparent);
}

.q-list--dark .q-item__label--header, .q-item--dark .q-item__label--header {
  color: color-mix(in srgb, currentColor 64%, transparent);
}

.q-list--dark .q-item__label--overline, .q-list--dark .q-item__label--caption, .q-item--dark .q-item__label--overline, .q-item--dark .q-item__label--caption {
  color: color-mix(in srgb, currentColor 80%, transparent);
}

`
}
