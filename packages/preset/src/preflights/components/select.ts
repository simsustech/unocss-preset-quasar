import type { Preflight } from '@unocss/core'

/**
 * select component styles — auto-generated from quasar.css.
 * Contains all .q-select selector blocks (variants, states, pseudo-elements).
 */
export const selectComponentPreflight: Preflight = {
  getCSS: () => `.q-select {
  min-width: 0;
  max-width: 100%;
}

.q-select--without-input .q-field__control {
  cursor: pointer;
}

.q-select--with-input .q-field__control {
  cursor: text;
}

.q-select .q-field__input {
  min-width: 50px !important;
  cursor: text;
}

.q-select .q-field__input--padding {
  padding-left: 4px;
}

.q-select__focus-target, .q-select__autocomplete-input {
  position: absolute;
  outline: 0 !important;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  opacity: 0;
}

.q-select__dropdown-icon {
  cursor: pointer;
  transition: transform 0.28s;
}

.q-select.q-field--readonly .q-field__control, .q-select.q-field--readonly .q-select__dropdown-icon {
  cursor: default;
}

.q-select__dialog {
  width: 90vw !important;
  max-width: 90vw !important;
  max-height: calc(100vh - 70px) !important;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.q-select__dialog > .scroll {
  position: relative;
  background: inherit;
}

.q-select__dialog-close {
  color: var(--q-primary);
  background: transparent;
  align-self: stretch;
  border: 0;
  padding: 0 4px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

body.mobile:not(.native-mobile) .q-select__dialog {
  max-height: calc(100vh - 108px) !important;
}

`
}
