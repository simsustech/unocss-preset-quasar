import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => qe`
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

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-select--without-input$/,
    componentClass(
      'q-select--without-input',
      qe`[&_.q-field__control]:(cursor-pointer)`
    )
  ],

  [
    /^q-select--with-input$/,
    componentClass(
      'q-select--with-input',
      qe`[&_.q-field__control]:(cursor-text)`
    )
  ],

  [
    /^q-select$/,
    componentClass(
      'q-select',
      qe`[&_.q-field__native]:(pr-[48px]) [&_.q-field__input]:(!min-w-[50px] cursor-text pr-[48px]) [&_.q-field__input--padding]:(pl-[4px])`
    )
  ],

  [
    /^q-select__focus-target$/,
    componentClass(
      'q-select__focus-target',
      `absolute !outline-0 w-px h-px p-0 border-0 opacity-0`
    )
  ],

  [
    /^q-select__autocomplete-input$/,
    componentClass(
      'q-select__autocomplete-input',
      `absolute !outline-0 w-px h-px p-0 border-0 opacity-0`
    )
  ],

  [
    /^q-select__dropdown-icon$/,
    componentClass(
      'q-select__dropdown-icon',
      `cursor-pointer [transition:transform_0.28s]`
    )
  ],

  [
    /^q-select__dialog$/,
    componentClass(
      'q-select__dialog',
      `!w-[90vw] !max-w-[90vw] !max-h-[calc(100vh-70px)] flex flex-col [&_>_.scroll]:(relative)`
    )
  ]
]

export { preflights, shortcuts }
