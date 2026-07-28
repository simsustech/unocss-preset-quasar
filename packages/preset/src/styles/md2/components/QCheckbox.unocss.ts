import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = []
const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-checkbox$/,
    componentClass('q-checkbox', `align-middle [&.disabled]:(!opacity-75)`)
  ],

  [
    /^q-checkbox__native$/,
    componentClass(
      'q-checkbox__native',
      `w-full h-full accent-current cursor-pointer bg-transparent border-none outline-0`
    )
  ],

  [
    /^q-checkbox__inner$/,
    componentClass(
      'q-checkbox__inner',
      `text-[40px] w-[1em] min-w-[1em] h-[1em] outline-[0] rounded-[2px] text-[rgba(0,_0,_0,_0.54)] inline-flex items-center justify-center`
    )
  ],

  [
    /^q-checkbox__inner--truthy$/,
    componentClass('q-checkbox__inner--truthy', `text-primary`)
  ],

  [
    /^q-checkbox__inner--indet$/,
    componentClass('q-checkbox__inner--indet', `text-primary`)
  ],

  [
    /^q-checkbox--dark$/,
    componentClass(
      'q-checkbox--dark',
      qe`[&_.q-checkbox__inner]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-checkbox__inner--truthy]:(text-primary) [&_.q-checkbox__inner--indet]:(text-primary)`
    )
  ],

  [
    /^q-checkbox--dense$/,
    componentClass(
      'q-checkbox--dense',
      qe`[&_.q-checkbox__inner]:(w-[0.5em] min-w-[0.5em] h-[0.5em]) [&_.q-checkbox__label]:(pl-[0.5em]) [&.reverse_.q-checkbox__label]:(pl-0 pr-[0.5em])`
    )
  ]
]

export { preflights, shortcuts }
