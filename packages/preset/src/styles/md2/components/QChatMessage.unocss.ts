import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-message-name$/, ([, c], { theme }) => `text-[small]`],

  [
    /^q-message-label$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message-label'] ??
      `mx-[0] my-[24px] text-center text-[small]`
  ],

  [
    /^q-message-stamp$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message-stamp'] ??
      `[color:inherit] mt-[4px] opacity-60 hidden text-[small]`
  ],

  [
    /^q-message-avatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message-avatar'] ??
      `rounded-[50%] w-[48px] h-[48px] min-w-[48px]`
  ],

  [
    /^q-message$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message'] ??
      `mb-[8px] [&:first-child_.q-message-label]:(mt-0)`
  ],

  [/^q-message-avatar--received$/, ([, c], { theme }) => `mr-[8px]`],

  [
    /^q-message-text--received$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message-text--received'] ??
      `text-[#81c784] rounded-tl-[4px] rounded-br-[4px] rounded-tr-[4px] rounded-bl-[0]
      [&:last-child:before]:(right-full [border-right:0_solid_transparent] [border-left:8px_solid_transparent] [border-bottom:8px_solid_currentColor])`
  ],

  [/^q-message-text-content--received$/, ([, c], { theme }) => `text-[#000]`],

  [/^q-message-name--sent$/, ([, c], { theme }) => `text-right`],

  [/^q-message-avatar--sent$/, ([, c], { theme }) => `ml-[8px]`],

  [/^q-message-container--sent$/, ([, c], { theme }) => `flex-row-reverse`],

  [
    /^q-message-text--sent$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message-text--sent'] ??
      `text-[#e0e0e0] rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[4px] [&:last-child:before]:(left-full [border-left:0_solid_transparent] [border-right:8px_solid_transparent] [border-bottom:8px_solid_currentColor])`
  ],

  [/^q-message-text-content--sent$/, ([, c], { theme }) => `text-[#000]`],

  [
    /^q-message-text$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-message-text'] ??
      `bg-current p-[8px] leading-[1.2] relative
      [&_+_.q-message-text]:(mt-[3px])
      [&:last-child]:(min-h-[48px])
      [&:last-child_.q-message-stamp]:(block)
      [&:last-child:before]:(content-empty absolute bottom-0 w-[0] h-[0])`
  ]
]

export { shortcuts }
