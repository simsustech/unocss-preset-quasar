import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-item$/,
    componentClass(
      'q-item',
      qe`min-h-[28px] px-[16px] py-[8px] [color:inherit] [transition:color_0.3s,_background-color_0.3s] [&_>_.q-item__section--thumbnail:first-child]:(-ml-[16px]) [&_>_.q-focus-helper_+_.q-item__section--thumbnail]:(-ml-[16px]) [&_>_.q-item__section--thumbnail:last-of-type]:(-mr-[16px]) relative
    [&.q-router-link--active]:(text-$light-primary dark:text-$dark-primary)`
    )
  ],

  [
    /^q-item__section--side$/,
    componentClass(
      'q-item__section--side',
      `!flex-initial text-[#757575] items-start pr-[16px] w-auto [&_>_.q-icon]:(text-[24px]) [&_>_.q-avatar]:(text-[40px])`
    )
  ],

  [
    /^q-item__section--avatar$/,
    componentClass(
      'q-item__section--avatar',
      `!flex-initial [color:inherit] min-w-[56px]`
    )
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
      qe`!leading-[1.2em] max-w-full [&_+_.q-item__label]:(mt-[4px])`
    )
  ],

  [
    /^q-item__label--overline$/,
    componentClass('q-item__label--overline', `text-[rgba(0,_0,_0,_0.7)]`)
  ],

  [
    /^q-item__label--caption$/,
    componentClass('q-item__label--caption', `text-[rgba(0,_0,_0,_0.54)]`)
  ],

  [
    /^q-item__label--header$/,
    componentClass(
      'q-item__label--header',
      `text-[#757575] p-[16px] text-[0.875rem] leading-5 tracking-[0.01786em]`
    )
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

  [
    /^q-list--bordered$/,
    componentClass(
      'q-list--bordered',
      `[border-width:1px] border-solid border-[rgba(0,0,0,0.12)]`
    )
  ],

  [
    /^q-list--separator$/,
    componentClass(
      'q-list--separator',
      qe`[&_>_.q-item-type_+_.q-item-type]:([border-top:1px_solid_rgba(0,_0,_0,_0.12)]) [&_>_.q-virtual-scroll__content_>_.q-item-type_+_.q-item-type]:([border-top:1px_solid_rgba(0,_0,_0,_0.12)])`
    )
  ],

  [
    /^q-list--dense$/,
    componentClass(
      'q-list--dense',
      `[&_>_.q-item]:(min-h-[28px] px-[16px] py-[2px])`
    )
  ],

  [/^q-item--dense$/, staticClass(`min-h-[28px] px-[16px] py-[2px]`)],

  [
    /^q-list--dark$/,
    componentClass(
      'q-list--dark',
      qe`text-[#fff] border-[rgba(255,_255,_255,_0.28)] 
      [&_.q-item__section--side:not(.q-item__section--avatar)]:(text-[rgba(255,_255,_255,_0.7)]) 
      [&_.q-item__label--header]:(text-[rgba(255,_255,_255,_0.64)]) [&_.q-item__label--overline]:(text-[rgba(255,_255,_255,_0.8)]) [&_.q-item__label--caption]:(text-[rgba(255,_255,_255,_0.8)])`
    )
  ],

  [
    /^q-item--dark$/,
    componentClass(
      'q-item--dark',
      qe`text-[#fff] border-[rgba(255,_255,_255,_0.28)] [&_.q-item__section--side:not(.q-item__section--avatar)]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-item__label--header]:(text-[rgba(255,_255,_255,_0.64)]) [&_.q-item__label--overline]:(text-[rgba(255,_255,_255,_0.8)]) [&_.q-item__label--caption]:(text-[rgba(255,_255,_255,_0.8)])`
    )
  ],

  [
    /^q-item--active$/,
    staticClass(`text-$light-primary dark:text-$dark-primary`)
  ]
]

export { shortcuts }
