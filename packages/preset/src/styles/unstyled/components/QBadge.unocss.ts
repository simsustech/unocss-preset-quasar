import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-badge$/,
    componentClass(
      'q-badge',
      `px-[6px] py-[2px] text-[12px] min-h-[12px] align-baseline`
    )
  ],

  [/^q-badge--single-line$/, staticClass(`whitespace-nowrap`)],

  [
    /^q-badge--multi-line$/,
    componentClass('q-badge--multi-line', `break-all [word-wrap:break-word]`)
  ],

  [
    /^q-badge--floating$/,
    componentClass(
      'q-badge--floating',
      `absolute -top-[4px] -right-[3px] [cursor:inherit]`
    )
  ],

  [/^q-badge--transparent$/, staticClass(`opacity-80`)],

  [/^q-badge--outline$/, componentClass('q-badge--outline', ``)],

  [/^q-badge--rounded$/, staticClass(``)]
]

export { shortcuts }
