import type { Preflight } from '@unocss/core'

/**
 * expansion component styles — auto-generated from quasar.css.
 * Contains all .q-expansion selector blocks (variants, states, pseudo-elements).
 */
export const expansionComponentPreflight: Preflight = {
  getCSS: () => `.q-expansion-item__border {
  opacity: 0;
}

.q-expansion-item__toggle-icon {
  position: relative;
  transition: transform 0.3s;
}

.q-expansion-item__toggle-icon--rotated {
  transform: rotate(180deg);
}

.q-expansion-item__toggle-focus {
  width: 1em !important;
  height: 1em !important;
  position: relative !important;
}

.q-expansion-item__toggle-focus + .q-expansion-item__toggle-icon {
  margin-top: -1em;
}

.q-expansion-item__toggle-section--switched.q-item__section--side {
  min-width: 56px;
}

.q-expansion-item--standard.q-expansion-item--expanded > div > .q-expansion-item__border {
  opacity: 1;
}

.q-expansion-item--popup {
  transition: padding 0.5s;
}

.q-expansion-item--popup > .q-expansion-item__container {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-expansion-item--popup > .q-expansion-item__container > .q-separator {
  display: none;
}

.q-expansion-item--popup.q-expansion-item--collapsed {
  padding: 0 15px;
}

.q-expansion-item--popup.q-expansion-item--expanded {
  padding: 15px 0;
}

.q-expansion-item--popup.q-expansion-item--expanded + .q-expansion-item--popup.q-expansion-item--expanded {
  padding-top: 0;
}

.q-expansion-item--popup.q-expansion-item--collapsed:not(:first-child) > .q-expansion-item__container {
  border-top-width: 0;
}

.q-expansion-item--popup.q-expansion-item--expanded + .q-expansion-item--popup.q-expansion-item--collapsed > .q-expansion-item__container {
  border-top-width: 1px;
}

.q-expansion-item__content > .q-card {
  box-shadow: none;
  border-radius: 0;
}

.q-expansion-item:first-child > div > .q-expansion-item__border--top {
  opacity: 0;
}

.q-expansion-item:last-child > div > .q-expansion-item__border--bottom {
  opacity: 0;
}

.q-expansion-item--expanded + .q-expansion-item--expanded > div > .q-expansion-item__border--top {
  opacity: 0;
}

.q-expansion-item--expanded .q-textarea--autogrow textarea {
  animation: q-expansion-done 0s;
}

`
}
