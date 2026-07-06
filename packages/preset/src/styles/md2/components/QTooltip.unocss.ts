import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentCtxClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-tooltip--style$/,
    componentCtxClass('q-tooltip--style', ({ theme }) =>
      `text-[10px] text-[#fafafa] bg-[#757575] rounded-[4px] normal-case font-normal`
    )
  ]
]
export { shortcuts }
