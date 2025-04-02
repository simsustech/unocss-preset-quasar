import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-scrollarea$/, ([, c], { theme }) => `relative`],

  [
    /^q-scrollarea__bar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-scrollarea__bar'] ??
      `opacity-20 [transition:opacity_0.3s]`
  ],

  [
    /^q-scrollarea__thumb$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-scrollarea__thumb'] ??
      `opacity-20 [transition:opacity_0.3s] bg-[#000] rounded-[3px]`
  ],

  [/^q-scrollarea__bar--v$/, ([, c], { theme }) => `right-0 w-[10px]`],

  [/^q-scrollarea__thumb--v$/, ([, c], { theme }) => `right-0 w-[10px]`],

  [/^q-scrollarea__bar--h$/, ([, c], { theme }) => `bottom-0 h-[10px]`],

  [/^q-scrollarea__thumb--h$/, ([, c], { theme }) => `bottom-0 h-[10px]`],

  [
    /^q-scrollarea__bar--invisible$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-scrollarea__bar--invisible'] ??
      `!opacity-0 pointer-events-none`
  ],

  [
    /^q-scrollarea__thumb--invisible$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-scrollarea__thumb--invisible'] ??
      `!opacity-0 pointer-events-none`
  ],

  [/^q-scrollarea__thumb:hover$/, ([, c], { theme }) => `hover:opacity-30`],

  [/^q-scrollarea__thumb:active$/, ([, c], { theme }) => `active:opacity-50`],

  [
    /^q-scrollarea__content$/,
    ([, c], { theme }) => `!relative min-h-full min-w-full`
  ],

  [
    /^q-scrollarea--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-scrollarea--dark'] ??
      `[&_.q-scrollarea\\_\\_thumb]:(bg-[#fff])`
  ]
]

export { shortcuts }
