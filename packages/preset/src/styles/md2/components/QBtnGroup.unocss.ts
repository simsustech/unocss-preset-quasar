import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-btn-group$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn-group'] ??
      `rounded-[3px] [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] align-middle [&_>_.q-btn-item]:([border-radius:inherit] self-stretch) [&_>_.q-btn-item:before]:([box-shadow:none]) [&_>_.q-btn-item_.q-badge--floating]:(right-0) [&_>_.q-btn-group]:([box-shadow:none]) [&_>_.q-btn-group:first-child_>_.q-btn:first-child]:([border-top-left-radius:inherit] [border-bottom-left-radius:inherit]) [&_>_.q-btn-group:last-child_>_.q-btn:last-child]:([border-top-right-radius:inherit] [border-bottom-right-radius:inherit]) [&_>_.q-btn-group:not(:first-child)_>_.q-btn:first-child:before]:([border-left:0]) [&_>_.q-btn-group:not(:last-child)_>_.q-btn:last-child:before]:([border-right:0]) [&_>_.q-btn-item:not(:last-child)]:(rounded-tr-none rounded-br-none) [&_>_.q-btn-item:not(:first-child)]:(rounded-tl-none rounded-bl-none) [&_>_.q-btn-item.q-btn--standard:before]:(z--1)`
  ],

  [
    /^q-btn-group--push$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn-group--push'] ??
      `rounded-[7px] [&_>_.q-btn--push.q-btn--actionable]:(transform-none) [&_>_.q-btn--push.q-btn--actionable_.q-btn\\_\\_content]:([transition:margin-top_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1),_margin-bottom_0.3s_cubic-bezier(0.25,_0.8,_0.5,_1)]) [&_>_.q-btn--push.q-btn--actionable:active_.q-btn\\_\\_content]:(mt-[2px] -mb-[2px])
    [&__>_.q-btn--push.q-btn--actionable.q-btn--active__.q-btn\\_\\_content]:(mt-[2px] -mb-[2px])`
  ],

  [/^q-btn-group--rounded$/, ([, c], { theme }) => `rounded-[28px]`],

  [/^q-btn-group--square$/, ([, c], { theme }) => `rounded-none`],

  [/^q-btn-group--flat$/, ([, c], { theme }) => `[box-shadow:none]`],

  [
    /^q-btn-group--outline$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn-group--outline'] ??
      `[box-shadow:none] [&_>_.q-separator]:(hidden) [&_>_.q-btn-item_+_.q-btn-item:before]:([border-left:0]) [&_>_.q-btn-item:not(:last-child):before]:([border-right:0])`
  ],

  [/^q-btn-group--unelevated$/, ([, c], { theme }) => `[box-shadow:none]`],

  [/^q-btn-group--stretch$/, ([, c], { theme }) => `self-stretch rounded-none`],

  [
    /^q-btn-group--glossy$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn-group--glossy'] ??
      `[&_>_.q-btn-item]:(!bg-[linear-gradient(_to_bottom,_rgba(255,_255,_255,_0.3),_rgba(255,_255,_255,_0)_50%,_rgba(0,_0,_0,_0.12)_51%,_rgba(0,_0,_0,_0.04)_)])`
  ],

  [
    /^q-btn-group--spread$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-btn-group--spread'] ??
      `[&_>_.q-btn-group]:(!flex) [&_>_.q-btn-item]:(w-auto min-w-[0] max-w-full flex-[10000_1_0%])
    [&__>_.q-btn-group_>_.q-btn-item:not(.q-btn-dropdown\\_\\_arrow-container)]:(w-auto min-w-[0] max-w-full flex-[10000_1_0%])`
  ]
]

export { shortcuts }
