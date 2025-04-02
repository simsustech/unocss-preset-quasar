import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-uploader$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader'] ??
      `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] align-top bg-[#fff] relative w-[320px] max-h-[320px]`
  ],

  [
    /^q-uploader--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader--bordered'] ??
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-uploader__input$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__input'] ??
      `opacity-0 w-full h-full cursor-pointer [&::-webkit-file-upload-button]:(cursor-pointer)`
  ],

  [
    /^q-uploader__file$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__file'] ??
      `[&:before]:(content-[''] [border-top-left-radius:inherit] [border-top-right-radius:inherit] absolute top-[0] right-[0] bottom-[0] left-[0] pointer-events-none bg-current opacity-[0.04]) rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[0] border-[1px] border-solid border-[rgba(0,0,0,0.12)] [&_.q-circular-progress]:(text-[24px]) [&_+_.q-uploader\\_\\_file]:(mt-[8px])`
  ],

  [
    /^q-uploader__header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__header'] ??
      `relative [border-top-left-radius:inherit] [border-top-right-radius:inherit] text-[#fff] w-full`
  ],

  [
    /^q-uploader__spinner$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__spinner'] ??
      `text-[24px] mr-[4px]`
  ],

  [
    /^q-uploader__header-content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__header-content'] ?? `p-[8px]`
  ],

  [
    /^q-uploader__dnd$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__dnd'] ??
      `outline-[1px_dashed_currentColor] outline-offset-[-4px] bg-[rgba(255,_255,_255,_0.6)]`
  ],

  [
    /^q-uploader__overlay$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__overlay'] ??
      `text-[36px] text-[#000] bg-[rgba(255,_255,_255,_0.6)]`
  ],

  [
    /^q-uploader__list$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__list'] ??
      `relative [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit] p-[8px] min-h-[60px] flex-auto`
  ],

  [
    /^q-uploader__file--img$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__file--img'] ??
      `text-[#fff] h-[200px] min-w-[200px] bg-[50%_50%] bg-no-repeat [&:before]:(content-[none]) [&_.q-circular-progress]:(text-[#fff]) [&_.q-uploader\\_\\_file-header]:(pb-[24px] bg-[linear-gradient(_to_bottom,_rgba(0,_0,_0,_0.7)_20%,_rgba(255,_255,_255,_0)_)])`
  ],

  [
    /^q-uploader__file-header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__file-header'] ??
      `relative px-[8px] py-[4px] [border-top-left-radius:inherit] [border-top-right-radius:inherit]`
  ],

  [/^q-uploader__file-header-content$/, ([, c], { theme }) => `pr-[8px]`],

  [/^q-uploader__file-status$/, ([, c], { theme }) => `text-[24px] mr-[4px]`],

  [
    /^q-uploader__title$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__title'] ??
      `text-[14px] font-bold leading-[1.285714]`
  ],

  [
    /^q-uploader__subtitle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader__subtitle'] ??
      `text-[12px] leading-normal`
  ],

  [
    /^q-uploader--disable$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader--disable'] ??
      `[&_.q-uploader\\_\\_header]:(pointer-events-none) [&_.q-uploader\\_\\_list]:(pointer-events-none)`
  ],

  [
    /^q-uploader--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-uploader--dark'] ??
      `border-[rgba(255,_255,_255,_0.28)] [box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] [&_.q-uploader\\_\\_file]:(border-[rgba(255,_255,_255,_0.28)]) [&_.q-uploader\\_\\_dnd]:(bg-[rgba(255,_255,_255,_0.3)]) [&_.q-uploader\\_\\_overlay]:(bg-[rgba(255,_255,_255,_0.3)]) [&_.q-uploader\\_\\_overlay]:(text-[#fff])`
  ]
]

export { shortcuts }
