import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-card$/,
    componentClass(
      'q-card',
      `align-top relative
      [&_>_div:not(.q--avoid-card-border)]:(rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none)
      [&_>_img:not(.q--avoid-card-border)]:(rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none)
      [&_>_img]:(block w-full max-w-full border-[0])
      [&_>_div:not(.q--avoid-card-border)]:(shadow-none)
      [&.disabled]:(op-38)`
    )
  ],

  [/^q-card--filled$/, componentClass('q-card--filled', ``)],

  [/^q-card--bordered$/, componentClass('q-card--bordered', ``)],

  [/^q-card--dark$/, componentClass('q-card--dark', ``)],

  [/^q-card__section$/, staticClass(`relative`)],

  [/^q-card__section--vert$/, staticClass(`p-[16px]`)],

  [
    /^q-card__section--horiz$/,
    componentClass(
      'q-card__section--horiz',
      `[&_>_div:not(.q--avoid-card-border)]:(rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none) [&_>_img:not(.q--avoid-card-border)]:(rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none) [&_>_div:not(.q--avoid-card-border)]:(shadow-none)`
    )
  ],

  [
    /^q-card__actions$/,
    componentClass(
      'q-card__actions',
      `p-[8px] items-center [&_.q-btn--rectangle:not(.q-btn--rounded)]:(px-[8px] py-[0])`
    )
  ],

  [
    /^q-card__actions--horiz$/,
    componentClass(
      'q-card__actions--horiz',
      `[&_>_.q-btn-item_+_.q-btn-item]:(ml-[8px]) [&_>_.q-btn-group_+_.q-btn-item]:(ml-[8px]) [&_>_.q-btn-item_+_.q-btn-group]:(ml-[8px])`
    )
  ],

  [
    /^q-card__actions--vert$/,
    componentClass(
      'q-card__actions--vert',
      `[&_>_.q-btn-item.q-btn--round]:(self-center) [&_>_.q-btn-item_+_.q-btn-item]:(mt-[4px]) [&_>_.q-btn-group_+_.q-btn-item]:(mt-[4px]) [&_>_.q-btn-item_+_.q-btn-group]:(mt-[4px]) [&_>_.q-btn-group_>_.q-btn-item]:(flex-grow)`
    )
  ]
]

export { shortcuts }
