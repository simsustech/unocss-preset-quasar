import type { Preflight } from '@unocss/core'

/**
 * radio component styles — auto-generated from quasar.css.
 * Contains all .q-radio selector blocks (variants, states, pseudo-elements).
 */
export const radioComponentPreflight: Preflight = {
  getCSS: () => `.q-radio {
  vertical-align: middle;
}

.q-radio__native {
  width: 1px;
  height: 1px;
}

.q-radio__bg, .q-radio__icon-container {
  user-select: none;
  -webkit-user-select: none;
}

.q-radio__bg {
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.q-radio__bg path {
  fill: currentColor;
}

.q-radio__icon {
  color: currentColor;
  font-size: 0.5em;
}

.q-radio__check {
  transform-origin: 50% 50%;
  transform: scale3d(0, 0, 1);
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.q-radio__inner {
  font-size: 40px;
  width: 1em;
  min-width: 1em;
  height: 1em;
  outline: 0;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.54);
}

.q-radio__inner--truthy {
  color: var(--q-primary);
}

.q-radio__inner--truthy .q-radio__check {
  transform: scale3d(1, 1, 1);
}

.q-radio.disabled {
  opacity: 0.75 !important;
}

.q-radio--dark .q-radio__inner {
  color: rgba(255, 255, 255, 0.7);
}

.q-radio--dark .q-radio__inner:before {
  opacity: 0.32 !important;
}

.q-radio--dark .q-radio__inner--truthy {
  color: var(--q-primary);
}

.q-radio--dense .q-radio__inner {
  width: 0.5em;
  min-width: 0.5em;
  height: 0.5em;
}

.q-radio--dense .q-radio__bg {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.q-radio--dense .q-radio__label {
  padding-left: 0.5em;
}

.q-radio--dense.reverse .q-radio__label {
  padding-left: 0;
  padding-right: 0.5em;
}

.q-radio:not(.disabled) .q-radio__inner:before {
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
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.q-radio:not(.disabled):focus-visible .q-radio__inner:before {
  transform: scale3d(1, 1, 1);
}

.q-radio--dense:not(.disabled):focus-visible .q-radio__inner:before {
  transform: scale3d(1.5, 1.5, 1);
}

`
}
