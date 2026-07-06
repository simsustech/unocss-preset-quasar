import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-inner-loading$/,
    componentClass(
      'q-inner-loading',
      `bg-[rgba(255,_255,_255,_0.6)] [border-radius:inherit]`
    )
  ],

  [/^q-inner-loading--dark$/, staticClass(`bg-[rgba(0,_0,_0,_0.4)]`)],

  [/^q-inner-loading__label$/, staticClass(`mt-[8px]`)]
]

export { shortcuts }
