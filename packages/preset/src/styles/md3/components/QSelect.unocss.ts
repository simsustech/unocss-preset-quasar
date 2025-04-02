import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.mobile:not(.native-mobile) .q-select__dialog {
  max-height: calc(100vh - 108px) !important;
}

body.platform-android.native-mobile .q-dialog__inner--top .q-select__dialog {
  max-height: calc(100vh - 24px) !important;
}
body.platform-android:not(.native-mobile) .q-dialog__inner--top .q-select__dialog {
  max-height: calc(100vh - 80px) !important;
}

body.platform-ios.native-mobile .q-dialog__inner--top > div {
  border-radius: 4px;
}
body.platform-ios.native-mobile .q-dialog__inner--top .q-select__dialog--focused {
  max-height: 47vh !important;
}
body.platform-ios:not(.native-mobile) .q-dialog__inner--top .q-select__dialog--focused {
  max-height: 50vh !important;
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-select--without-input$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select--without-input'] ??
      `[&_.q-field\\_\\_control]:(cursor-pointer)`
  ],

  [
    /^q-select--with-input$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select--with-input'] ??
      `[&_.q-field\\_\\_control]:(cursor-text)`
  ],

  [
    /^q-select$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select'] ??
      `[&_.q-field\\_\\_input]:(!min-w-[50px] cursor-text) [&_.q-field\\_\\_input--padding]:(pl-[4px])`
  ],

  [
    /^q-select__focus-target$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select__focus-target'] ??
      `absolute !outline-0 w-px h-px p-0 border-0 opacity-0`
  ],

  [
    /^q-select__autocomplete-input$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select__autocomplete-input'] ??
      `absolute !outline-0 w-px h-px p-0 border-0 opacity-0`
  ],

  [
    /^q-select__dropdown-icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select__dropdown-icon'] ??
      `cursor-pointer [transition:transform_0.28s]`
  ],

  [
    /^q-select__dialog$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-select__dialog'] ??
      `!w-[90vw] !max-w-[90vw] !max-h-[calc(100vh-70px)] bg-[#fff] flex flex-col [&_>_.scroll]:(relative [background:inherit])`
  ]
]

export { preflights, shortcuts }
