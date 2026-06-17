import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-inner-loading$/,
    mdComponent(
      'q-inner-loading',
      `bg-[rgba(255,_255,_255,_0.6)] [border-radius:inherit]`
    )
  ],

  [/^q-inner-loading--dark$/, mdStatic(`bg-[rgba(0,_0,_0,_0.4)]`)],

  [/^q-inner-loading__label$/, mdStatic(`mt-[8px]`)]
]

export { shortcuts }
