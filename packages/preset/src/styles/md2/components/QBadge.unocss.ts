import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-badge$/,
    mdComponent(
      'q-badge',
      `text-[#fff] bg-primary px-[6px] py-[2px] rounded-[4px] text-[12px] leading-none min-h-[12px] font-normal align-baseline`
    )
  ],

  [/^q-badge--single-line$/, mdStatic(`whitespace-nowrap`)],

  [
    /^q-badge--multi-line$/,
    mdComponent('q-badge--multi-line', `break-all [word-wrap:break-word]`)
  ],

  [
    /^q-badge--floating$/,
    mdComponent(
      'q-badge--floating',
      `absolute -top-[4px] -right-[3px] [cursor:inherit]`
    )
  ],

  [/^q-badge--transparent$/, mdStatic(`opacity-80`)],

  [
    /^q-badge--outline$/,
    mdComponent(
      'q-badge--outline',
      `bg-transparent border-[1px] border-solid border-[currentColor]`
    )
  ],

  [/^q-badge--rounded$/, mdStatic(`rounded-[1em]`)]
]

export { shortcuts }
