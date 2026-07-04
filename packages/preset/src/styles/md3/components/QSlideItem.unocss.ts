import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-slide-item$/,
    staticClass(
      `relative [background-color:var(--q-surface)] dark:[background-color:var(--q-surface)]`
    )
  ],

  [
    /^q-slide-item__left$/,
    componentClass(
      'q-slide-item__left',
      `invisible [font-size:var(--q-font-md)] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#4caf50] [padding-inline:var(--q-space-lg)] [padding-block:var(--q-space-sm)] [&_>_div]:(origin-[left_center])`
    )
  ],

  [
    /^q-slide-item__right$/,
    componentClass(
      'q-slide-item__right',
      `invisible [font-size:var(--q-font-md)] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#ff9800] [padding-inline:var(--q-space-lg)] [padding-block:var(--q-space-sm)] [&_>_div]:(origin-[right_center])`
    )
  ],

  [
    /^q-slide-item__top$/,
    componentClass(
      'q-slide-item__top',
      `invisible [font-size:var(--q-font-md)] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#2196f3] [padding-inline:var(--q-space-sm)] [padding-block:var(--q-space-lg)] [&_>_div]:(origin-[top_center])`
    )
  ],

  [
    /^q-slide-item__bottom$/,
    componentClass(
      'q-slide-item__bottom',
      `invisible [font-size:var(--q-font-md)] text-[#fff] [&_.q-icon]:(text-[1.714em]) bg-[#9c27b0] [padding-inline:var(--q-space-sm)] [padding-block:var(--q-space-lg)] [&_>_div]:(origin-[bottom_center])`
    )
  ],

  [
    /^q-slide-item__content$/,
    componentClass(
      'q-slide-item__content',
      `[background:inherit] [transition:transform_0.2s_ease-in] select-none cursor-pointer`
    )
  ]
]

export { shortcuts }
