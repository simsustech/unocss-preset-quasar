import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-btn-toggle$/, staticClass(`relative`)],

  [
    /^q-btn-group$/,
    componentClass(
      'q-btn-group',
      `!flex-initial
      align-middle 
      [&_>_.q-btn-item]:(self-stretch) 
      [&_>_.q-btn-group]:([box-shadow:none]) 
      [&_>_.q-btn-item:not(:last-child)]:(rounded-tr-none rounded-br-none) 
      [&_>_.q-btn-item:not(:first-child)]:(rounded-tl-none rounded-bl-none)`
    )
  ],

  [
    /^q-btn-group--push$/,
    componentClass(
      'q-btn-group--push',
      qe`[&_>_.q-btn--push.q-btn--actionable]:(transform-none) [&_>_.q-btn--push.q-btn--actionable_.q-btn__content]:([transition:margin-top_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1),_margin-bottom_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&_>_.q-btn--push.q-btn--actionable:active_.q-btn__content]:(mt-[2px] -mb-[2px])
    [&__>_.q-btn--push.q-btn--actionable.q-btn--active__.q-btn__content]:(mt-[2px] -mb-[2px])`
    )
  ],

  [/^q-btn-group--rounded$/, staticClass(``)],

  [/^q-btn-group--square$/, staticClass(``)],

  [/^q-btn-group--flat$/, staticClass(``)],

  [/^q-btn-group--outline$/, componentClass('q-btn-group--outline', ``)],

  [/^q-btn-group--unelevated$/, staticClass(``)],

  [/^q-btn-group--stretch$/, staticClass(`self-stretch`)],

  [/^q-btn-group--glossy$/, componentClass('q-btn-group--glossy', ``)],

  [
    /^q-btn-group--spread$/,
    componentClass(
      'q-btn-group--spread',
      qe`[&_>_.q-btn-group]:(!flex) [&_>_.q-btn-item]:(w-auto min-w-[0] max-w-full flex-[10000_1_0%])
    [&__>_.q-btn-group_>_.q-btn-item:not(.q-btn-dropdown__arrow-container)]:(w-auto min-w-[0] max-w-full flex-[10000_1_0%])`
    )
  ]
]

export { shortcuts }
