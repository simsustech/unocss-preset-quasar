import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-expansion-item__border$/, mdStatic(`opacity-0`)],

  [
    /^q-expansion-item__toggle-icon$/,
    mdComponent(
      'q-expansion-item__toggle-icon',
      `relative [transition:transform_0.3s]`
    )
  ],

  [
    /^q-expansion-item__toggle-icon--rotated$/,
    mdComponent('q-expansion-item__toggle-icon--rotated', `rotate-180`)
  ],

  [
    /^q-expansion-item__toggle-focus$/,
    mdComponent(
      'q-expansion-item__toggle-focus',
      `!w-[1em] !h-[1em] !relative [&_+_.q-expansion-item\\_\\_toggle-icon]:(-mt-[1em])`
    )
  ],

  [
    /^q-expansion-item--popup$/,
    mdComponent(
      'q-expansion-item--popup',
      `[transition:padding_0.5s] [&_>_.q-expansion-item\\_\\_container]:(border-[1px] border-solid border-[rgba(0,0,0,0.12)]) [&_>_.q-expansion-item\\_\\_container_>_.q-separator]:(hidden)`
    )
  ],

  [
    /^q-expansion-item__content$/,
    mdComponent(
      'q-expansion-item__content',
      `[&_>_.q-card]:([box-shadow:none] rounded-none)`
    )
  ],

  [
    /^q-expansion-item$/,
    mdComponent(
      'q-expansion-item',
      `[&:first-child_>_div_>_.q-expansion-item\\_\\_border--top]:(opacity-0) [&:last-child_>_div_>_.q-expansion-item\\_\\_border--bottom]:(opacity-0)`
    )
  ],

  [
    /^q-expansion-item--expanded$/,
    mdComponent(
      'q-expansion-item--expanded',
      `[&__+_.q-expansion-item--expanded
  __>_div
  __>_.q-expansion-item\\_\\_border--top]:(opacity-0)`
    )
  ],

  [
    /^q-expansion-item--expanded$/,
    mdComponent(
      'q-expansion-item--expanded',
      `[&_.q-textarea--autogrow_textarea]:(animate-[q-expansion-done_0s])`
    )
  ]
]

export { shortcuts }
