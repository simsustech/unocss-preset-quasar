import type { Preflight } from '@unocss/core'

/**
 * stepper component styles — auto-generated from quasar.css.
 * Contains all .q-stepper selector blocks (variants, states, pseudo-elements).
 */
export const stepperComponentPreflight: Preflight = {
  getCSS: () => `.q-stepper {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: #fff;
}

.q-stepper__title {
  font-size: 14px;
  line-height: 1.285714;
  letter-spacing: 0.1px;
}

.q-stepper__caption {
  font-size: 12px;
  line-height: 1.16667;
}

.q-stepper__dot {
  contain: layout;
  margin-right: 8px;
  font-size: 14px;
  width: 24px;
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  background: currentColor;
}

.q-stepper__dot span {
  color: #fff;
}

.q-stepper__tab {
  padding: 8px 24px;
  font-size: 14px;
  color: #9e9e9e;
  flex-direction: row;
}

.q-stepper--dark {
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}

.q-stepper--dark .q-stepper__dot span {
  color: #000;
}

.q-stepper__tab--navigation {
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}

.q-stepper__tab--active, .q-stepper__tab--done {
  color: var(--q-primary);
}

.q-stepper__tab--active .q-stepper__dot, .q-stepper__tab--active .q-stepper__label, .q-stepper__tab--done .q-stepper__dot, .q-stepper__tab--done .q-stepper__label {
  text-shadow: 0 0 0 currentColor;
}

.q-stepper__tab--disabled .q-stepper__dot {
  background: rgba(0, 0, 0, 0.22);
}

.q-stepper__tab--disabled .q-stepper__label {
  color: rgba(0, 0, 0, 0.32);
}

.q-stepper__tab--error {
  color: var(--q-negative);
}

.q-stepper__tab--error-with-icon .q-stepper__dot {
  background: transparent !important;
}

.q-stepper__tab--error-with-icon .q-stepper__dot span {
  color: currentColor;
  font-size: 24px;
}

.q-stepper__header {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.q-stepper__header--border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.q-stepper__header--standard-labels .q-stepper__tab {
  min-height: 72px;
  justify-content: center;
}

.q-stepper__header--standard-labels .q-stepper__tab:first-child {
  justify-content: flex-start;
}

.q-stepper__header--standard-labels .q-stepper__tab:last-child {
  justify-content: flex-end;
}

.q-stepper__header--standard-labels .q-stepper__tab:only-child {
  justify-content: center;
}

.q-stepper__header--standard-labels .q-stepper__dot:after {
  display: none;
}

.q-stepper__header--alternative-labels .q-stepper__tab {
  min-height: 104px;
  padding: 24px 32px;
  flex-direction: column;
  justify-content: flex-start;
}

.q-stepper__header--alternative-labels .q-stepper__dot {
  margin-right: 0;
}

.q-stepper__header--alternative-labels .q-stepper__label {
  margin-top: 8px;
  text-align: center;
}

.q-stepper__header--alternative-labels .q-stepper__label:before, .q-stepper__header--alternative-labels .q-stepper__label:after {
  display: none;
}

.q-stepper__header--contracted {
  min-height: 72px;
}

.q-stepper__header--contracted.q-stepper__header--alternative-labels .q-stepper__tab {
  min-height: 72px;
}

.q-stepper__header--contracted.q-stepper__header--alternative-labels .q-stepper__tab:first-child {
  align-items: flex-start;
}

.q-stepper__header--contracted.q-stepper__header--alternative-labels .q-stepper__tab:last-child {
  align-items: flex-end;
}

.q-stepper__header--contracted .q-stepper__tab {
  padding: 24px 0;
}

.q-stepper__header--contracted .q-stepper__tab:first-child .q-stepper__dot {
  transform: translateX(24px);
}

.q-stepper__header--contracted .q-stepper__tab:last-child .q-stepper__dot {
  transform: translateX(-24px);
}

.q-stepper__header--contracted .q-stepper__tab:not(:last-child) .q-stepper__dot:after {
  display: block !important;
}

.q-stepper__header--contracted .q-stepper__dot {
  margin: 0;
}

.q-stepper__header--contracted .q-stepper__label {
  display: none;
}

.q-stepper__nav {
  padding-top: 24px;
}

.q-stepper--flat {
  box-shadow: none;
}

.q-stepper--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.q-stepper--horizontal .q-stepper__step-inner {
  padding: 24px;
}

.q-stepper--horizontal .q-stepper__tab:first-child {
  border-top-left-radius: inherit;
}

.q-stepper--horizontal .q-stepper__tab:last-child {
  border-top-right-radius: inherit;
}

.q-stepper--horizontal .q-stepper__tab:first-child .q-stepper__dot:before,
.q-stepper--horizontal .q-stepper__tab:last-child .q-stepper__label:after,
.q-stepper--horizontal .q-stepper__tab:last-child .q-stepper__dot:after {
  display: none;
}

.q-stepper--horizontal .q-stepper__tab {
  overflow: hidden;
}

.q-stepper--horizontal .q-stepper__line {
  contain: layout;
}

.q-stepper--horizontal .q-stepper__line:before, .q-stepper--horizontal .q-stepper__line:after {
  position: absolute;
  top: 50%;
  height: 1px;
  width: 100vw;
  background: rgba(0, 0, 0, 0.12);
}

.q-stepper--horizontal .q-stepper__label:after, .q-stepper--horizontal .q-stepper__dot:after {
  content: "";
  left: 100%;
  margin-left: 8px;
}

.q-stepper--horizontal .q-stepper__dot:before {
  content: "";
  right: 100%;
  margin-right: 8px;
}

.q-stepper--horizontal > .q-stepper__nav {
  padding: 0 24px 24px;
}

.q-stepper--vertical {
  padding: 16px 0;
}

.q-stepper--vertical .q-stepper__tab {
  padding: 12px 24px;
}

.q-stepper--vertical .q-stepper__title {
  line-height: 18px;
}

.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 24px 32px 60px;
}

.q-stepper--vertical > .q-stepper__nav {
  padding: 24px 24px 0;
}

.q-stepper--vertical .q-stepper__step {
  overflow: hidden;
}

.q-stepper--vertical .q-stepper__dot {
  margin-right: 12px;
}

.q-stepper--vertical .q-stepper__dot:before, .q-stepper--vertical .q-stepper__dot:after {
  content: "";
  position: absolute;
  left: 50%;
  width: 1px;
  height: 99999px;
  background: rgba(0, 0, 0, 0.12);
}

.q-stepper--vertical .q-stepper__dot:before {
  bottom: 100%;
  margin-bottom: 8px;
}

.q-stepper--vertical .q-stepper__dot:after {
  top: 100%;
  margin-top: 8px;
}

.q-stepper--vertical .q-stepper__step:first-child .q-stepper__dot:before,
.q-stepper--vertical .q-stepper__step:last-child .q-stepper__dot:after {
  display: none;
}

.q-stepper--vertical .q-stepper__step:last-child .q-stepper__step-inner {
  padding-bottom: 8px;
}

.q-stepper--dark.q-stepper--bordered,
.q-stepper--dark .q-stepper__header--border {
  border-color: rgba(255, 255, 255, 0.28);
}

.q-stepper--dark.q-stepper--horizontal .q-stepper__line:before, .q-stepper--dark.q-stepper--horizontal .q-stepper__line:after {
  background: rgba(255, 255, 255, 0.28);
}

.q-stepper--dark.q-stepper--vertical .q-stepper__dot:before, .q-stepper--dark.q-stepper--vertical .q-stepper__dot:after {
  background: rgba(255, 255, 255, 0.28);
}

.q-stepper--dark .q-stepper__tab--disabled {
  color: rgba(255, 255, 255, 0.28);
}

.q-stepper--dark .q-stepper__tab--disabled .q-stepper__dot {
  background: rgba(255, 255, 255, 0.28);
}

.q-stepper--dark .q-stepper__tab--disabled .q-stepper__label {
  color: rgba(255, 255, 255, 0.54);
}

`
}
