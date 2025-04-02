import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-timeline$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline'] ??
      `p-0 w-full [list-style:none] [&_h6]:([line-height:inherit])`
  ],

  [
    /^q-timeline--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--dark'] ??
      `text-[#fff] [&_.q-timeline\\_\\_subtitle]:(opacity-70)`
  ],

  [
    /^q-timeline__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__content'] ?? `pb-[24px]`
  ],

  [
    /^q-timeline__title$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__title'] ?? `mt-0 mb-[16px]`
  ],

  [
    /^q-timeline__subtitle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__subtitle'] ??
      `text-[12px] mb-[8px] opacity-60 uppercase tracking-[1px] font-bold`
  ],

  [
    /^q-timeline__dot$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__dot'] ??
      `absolute top-[0] bottom-[0] w-[15px] [&:before]:(content-[''] bg-current block absolute) [&:after]:(content-[''] bg-current block absolute) [&:before]:(border-[3px] border-solid border-[transparent] rounded-[100%] h-[15px] w-[15px] top-[4px] left-[0] [transition:background_0.3s_ease-in-out,_border_0.3s_ease-in-out]) [&:after]:(w-[3px] opacity-40 top-[24px] bottom-[0] left-[6px]) [&_.q-icon]:(absolute top-[0] left-[0] right-[0] text-[16px] h-[38px] leading-[38px] w-full text-[#fff]) [&_.q-icon_>_svg]:(w-[1em] h-[1em]) [&_.q-icon_>_img]:(w-[1em] h-[1em])`
  ],

  [
    /^q-timeline__dot-img$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__dot-img'] ??
      `absolute top-[4px] left-[0] right-[0] h-[31px] w-[31px] bg-current rounded-[50%]`
  ],

  [
    /^q-timeline__heading$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__heading'] ??
      `relative [&:first-child_.q-timeline\\_\\_heading-title]:(pt-0) [&:last-child_.q-timeline\\_\\_heading-title]:(pb-0)`
  ],

  [
    /^q-timeline__heading-title$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__heading-title'] ??
      `px-[0] py-[32px] m-0`
  ],

  [
    /^q-timeline__entry$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__entry'] ??
      `relative leading-[22px] [&:last-child]:(!pb-0) [&:last-child_.q-timeline\\_\\_dot:after]:(content-[none])`
  ],

  [
    /^q-timeline__entry--icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline__entry--icon'] ??
      `[&_.q-timeline\\_\\_dot]:(w-[31px]) [&_.q-timeline\\_\\_dot:before]:(h-[31px] w-[31px]) [&_.q-timeline\\_\\_dot:after]:(top-[41px] left-[14px]) [&_.q-timeline\\_\\_subtitle]:(pt-[8px])`
  ],

  [
    /^q-timeline--dense--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--dense--right'] ??
      `[&_.q-timeline\\_\\_entry]:(pl-[40px]) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_dot]:(-left-[8px]) [&_.q-timeline\\_\\_dot]:(left-[0])`
  ],

  [
    /^q-timeline--dense--left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--dense--left'] ??
      `[&_.q-timeline\\_\\_heading]:(text-right) [&_.q-timeline\\_\\_entry]:(pr-[40px]) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_dot]:(-right-[8px]) [&_.q-timeline\\_\\_content]:(text-right) [&_.q-timeline\\_\\_title]:(text-right) [&_.q-timeline\\_\\_subtitle]:(text-right) [&_.q-timeline\\_\\_dot]:(right-[0])`
  ],

  [
    /^q-timeline--comfortable$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--comfortable'] ??
      `table [&_.q-timeline\\_\\_heading]:(table-row text-[200%]) [&_.q-timeline\\_\\_heading_>_div]:(table-cell) [&_.q-timeline\\_\\_entry]:(table-row p-0) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_content]:(pt-[8px]) [&_.q-timeline\\_\\_subtitle]:(table-cell align-top) [&_.q-timeline\\_\\_dot]:(table-cell align-top) [&_.q-timeline\\_\\_content]:(table-cell align-top) [&_.q-timeline\\_\\_subtitle]:(w-[35%]) [&_.q-timeline\\_\\_dot]:(relative min-w-[31px])`
  ],

  [
    /^q-timeline--comfortable--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--comfortable--right'] ??
      `[&__.q-timeline\\_\\_heading__.q-timeline\\_\\_heading-title]:(-ml-[50px])`
  ],

  [
    /^q-timeline--comfortable--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--comfortable--right'] ??
      `[&_.q-timeline\\_\\_subtitle]:(text-right pr-[30px]) [&_.q-timeline\\_\\_content]:(pl-[30px]) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_dot]:(-left-[8px])`
  ],

  [
    /^q-timeline--comfortable--left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--comfortable--left'] ??
      `[&_.q-timeline\\_\\_heading]:(text-right) [&_.q-timeline\\_\\_heading_.q-timeline\\_\\_heading-title]:(-mr-[50px]) [&_.q-timeline\\_\\_subtitle]:(pl-[30px]) [&_.q-timeline\\_\\_content]:(pr-[30px]) [&_.q-timeline\\_\\_content]:(text-right) [&_.q-timeline\\_\\_title]:(text-right) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_dot]:(right-[0]) [&_.q-timeline\\_\\_dot]:(-right-[8px])`
  ],

  [
    /^q-timeline--loose$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-timeline--loose'] ??
      `[&_.q-timeline\\_\\_heading-title]:(text-center ml-0) [&_.q-timeline\\_\\_entry]:(block m-0 p-0) [&_.q-timeline\\_\\_subtitle]:(block m-0 p-0) [&_.q-timeline\\_\\_dot]:(block m-0 p-0) [&_.q-timeline\\_\\_content]:(block m-0 p-0) [&_.q-timeline\\_\\_dot]:(absolute left-2/4 -ml-[7.15px]) [&_.q-timeline\\_\\_entry]:(pb-[24px] overflow-hidden) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_dot]:(-ml-[15px]) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_subtitle]:(leading-[38px]) [&_.q-timeline\\_\\_entry--icon_.q-timeline\\_\\_content]:(pt-[8px]) [&_.q-timeline\\_\\_entry--left_.q-timeline\\_\\_content]:(float-left pr-[30px] text-right) [&_.q-timeline\\_\\_entry--right_.q-timeline\\_\\_subtitle]:(float-left pr-[30px] text-right) [&_.q-timeline\\_\\_entry--left_.q-timeline\\_\\_subtitle]:(float-right text-left pl-[30px]) [&_.q-timeline\\_\\_entry--right_.q-timeline\\_\\_content]:(float-right text-left pl-[30px]) [&_.q-timeline\\_\\_subtitle]:(w-1/2) [&_.q-timeline\\_\\_content]:(w-1/2)`
  ]
]

export { shortcuts }
