import type { Preflight } from '@unocss/core'

/**
 * ios component styles — auto-generated from quasar.css.
 * Contains all .q-ios selector blocks (variants, states, pseudo-elements).
 */
export const iosComponentPreflight: Preflight = {
  getCSS: () => `body.q-ios-padding {
  --q-safe-area-inset-top: env(safe-area-inset-top, 0px);
  --q-safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
}

body.q-ios-padding .q-dialog__inner,
body.q-safe-area-padding .q-dialog__inner {
  padding-top: var(--q-safe-area-inset-top) !important;
  padding-bottom: var(--q-safe-area-inset-bottom) !important;
}

body.q-ios-padding .q-dialog__inner > div,
body.q-safe-area-padding .q-dialog__inner > div {
  max-height: calc(var(--q-dialog-viewport-height, 100dvh) - var(--q-safe-area-inset-top) - var(--q-safe-area-inset-bottom)) !important;
}

body.q-ios-padding .q-dialog__inner--top,
body.q-safe-area-padding .q-dialog__inner--top {
  padding-top: 0 !important;
}

body.q-ios-padding .q-dialog__inner--top > div,
body.q-safe-area-padding .q-dialog__inner--top > div {
  padding-top: var(--q-safe-area-inset-top);
}

body.q-ios-padding .q-dialog__inner--bottom,
body.q-safe-area-padding .q-dialog__inner--bottom {
  padding-bottom: 0 !important;
}

body.q-ios-padding .q-dialog__inner--bottom > div,
body.q-safe-area-padding .q-dialog__inner--bottom > div {
  padding-bottom: var(--q-safe-area-inset-bottom);
}

body.q-ios-padding .q-dialog__inner--keyboard,
body.q-safe-area-padding .q-dialog__inner--keyboard {
  padding-bottom: 0 !important;
}

body.q-ios-padding .q-dialog__inner--keyboard.q-dialog__inner--bottom > div,
body.q-safe-area-padding .q-dialog__inner--keyboard.q-dialog__inner--bottom > div {
  padding-bottom: 0;
}

body.q-ios-padding .q-layout--standard .q-header > .q-toolbar:nth-child(1),
body.q-ios-padding .q-layout--standard .q-header > .q-tabs:nth-child(1) .q-tabs__content,
body.q-ios-padding .q-layout--standard .q-drawer--top-padding .q-drawer__content,
body.q-safe-area-padding .q-layout--standard .q-header > .q-toolbar:nth-child(1),
body.q-safe-area-padding .q-layout--standard .q-header > .q-tabs:nth-child(1) .q-tabs__content,
body.q-safe-area-padding .q-layout--standard .q-drawer--top-padding .q-drawer__content {
  padding-top: var(--q-safe-area-inset-top);
  min-height: calc(var(--q-safe-area-inset-top) + 50px);
}

body.q-ios-padding .q-layout--standard .q-footer > .q-toolbar:nth-last-child(1 of :not(.q-layout__shadow)),
body.q-ios-padding .q-layout--standard .q-footer > .q-tabs:nth-last-child(1 of :not(.q-layout__shadow)) .q-tabs__content,
body.q-ios-padding .q-layout--standard .q-drawer--top-padding .q-drawer__content,
body.q-safe-area-padding .q-layout--standard .q-footer > .q-toolbar:nth-last-child(1 of :not(.q-layout__shadow)),
body.q-safe-area-padding .q-layout--standard .q-footer > .q-tabs:nth-last-child(1 of :not(.q-layout__shadow)) .q-tabs__content,
body.q-safe-area-padding .q-layout--standard .q-drawer--top-padding .q-drawer__content {
  padding-bottom: var(--q-safe-area-inset-bottom);
  min-height: calc(var(--q-safe-area-inset-bottom) + 50px);
}

body.q-ios-padding .q-notifications__list--center, body.q-ios-padding .q-notifications__list--top,
body.q-safe-area-padding .q-notifications__list--center,
body.q-safe-area-padding .q-notifications__list--top {
  top: var(--q-safe-area-inset-top);
}

body.q-ios-padding .q-notifications__list--center, body.q-ios-padding .q-notifications__list--bottom,
body.q-safe-area-padding .q-notifications__list--center,
body.q-safe-area-padding .q-notifications__list--bottom {
  bottom: var(--q-safe-area-inset-bottom);
}

body.q-ios-padding .fullscreen,
body.q-safe-area-padding .fullscreen {
  padding-top: var(--q-safe-area-inset-top) !important;
  padding-bottom: var(--q-safe-area-inset-bottom) !important;
}

`
}
