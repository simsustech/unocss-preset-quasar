import type { Preflight } from '@unocss/core'

export const dialogPreflights: Preflight[] = [
  {
    getCSS: () => `.q-dialog__title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0125em;
}
.q-dialog__progress {
  font-size: 4rem;
}
.q-dialog__inner {
  outline: 0;
}
.q-dialog__inner > div {
  pointer-events: all;
  overflow: auto;
  will-change: scroll-position;
  border-radius: 4px;
}
.q-dialog__inner--square > div {
  border-radius: 0 !important;
}
.q-dialog__inner > .q-card > .q-card__actions .q-btn--rectangle {
  min-width: 64px;
}
.q-dialog__inner--minimized {
  padding: 24px;
}
.q-dialog__inner--minimized > div {
  max-height: calc(var(--q-dialog-viewport-height, 100dvh) - 48px);
}
.q-dialog__inner--maximized > div {
  height: 100%;
  width: 100%;
  max-height: 100dvh;
  max-width: 100vw;
  border-radius: 0 !important;
  top: 0 !important;
  left: 0 !important;
}
.q-dialog__inner--top, .q-dialog__inner--bottom {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.q-dialog__inner--right, .q-dialog__inner--left {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.q-dialog__inner--left:not(.q-dialog__inner--animating) > div, .q-dialog__inner--top:not(.q-dialog__inner--animating) > div {
  border-top-left-radius: 0;
}
.q-dialog__inner--right:not(.q-dialog__inner--animating) > div, .q-dialog__inner--top:not(.q-dialog__inner--animating) > div {
  border-top-right-radius: 0;
}
.q-dialog__inner--left:not(.q-dialog__inner--animating) > div, .q-dialog__inner--bottom:not(.q-dialog__inner--animating) > div {
  border-bottom-left-radius: 0;
}
.q-dialog__inner--right:not(.q-dialog__inner--animating) > div, .q-dialog__inner--bottom:not(.q-dialog__inner--animating) > div {
  border-bottom-right-radius: 0;
}
.q-dialog__inner--fullwidth > div {
  width: 100% !important;
  max-width: 100% !important;
}
.q-dialog__inner--fullheight > div {
  height: 100% !important;
  max-height: 100% !important;
}
.q-dialog__backdrop {
  z-index: -1;
  pointer-events: all;
  outline: 0;
  background: rgba(0, 0, 0, 0.4);
}
.q-dialog-plugin {
  width: 400px;
}
.q-dialog-plugin__form {
  max-height: 50vh;
}
.q-dialog-plugin .q-card__section + .q-card__section {
  padding-top: 0;
}
.q-dialog-plugin--progress {
  text-align: center;
}
`
  }
]
