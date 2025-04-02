import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-item$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item'] ??
      `min-h-[48px] px-[16px] py-[8px] [color:inherit] [transition:color_0.3s,_background-color_0.3s] [&_>_.q-item\\_\\_section--thumbnail:first-child]:(-ml-[16px]) [&_>_.q-focus-helper_+_.q-item\\_\\_section--thumbnail]:(-ml-[16px]) [&_>_.q-item\\_\\_section--thumbnail:last-of-type]:(-mr-[16px]) relative
    [&.q-router-link--active]:(text-primary)`
  ],

  [
    /^q-item__section--side$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__section--side'] ??
      `!flex-initial text-[#757575] items-start pr-[16px] w-auto min-w-[0] max-w-full [&_>_.q-icon]:(text-[24px]) [&_>_.q-avatar]:(text-[40px])`
  ],

  [
    /^q-item__section--avatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__section--avatar'] ??
      `!flex-initial [color:inherit] min-w-[56px]`
  ],

  [
    /^q-item__section--thumbnail$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__section--thumbnail'] ??
      `!flex-initial [&_img]:(w-[100px] h-[56px])`
  ],

  [/^q-item__section--nowrap$/, ([, c], { theme }) => `whitespace-nowrap`],

  [
    /^q-item__label$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__label'] ??
      `!leading-[1.2em] max-w-full [&_+_.q-item\\_\\_label]:(mt-[4px])`
  ],

  [
    /^q-item__label--overline$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__label--overline'] ??
      `text-[rgba(0,_0,_0,_0.7)]`
  ],

  [
    /^q-item__label--caption$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__label--caption'] ??
      `text-[rgba(0,_0,_0,_0.54)]`
  ],

  [
    /^q-item__label--header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__label--header'] ??
      `text-[#757575] p-[16px] text-[0.875rem] leading-5 tracking-[0.01786em]`
  ],

  [
    /^q-separator--spaced$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-separator--spaced'] ??
      `[&_+_.q-item\\_\\_label--header]:(pt-[8px])`
  ],

  [
    /^q-list--padding$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-list--padding'] ??
      `[&_.q-item\\_\\_label--header]:(pt-[8px]) px-[0] py-[8px]`
  ],

  [
    /^q-item__section--main$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item__section--main'] ??
      `w-auto min-w-[0] max-w-full flex-[10000_1_0%] [&_+_.q-item\\_\\_section--main]:(ml-[8px]) [&_~_.q-item\\_\\_section--side]:(items-end pr-0 pl-[16px])`
  ],

  [
    /^q-list--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-list--bordered'] ??
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-list--separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-list--separator'] ??
      `[&_>_.q-item-type_+_.q-item-type]:([border-top:1px_solid_rgba(0,_0,_0,_0.12)]) [&_>_.q-virtual-scroll\\_\\_content_>_.q-item-type_+_.q-item-type]:([border-top:1px_solid_rgba(0,_0,_0,_0.12)])`
  ],

  [
    /^q-list--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-list--dense'] ??
      `[&_>_.q-item]:(min-h-[32px] px-[16px] py-[2px])`
  ],

  [/^q-item--dense$/, ([, c], { theme }) => `min-h-[32px] px-[16px] py-[2px]`],

  [
    /^q-list--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-list--dark'] ??
      `text-[#fff] border-[rgba(255,_255,_255,_0.28)] [&_.q-item\\_\\_section--side:not(.q-item\\_\\_section--avatar)]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-item\\_\\_label--header]:(text-[rgba(255,_255,_255,_0.64)]) [&_.q-item\\_\\_label--overline]:(text-[rgba(255,_255,_255,_0.8)]) [&_.q-item\\_\\_label--caption]:(text-[rgba(255,_255,_255,_0.8)])`
  ],

  [
    /^q-item--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-item--dark'] ??
      `text-[#fff] border-[rgba(255,_255,_255,_0.28)] [&_.q-item\\_\\_section--side:not(.q-item\\_\\_section--avatar)]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-item\\_\\_label--header]:(text-[rgba(255,_255,_255,_0.64)]) [&_.q-item\\_\\_label--overline]:(text-[rgba(255,_255,_255,_0.8)]) [&_.q-item\\_\\_label--caption]:(text-[rgba(255,_255,_255,_0.8)])`
  ],

  [/^q-item--active$/, ([, c], { theme }) => `text-primary`]
]

export { shortcuts }
