import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-page$/, staticClass(`relative`)]
]

export { shortcuts }
