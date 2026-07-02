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
        `!overflow-visible text-[10px] sm:text-[14px] leading-none bg-$light-inverse-surface dark:bg-$dark-inverse-surface text-$light-inverse-on-surface dark:text-$dark-inverse-on-surface rounded-$shape-corner-small normal-case font-normal pointer-events-none`
    )
  ]
]

export { shortcuts }
