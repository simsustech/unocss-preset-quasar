import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-message-name$/, mdStatic(`text-[small]`)],

  [
    /^q-message-label$/,
    mdComponent('q-message-label', `mx-[0] my-[24px] text-center text-[small]`)
  ],

  [
    /^q-message-stamp$/,
    mdComponent(
      'q-message-stamp',
      `[color:inherit] mt-[4px] opacity-60 hidden text-[small]`
    )
  ],

  [
    /^q-message-avatar$/,
    mdComponent(
      'q-message-avatar',
      `rounded-[50%] w-[48px] h-[48px] min-w-[48px]`
    )
  ],

  [
    /^q-message$/,
    mdComponent('q-message', `mb-[8px] [&:first-child_.q-message-label]:(mt-0)`)
  ],

  [/^q-message-avatar--received$/, mdStatic(`mr-[8px]`)],

  [
    /^q-message-text--received$/,
    mdComponent(
      'q-message-text--received',
      `text-[#81c784] rounded-tl-[4px] rounded-br-[4px] rounded-tr-[4px] rounded-bl-[0]
      [&:last-child:before]:(right-full [border-right:0_solid_transparent] [border-left:8px_solid_transparent] [border-bottom:8px_solid_currentColor])`
    )
  ],

  [/^q-message-text-content--received$/, mdStatic(`text-[#000]`)],

  [/^q-message-name--sent$/, mdStatic(`text-right`)],

  [/^q-message-avatar--sent$/, mdStatic(`ml-[8px]`)],

  [/^q-message-container--sent$/, mdStatic(`flex-row-reverse`)],

  [
    /^q-message-text--sent$/,
    mdComponent(
      'q-message-text--sent',
      `text-[#e0e0e0] rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[4px] [&:last-child:before]:(left-full [border-left:0_solid_transparent] [border-right:8px_solid_transparent] [border-bottom:8px_solid_currentColor])`
    )
  ],

  [/^q-message-text-content--sent$/, mdStatic(`text-[#000]`)],

  [
    /^q-message-text$/,
    mdComponent(
      'q-message-text',
      `bg-current p-[8px] leading-[1.2] relative
      [&_+_.q-message-text]:(mt-[3px])
      [&:last-child]:(min-h-[48px])
      [&:last-child_.q-message-stamp]:(block)
      [&:last-child:before]:(content-empty absolute bottom-0 w-[0] h-[0])`
    )
  ]
]

export { shortcuts }
