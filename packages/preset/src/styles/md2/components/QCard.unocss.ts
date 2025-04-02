import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-card$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card'] ??
      `shadow-[0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] align-top bg-[#fff] relative
      [&_>_div:not(.q--avoid-card-border)]:(rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none)
      [&_>_img:not(.q--avoid-card-border)]:(rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none)
      [&_>_div:nth-child(1_of_:not(.q--avoid-card-border))]:([border-top:0] [border-top-left-radius:inherit] [border-top-right-radius:inherit])
      [&_>_img:nth-child(1_of_:not(.q--avoid-card-border))]:([border-top:0] [border-top-left-radius:inherit] [border-top-right-radius:inherit])
      [&_>_div:nth-last-child(1_of_:not(.q--avoid-card-border))]:([border-bottom:0] [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit])
      [&_>_img:nth-last-child(1_of_:not(.q--avoid-card-border))]:([border-bottom:0] [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit])
      [&_>_div:not(.q--avoid-card-border)]:([border-left:0] [border-right:0] shadow-none)
      [&_>_img]:(block w-full max-w-full border-[0])`
  ],

  [
    /^q-card--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card--bordered'] ??
      `border-1px border-solid border-black/12`
  ],

  [
    /^q-card--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card--dark'] ??
      `border-white/28 shadow-[0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)]`
  ],

  [/^q-card__section$/, ([, c], { theme }) => `relative`],

  [/^q-card__section--vert$/, ([, c], { theme }) => `p-[16px]`],

  [
    /^q-card__section--horiz$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card__section--horiz'] ??
      `[&_>_div:not(.q--avoid-card-border)]:(rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none) [&_>_img:not(.q--avoid-card-border)]:(rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none) [&_>_div:nth-child(1_of_:not(.q--avoid-card-border))]:([border-top-left-radius:inherit] [border-bottom-left-radius:inherit]) [&_>_img:nth-child(1_of_:not(.q--avoid-card-border))]:([border-top-left-radius:inherit] [border-bottom-left-radius:inherit]) [&_>_div:nth-last-child(1_of_:not(.q--avoid-card-border))]:([border-top-right-radius:inherit] [border-bottom-right-radius:inherit]) [&_>_img:nth-last-child(1_of_:not(.q--avoid-card-border))]:([border-top-right-radius:inherit] [border-bottom-right-radius:inherit]) [&_>_div:not(.q--avoid-card-border)]:([border-top:0] [border-bottom:0] shadow-none)`
  ],

  [
    /^q-card__actions$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card__actions'] ??
      `p-[8px] items-center [&_.q-btn--rectangle]:(px-[8px] py-[0])`
  ],

  [
    /^q-card__actions--horiz$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card__actions--horiz'] ??
      `[&_>_.q-btn-item_+_.q-btn-item]:(ml-[8px]) [&_>_.q-btn-group_+_.q-btn-item]:(ml-[8px]) [&_>_.q-btn-item_+_.q-btn-group]:(ml-[8px])`
  ],

  [
    /^q-card__actions--vert$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-card__actions--vert'] ??
      `[&_>_.q-btn-item.q-btn--round]:(self-center) [&_>_.q-btn-item_+_.q-btn-item]:(mt-[4px]) [&_>_.q-btn-group_+_.q-btn-item]:(mt-[4px]) [&_>_.q-btn-item_+_.q-btn-group]:(mt-[4px]) [&_>_.q-btn-group_>_.q-btn-item]:(flex-grow)`
  ]
]

export { shortcuts }
