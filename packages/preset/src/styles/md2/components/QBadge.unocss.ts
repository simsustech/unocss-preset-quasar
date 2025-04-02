import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-badge$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-badge'] ??
      `text-[#fff] bg-primary px-[6px] py-[2px] rounded-[4px] text-[12px] leading-none min-h-[12px] font-normal align-baseline`
  ],

  [/^q-badge--single-line$/, ([, c], { theme }) => `whitespace-nowrap`],

  [
    /^q-badge--multi-line$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-badge--multi-line'] ??
      `break-all [word-wrap:break-word]`
  ],

  [
    /^q-badge--floating$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-badge--floating'] ??
      `absolute -top-[4px] -right-[3px] [cursor:inherit]`
  ],

  [/^q-badge--transparent$/, ([, c], { theme }) => `opacity-80`],

  [
    /^q-badge--outline$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-badge--outline'] ??
      `bg-transparent border-[1px] border-solid border-[currentColor]`
  ],

  [/^q-badge--rounded$/, ([, c], { theme }) => `rounded-[1em]`]
]

export { shortcuts }
