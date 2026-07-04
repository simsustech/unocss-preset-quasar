import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `

`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-checkbox$/,
    componentClass(
      'q-checkbox',
      qe`align-middle [&.disabled]:(!opacity-75)
      [&:not(.disabled):hover_q-checkbox__inner:before]:(content-[''] absolute top-0 left-0 bottom-0 right-0 border-rd-50 bg-current op-12 scale-x-120 scale-y-120 scale-z-100)
      [&:not(.disabled):focus_q-checkbox__inner:before]:(scale-z-100)`
    )
  ],

  [/^q-checkbox__native$/, staticClass(`w-px h-px`)],

  [/^q-checkbox__label$/, componentClass('q-checkbox__label', `pl-0.25em`)],

  [
    /^q-checkbox__bg$/,
    componentClass(
      'q-checkbox__bg',
      `ml--2px mt--2px select-none top-1/4 left-1/4 w-1/2 h-1/2 [border-width:2px] border-solid border-[currentColor] rounded-[2px] [transition:background_0.22s_cubic-bezier(0,_0,_0.2,_1)_0ms]`
    )
  ],

  [/^q-checkbox__icon-container$/, staticClass(`select-none`)],

  [/^q-checkbox__icon$/, staticClass(`text-current text-[0.5em]`)],

  [/^q-checkbox__svg$/, staticClass(`text-[#fff]`)],

  [
    /^q-checkbox__truthy$/,
    componentClass(
      'q-checkbox__truthy',
      `stroke-current [stroke-width:3.12px] [stroke-dashoffset:29.78334] [stroke-dasharray:29.78334]`
    )
  ],

  [
    /^q-checkbox__indet$/,
    componentClass(
      'q-checkbox__indet',
      `fill-current origin-[50%_50%] -rotate-[280deg] scale-0`
    )
  ],

  [
    /^q-checkbox__inner$/,
    componentClass(
      'q-checkbox__inner',
      `mr-2px text-[36px] w-[1em] min-w-[1em] h-[1em] outline-[0] [border-radius:var(--q-radius-circle)] text-[rgba(0,_0,_0,_0.54)]`
    )
  ],

  [
    /^q-checkbox__inner--truthy$/,
    componentClass(
      'q-checkbox__inner--truthy',
      qe`[color:var(--q-primary)] dark:[color:var(--q-primary)]
      [&_.q-checkbox__bg]:(bg-current)
      [&_path]:([stroke-dashoffset:0] [transition:stroke-dashoffset_0.18s_cubic-bezier(0.4,_0,_0.6,_1)_0ms])`
    )
  ],

  [
    /^q-checkbox__inner--indet$/,
    componentClass(
      'q-checkbox__inner--indet',
      qe`[color:var(--q-primary)] dark:[color:var(--q-primary)]
      [&_q-checkbox__bg]:(bg-current)
      [&_q-checkbox__indet]:(rotate-[0] scale-100 [transition:transform_0.22s_cubic-bezier(0,_0,_0.2,_1)_0ms])`
    )
  ],

  [
    /^q-checkbox--dark$/,
    componentClass(
      'q-checkbox--dark',
      qe`[&_.q-checkbox__inner]:(text-[rgba(255,_255,_255,_0.7)])
       [&_.q-checkbox__inner:before]:(!opacity-[0.32])
       [&_.q-checkbox__inner--truthy]:([color:var(--q-primary)] dark:[color:var(--q-primary)])
       [&_.q-checkbox__inner--indet]:([color:var(--q-primary)] dark:[color:var(--q-primary)])`
    )
  ],

  [
    /^q-checkbox--dense$/,
    componentClass(
      'q-checkbox--dense',
      qe`[&_.q-checkbox__inner]:(w-[0.5em] min-w-[0.5em] h-[0.5em])
       [&_q-checkbox__bg]:(left-[5%] top-[5%] w-[90%] h-[90%])
       [&_q-checkbox__label]:(pl-[0.5em])
       [&.reverse_q-checkbox__label]:(pl-0 pr-[0.5em])`
    )
  ]
]

export { preflights, shortcuts }
