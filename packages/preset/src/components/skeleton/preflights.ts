import type { Preflight } from '@unocss/core'

export const skeletonPreflights: Preflight[] = [
  {
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
.q-skeleton--dark {
  background: rgba(255, 255, 255, 0.05);
}
.q-skeleton--dark.q-skeleton--bordered {
  border: 1px solid rgba(255, 255, 255, 0.25);
}
`
  }
]
