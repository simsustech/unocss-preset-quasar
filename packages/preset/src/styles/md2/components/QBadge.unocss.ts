import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-badge$/,
    componentClass(
      'q-badge',
      `text-[#fff] bg-primary px-[6px] py-[2px] [border-radius:var(--q-radius-sm)] [font-size:var(--q-font-sm)] leading-none min-h-[12px] font-normal align-baseline`
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
      `!absolute !-top-[4px] -right-[3px] [cursor:inherit] isolate z-10`
    )
  ],

  [/^q-badge--transparent$/, staticClass(`opacity-80`)],

  [
    /^q-badge--outline$/,
    componentClass(
      'q-badge--outline',
      `bg-transparent [border-width:1px] border-solid border-[currentColor]`
    )
  ],

  [/^q-badge--rounded$/, staticClass(`rounded-[1em]`)]
]

export { shortcuts }
