import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-expansion-item__border$/, staticClass(`opacity-0`)],

  [
    /^q-expansion-item__toggle-icon$/,
    componentClass(
      'q-expansion-item__toggle-icon',
      `relative [transition:transform_0.3s]`
    )
  ],

  [
    /^q-expansion-item__toggle-icon--rotated$/,
    componentClass('q-expansion-item__toggle-icon--rotated', `rotate-180`)
  ],

  [
    /^q-expansion-item__toggle-focus$/,
    componentClass(
      'q-expansion-item__toggle-focus',
      qe`!w-[1em] !h-[1em] !relative [&_+_.q-expansion-item__toggle-icon]:(-mt-[1em])`
    )
  ],

  [
    /^q-expansion-item--popup$/,
    componentClass(
      'q-expansion-item--popup',
      qe`[transition:padding_0.5s] [&_>_.q-expansion-item__container]:([border-width:1px] border-solid border-[rgba(0,0,0,0.12)]) [&_>_.q-expansion-item__container_>_.q-separator]:(hidden)`
    )
  ],

  [
    /^q-expansion-item__content$/,
    componentClass(
      'q-expansion-item__content',
      `[&_>_.q-card]:([box-shadow:none] rounded-none)`
    )
  ],

  [
    /^q-expansion-item$/,
    componentClass(
      'q-expansion-item',
      qe`[&:first-child_>_div_>_.q-expansion-item__border--top]:(opacity-0) [&:last-child_>_div_>_.q-expansion-item__border--bottom]:(opacity-0)`
    )
  ],

  [
    /^q-expansion-item--expanded$/,
    componentClass(
      'q-expansion-item--expanded',
      qe`[&__+_.q-expansion-item--expanded
  __>_div
  __>_.q-expansion-item__border--top]:(opacity-0)`
    )
  ],

  [
    /^q-expansion-item--expanded$/,
    componentClass(
      'q-expansion-item--expanded',
      `[&_.q-textarea--autogrow_textarea]:(animate-[q-expansion-done_0s])`
    )
  ]
]

export { shortcuts }
