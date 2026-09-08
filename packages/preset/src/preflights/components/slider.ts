import type { Preflight } from '@unocss/core'

/**
 * slider component styles — auto-generated from quasar.css.
 * Contains all .q-slider selector blocks (variants, states, pseudo-elements).
 */
export const sliderComponentPreflight: Preflight = {
  getCSS: () => `.q-slider {
  position: relative;
}

.q-slider--h {
  width: 100%;
}

.q-slider--v {
  height: 200px;
}

.q-slider--editable .q-slider__track-container {
  cursor: grab;
}

.q-slider__track-container {
  outline: 0;
}

.q-slider__track-container--h {
  width: 100%;
  padding: 12px 0;
}

.q-slider__track-container--h .q-slider__selection {
  will-change: width, left;
}

.q-slider__track-container--v {
  height: 100%;
  padding: 0 12px;
}

.q-slider__track-container--v .q-slider__selection {
  will-change: height, top;
}

.q-slider__track {
  color: var(--q-primary);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: inherit;
  height: inherit;
}

.q-slider__inner {
  background: rgba(0, 0, 0, 0.1);
  border-radius: inherit;
  width: 100%;
  height: 100%;
}

.q-slider__selection {
  background: currentColor;
  border-radius: inherit;
  width: 100%;
  height: 100%;
}

.q-slider__markers {
  color: rgba(0, 0, 0, 0.3);
  border-radius: inherit;
  width: 100%;
  height: 100%;
}

.q-slider__markers:after {
  content: "";
  position: absolute;
  background: currentColor;
}

.q-slider__markers--h {
  background-image: repeating-linear-gradient(to right, currentColor, currentColor 2px, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0));
}

.q-slider__markers--h:after {
  height: 100%;
  width: 2px;
  top: 0;
  right: 0;
}

.q-slider__markers--v {
  background-image: repeating-linear-gradient(to bottom, currentColor, currentColor 2px, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0));
}

.q-slider__markers--v:after {
  width: 100%;
  height: 2px;
  left: 0;
  bottom: 0;
}

.q-slider__marker-labels-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 24px;
  min-width: 24px;
}

.q-slider__marker-labels {
  position: absolute;
}

.q-slider__marker-labels--h-standard {
  top: 0;
}

.q-slider__marker-labels--h-switched {
  bottom: 0;
}

.q-slider__marker-labels--h-ltr {
  transform: translateX(-50%) /* rtl:ignore */;
}

.q-slider__marker-labels--h-rtl {
  transform: translateX(50%) /* rtl:ignore */;
}

.q-slider__marker-labels--v-standard {
  left: 4px;
}

.q-slider__marker-labels--v-switched {
  right: 4px;
}

.q-slider__marker-labels--v-ltr {
  transform: translateY(-50%) /* rtl:ignore */;
}

.q-slider__marker-labels--v-rtl {
  transform: translateY(50%) /* rtl:ignore */;
}

.q-slider__thumb {
  z-index: 1;
  outline: 0;
  color: var(--q-primary);
  transition: transform 0.18s ease-out, fill 0.18s ease-out, stroke 0.18s ease-out;
}

.q-slider__thumb.q-slider--focus {
  opacity: 1 !important;
}

.q-slider__thumb--h {
  top: 50%;
  will-change: left;
}

.q-slider__thumb--h-ltr {
  transform: scale(1) translate(-50%, -50%) /* rtl:ignore */;
}

.q-slider__thumb--h-rtl {
  transform: scale(1) translate(50%, -50%) /* rtl:ignore */;
}

.q-slider__thumb--v {
  left: 50% /* rtl:ignore */;
  will-change: top;
}

.q-slider__thumb--v-ltr {
  transform: scale(1) translate(-50%, -50%) /* rtl:ignore */;
}

.q-slider__thumb--v-rtl {
  transform: scale(1) translate(-50%, 50%) /* rtl:ignore */;
}

.q-slider__thumb-shape {
  top: 0;
  left: 0;
  stroke-width: 3.5;
  stroke: currentColor;
  transition: transform 0.28s;
}

.q-slider__thumb-shape path {
  stroke: currentColor;
  fill: currentColor;
}

.q-slider__focus-ring {
  border-radius: 50%;
  opacity: 0;
  transition: transform 266.67ms ease-out, opacity 266.67ms ease-out, background-color 266.67ms ease-out;
  transition-delay: 0.14s;
}

.q-slider__pin {
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.28s ease-out;
  transition-delay: 0.14s;
}

.q-slider__pin:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
}

.q-slider__pin--h:before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  left: 50%;
  transform: translateX(-50%);
}

.q-slider__pin--h-standard {
  bottom: 100%;
}

.q-slider__pin--h-standard:before {
  bottom: 2px;
  border-top: 6px solid currentColor;
}

.q-slider__pin--h-switched {
  top: 100%;
}

.q-slider__pin--h-switched:before {
  top: 2px;
  border-bottom: 6px solid currentColor;
}

.q-slider__pin--v {
  top: 0;
}

.q-slider__pin--v:before {
  top: 50%;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.q-slider__pin--v-standard {
  left: 100%;
}

.q-slider__pin--v-standard:before {
  left: 2px;
  border-right: 6px solid currentColor;
}

.q-slider__pin--v-switched {
  right: 100%;
}

.q-slider__pin--v-switched:before {
  right: 2px;
  border-left: 6px solid currentColor;
}

.q-slider__label {
  z-index: 1;
  white-space: nowrap;
  position: absolute;
}

.q-slider__label--h {
  left: 50%;
  transform: translateX(-50%);
}

.q-slider__label--h-standard {
  bottom: 7px;
}

.q-slider__label--h-switched {
  top: 7px;
}

.q-slider__label--v {
  top: 50%;
  transform: translateY(-50%);
}

.q-slider__label--v-standard {
  left: 7px;
}

.q-slider__label--v-switched {
  right: 7px;
}

.q-slider__text-container {
  min-height: 25px;
  padding: 2px 8px;
  border-radius: 4px;
  background: currentColor;
  position: relative;
  text-align: center;
}

.q-slider__text {
  color: #fff;
  font-size: 12px;
}

.q-slider--no-value .q-slider__thumb,
.q-slider--no-value .q-slider__inner,
.q-slider--no-value .q-slider__selection {
  opacity: 0;
}

.q-slider--focus .q-slider__focus-ring {
  background: currentColor;
  transform: scale3d(1.55, 1.55, 1);
  opacity: 0.25;
}

.q-slider--focus .q-slider__thumb,
.q-slider--focus .q-slider__inner,
.q-slider--focus .q-slider__selection {
  opacity: 1;
}

.q-slider--inactive .q-slider__thumb--h {
  transition: left 0.28s, right 0.28s;
}

.q-slider--inactive .q-slider__thumb--v {
  transition: top 0.28s, bottom 0.28s;
}

.q-slider--inactive .q-slider__selection {
  transition: width 0.28s, left 0.28s, right 0.28s, height 0.28s, top 0.28s, bottom 0.28s;
}

.q-slider--inactive .q-slider__text-container {
  transition: transform 0.28s;
}

.q-slider--active {
  cursor: grabbing;
}

.q-slider--active .q-slider__thumb-shape {
  transform: scale(1.5);
}

.q-slider--active .q-slider__focus-ring, .q-slider--active.q-slider--label .q-slider__thumb-shape {
  transform: scale(0) !important;
}

.q-slider--label.q-slider--active .q-slider__pin,
.q-slider--label .q-slider--focus .q-slider__pin, .q-slider--label.q-slider--label-always .q-slider__pin {
  opacity: 1;
}

.q-slider--dark .q-slider__track {
  background: rgba(255, 255, 255, 0.1);
}

.q-slider--dark .q-slider__inner {
  background: rgba(255, 255, 255, 0.1);
}

.q-slider--dark .q-slider__markers {
  color: rgba(255, 255, 255, 0.3);
}

.q-slider--dense .q-slider__track-container--h {
  padding: 6px 0;
}

.q-slider--dense .q-slider__track-container--v {
  padding: 0 6px;
}

`
}
