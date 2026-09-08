import type { Preflight } from '@unocss/core'

/**
 * item component styles — auto-generated from quasar.css.
 * Contains all .q-item selector blocks (variants, states, pseudo-elements).
 */
export const itemComponentPreflight: Preflight = {
  getCSS: () => `.q-item__section--main ~ .q-expansion-item__icon-section {
  min-width: 0;
}

.q-item {
  min-height: 48px;
  padding: 8px 16px;
  color: inherit;
  transition: color 0.3s, background-color 0.3s;
}

.q-item__section--side {
  color: color-mix(in srgb, currentColor 54%, transparent);
  align-items: flex-start;
  padding-right: 16px;
  width: auto;
  min-width: 0;
  max-width: 100%;
}

.q-item__section--side > .q-icon {
  font-size: 24px;
}

.q-item__section--side > .q-avatar {
  font-size: 40px;
}

.q-item__section--avatar {
  color: inherit;
  min-width: 56px;
}

.q-item__section--thumbnail img {
  width: 100px;
  height: 56px;
}

.q-item__section--nowrap {
  white-space: nowrap;
}

.q-item > .q-item__section--thumbnail:first-child,
.q-item > .q-focus-helper + .q-item__section--thumbnail {
  margin-left: -16px;
}

.q-item > .q-item__section--thumbnail:last-of-type {
  margin-right: -16px;
}

.q-item__label {
  line-height: 1.2em !important;
  max-width: 100%;
}

.q-item__label--overline {
  color: color-mix(in srgb, currentColor 70%, transparent);
}

.q-item__label--caption {
  color: color-mix(in srgb, currentColor 54%, transparent);
}

.q-item__label--header {
  color: color-mix(in srgb, currentColor 54%, transparent);
  padding: 16px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.01786em;
}

.q-item__label + .q-item__label {
  margin-top: 4px;
}

.q-item__section--main {
  width: auto;
  min-width: 0;
  max-width: 100%;
  flex: 10000 1 0%;
}

.q-item__section--main + .q-item__section--main {
  margin-left: 8px;
}

.q-item__section--main ~ .q-item__section--side {
  align-items: flex-end;
  padding-right: 0;
  padding-left: 16px;
}

.q-item__section--main.q-item__section--thumbnail {
  margin-left: 0;
  margin-right: -16px;
}

.q-item {
  position: relative;
}

.q-item.q-router-link--active, .q-item--active {
  color: var(--q-primary);
}

`
}
