import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-slide-item$/, ([, c], { theme }) => `relative bg-[white]`],

  [
    /^q-slide-item__left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-slide-item__left'] ??
      `invisible text-[14px] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#4caf50] px-[16px] py-[8px] [&_>_div]:(origin-[left_center])`
  ],

  [
    /^q-slide-item__right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-slide-item__right'] ??
      `invisible text-[14px] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#ff9800] px-[16px] py-[8px] [&_>_div]:(origin-[right_center])`
  ],

  [
    /^q-slide-item__top$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-slide-item__top'] ??
      `invisible text-[14px] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#2196f3] px-[8px] py-[16px] [&_>_div]:(origin-[top_center])`
  ],

  [
    /^q-slide-item__bottom$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-slide-item__bottom'] ??
      `invisible text-[14px] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#9c27b0] px-[8px] py-[16px] [&_>_div]:(origin-[bottom_center])`
  ],

  [
    /^q-slide-item__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-slide-item__content'] ??
      `[background:inherit] [transition:transform_0.2s_ease-in] select-none cursor-pointer`
  ]
]

export { shortcuts }
