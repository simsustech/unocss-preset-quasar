import type { Preflight } from '@unocss/core'

/**
 * knob component styles — auto-generated from quasar.css.
 * Contains all .q-knob selector blocks (variants, states, pseudo-elements).
 */
export const knobComponentPreflight: Preflight = {
  getCSS: () => `.q-knob {
  font-size: 48px;
}

.q-knob--editable {
  cursor: pointer;
  outline: 0;
}

.q-knob--editable:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.24s ease-in-out;
}

.q-knob--editable:focus:before {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

body.body--dark .q-knob--editable:focus:before {
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}

`
}
