import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-item$/,
    componentClass(
      'q-item',
      qe`flex flex-nowrap min-h-[28px] px-[16px] py-[8px] [transition:color_0.3s,_background-color_0.3s] [&_>_.q-item__section--thumbnail:first-child]:(-ml-[16px]) [&_>_.q-focus-helper_+_.q-item__section--thumbnail]:(-ml-[16px]) [&_>_.q-item__section--thumbnail:last-of-type]:(-mr-[16px]) relative`
    )
  ],

  [
    /^q-item__section$/,
    componentClass(
      'q-item__section',
      `flex flex-col flex-nowrap [align-items:stretch] min-w-[0]`
    )
  ],

  [
    /^q-item__section--side$/,
    componentClass(
      'q-item__section--side',
      `!flex-initial items-start pr-[16px] w-auto [&_>_.q-icon]:(text-[24px]) [&_>_.q-avatar]:(text-[40px])`
    )
  ],

  [
    /^q-item__section--avatar$/,
    componentClass('q-item__section--avatar', `!flex-initial min-w-[56px]`)
  ],

  [
    /^q-item__section--thumbnail$/,
    componentClass(
      'q-item__section--thumbnail',
      `!flex-initial [&_img]:(w-[100px] h-[56px])`
    )
  ],

  [/^q-item__section--nowrap$/, staticClass(`whitespace-nowrap`)],

  [
    /^q-item__label$/,
    componentClass(
      'q-item__label',
      qe`max-w-full [&_+_.q-item__label]:(mt-[4px])`
    )
  ],

  [/^q-item__label--overline$/, componentClass('q-item__label--overline', ``)],

  [/^q-item__label--caption$/, componentClass('q-item__label--caption', ``)],

  [
    /^q-item__label--header$/,
    componentClass('q-item__label--header', `p-[16px]`)
  ],

  [
    /^q-separator--spaced$/,
    componentClass(
      'q-separator--spaced',
      qe`[&_+_.q-item__label--header]:(pt-[8px])`
    )
  ],

  [
    /^q-list--padding$/,
    componentClass(
      'q-list--padding',
      qe`[&_.q-item__label--header]:(pt-[8px]) px-[0] py-[8px]`
    )
  ],

  [
    /^q-item__section--main$/,
    componentClass(
      'q-item__section--main',
      qe`w-auto min-w-[0] max-w-full flex-[10000_1_0%]
      [&:has(>:last-child:nth-child(2))]:(min-h-36px)
      [&:has(>:last-child:nth-child(3))]:(min-h-44px)
      [&_+_.q-item__section--main]:(ml-[8px])
      [&_~_.q-item__section--side]:(items-end pr-0 pl-[16px])`
    )
  ],

  [/^q-list--bordered$/, componentClass('q-list--bordered', ``)],

  [/^q-list--separator$/, componentClass('q-list--separator', ``)],

  [
    /^q-list--dense$/,
    componentClass(
      'q-list--dense',
      `[&_>_.q-item]:(min-h-[28px] px-[16px] py-[2px])`
    )
  ],

  [/^q-item--dense$/, staticClass(`min-h-[28px] px-[16px] py-[2px]`)],

  [/^q-list--dark$/, componentClass('q-list--dark', ``)],

  [/^q-item--dark$/, componentClass('q-item--dark', ``)],

  [/^q-item--active$/, staticClass(``)]
]

export { shortcuts }
