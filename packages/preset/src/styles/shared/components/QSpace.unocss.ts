import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

import { staticClass } from '../../_helpers.js'
const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-space$/, staticClass(`!flex-grow`)]
]

export { shortcuts }
