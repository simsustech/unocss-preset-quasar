import type { Preflight } from '@unocss/core'

/**
 * tab component styles — auto-generated from quasar.css.
 * Contains all .q-tab selector blocks (variants, states, pseudo-elements).
 */
export const tabComponentPreflight: Preflight = {
  getCSS: () => `.q-tab-panels {
  background: #fff;
}

.q-tab-panel {
  padding: 16px;
}

.q-tab {
  padding: 0 16px;
  min-height: 48px;
  transition: color 0.3s, background-color 0.3s;
  text-transform: uppercase;
  white-space: nowrap;
  color: inherit;
  text-decoration: none;
}

.q-tab--full {
  min-height: 72px;
}

.q-tab--no-caps {
  text-transform: none;
}

.q-tab__content {
  height: inherit;
  padding: 4px 0;
  min-width: 40px;
}

.q-tab__content--inline .q-tab__icon + .q-tab__label {
  padding-left: 8px;
}

.q-tab__content .q-chip--floating {
  top: 0;
  right: -16px;
}

.q-tab__icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.q-tab__label {
  font-size: 14px;
  line-height: 1.715em;
  font-weight: 500;
}

.q-tab .q-badge {
  top: 3px;
  right: -12px;
}

.q-tab__alert, .q-tab__alert-icon {
  position: absolute;
}

.q-tab__alert {
  top: 7px;
  right: -9px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: currentColor;
}

.q-tab__alert-icon {
  top: 2px;
  right: -12px;
  font-size: 18px;
}

.q-tab__indicator {
  opacity: 0;
  height: 2px;
  background: currentColor;
}

.q-tab--active .q-tab__indicator {
  opacity: 1;
  transform-origin: left /* rtl:ignore */;
}

.q-tab--inactive {
  opacity: 0.85;
}

`
}
