import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-date$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date'] ??
      `inline-flex [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] bg-[#fff] w-[290px] min-w-[290px] max-w-full`
  ],

  [
    /^q-date--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--bordered'] ??
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-date__header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__header'] ??
      `[border-top-left-radius:inherit] text-[#fff] p-[16px] bg-primary`
  ],

  [/^q-date__actions$/, ([, c], { theme }) => `pt-[0] px-[16px] pb-[16px]`],

  [
    /^q-date__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__content'] ??
      `outline-0 [&_.q-btn]:(font-normal)`
  ],

  [/^q-date__main$/, ([, c], { theme }) => `outline-0`],

  [
    /^q-date__header-link$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__header-link'] ??
      `opacity-[0.64] outline-0 [transition:opacity_0.3s_ease-out] [&:hover]:(opacity-100) [&:focus]:(opacity-100)`
  ],

  [/^q-date__header-link--active$/, ([, c], { theme }) => `opacity-100`],

  [
    /^q-date__header-subtitle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__header-subtitle'] ??
      `text-[14px] leading-[1.75] tracking-[0.00938em]`
  ],

  [
    /^q-date__header-title-label$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__header-title-label'] ??
      `text-[24px] leading-[1.2] tracking-[0.00735em]`
  ],

  [
    /^q-date__view$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__view'] ?? `min-h-[290px] p-[16px]`
    // h-full w-full
  ],

  [
    /^q-date__navigation$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__navigation'] ??
      `h-[12.5%] [&_>_div:first-child]:(w-[8%] min-w-[24px] justify-end) [&_>_div:last-child]:(w-[8%] min-w-[24px] justify-start)`
  ],

  [
    /^q-date__calendar-weekdays$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__calendar-weekdays'] ??
      `h-[12.5%] [&_>_div]:(opacity-[0.38] text-[12px])`
  ],

  [
    /^q-date__calendar-item$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__calendar-item'] ??
      `inline-flex items-center justify-center align-middle !w-[14.285%] !h-[12.5%] relative [&:after]:(content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border) [&_>_div]:(w-[30px] h-[30px] rounded-[50%]) [&_button]:(w-[30px] h-[30px] rounded-[50%]) [&_>_div]:(leading-[30px] text-center) [&_>_button]:(leading-[22px])`
  ],

  [/^q-date__calendar-item--out$/, ([, c], { theme }) => `opacity-[0.18]`],

  [/^q-date__calendar-item--fill$/, ([, c], { theme }) => `invisible`],

  [
    /^q-date__range$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__range'] ??
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)`
  ],

  [
    /^q-date__range-from$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__range-from'] ??
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none) [&:before]:(left-2/4)`
  ],

  [
    /^q-date__range-to$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__range-to'] ??
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none) [&:before]:(right-2/4)`
  ],

  [
    /^q-date__edit-range$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__edit-range'] ??
      `[&:after]:(border-[currentColor_transparent]) [&:nth-child(7n-6):after]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):after]:(rounded-tr-none rounded-br-none)`
  ],

  [
    /^q-date__edit-range-from$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__edit-range-from'] ??
      `[&:after]:(left-[4px] [border-left-color:currentColor] [border-top-color:currentColor] [border-bottom-color:currentColor] rounded-tl-[28px] rounded-bl-[28px])`
  ],

  [
    /^q-date__edit-range-from-to$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__edit-range-from-to'] ??
      `[&:after]:(left-[4px] [border-left-color:currentColor] [border-top-color:currentColor] [border-bottom-color:currentColor] rounded-tl-[28px] rounded-bl-[28px]) [&:after]:(right-[4px] [border-right-color:currentColor] [border-top-color:currentColor] [border-bottom-color:currentColor] rounded-tr-[28px] rounded-br-[28px])`
  ],

  [
    /^q-date__edit-range-to$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__edit-range-to'] ??
      `[&:after]:(right-[4px] [border-right-color:currentColor] [border-top-color:currentColor] [border-bottom-color:currentColor] rounded-tr-[28px] rounded-br-[28px])`
  ],

  [
    /^q-date__calendar-days-container$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__calendar-days-container'] ??
      `h-3/4 min-h-[192px]`
  ],

  [/^q-date__calendar-days$/, ([, c], { theme }) => `[&_>_div]:(!h-1/6)`],

  [
    /^q-date__event$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__event'] ??
      `absolute bottom-[2px] left-2/4 h-[5px] w-[8px] rounded-[5px] [transform:translate3d(-50%,_0,_0)] bg-primary`
  ],

  [
    /^q-date__today$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__today'] ??
      `[box-shadow:0_0_1px_0_currentColor]`
  ],

  [/^q-date__years-content$/, ([, c], { theme }) => `px-[8px] py-[0]`],

  [/^q-date__years-item$/, ([, c], { theme }) => `flex-[0_0_33.3333%]`],

  [/^q-date__months-item$/, ([, c], { theme }) => `flex-[0_0_33.3333%]`],

  [
    /^q-date--readonly$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--readonly'] ??
      `[&_.q-date\\_\\_header]:(pointer-events-none) [&_.q-date\\_\\_content]:(pointer-events-none) [&_.q-date\\_\\_navigation]:(hidden)`
  ],

  [/^q-date--portrait$/, ([, c], { theme }) => `flex-col`],

  [
    /^q-date--portrait-standard$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--portrait-standard'] ??
      `[&_.q-date\\_\\_content]:(h-[calc(100%-86px)]) [&_.q-date\\_\\_header]:([border-top-right-radius:inherit] h-[86px]) [&_.q-date\\_\\_header-title]:(items-center h-[30px])`
  ],

  [
    /^q-date--portrait-minimal$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--portrait-minimal'] ??
      `[&_.q-date\\_\\_content]:(h-full)`
  ],

  [
    /^q-date--landscape$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--landscape'] ??
      `flex-row items-stretch min-w-[420px]
      [&_>_div]:(flex flex-auto flex-col)
      [&_.q-date\\_\\_content]:(h-full)`
  ],

  [
    /^q-date--landscape-standard$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--landscape-standard'] ??
      `min-w-[420px] [&_.q-date\\_\\_header]:([border-bottom-left-radius:inherit] min-w-[110px] w-[110px]) [&_.q-date\\_\\_header-title]:(flex-col) [&_.q-date\\_\\_header-today]:(mt-[12px] -ml-[8px])`
  ],

  [/^q-date--landscape-minimal$/, ([, c], { theme }) => `w-[310px]`],

  [
    /^q-date--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date--dark'] ??
      `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] border-[rgba(255,_255,_255,_0.28)]`
  ]
]

export { shortcuts }
