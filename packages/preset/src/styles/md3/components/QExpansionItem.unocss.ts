import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-expansion-item__border$/, ([, c], { theme }) => `opacity-0`],

  [
    /^q-expansion-item__toggle-icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item__toggle-icon'] ??
      `relative [transition:transform_0.3s]`
  ],

  [
    /^q-expansion-item__toggle-icon--rotated$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item__toggle-icon--rotated'] ??
      `rotate-180`
  ],

  [
    /^q-expansion-item__toggle-focus$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item__toggle-focus'] ??
      `!w-[1em] !h-[1em] !relative [&_+_.q-expansion-item\\_\\_toggle-icon]:(-mt-[1em])`
  ],

  [
    /^q-expansion-item--popup$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item--popup'] ??
      `[transition:padding_0.5s] [&_>_.q-expansion-item\\_\\_container]:(border-[1px] border-solid border-[rgba(0,0,0,0.12)]) [&_>_.q-expansion-item\\_\\_container_>_.q-separator]:(hidden)`
  ],

  [
    /^q-expansion-item__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item__content'] ??
      `[&_>_.q-card]:([box-shadow:none] rounded-none)`
  ],

  [
    /^q-expansion-item$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item'] ??
      `[&:first-child_>_div_>_.q-expansion-item\\_\\_border--top]:(opacity-0) [&:last-child_>_div_>_.q-expansion-item\\_\\_border--bottom]:(opacity-0)`
  ],

  [
    /^q-expansion-item--expanded$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item--expanded'] ??
      `[&__+_.q-expansion-item--expanded
  __>_div
  __>_.q-expansion-item\\_\\_border--top]:(opacity-0)`
  ],

  [
    /^q-expansion-item--expanded$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-expansion-item--expanded'] ??
      `[&_.q-textarea--autogrow_textarea]:(animate-[q-expansion-done_0s])`
  ]
]

export { shortcuts }
