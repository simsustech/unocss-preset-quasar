import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-responsive$/, staticClass(`relative max-w-full max-h-full`)],

  [
    /^q-responsive__filler$/,
    componentClass(
      'q-responsive__filler',
      `[width:inherit] [max-width:inherit] [height:inherit] [max-height:inherit]`
    )
  ],

  [
    /^q-responsive__content$/,
    componentClass(
      'q-responsive__content',
      `[border-radius:inherit] [&_>_*]:(!w-full !h-full !max-h-full !max-w-full)`
    )
  ]
]

export { shortcuts }
