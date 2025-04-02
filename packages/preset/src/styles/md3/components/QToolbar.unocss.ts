import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-toolbar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toolbar'] ??
      `relative px-[12px] py-[0] min-h-[50px] [&_.q-avatar]:(text-[38px])
      `
    // w-full
  ],

  [/^q-toolbar--inset$/, ([, c], { theme }) => `pl-[58px]`],

  [
    /^q-toolbar__title$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toolbar__title'] ??
      `flex-1 min-w-[1px] max-w-full text-[21px] font-normal tracking-[0.01em] px-[12px] py-[0] [&:first-child]:(pl-0) [&:last-child]:(pr-0)`
  ]
]

export { shortcuts }
