import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentCtxClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tooltip$/,
    componentCtxClass(
      'q-tooltip',
      ({ theme }) =>
        `z-${theme.quasar.z['tooltip']} !fixed overflow-y-auto overflow-x-hidden px-[10px] py-[6px] max-w-[95vw] max-h-[65vh] sm:(pt-8px pb-8px pl-16px pr-16px)`
    )
  ],
  [
    /^q-tooltip--style$/,
    componentCtxClass(
      'q-tooltip--style',
      ({ theme }) =>
        `inline-block max-w-[90vw] sm:max-w-[300px] text-[10px] sm:text-[14px] leading-normal px-[8px] py-[4px] bg-$light-inverse-surface dark:bg-$dark-inverse-surface text-$light-inverse-on-surface dark:text-$dark-inverse-on-surface rounded-$shape-corner-small normal-case font-normal pointer-events-none`
    )
  ]
]
export { shortcuts }
