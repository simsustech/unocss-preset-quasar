import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentCtxClass
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tooltip--style$/,
    componentCtxClass(
      'q-tooltip--style',
      ({ theme }) =>
        `text-[10px] leading-none bg-$light-inverse-surface dark:bg-$dark-inverse-surface text-$light-inverse-on-surface dark:text-$dark-inverse-on-surface rounded-$shape-corner-small normal-case font-normal pointer-events-none`
    )
  ],
  [
    /^q-tooltip$/,
    componentCtxClass(
      'q-tooltip',
      ({ theme }) =>
        `z-${theme.quasar.z['tooltip']} !fixed overflow-visible px-[10px] py-[4px] leading-none max-w-[95vw]`
    )
  ]
]

export { shortcuts }
