import type { Preflight } from '@unocss/core'

/**
 * linear component styles — auto-generated from quasar.css.
 * Contains all .q-linear selector blocks (variants, states, pseudo-elements).
 */
export const linearComponentPreflight: Preflight = {
  getCSS: () => `.q-linear-progress {
  --q-linear-progress-speed: .3s;
  position: relative;
  width: 100%;
  overflow: hidden;
  font-size: 4px;
  height: 1em;
  color: var(--q-primary);
  transform: scale3d(1, 1, 1);
}

.q-linear-progress__model, .q-linear-progress__track {
  transform-origin: 0 0;
}

.q-linear-progress__model--with-transition, .q-linear-progress__track--with-transition {
  transition: transform var(--q-linear-progress-speed);
}

.q-linear-progress--reverse .q-linear-progress__model--determinate, .q-linear-progress--reverse .q-linear-progress__track {
  transform-origin: 100% 0;
}

.q-linear-progress--reverse .q-linear-progress__model--indeterminate, .q-linear-progress--reverse .q-linear-progress__model--query {
  transform-origin: 50% 0;
  scale: -1 1;
}

.q-linear-progress__model--determinate {
  background: currentColor;
}

.q-linear-progress__model--indeterminate, .q-linear-progress__model--query {
  transition: none;
}

.q-linear-progress__model--indeterminate:before, .q-linear-progress__model--indeterminate:after, .q-linear-progress__model--query:before, .q-linear-progress__model--query:after {
  background: currentColor;
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform-origin: 0 0;
}

.q-linear-progress__model--indeterminate:before, .q-linear-progress__model--query:before {
  animation: q-linear-progress--indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.q-linear-progress__model--indeterminate:after, .q-linear-progress__model--query:after {
  transform: translate3d(-101%, 0, 0) scale3d(1, 1, 1);
  animation: q-linear-progress--indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: 1.15s;
}

.q-linear-progress__track {
  opacity: 0.4;
}

.q-linear-progress__track--light {
  background: rgba(0, 0, 0, 0.26);
}

.q-linear-progress__track--dark {
  background: rgba(255, 255, 255, 0.6);
}

.q-linear-progress__stripe {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0)) !important;
  background-size: 40px 40px !important;
}

.q-linear-progress__stripe--with-transition {
  transition: width var(--q-linear-progress-speed);
}

`
}
