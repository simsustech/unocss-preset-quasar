import type { Preflight } from '@unocss/core'

/**
 * date component styles — auto-generated from quasar.css.
 * Contains all .q-date selector blocks (variants, states, pseudo-elements).
 */
export const dateComponentPreflight: Preflight = {
  getCSS: () => `.q-date {
  display: inline-flex;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: #fff;
  width: 290px;
  min-width: 290px;
  max-width: 100%;
}

.q-date--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-date__header {
  border-top-left-radius: inherit;
  color: #fff;
  background-color: var(--q-primary);
  padding: 16px;
}

.q-date__actions {
  padding: 0 16px 16px;
}

.q-date__content, .q-date__main {
  outline: 0;
}

.q-date__content .q-btn {
  font-weight: normal;
}

.q-date__header-link {
  opacity: 0.64;
  outline: 0;
  transition: opacity 0.3s ease-out;
}

.q-date__header-link--active, .q-date__header-link:hover, .q-date__header-link:focus {
  opacity: 1;
}

.q-date__header-link:focus-visible {
  opacity: 1;
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.q-date__header-subtitle {
  font-size: 14px;
  line-height: 1.75;
  letter-spacing: 0.00938em;
}

.q-date__header-title-label {
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: 0.00735em;
}

.q-date__view {
  height: 100%;
  width: 100%;
  min-height: 290px;
  padding: 16px;
}

.q-date__navigation {
  height: 12.5%;
}

.q-date__navigation > div:first-child {
  width: 8%;
  min-width: 24px;
  justify-content: flex-end;
}

.q-date__navigation > div:last-child {
  width: 8%;
  min-width: 24px;
  justify-content: flex-start;
}

.q-date__calendar-weekdays {
  height: 12.5%;
}

.q-date__calendar-weekdays > div {
  opacity: 0.38;
  font-size: 12px;
}

.q-date__calendar-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 14.285% !important;
  height: 12.5% !important;
  position: relative;
  padding: 1px;
}

.q-date__calendar-item:after {
  content: "";
  position: absolute;
  pointer-events: none;
  top: 1px;
  right: 0;
  bottom: 1px;
  left: 0;
  border-style: dashed;
  border-color: transparent;
  border-width: 1px;
}

.q-date__calendar-item > div, .q-date__calendar-item button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.q-date__calendar-item > div {
  line-height: 30px;
  text-align: center;
}

.q-date__calendar-item > button {
  line-height: 22px;
}

.q-date__calendar-item--out {
  opacity: 0.18;
}

.q-date__calendar-item--fill {
  visibility: hidden;
}

.q-date__range:before, .q-date__range-from:before, .q-date__range-to:before {
  content: "";
  background-color: currentColor;
  position: absolute;
  top: 1px;
  bottom: 1px;
  left: 0;
  right: 0;
  opacity: 0.3;
}

.q-date__range:nth-child(7n-6):before, .q-date__range-from:nth-child(7n-6):before, .q-date__range-to:nth-child(7n-6):before {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.q-date__range:nth-child(7n):before, .q-date__range-from:nth-child(7n):before, .q-date__range-to:nth-child(7n):before {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.q-date__range-from:before {
  left: 50%;
}

.q-date__range-to:before {
  right: 50%;
}

.q-date__edit-range:after {
  border-color: currentColor transparent;
}

.q-date__edit-range:nth-child(7n-6):after {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.q-date__edit-range:nth-child(7n):after {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.q-date__edit-range-from:after, .q-date__edit-range-from-to:after {
  left: 4px;
  border-left-color: currentColor;
  border-top-color: currentColor;
  border-bottom-color: currentColor;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
}

.q-date__edit-range-to:after, .q-date__edit-range-from-to:after {
  right: 4px;
  border-right-color: currentColor;
  border-top-color: currentColor;
  border-bottom-color: currentColor;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
}

.q-date__calendar-days-container {
  height: 75%;
  min-height: 192px;
}

.q-date__calendar-days > div {
  height: 16.66% !important;
}

.q-date__event {
  position: absolute;
  bottom: 2px;
  left: 50%;
  height: 5px;
  width: 8px;
  border-radius: 5px;
  background-color: var(--q-secondary);
  transform: translate3d(-50%, 0, 0);
}

.q-date__today {
  box-shadow: 0 0 1px 0 currentColor;
}

.q-date__years-content {
  padding: 0 8px;
}

.q-date__years-item, .q-date__months-item {
  flex: 0 0 33.3333%;
}

.q-date.disabled .q-date__header, .q-date.disabled .q-date__content, .q-date--readonly .q-date__header, .q-date--readonly .q-date__content {
  pointer-events: none;
}

.q-date--readonly .q-date__navigation {
  display: none;
}

.q-date--portrait {
  flex-direction: column;
}

.q-date--portrait-standard .q-date__content {
  height: calc(100% - 86px);
}

.q-date--portrait-standard .q-date__header {
  border-top-right-radius: inherit;
  height: 86px;
}

.q-date--portrait-standard .q-date__header-title {
  align-items: center;
  height: 30px;
}

.q-date--portrait-minimal .q-date__content {
  height: 100%;
}

.q-date--landscape {
  flex-direction: row;
  align-items: stretch;
  min-width: 420px;
}

.q-date--landscape > div {
  display: flex;
  flex-direction: column;
}

.q-date--landscape .q-date__content {
  height: 100%;
}

.q-date--landscape-standard {
  min-width: 420px;
}

.q-date--landscape-standard .q-date__header {
  border-bottom-left-radius: inherit;
  min-width: 110px;
  width: 110px;
}

.q-date--landscape-standard .q-date__header-title {
  flex-direction: column;
}

.q-date--landscape-standard .q-date__header-today {
  margin-top: 12px;
  margin-left: -8px;
}

.q-date--landscape-minimal {
  width: 310px;
}

.q-date--dark {
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.28);
}

`
}
