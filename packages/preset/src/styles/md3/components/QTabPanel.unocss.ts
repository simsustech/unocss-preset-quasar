import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

import { staticClass } from '../../_helpers.js'
const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-tab-panels$/, staticClass(`bg-inherit`)],

  [/^q-tab-panel$/, staticClass(`p-[16px]`)]
]

export { shortcuts }
