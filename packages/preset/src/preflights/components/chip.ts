import type { Preflight } from '@unocss/core'

/**
 * chip component styles — auto-generated from quasar.css.
 * Contains all .q-chip selector blocks (variants, states, pseudo-elements).
 */
export const chipComponentPreflight: Preflight = {
  getCSS: () => `.q-chip {
  vertical-align: middle;
  border-radius: 16px;
  outline: 0;
  position: relative;
  height: 2em;
  max-width: 100%;
  margin: 4px;
  background: #e0e0e0;
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  padding: 0.5em 0.9em;
}

.q-chip--colored .q-chip__icon, .q-chip--dark .q-chip__icon {
  color: inherit;
}

.q-chip .q-avatar {
  font-size: 2em;
  margin-left: -0.45em;
  margin-right: 0.2em;
  border-radius: 16px;
}

.q-chip--outline {
  background: transparent !important;
  border: 1px solid currentColor;
}

.q-chip--outline .q-avatar {
  margin-left: calc(-0.45em - 1px);
}

.q-chip--selected .q-avatar {
  display: none;
}

.q-chip__icon {
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.5em;
  margin: -0.2em;
}

.q-chip__icon--left {
  margin-right: 0.2em;
}

.q-chip__icon--right {
  margin-left: 0.2em;
}

.q-chip__icon--remove {
  margin-left: 0.1em;
  margin-right: -0.5em;
  opacity: 0.6;
  outline: 0;
}

.q-chip__icon--remove:hover, .q-chip__icon--remove:focus {
  opacity: 1;
}

.q-chip__content {
  white-space: nowrap;
}

.q-chip--dense {
  border-radius: 12px;
  padding: 0 0.4em;
  height: 1.5em;
}

.q-chip--dense .q-avatar {
  font-size: 1.5em;
  margin-left: -0.27em;
  margin-right: 0.1em;
  border-radius: 12px;
}

.q-chip--dense .q-chip__icon {
  font-size: 1.25em;
}

.q-chip--dense .q-chip__icon--left {
  margin-right: 0.195em;
}

.q-chip--dense .q-chip__icon--remove {
  margin-right: -0.25em;
}

.q-chip--square {
  border-radius: 4px;
}

.q-chip--square .q-avatar {
  border-radius: 3px 0 0 3px;
}

.q-chip--clickable:focus-visible {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
}

body.body--dark .q-chip--clickable:focus-visible {
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.14), 0 2px 1px -1px rgba(255, 255, 255, 0.12);
}

`
}
