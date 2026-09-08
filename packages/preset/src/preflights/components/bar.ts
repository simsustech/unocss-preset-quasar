import type { Preflight } from '@unocss/core'

/**
 * bar component styles — auto-generated from quasar.css.
 * Contains all .q-bar selector blocks (variants, states, pseudo-elements).
 */
export const barComponentPreflight: Preflight = {
  getCSS: () => `.q-bar {
  background: rgba(0, 0, 0, 0.2);
}

.q-bar > .q-icon {
  margin-left: 2px;
}

.q-bar > div, .q-bar > div + .q-icon {
  margin-left: 8px;
}

.q-bar > .q-btn {
  margin-left: 2px;
}

.q-bar > .q-icon:first-child, .q-bar > .q-btn:first-child, .q-bar > div:first-child {
  margin-left: 0;
}

.q-bar--standard {
  padding: 0 12px;
  height: 32px;
  font-size: 18px;
}

.q-bar--standard > div {
  font-size: 16px;
}

.q-bar--standard .q-btn {
  font-size: 11px;
}

.q-bar--dense {
  padding: 0 8px;
  height: 24px;
  font-size: 14px;
}

.q-bar--dense .q-btn {
  font-size: 8px;
}

.q-bar--dark {
  background: rgba(255, 255, 255, 0.15);
}

`
}
