import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentCtxClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tooltip--style$/,
    componentCtxClass(
      'q-tooltip--style',
      ({ theme }) =>
        `flex items-center max-w-[90vw] sm:max-w-[300px] text-[10px] sm:[font-size:var(--q-font-md)] leading-none bg-$light-inverse-surface dark:[background-color:var(--q-dark-inverse-surface)] text-$light-inverse-on-surface dark:text-$dark-inverse-on-surface rounded-$shape-corner-small normal-case font-normal pointer-events-none`
    )
  ]
]
export { shortcuts }
