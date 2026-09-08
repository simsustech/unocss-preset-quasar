import type { Preflight } from '@unocss/core'

/**
 * checkbox component styles — auto-generated from quasar.css.
 * Contains all .q-checkbox selector blocks (variants, states, pseudo-elements).
 */
export const checkboxComponentPreflight: Preflight = {
  getCSS: () => `.q-checkbox {
  vertical-align: middle;
}

.q-checkbox__native {
  width: 1px;
  height: 1px;
}

.q-checkbox__bg, .q-checkbox__icon-container {
  user-select: none;
  -webkit-user-select: none;
}

.q-checkbox__bg {
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  border: 2px solid currentColor;
  border-radius: 2px;
  transition: background 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.q-checkbox__icon {
  color: currentColor;
  font-size: 0.5em;
}

.q-checkbox__svg {
  color: #fff;
}

.q-checkbox__truthy {
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.78334;
  stroke-dasharray: 29.78334;
}

.q-checkbox__indet {
  fill: currentColor;
  transform-origin: 50% 50%;
  transform: rotate(-280deg) scale(0);
}

.q-checkbox__inner {
  font-size: 40px;
  width: 1em;
  min-width: 1em;
  height: 1em;
  outline: 0;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.54);
}

.q-checkbox__inner--truthy, .q-checkbox__inner--indet {
  color: var(--q-primary);
}

.q-checkbox__inner--truthy .q-checkbox__bg, .q-checkbox__inner--indet .q-checkbox__bg {
  background: currentColor;
}

.q-checkbox__inner--truthy path {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.18s cubic-bezier(0.4, 0, 0.6, 1) 0ms;
}

.q-checkbox__inner--indet .q-checkbox__indet {
  transform: rotate(0) scale(1);
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.q-checkbox.disabled {
  opacity: 0.75 !important;
}

.q-checkbox--dark .q-checkbox__inner {
  color: rgba(255, 255, 255, 0.7);
}

.q-checkbox--dark .q-checkbox__inner:before {
  opacity: 0.32 !important;
}

.q-checkbox--dark .q-checkbox__inner--truthy, .q-checkbox--dark .q-checkbox__inner--indet {
  color: var(--q-primary);
}

.q-checkbox--dense .q-checkbox__inner {
  width: 0.5em;
  min-width: 0.5em;
  height: 0.5em;
}

.q-checkbox--dense .q-checkbox__bg {
  left: 5%;
  top: 5%;
  width: 90%;
  height: 90%;
}

.q-checkbox--dense .q-checkbox__label {
  padding-left: 0.5em;
}

.q-checkbox--dense.reverse .q-checkbox__label {
  padding-left: 0;
  padding-right: 0.5em;
}

.q-checkbox:not(.disabled) .q-checkbox__inner:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.12;
  transform: scale3d(0, 0, 1);
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1);
}

.q-checkbox:not(.disabled):focus-visible .q-checkbox__inner:before {
  transform: scale3d(1, 1, 1);
}

.q-checkbox--dense:not(.disabled):focus-visible .q-checkbox__inner:before {
  transform: scale3d(1.4, 1.4, 1);
}

`
}
