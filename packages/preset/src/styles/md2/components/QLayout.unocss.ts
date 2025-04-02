import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.q-ios-padding .q-layout--standard .q-header > .q-toolbar:nth-child(1),
body.q-ios-padding .q-layout--standard .q-header > .q-tabs:nth-child(1) .q-tabs__content,
body.q-ios-padding .q-layout--standard .q-drawer--top-padding .q-drawer__content {
  padding-top: 20px;
  min-height: 70px;
  padding-top: env(safe-area-inset-top);
  min-height: calc(env(safe-area-inset-top) + 50px);
}
body.q-ios-padding .q-layout--standard .q-footer > .q-toolbar:last-child,
body.q-ios-padding .q-layout--standard .q-footer > .q-tabs:nth-last-child(1 of :not(.q-layout__shadow)) .q-tabs__content,
body.q-ios-padding .q-layout--standard .q-drawer--top-padding .q-drawer__content {
  padding-bottom: env(safe-area-inset-bottom);
  min-height: calc(env(safe-area-inset-bottom) + 50px);
}
.q-body--layout-animate .q-drawer__backdrop {
  transition: background-color 0.12s !important;
}
.q-body--layout-animate .q-drawer {
  transition: transform 0.12s, width 0.12s, top 0.12s, bottom 0.12s !important;
}
.q-body--layout-animate .q-layout__section--marginal {
  transition: transform 0.12s, left 0.12s, right 0.12s !important;
}
.q-body--layout-animate .q-page-container {
  transition: padding-top 0.12s, padding-right 0.12s, padding-bottom 0.12s, padding-left 0.12s !important;
}
.q-body--layout-animate .q-page-sticky {
  transition: transform 0.12s, left 0.12s, right 0.12s, top 0.12s, bottom 0.12s !important;
}
body:not(.q-body--layout-animate) .q-layout--prevent-focus {
  visibility: hidden;
}
.q-body--drawer-toggle {
  overflow-x: hidden !important;
}
@media (max-width: 599.98px) {
  .q-layout-padding {
    padding: 8px;
  }
}
@media (min-width: 600px) and (max-width: 1439.98px) {
  .q-layout-padding {
    padding: 16px;
  }
}
@media (min-width: 1440px) {
  .q-layout-padding {
    padding: 24px;
  }
}
body.body--dark .q-header, body.body--dark .q-footer, body.body--dark .q-drawer {
  border-color: rgba(255, 255, 255, 0.28);
}
body.body--dark .q-layout__shadow:after {
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2), 0 0px 10px rgba(255, 255, 255, 0.24);
}
body.platform-ios .q-layout--containerized {
  position: unset !important;
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-layout$/, ([, c], { theme }) => `w-full outline-0 relative`],

  [
    /^q-layout-container$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-layout-container'] ??
      `relative w-full h-full [&_.q-layout]:(min-h-full) [&_>_div]:([transform:translate3d(0,_0,_0)]) [&_>_div_>_div]:(min-h-[0] max-h-full)`
  ],

  [
    /^q-layout__shadow$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-layout__shadow'] ??
      `w-full 
      [&:after]:(content-empty absolute top-[0] right-[0] bottom-[0] left-[0] [box-shadow:0_0_10px_2px_rgba(0,_0,_0,_0.2),_0_0px_10px_rgba(0,_0,_0,_0.24)])`
  ],

  [
    /^q-layout__section--marginal$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-layout__section--marginal'] ??
      `text-[#fff] bg-primary`
  ]
]

export { preflights, shortcuts }
