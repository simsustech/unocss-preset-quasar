import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-popup-edit$/,
    staticClass(
      `[padding-inline:var(--q-space-lg)] [padding-block:var(--q-space-sm)]`
    )
  ],

  [
    /^q-popup-edit__buttons$/,
    componentClass(
      'q-popup-edit__buttons',
      `mt-[8px] [&_.q-btn_+_.q-btn]:(ml-[8px])`
    )
  ]
]

export { shortcuts }
