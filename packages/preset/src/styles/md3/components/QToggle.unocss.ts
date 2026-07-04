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
      [&:not(.disabled)_.q-toggle__thumb:before]:(absolute content-[''] top-0 left-0 right-0 bottom-0 bg-current border-rd-[50%] transform-scale-z-1 op-0)
      [&:not(.disabled):hover_.q-toggle__thumb:before]:(scale-[2.0] opacity-12)`
    )
  ],

  [/^q-toggle__native$/, componentClass('q-toggle__native', `w-px h-px`)],

  [
    /^q-toggle__track$/,
    componentClass(
      'q-toggle__track',
`[outline:var(--q-toggle-track-outline)] [border-radius:var(--q-toggle-track-border-radius)] [height:var(--q-toggle-track-height)] [width:var(--q-toggle-inner-width)] [background-color:var(--q-toggle-track-bg)] [opacity:var(--q-toggle-track-opacity)]`
    )
  ],

  [
    /^q-toggle__thumb$/,
    componentClass(
      'q-toggle__thumb',
      qe`text-$light-surface-container-highest dark:text-$dark-surface-container-highest
      absolute top-[0.25em] left-[0.15em] w-[0.5em] h-[0.5em] [transition:left_0.22s_cubic-bezier(0.4,_0,_0.2,_1)] select-none z-0
    [&:after]:(content-[''] [background-color:var(--q-outline)] dark:[background-color:var(--q-dark-outline)] absolute top-[0] right-[0] bottom-[0] left-[0] [border-radius:var(--q-radius-circle)] [box-shadow:0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)])
    [&_.q-icon]:(z-2 text-[0.33em] text-[#000] opacity-[0.54])`
    )
  ],

  [
    /^q-toggle__inner$/,
    componentClass(
      'q-toggle__inner',
      `relative [font-size:var(--q-toggle-font-size)] h-[1em] [width:var(--q-toggle-inner-width)] [padding:0]`
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
      qe`[&_.q-toggle__track]:([background-color:var(--q-primary)] dark:[background-color:var(--q-primary)])
      [&_.q-toggle__thumb]:([color:var(--q-on-primary-container)] dark:[color:var(--q-on-primary-container)] left-[0.725em] top-[0.125em] w-[0.75em] h-[0.75em])
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
      qe`[&_.q-toggle__inner]:([font-size:var(--q-toggle-dense-font-size)] h-[1em] w-[1.625em] min-w-[1.625em] px-[0] py-[0])`
    )
  ]
]

export { preflights, shortcuts }
