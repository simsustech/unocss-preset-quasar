import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic, mdComponentCtx } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tooltip--style$/,
    mdComponentCtx(
      'q-tooltip--style',
      ({ theme }) =>
        `text-[10px] text-[#fafafa] bg-[#757575] rounded-[4px] normal-case font-normal`
    )
  ],

  [
    /^q-tooltip$/,
    mdComponentCtx(
      'q-tooltip',
      ({ theme }) =>
        `z-${theme.quasar.z['tooltip']} !fixed overflow-y-auto overflow-x-hidden px-[10px] py-[6px] max-w-[95vw] max-h-[65vh] sm:(text-14px pt-8px pb-8px pl-16px pr-16px)`
    )
  ]
]

export { shortcuts }
