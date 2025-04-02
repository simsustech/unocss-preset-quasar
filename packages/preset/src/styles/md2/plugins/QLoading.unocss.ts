import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-loading$/, ([, c], { theme }) => `text-[#000] !fixed`],

  [
    /^q-loading__backdrop$/,
    ([, c], { theme }) =>
      `fixed top-0 right-0 bottom-0 left-0 opacity-50 bg-[#000] [transition:background-color_0.28s] z--1`
  ],

  [
    /^q-loading__box$/,
    ([, c], { theme }) => `rounded-[4px] p-[18px] text-[#fff] max-w-[450px]`
  ],

  [
    /^q-loading__message$/,
    ([, c], { theme }) => `mt-[40px] mx-[20px] mb-[0] text-center`
  ]
]

export { shortcuts }
