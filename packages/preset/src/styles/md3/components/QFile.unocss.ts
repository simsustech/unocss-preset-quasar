import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-file$/,
    componentClass(
      'q-file',
      qe`[&_.q-field__native]:(break-all overflow-hidden) [&_.q-field__input]:(!opacity-0) [&_.q-field__input::-webkit-file-upload-button]:(cursor-pointer)`
    )
  ],

  [
    /^q-file__filler$/,
    componentClass('q-file__filler', `invisible w-full border-none p-0`)
  ],

  [
    /^q-file__dnd$/,
    componentClass(
      'q-file__dnd',
      `outline-[1px_dashed_currentColor] outline-offset-[-4px]`
    )
  ]
]

export { shortcuts }
