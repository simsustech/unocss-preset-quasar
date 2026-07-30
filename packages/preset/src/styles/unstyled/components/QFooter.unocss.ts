import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass,
  qe
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-footer--hidden$/, staticClass(`[transform:translateY(110%)]`)],

  [
    /^q-footer$/,
    componentCtxClass(
      'q-footer',
      ({ theme }) =>
        qe`[&_.q-layout__shadow]:(-top-[10px]) [&_.q-layout__shadow:after]:(top-[10px]) z-${theme.quasar.z['marginals']}`
    )
  ]
]

export { shortcuts }
