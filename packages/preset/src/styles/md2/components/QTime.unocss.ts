import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-time$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time'] ??
      `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] bg-[#fff] outline-[0] w-[290px] min-w-[290px] max-w-full [&.disabled_.q-time\\_\\_header-ampm]:(pointer-events-none) [&.disabled_.q-time\\_\\_content]:(pointer-events-none)`
  ],

  [
    /^q-time--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time--bordered'] ??
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-time__header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__header'] ??
      `[border-top-left-radius:inherit] text-[#fff] p-[16px] font-light bg-primary`
  ],

  [
    /^q-time__actions$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__actions'] ??
      `pt-[0] px-[16px] pb-[16px]`
  ],

  [
    /^q-time__header-label$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__header-label'] ??
      `text-[28px] leading-none tracking-[-0.00833em] [&_>_div_+_div]:(ml-[4px]) !flex-initial`
  ],

  [
    /^q-time__link$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__link'] ??
      `opacity-[0.56] outline-[0] [transition:opacity_0.3s_ease-out] [&:hover]:(opacity-100) [&:focus]:(opacity-100)`
  ],

  [
    /^q-time__link--active$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__link--active'] ?? `opacity-100`
  ],

  [
    /^q-time__header-ampm$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__header-ampm'] ??
      `text-[16px] tracking-widest !flex-initial`
  ],

  [
    /^q-time__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__content'] ??
      `p-[16px] [&:before]:(content-[''] block pb-[100%])`
  ],

  [
    /^q-time__container-parent$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__container-parent'] ?? `p-[16px]`
  ],

  [
    /^q-time__container-child$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__container-child'] ??
      `rounded-[50%] bg-[rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-time__clock$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock'] ??
      `p-[24px] w-[calc(100%-48px)] h-[calc(100%-48px)] max-w-full max-h-full text-[14px]`
  ],

  [
    /^q-time__clock-circle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-circle'] ?? `relative`
  ],

  [
    /^q-time__clock-center$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-center'] ??
      `h-[6px] w-[6px] m-auto rounded-[50%] min-h-[0] bg-current`
  ],

  [
    /^q-time__clock-pointer$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pointer'] ??
      `w-[2px] h-1/2 origin-[0_0] min-h-[0] absolute left-2/4 right-[0] bottom-[0] bg-current -translate-x-1/2 [&:before]:(content-[''] absolute left-2/4 rounded-[50%] bg-current -translate-x-1/2) [&:after]:(content-[''] absolute left-2/4 rounded-[50%] bg-current -translate-x-1/2) [&:before]:(-bottom-[4px] w-[8px] h-[8px]) [&:after]:(-top-[3px] h-[6px] w-[6px])`
  ],

  [
    /^q-time__clock-position$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-position'] ??
      `absolute min-h-[32px] w-[32px] h-[32px] text-[12px] leading-[32px] m-0 p-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%]`
  ],

  [
    /^q-time__clock-position--disable$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-position--disable'] ??
      `opacity-40`
  ],

  [
    /^q-time__clock-position--active$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-position--active'] ??
      `text-[#fff]`
  ],

  [
    /^q-time__clock-pos-0$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-0'] ?? `top-[0%] left-2/4`
  ],

  [
    /^q-time__clock-pos-1$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-1'] ?? `top-[6.7%] left-3/4`
  ],

  [
    /^q-time__clock-pos-2$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-2'] ??
      `top-1/4 left-[93.3%]`
  ],

  [
    /^q-time__clock-pos-3$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-3'] ?? `top-2/4 left-full`
  ],

  [
    /^q-time__clock-pos-4$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-4'] ??
      `top-3/4 left-[93.3%]`
  ],

  [
    /^q-time__clock-pos-5$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-5'] ??
      `top-[93.3%] left-3/4`
  ],

  [
    /^q-time__clock-pos-6$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-6'] ?? `top-full left-2/4`
  ],

  [
    /^q-time__clock-pos-7$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-7'] ??
      `top-[93.3%] left-1/4`
  ],

  [
    /^q-time__clock-pos-8$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-8'] ?? `top-3/4 left-[6.7%]`
  ],

  [
    /^q-time__clock-pos-9$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-9'] ?? `top-2/4 left-[0%]`
  ],

  [
    /^q-time__clock-pos-10$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-10'] ??
      `top-1/4 left-[6.7%]`
  ],

  [
    /^q-time__clock-pos-11$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-11'] ??
      `top-[6.7%] left-1/4`
  ],

  [
    /^q-time__clock-pos-12$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-12'] ?? `top-[15%] left-2/4`
  ],

  [
    /^q-time__clock-pos-13$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-13'] ??
      `top-[19.69%] left-[67.5%]`
  ],

  [
    /^q-time__clock-pos-14$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-14'] ??
      `top-[32.5%] left-[80.31%]`
  ],

  [
    /^q-time__clock-pos-15$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-15'] ?? `top-2/4 left-[85%]`
  ],

  [
    /^q-time__clock-pos-16$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-16'] ??
      `top-[67.5%] left-[80.31%]`
  ],

  [
    /^q-time__clock-pos-17$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-17'] ??
      `top-[80.31%] left-[67.5%]`
  ],

  [
    /^q-time__clock-pos-18$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-18'] ?? `top-[85%] left-2/4`
  ],

  [
    /^q-time__clock-pos-19$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-19'] ??
      `top-[80.31%] left-[32.5%]`
  ],

  [
    /^q-time__clock-pos-20$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-20'] ??
      `top-[67.5%] left-[19.69%]`
  ],

  [
    /^q-time__clock-pos-21$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-21'] ?? `top-2/4 left-[15%]`
  ],

  [
    /^q-time__clock-pos-22$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-22'] ??
      `top-[32.5%] left-[19.69%]`
  ],

  [
    /^q-time__clock-pos-23$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__clock-pos-23'] ??
      `top-[19.69%] left-[32.5%]`
  ],

  [
    /^q-time__now-button$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time__now-button'] ??
      `text-[#fff] top-[12px] right-[12px]`
  ],

  [
    /^q-time--readonly$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time--readonly'] ??
      `[&_.q-time\\_\\_header-ampm]:(pointer-events-none) [&_.q-time\\_\\_content]:(pointer-events-none)`
  ],

  [
    /^q-time--portrait$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time--portrait'] ??
      `inline-flex flex-col [&_.q-time\\_\\_header]:([border-top-right-radius:inherit] min-h-[86px]) [&_.q-time\\_\\_header-ampm]:(ml-[12px]) [&.q-time--bordered_.q-time\\_\\_content]:(mx-[0] my-px)`
  ],

  [
    /^q-time--landscape$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time--landscape'] ??
      `inline-flex items-stretch min-w-[420px] [&_>_div]:(flex flex-col justify-center) [&_.q-time\\_\\_header]:([border-bottom-left-radius:inherit] min-w-[156px]) [&_.q-time\\_\\_header-ampm]:(mt-[12px])`
  ],

  [
    /^q-time--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-time--dark'] ??
      `border-[rgba(255,_255,_255,_0.28)] [box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)]`
  ]
]

export { shortcuts }
