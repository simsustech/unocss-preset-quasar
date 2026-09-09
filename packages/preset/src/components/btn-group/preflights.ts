import type { Preflight } from '@unocss/core'

export const btnGroupPreflights: Preflight[] = [
  {
    getCSS: () => `.q-btn-group {
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  vertical-align: middle;
}
.q-btn-group > .q-btn-item {
  border-radius: inherit;
  align-self: stretch;
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
.q-btn-group > .q-btn-item:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.q-btn-group > .q-btn-item:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
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
`
  }
]
