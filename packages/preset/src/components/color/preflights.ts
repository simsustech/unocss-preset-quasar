import type { Preflight } from '@unocss/core'

export const colorPreflights: Preflight[] = [
  {
    getCSS: () => `.q-color-picker {
  overflow: hidden;
  background: #fff;
  max-width: 350px;
  vertical-align: top;
  min-width: 180px;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.q-color-picker .q-tab {
  padding: 0 !important;
}
.q-color-picker--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.q-color-picker__header-tabs {
  height: 32px;
}
.q-color-picker__header-banner {
  height: 36px;
}
.q-color-picker__header input {
  line-height: 24px;
  border: 0;
}
.q-color-picker__header .q-tab {
  min-height: 32px !important;
  height: 32px !important;
}
.q-color-picker__header .q-tab--inactive {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.1));
}
.q-color-picker__error-icon {
  bottom: 2px;
  right: 2px;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s ease-in;
}
.q-color-picker__header-content {
  position: relative;
  background: #fff;
}
.q-color-picker__header-content--light {
  color: #000;
}
.q-color-picker__header-content--dark {
  color: #fff;
}
.q-color-picker__header-banner {
  height: 36px;
}
.q-color-picker__header-bg {
  background: #fff;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==") !important;
}
.q-color-picker__footer {
  height: 36px;
}
.q-color-picker__footer .q-tab {
  min-height: 36px !important;
  height: 36px !important;
}
.q-color-picker__footer .q-tab--inactive {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.1));
}
.q-color-picker {
  /* Saturation Tab */
}
.q-color-picker__spectrum {
  width: 100%;
  height: 100%;
}
.q-color-picker__spectrum-tab {
  padding: 0 !important;
}
.q-color-picker__spectrum-white {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.q-color-picker__spectrum-black {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.q-color-picker__spectrum-circle {
  width: 10px;
  height: 10px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-5px, -5px);
}
.q-color-picker__hue .q-slider__track {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%) !important;
  opacity: 1;
}
.q-color-picker__alpha .q-slider__track-container {
  padding-top: 0;
}
.q-color-picker__sliders {
  padding: 0 16px;
}
.q-color-picker__sliders .q-slider__thumb {
  color: #424242;
}
.q-color-picker__sliders .q-slider__thumb path {
  stroke-width: 2px;
  fill: transparent;
}
.q-color-picker__sliders .q-slider--active path {
  stroke-width: 3px;
}
.q-color-picker {
  /* Tune Tab */
}
.q-color-picker__tune-tab .q-slider {
  margin-left: 18px;
  margin-right: 18px;
}
.q-color-picker__tune-tab input {
  font-size: 11px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 3.5em;
}
.q-color-picker {
  /* Palette Tab */
}
.q-color-picker__palette-tab {
  padding: 0 !important;
}
.q-color-picker__palette-rows--editable .q-color-picker__cube {
  cursor: pointer;
}
.q-color-picker__cube {
  padding-bottom: 10%;
  width: 10% !important;
}
.q-color-picker {
  /* Generic  */
}
.q-color-picker input {
  color: inherit;
  background: transparent;
  outline: 0;
  text-align: center;
}
.q-color-picker .q-tabs {
  overflow: hidden;
}
.q-color-picker .q-tab--active {
  box-shadow: 0 0 14px 3px rgba(0, 0, 0, 0.2);
}
.q-color-picker .q-tab--active .q-focus-helper {
  display: none;
}
.q-color-picker .q-tab__indicator {
  display: none;
}
.q-color-picker .q-tab-panels {
  background: inherit;
}
.q-color-picker--dark {
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}
.q-color-picker--dark .q-color-picker__tune-tab input {
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.q-color-picker--dark .q-slider__thumb {
  color: #fafafa;
}
`
  }
]
