import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-banner$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner'] ??
      `min-h-[54px] px-[16px] py-[8px] bg-[#fff]`
  ],

  [/^q-banner--top-padding$/, ([, c], { theme }) => `pt-[14px]`],

  [
    /^q-banner__avatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner__avatar'] ??
      `!min-w-[1px] [&_>_.q-avatar]:(text-[46px]) [&_>_.q-icon]:(text-[40px]) [&:not(:empty)_+_.q-banner\\_\\_content]:(pl-[16px])`
  ],

  [
    /^q-banner__actions$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner__actions'] ??
      `[&.col-auto]:(pl-[16px]) [&.col-all_.q-btn-item]:(mt-[4px] mr-[0] mb-[0] ml-[4px])`
  ],

  [
    /^q-banner--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner--dense'] ??
      `min-h-[32px] p-[8px] [&.q-banner--top-padding]:(pt-[12px]) [&_.q-banner\\_\\_avatar_>_.q-avatar]:(text-[28px]) [&_.q-banner\\_\\_avatar_>_.q-icon]:(text-[28px]) [&_.q-banner\\_\\_avatar:not(:empty)_+_.q-banner\\_\\_content]:(pl-[8px]) [&_.q-banner\\_\\_actions.col-auto]:(pl-[8px])`
  ]
]

export { shortcuts }
