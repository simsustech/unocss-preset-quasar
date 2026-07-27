import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = []
const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-toggle$/,
    componentClass(
      'q-toggle',
      qe`align-middle [&.disabled]:(!opacity-75)
      [&_.q-toggle__label]:(pl-[0.5em])
      [&.reverse_.q-toggle__label]:(pl-0 pr-[0.5em])
      [&:not(.disabled)_.q-toggle__thumb:before]:(absolute top-0 left-0 right-0 bottom-0 bg-current border-rd-[50%] transform-scale-z-1 op-0)
      [&:not(.disabled):hover_.q-toggle__thumb:before]:(scale-[2.0] opacity-12)`
    )
  ],

  [/^q-toggle__native$/, componentClass('q-toggle__native', `w-px h-px`)],

  [
    /^q-toggle__track$/,
    componentClass(
      'q-toggle__track',
      `relative outline-solid outline-2px outline-$light-outline dark:outline-$dark-outline !rounded-full h-[1em] w-[1.625em] bg-$light-surface-container dark:bg-$dark-surface-container`
    )
  ],

  [
    /^q-toggle__thumb$/,
    componentClass(
      'q-toggle__thumb',
      qe`text-$light-surface-container-highest dark:text-$dark-surface-container-highest
      absolute top-[0.25em] left-[0.15em] w-[0.5em] h-[0.5em] [transition:left_0.22s_cubic-bezier(0.4,_0,_0.2,_1)] select-none z-0
    [&_.q-toggle__thumb-knob]:(bg-$light-outline dark:bg-$dark-outline absolute top-[0] right-[0] bottom-[0] left-[0] rounded-[50%] [box-shadow:0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)])
    [&_.q-icon]:(z-2 text-[0.33em] text-[#000] opacity-[0.54])`
    )
  ],

  [
    /^q-toggle__inner$/,
    componentClass(
      'q-toggle__inner',
      `relative [font-size:32px] h-[1em] w-[1.625em] [padding:0]`
    )
  ],

  [
    /^q-toggle__inner--indet$/,
    componentClass(
      'q-toggle__inner--indet',
      qe`[&_.q-toggle__thumb]:(left-[0.4375em])`
    )
  ],

  [
    /^q-toggle__inner--truthy$/,
    componentClass(
      'q-toggle__inner--truthy',
      qe`[&_.q-toggle__track]:(bg-$light-primary dark:bg-$dark-primary)
      [&_.q-toggle__thumb]:(text-$light-on-primary-container dark:text-$light-on-primary-container left-[0.725em] top-[0.125em] w-[0.75em] h-[0.75em])
      [&_.q-toggle__thumb:after]:(!bg-$light-on-primary dark:!bg-$dark-on-primary)
      [&_.q-toggle__thumb_.q-icon]:(text-[#fff] opacity-100)`
    )
  ],

  [
    /^q-toggle--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle--dark'] ??
      qe`[&_.q-toggle__thumb:after]:([box-shadow:none]) [&_.q-toggle__thumb:before]:(!opacity-[0.32])`
  ],

  [
    /^q-toggle--dense$/,
    componentClass(
      'q-toggle--dense',
      qe`[&_.q-toggle__inner]:([font-size:28px] h-[1em] w-[1.625em] min-w-[1.625em] px-[0] py-[0])`
    )
  ]
]

export { preflights, shortcuts }
