import type { Preflight } from '@unocss/core'

/**
 * btn component styles — auto-generated from quasar.css.
 * Contains all .q-btn selector blocks (variants, states, pseudo-elements).
 */
export const btnComponentPreflight: Preflight = {
  getCSS: () => `.q-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  outline: 0;
  border: 0;
  vertical-align: middle;
  font-size: 14px;
  line-height: 1.715em;
  text-decoration: none;
  color: inherit;
  background: transparent;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  width: auto;
  height: auto;
  cursor: default;
  padding: 4px 16px;
  min-height: 2.572em;
}

.q-btn .q-icon, .q-btn .q-spinner {
  font-size: 1.715em;
}

.q-btn.disabled {
  opacity: 0.7 !important;
}

.q-btn:before {
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

.q-btn--actionable {
  cursor: pointer;
}

.q-btn--actionable.q-btn--standard:before {
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.q-btn--actionable.q-btn--standard:active:before, .q-btn--actionable.q-btn--standard.q-btn--active:before {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12);
}

.q-btn--no-uppercase {
  text-transform: none;
}

.q-btn--rectangle {
  border-radius: 3px;
}

.q-btn--outline {
  background: transparent !important;
}

.q-btn--outline:before {
  border: 1px solid currentColor;
}

.q-btn--push {
  border-radius: 7px;
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

.q-btn--push.q-btn--actionable:active, .q-btn--push.q-btn--actionable.q-btn--active {
  transform: translateY(2px);
}

.q-btn--push.q-btn--actionable:active:before, .q-btn--push.q-btn--actionable.q-btn--active:before {
  border-bottom-width: 0;
}

.q-btn--rounded {
  border-radius: 28px;
}

.q-btn--round {
  border-radius: 50%;
  padding: 0;
  min-width: 3em;
  min-height: 3em;
}

.q-btn--square {
  border-radius: 0;
}

.q-btn--flat:before, .q-btn--outline:before, .q-btn--unelevated:before {
  box-shadow: none;
}

.q-btn--dense {
  padding: 0.285em;
  min-height: 2em;
}

.q-btn--dense.q-btn--round {
  padding: 0;
  min-height: 2.4em;
  min-width: 2.4em;
}

.q-btn--dense .on-left {
  margin-right: 6px;
}

.q-btn--dense .on-right {
  margin-left: 6px;
}

.q-btn--fab .q-icon, .q-btn--fab-mini .q-icon {
  font-size: 24px;
}

.q-btn--fab {
  padding: 16px;
  min-height: 56px;
  min-width: 56px;
}

.q-btn--fab .q-icon {
  margin: auto;
}

.q-btn--fab-mini {
  padding: 8px;
  min-height: 40px;
  min-width: 40px;
}

.q-btn__content {
  transition: opacity 0.3s;
  z-index: 0;
}

.q-btn__content--hidden {
  opacity: 0;
  pointer-events: none;
}

.q-btn__progress {
  border-radius: inherit;
  z-index: 0;
}

.q-btn__progress-indicator {
  z-index: -1;
  transform: translateX(-100%);
  background: rgba(255, 255, 255, 0.25);
}

.q-btn__progress--dark .q-btn__progress-indicator {
  background: rgba(0, 0, 0, 0.2);
}

.q-btn--flat .q-btn__progress-indicator, .q-btn--outline .q-btn__progress-indicator {
  opacity: 0.2;
  background: currentColor;
}

.q-btn-dropdown--split .q-btn-dropdown__arrow-container {
  padding: 0 4px;
}

.q-btn-dropdown--split .q-btn-dropdown__arrow-container.q-btn--outline {
  border-left: 1px solid currentColor;
}

.q-btn-dropdown--split .q-btn-dropdown__arrow-container:not(.q-btn--outline) {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.q-btn-dropdown--simple * + .q-btn-dropdown__arrow {
  margin-left: 8px;
}

.q-btn-dropdown__arrow {
  transition: transform 0.28s;
}

.q-btn-dropdown--current {
  flex-grow: 1;
}

.q-btn-group {
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  vertical-align: middle;
}

.q-btn-group > .q-btn-item {
  border-radius: inherit;
  align-self: stretch;
}

.q-btn-group > .q-btn-item:before {
  box-shadow: none;
}

.q-btn-group > .q-btn-item .q-badge--floating {
  right: 0;
}

.q-btn-group > .q-btn-group {
  box-shadow: none;
}

.q-btn-group > .q-btn-group:first-child > .q-btn:first-child {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.q-btn-group > .q-btn-group:last-child > .q-btn:last-child {
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

.q-btn-group > .q-btn-group:not(:first-child) > .q-btn:first-child:before {
  border-left: 0;
}

.q-btn-group > .q-btn-group:not(:last-child) > .q-btn:last-child:before {
  border-right: 0;
}

.q-btn-group > .q-btn-item:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.q-btn-group > .q-btn-item:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.q-btn-group > .q-btn-item.q-btn--standard:before {
  z-index: -1;
}

.q-btn-group--push {
  border-radius: 7px;
}

.q-btn-group--push > .q-btn--push.q-btn--actionable {
  transform: none;
}

.q-btn-group--push > .q-btn--push.q-btn--actionable .q-btn__content {
  transition: margin-top 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), margin-bottom 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.q-btn-group--push > .q-btn--push.q-btn--actionable:active .q-btn__content, .q-btn-group--push > .q-btn--push.q-btn--actionable.q-btn--active .q-btn__content {
  margin-top: 2px;
  margin-bottom: -2px;
}

.q-btn-group--rounded {
  border-radius: 28px;
}

.q-btn-group--square {
  border-radius: 0;
}

.q-btn-group--flat, .q-btn-group--outline, .q-btn-group--unelevated {
  box-shadow: none;
}

.q-btn-group--outline > .q-separator {
  display: none;
}

.q-btn-group--outline > .q-btn-item + .q-btn-item:before {
  border-left: 0;
}

.q-btn-group--outline > .q-btn-item:not(:last-child):before {
  border-right: 0;
}

.q-btn-group--stretch {
  align-self: stretch;
  border-radius: 0;
}

.q-btn-group--glossy > .q-btn-item {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.12) 51%, rgba(0, 0, 0, 0.04)) !important;
}

.q-btn-group--spread > .q-btn-group {
  display: flex !important;
}

.q-btn-group--spread > .q-btn-item, .q-btn-group--spread > .q-btn-group > .q-btn-item:not(.q-btn-dropdown__arrow-container) {
  width: auto;
  min-width: 0;
  max-width: 100%;
  flex: 10000 1 0%;
}

.q-btn-toggle {
  position: relative;
}

`
}
