import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-file$/,
    mdComponent(
      'q-file',
      `[&_.q-field\\_\\_native]:(break-all overflow-hidden) [&_.q-field\\_\\_input]:(!opacity-0) [&_.q-field\\_\\_input::-webkit-file-upload-button]:(cursor-pointer)`
    )
  ],

  [
    /^q-file__filler$/,
    mdComponent('q-file__filler', `invisible w-full border-none p-0`)
  ],

  [
    /^q-file__dnd$/,
    mdComponent(
      'q-file__dnd',
      `outline-[1px_dashed_currentColor] outline-offset-[-4px]`
    )
  ]
]

export { shortcuts }
