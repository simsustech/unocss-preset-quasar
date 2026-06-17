import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-page-sticky$/, mdComponent('q-page-sticky', ``)],
  [
    /^q-page-sticky--shrink$/,
    mdComponent(
      'q-page-sticky--shrink',
      `pointer-events-none [&_>_div]:(inline-block pointer-events-auto)`
    )
  ]
]

export { shortcuts }
