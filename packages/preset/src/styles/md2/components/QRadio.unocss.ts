import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = []
const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-radio$/,
    componentClass('q-radio', `align-middle [&.disabled]:(!opacity-75)`)
  ],

  [
    /^q-radio__native$/,
    componentClass(
      'q-radio__native',
      `w-full h-full accent-current cursor-pointer bg-transparent border-none outline-0`
    )
  ],

  [
    /^q-radio__inner$/,
    componentClass(
      'q-radio__inner',
      `text-[40px] w-[1em] min-w-[1em] h-[1em] outline-[0] rounded-[50%] text-[rgba(0,_0,_0,_0.54)] inline-flex items-center justify-center`
    )
  ],

  [
    /^q-radio__inner--truthy$/,
    componentClass('q-radio__inner--truthy', `text-primary`)
  ],

  [
    /^q-radio--dark$/,
    componentClass(
      'q-radio--dark',
      qe`[&_.q-radio__inner]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-radio__inner--truthy]:(text-primary)`
    )
  ],

  [
    /^q-radio--dense$/,
    componentClass(
      'q-radio--dense',
      qe`[&_.q-radio__inner]:(w-[0.5em] min-w-[0.5em] h-[0.5em]) [&_.q-radio__label]:(pl-[0.5em]) [&.reverse_.q-radio__label]:(pl-0 pr-[0.5em])`
    )
  ]
]

export { preflights, shortcuts }
