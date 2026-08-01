import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-timeline$/,
    componentClass(
      'q-timeline',
      `p-0 w-full [list-style:none] [&_h6]:([line-height:inherit])`
    )
  ],

  [
    /^q-timeline--dark$/,
    componentClass(
      'q-timeline--dark',
      qe`text-[#fff] [&_.q-timeline__subtitle]:(opacity-70)`
    )
  ],

  [/^q-timeline__content$/, componentClass('q-timeline__content', `pb-[24px]`)],

  [
    /^q-timeline__title$/,
    componentClass('q-timeline__title', `mt-0 mb-[16px]`)
  ],

  [
    /^q-timeline__subtitle$/,
    componentClass(
      'q-timeline__subtitle',
      `text-[12px] mb-[8px] opacity-60 uppercase tracking-[1px] font-bold`
    )
  ],

  [
    /^q-timeline__dot$/,
    componentClass(
      'q-timeline__dot',
      `absolute top-[0] bottom-[0] w-[15px] [&:before]:(content-[''] bg-current block absolute) [&:after]:(content-[''] bg-current block absolute) [&:before]:([border-width:1px] border-solid border-[transparent] rounded-[100%] h-[15px] w-[15px] top-[4px] left-[0] [transition:background_0.3s_ease-in-out,_border_0.3s_ease-in-out]) [&:after]:(w-[3px] opacity-40 top-[24px] bottom-[0] left-[6px]) [&_.q-icon]:(absolute top-[0] left-[0] right-[0] text-[16px] h-[38px] leading-[38px] w-full text-[#fff]) [&_.q-icon_>_svg]:(w-[1em] h-[1em]) [&_.q-icon_>_img]:(w-[1em] h-[1em])`
    )
  ],

  [
    /^q-timeline__dot-img$/,
    componentClass(
      'q-timeline__dot-img',
      `absolute top-[4px] left-[0] right-[0] h-[31px] w-[31px] bg-current rounded-[50%]`
    )
  ],

  [
    /^q-timeline__heading$/,
    componentClass(
      'q-timeline__heading',
      qe`relative [&:first-child_.q-timeline__heading-title]:(pt-0) [&:last-child_.q-timeline__heading-title]:(pb-0)`
    )
  ],

  [
    /^q-timeline__heading-title$/,
    componentClass('q-timeline__heading-title', `px-[0] py-[32px] m-0`)
  ],

  [
    /^q-timeline__entry$/,
    componentClass(
      'q-timeline__entry',
      qe`relative leading-[22px] [&:last-child]:(!pb-0) [&:last-child_.q-timeline__dot:after]:(content-[none])`
    )
  ],

  [
    /^q-timeline__entry--icon$/,
    componentClass(
      'q-timeline__entry--icon',
      qe`[&_.q-timeline__dot]:(w-[31px]) [&_.q-timeline__dot:before]:(h-[30px] w-[30px]) [&_.q-timeline__dot:after]:(top-[41px] left-[14px]) [&_.q-timeline__subtitle]:(pt-[8px])`
    )
  ],

  [
    /^q-timeline--dense--right$/,
    componentClass(
      'q-timeline--dense--right',
      qe`[&_.q-timeline__entry]:(pl-[40px]) [&_.q-timeline__entry--icon_.q-timeline__dot]:(-left-[8px]) [&_.q-timeline__dot]:(left-[0])`
    )
  ],

  [
    /^q-timeline--dense--left$/,
    componentClass(
      'q-timeline--dense--left',
      qe`[&_.q-timeline__heading]:(text-right) [&_.q-timeline__entry]:(pr-[40px]) [&_.q-timeline__entry--icon_.q-timeline__dot]:(-right-[8px]) [&_.q-timeline__content]:(text-right) [&_.q-timeline__title]:(text-right) [&_.q-timeline__subtitle]:(text-right) [&_.q-timeline__dot]:(right-[0])`
    )
  ],

  [
    /^q-timeline--comfortable$/,
    componentClass(
      'q-timeline--comfortable',
      qe`table [&_.q-timeline__heading]:(table-row text-[200%]) [&_.q-timeline__heading_>_div]:(table-cell) [&_.q-timeline__entry]:(table-row p-0) [&_.q-timeline__entry--icon_.q-timeline__content]:(pt-[8px]) [&_.q-timeline__subtitle]:(table-cell align-top) [&_.q-timeline__dot]:(table-cell align-top) [&_.q-timeline__content]:(table-cell align-top) [&_.q-timeline__subtitle]:(w-[35%]) [&_.q-timeline__dot]:(relative min-w-[31px])`
    )
  ],

  [
    /^q-timeline--comfortable--right$/,
    componentClass(
      'q-timeline--comfortable--right',
      qe`[&__.q-timeline__heading__.q-timeline__heading-title]:(-ml-[50px])`
    )
  ],

  [
    /^q-timeline--comfortable--right$/,
    componentClass(
      'q-timeline--comfortable--right',
      qe`[&_.q-timeline__subtitle]:(text-right pr-[30px]) [&_.q-timeline__content]:(pl-[30px]) [&_.q-timeline__entry--icon_.q-timeline__dot]:(-left-[8px])`
    )
  ],

  [
    /^q-timeline--comfortable--left$/,
    componentClass(
      'q-timeline--comfortable--left',
      qe`[&_.q-timeline__heading]:(text-right) [&_.q-timeline__heading_.q-timeline__heading-title]:(-mr-[50px]) [&_.q-timeline__subtitle]:(pl-[30px]) [&_.q-timeline__content]:(pr-[30px]) [&_.q-timeline__content]:(text-right) [&_.q-timeline__title]:(text-right) [&_.q-timeline__entry--icon_.q-timeline__dot]:(right-[0]) [&_.q-timeline__dot]:(-right-[8px])`
    )
  ],

  [
    /^q-timeline--loose$/,
    componentClass(
      'q-timeline--loose',
      qe`[&_.q-timeline__heading-title]:(text-center ml-0) [&_.q-timeline__entry]:(block m-0 p-0) [&_.q-timeline__subtitle]:(block m-0 p-0) [&_.q-timeline__dot]:(block m-0 p-0) [&_.q-timeline__content]:(block m-0 p-0) [&_.q-timeline__dot]:(absolute left-2/4 -ml-[7.15px]) [&_.q-timeline__entry]:(pb-[24px] overflow-hidden) [&_.q-timeline__entry--icon_.q-timeline__dot]:(-ml-[15px]) [&_.q-timeline__entry--icon_.q-timeline__subtitle]:(leading-[38px]) [&_.q-timeline__entry--icon_.q-timeline__content]:(pt-[8px]) [&_.q-timeline__entry--left_.q-timeline__content]:(float-left pr-[30px] text-right) [&_.q-timeline__entry--right_.q-timeline__subtitle]:(float-left pr-[30px] text-right) [&_.q-timeline__entry--left_.q-timeline__subtitle]:(float-right text-left pl-[30px]) [&_.q-timeline__entry--right_.q-timeline__content]:(float-right text-left pl-[30px]) [&_.q-timeline__subtitle]:(w-1/2) [&_.q-timeline__content]:(w-1/2)`
    )
  ]
]

export { shortcuts }
