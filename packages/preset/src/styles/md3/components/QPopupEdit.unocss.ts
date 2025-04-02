import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-popup-edit$/, ([, c], { theme }) => `px-[16px] py-[8px]`],

  [
    /^q-popup-edit__buttons$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-popup-edit__buttons'] ??
      `mt-[8px] [&_.q-btn_+_.q-btn]:(ml-[8px])`
  ]
]

export { shortcuts }
