import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tooltip--style$/,
    componentCtxClass(
      'q-tooltip--style',
      ({ theme }) => `h-[24px] text-[12px] leading-[16px] normal-case`
    )
  ],

  [
    /^q-tooltip$/,
    componentCtxClass(
      'q-tooltip',
      ({ theme }) =>
        `z-${theme.quasar.z['tooltip']} !fixed overflow-y-auto overflow-x-hidden px-[10px] py-[6px] max-w-[95vw] max-h-[65vh] sm:(text-14px pt-8px pb-8px pl-16px pr-16px)`
    )
  ]
]

export { shortcuts }
