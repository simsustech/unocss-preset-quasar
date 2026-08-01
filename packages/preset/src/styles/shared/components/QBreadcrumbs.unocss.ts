import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

import { staticClass } from '../../_helpers.js'
const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `[dir=rtl] .q-breadcrumbs__separator .q-icon {
  /* rtl:ignore */
  transform: scaleX(-1);
}`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-breadcrumbs__el$/, staticClass(`text-inherit`)],
  [/^q-breadcrumbs__el-icon$/, staticClass(`text-125%`)],
  [/^q-breadcrumbs__el-icon--with-label$/, staticClass(`mr-8px`)]
]

export { preflights, shortcuts }
