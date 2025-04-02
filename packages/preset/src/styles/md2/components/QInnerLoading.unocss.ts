import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-inner-loading$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-inner-loading'] ??
      `bg-[rgba(255,_255,_255,_0.6)] [border-radius:inherit]`
  ],

  [/^q-inner-loading--dark$/, ([, c], { theme }) => `bg-[rgba(0,_0,_0,_0.4)]`],

  [/^q-inner-loading__label$/, ([, c], { theme }) => `mt-[8px]`]
]

export { shortcuts }
