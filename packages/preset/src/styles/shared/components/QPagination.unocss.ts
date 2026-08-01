import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-pagination$/,
    componentClass(
      'q-pagination',
      `!flex-initial [&_input]:(text-center) [&_input::-webkit-outer-spin-button]:(m-0) [&_input::-webkit-inner-spin-button]:(m-0)`
    )
  ],

  [
    /^q-pagination__content$/,
    componentClass(
      'q-pagination__content',
      `!flex-initial mt-[var(--q-pagination-gutter-parent)] ml-[var(--q-pagination-gutter-parent)] [&_>_.q-btn]:(mt-[var(--q-pagination-gutter-child)] ml-[var(--q-pagination-gutter-child)]) [&_>_.q-input]:(mt-[var(--q-pagination-gutter-child)] ml-[var(--q-pagination-gutter-child)])`
    )
  ],

  [
    /^q-pagination__middle$/,
    componentClass(
      'q-pagination__middle',
      `[&_>_.q-btn]:(mt-[var(--q-pagination-gutter-child)] ml-[var(--q-pagination-gutter-child)])`
    )
  ]
]

export { shortcuts }
