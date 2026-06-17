import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-responsive$/, mdStatic(`relative max-w-full max-h-full`)],

  [
    /^q-responsive__filler$/,
    mdComponent(
      'q-responsive__filler',
      `[width:inherit] [max-width:inherit] [height:inherit] [max-height:inherit]`
    )
  ],

  [
    /^q-responsive__content$/,
    mdComponent(
      'q-responsive__content',
      `[border-radius:inherit] [&_>_*]:(!w-full !h-full !max-h-full !max-w-full)`
    )
  ]
]

export { shortcuts }
