import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-uploader$/,
    componentClass(
      'q-uploader',
      `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] align-top bg-[#fff] relative w-[320px] max-h-[320px]`
    )
  ],

  [
    /^q-uploader--bordered$/,
    componentClass(
      'q-uploader--bordered',
      `[border-width:1px] border-solid border-[rgba(0,0,0,0.12)]`
    )
  ],

  [
    /^q-uploader__input$/,
    componentClass(
      'q-uploader__input',
      `opacity-0 w-full h-full cursor-pointer [&::-webkit-file-upload-button]:(cursor-pointer)`
    )
  ],

  [
    /^q-uploader__file$/,
    componentClass(
      'q-uploader__file',
      qe`[&_.q-uploader__file-overlay]:([border-top-left-radius:inherit] [border-top-right-radius:inherit] absolute top-[0] right-[0] bottom-[0] left-[0] pointer-events-none bg-current opacity-[0.04]) rounded-tl-[4px] rounded-br-[0] rounded-tr-[4px] rounded-bl-[0] [border-width:1px] border-solid border-[rgba(0,0,0,0.12)] [&_.q-circular-progress]:(text-[24px]) [&_+_.q-uploader__file]:(mt-[8px])`
    )
  ],

  [
    /^q-uploader__header$/,
    componentClass(
      'q-uploader__header',
      `relative [border-top-left-radius:inherit] [border-top-right-radius:inherit] text-[#fff] w-full`
    )
  ],

  [
    /^q-uploader__spinner$/,
    componentClass('q-uploader__spinner', `text-[24px] mr-[4px]`)
  ],

  [
    /^q-uploader__header-content$/,
    componentClass('q-uploader__header-content', `p-[8px]`)
  ],

  [
    /^q-uploader__dnd$/,
    componentClass(
      'q-uploader__dnd',
      `outline-[1px_dashed_currentColor] outline-offset-[-4px] bg-[rgba(255,_255,_255,_0.6)]`
    )
  ],

  [
    /^q-uploader__overlay$/,
    componentClass(
      'q-uploader__overlay',
      `text-[36px] text-[#000] bg-[rgba(255,_255,_255,_0.6)]`
    )
  ],

  [
    /^q-uploader__list$/,
    componentClass(
      'q-uploader__list',
      `relative [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit] p-[8px] min-h-[60px] flex-auto`
    )
  ],

  [
    /^q-uploader__file--img$/,
    componentClass(
      'q-uploader__file--img',
      qe`text-[#fff] h-[200px] min-w-[200px] bg-[50%_50%] bg-no-repeat [&_.q-circular-progress]:(text-[#fff]) [&_.q-uploader__file-header]:(pb-[24px] bg-[linear-gradient(_to_bottom,_rgba(0,_0,_0,_0.7)_20%,_rgba(255,_255,_255,_0)_)])`
    )
  ],

  [
    /^q-uploader__file-header$/,
    componentClass(
      'q-uploader__file-header',
      `relative px-[8px] py-[4px] [border-top-left-radius:inherit] [border-top-right-radius:inherit]`
    )
  ],

  [/^q-uploader__file-header-content$/, staticClass(`pr-[8px]`)],

  [/^q-uploader__file-status$/, staticClass(`text-[24px] mr-[4px]`)],

  [
    /^q-uploader__title$/,
    componentClass(
      'q-uploader__title',
      `text-[14px] font-bold leading-[1.285714]`
    )
  ],

  [
    /^q-uploader__subtitle$/,
    componentClass('q-uploader__subtitle', `text-[12px] leading-normal`)
  ],

  [
    /^q-uploader--disable$/,
    componentClass(
      'q-uploader--disable',
      qe`[&_.q-uploader__header]:(pointer-events-none) [&_.q-uploader__list]:(pointer-events-none)`
    )
  ],

  [
    /^q-uploader--dark$/,
    componentClass(
      'q-uploader--dark',
      qe`border-[rgba(255,_255,_255,_0.28)] [box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] [&_.q-uploader__file]:(border-[rgba(255,_255,_255,_0.28)]) [&_.q-uploader__dnd]:(bg-[rgba(255,_255,_255,_0.3)]) [&_.q-uploader__overlay]:(bg-[rgba(255,_255,_255,_0.3)]) [&_.q-uploader__overlay]:(text-[#fff])`
    )
  ]
]

export { shortcuts }
