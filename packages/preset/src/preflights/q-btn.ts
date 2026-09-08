import type { Preflight } from '@unocss/core'

/**
 * QBtn preflight — pseudo-element styles that UnoCSS rules can't produce.
 *
 * The ::before pseudo-element provides the button's elevation shadow and is
 * targeted by variant selectors (.q-btn--actionable.q-btn--standard:before).
 * Ported from quasar.css lines 412-431.
 */
export const qBtnPreflight: Preflight = {
  getCSS: () => `.q-btn:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.q-btn--actionable.q-btn--standard:before {
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.q-btn--actionable.q-btn--standard:active:before,
.q-btn--actionable.q-btn--standard.q-btn--active:before {
  box-shadow: var(--q-btn-pressed-shadow);
}
.q-btn--outline:before {
  border: 1px solid currentColor;
}
.q-btn--push:before {
  border-bottom: 3px solid rgba(0, 0, 0, 0.15);
}
.q-btn--push.q-btn--actionable {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.q-btn--push.q-btn--actionable:before {
  transition: border-width 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.q-btn--push.q-btn--actionable:active,
.q-btn--push.q-btn--actionable.q-btn--active {
  transform: translateY(2px);
}
.q-btn--push.q-btn--actionable:active:before,
.q-btn--push.q-btn--actionable.q-btn--active:before {
  border-bottom-width: 0;
}
.q-btn--flat:before,
.q-btn--outline:before,
.q-btn--unelevated:before {
  box-shadow: none;
}`
}
