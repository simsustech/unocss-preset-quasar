import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-bottom-sheet$/, ([, c], { theme }) => `pb-[8px]`],

  [/^q-bottom-sheet__avatar$/, ([, c], { theme }) => `rounded-[50%]`],

  [
    /^q-bottom-sheet--list$/,
    ([, c], { theme }) =>
      `w-[400px] [&_.q-icon]:(text-[24px] w-[24px] h-[24px]) [&_img]:(text-[24px] w-[24px] h-[24px])`
  ],

  [
    /^q-bottom-sheet--grid$/,
    ([, c], { theme }) =>
      `w-[700px] [&_.q-bottom-sheet\\_\\_item]:(p-[8px] text-center min-w-[100px]) [&_.q-icon]:(text-[48px] w-[48px] h-[48px] mb-[8px]) [&_img]:(text-[48px] w-[48px] h-[48px] mb-[8px]) [&_.q-bottom-sheet\\_\\_empty-icon]:(text-[48px] w-[48px] h-[48px] mb-[8px]) [&_.q-separator]:(mx-[0] my-[12px])`
  ],

  [
    /^q-bottom-sheet__item$/,
    ([, c], { theme }) => `flex-[0_0_33.3333%] sm:flex-[0_0_25%]`
  ]
]

export { shortcuts }
