import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-page-sticky--shrink$/,
    componentClass(
      'q-page-sticky--shrink',
      `pointer-events-none [&_>_div]:(inline-block pointer-events-auto)`
    )
  ]
]

export { shortcuts }
