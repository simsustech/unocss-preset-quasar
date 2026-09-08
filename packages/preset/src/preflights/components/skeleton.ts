import type { Preflight } from '@unocss/core'

/**
 * skeleton component styles — auto-generated from quasar.css.
 * Contains all .q-skeleton selector blocks (variants, states, pseudo-elements).
 */
export const skeletonComponentPreflight: Preflight = {
  getCSS: () => `.q-skeleton {
  --q-skeleton-speed: 1500ms;
  background: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  /* maintain size even with border
  * for types that have height specified
  * */
  box-sizing: border-box;
}

.q-skeleton--anim {
  cursor: wait;
}

.q-skeleton:before {
  content: " ";
}

.q-skeleton--type-text {
  transform: scale(1, 0.5);
}

.q-skeleton--type-circle, .q-skeleton--type-QAvatar {
  height: 48px;
  width: 48px;
  border-radius: 50%;
}

.q-skeleton--type-QBtn {
  width: 90px;
  height: 36px;
}

.q-skeleton--type-QBadge {
  width: 70px;
  height: 16px;
}

.q-skeleton--type-QChip {
  width: 90px;
  height: 28px;
  border-radius: 16px;
}

.q-skeleton--type-QToolbar {
  height: 50px;
}

.q-skeleton--type-QCheckbox, .q-skeleton--type-QRadio {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.q-skeleton--type-QToggle {
  width: 56px;
  height: 40px;
  border-radius: 7px;
}

.q-skeleton--type-QSlider, .q-skeleton--type-QRange {
  height: 40px;
}

.q-skeleton--type-QInput {
  height: 56px;
}

.q-skeleton--bordered {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.q-skeleton--square {
  border-radius: 0;
}

.q-skeleton--anim-fade {
  animation: q-skeleton--fade var(--q-skeleton-speed) linear 0.5s infinite;
}

.q-skeleton--anim-pulse {
  animation: q-skeleton--pulse var(--q-skeleton-speed) ease-in-out 0.5s infinite;
}

.q-skeleton--anim-pulse-x {
  animation: q-skeleton--pulse-x var(--q-skeleton-speed) ease-in-out 0.5s infinite;
}

.q-skeleton--anim-pulse-y {
  animation: q-skeleton--pulse-y var(--q-skeleton-speed) ease-in-out 0.5s infinite;
}

.q-skeleton--anim-wave, .q-skeleton--anim-blink, .q-skeleton--anim-pop {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.q-skeleton--anim-wave:after, .q-skeleton--anim-blink:after, .q-skeleton--anim-pop:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}

.q-skeleton--anim-blink:after {
  background: rgba(255, 255, 255, 0.7);
  animation: q-skeleton--fade var(--q-skeleton-speed) linear 0.5s infinite;
}

.q-skeleton--anim-wave:after {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  animation: q-skeleton--wave var(--q-skeleton-speed) linear 0.5s infinite;
}

.q-skeleton--dark {
  background: rgba(255, 255, 255, 0.05);
}

.q-skeleton--dark.q-skeleton--bordered {
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.q-skeleton--dark.q-skeleton--anim-wave:after {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
}

.q-skeleton--dark.q-skeleton--anim-blink:after {
  background: rgba(255, 255, 255, 0.2);
}

`
}
