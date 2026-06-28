import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-color-picker$/,
    componentClass(
      'q-color-picker',
      qe`overflow-hidden bg-[#fff] max-w-[350px] align-top min-w-[180px] rounded-[4px] [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] [&_.q-tab]:(!p-0) [&_input]:([color:inherit] bg-transparent outline-[0] text-center) [&_.q-tabs]:(overflow-hidden) [&_.q-tab--active]:([box-shadow:0_0_14px_3px_rgba(0,_0,_0,_0.2)]) [&_.q-tab--active_.q-focus-helper]:(hidden) [&_.q-tab__indicator]:(hidden) [&_.q-tab-panels]:([background:inherit])`
    )
  ],

  [
    /^q-color-picker--bordered$/,
    componentClass(
      'q-color-picker--bordered',
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
    )
  ],

  [
    /^q-color-picker__header-tabs$/,
    componentClass('q-color-picker__header-tabs', `h-[32px]`)
  ],

  [
    /^q-color-picker__header-banner$/,
    componentClass('q-color-picker__header-banner', `h-[36px] h-[36px]`)
  ],

  [
    /^q-color-picker__header$/,
    componentClass(
      'q-color-picker__header',
      `[&_input]:(leading-[24px] border-[0]) [&_.q-tab]:(!min-h-[32px] !h-[32px]) [&_.q-tab--inactive]:(bg-[linear-gradient(_to_top,_rgba(0,_0,_0,_0.3)_0%,_rgba(0,_0,_0,_0.15)_25%,_rgba(0,_0,_0,_0.1)_)])`
    )
  ],

  [
    /^q-color-picker__error-icon$/,
    componentClass(
      'q-color-picker__error-icon',
      `bottom-[2px] right-[2px] text-[24px] opacity-0 [transition:opacity_0.3s_ease-in]`
    )
  ],

  [
    /^q-color-picker__header-content$/,
    componentClass('q-color-picker__header-content', `relative bg-[#fff]`)
  ],

  [
    /^q-color-picker__header-content--light$/,
    componentClass('q-color-picker__header-content--light', `text-[#000]`)
  ],

  [
    /^q-color-picker__header-content--dark$/,
    componentClass(
      'q-color-picker__header-content--dark',
      `text-[#fff] [&_.q-tab--inactive:before]:(content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] bg-[rgba(255,_255,_255,_0.2)])`
    )
  ],

  [
    /^q-color-picker__header-bg$/,
    componentClass(
      'q-color-picker__header-bg',
      `bg-[#fff] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==')]`
    )
  ],

  [
    /^q-color-picker__footer$/,
    componentClass(
      'q-color-picker__footer',
      `h-[36px] [&_.q-tab]:(!min-h-[36px] !h-[36px]) [&_.q-tab--inactive]:(bg-[linear-gradient(_to_bottom,_rgba(0,_0,_0,_0.3)_0%,_rgba(0,_0,_0,_0.15)_25%,_rgba(0,_0,_0,_0.1)_)])`
    )
  ],

  [
    /^q-color-picker__spectrum$/,
    componentClass('q-color-picker__spectrum', `w-full h-full`)
  ],

  [
    /^q-color-picker__spectrum-tab$/,
    componentClass('q-color-picker__spectrum-tab', `!p-0`)
  ],

  [
    /^q-color-picker__spectrum-white$/,
    componentClass(
      'q-color-picker__spectrum-white',
      `bg-[linear-gradient(to_right,_#fff,_rgba(255,_255,_255,_0))]`
    )
  ],

  [
    /^q-color-picker__spectrum-black$/,
    componentClass(
      'q-color-picker__spectrum-black',
      `bg-[linear-gradient(to_top,_#000,_rgba(0,_0,_0,_0))]`
    )
  ],

  [
    /^q-color-picker__spectrum-circle$/,
    componentClass(
      'q-color-picker__spectrum-circle',
      `w-[10px] h-[10px] [box-shadow:0_0_0_1.5px_#fff,_inset_0_0_1px_1px_rgba(0,_0,_0,_0.3),_0_0_1px_2px_rgba(0,_0,_0,_0.4)] rounded-[50%] -translate-x-[5px] -translate-y-[5px]`
    )
  ],

  [
    /^q-color-picker__hue$/,
    componentClass(
      'q-color-picker__hue',
      qe`[&_.q-slider__track]:(!bg-[linear-gradient(_to_right,_#f00_0%,_#ff0_17%,_#0f0_33%,_#0ff_50%,_#00f_67%,_#f0f_83%,_#f00_100%_)] opacity-100)`
    )
  ],

  [
    /^q-color-picker__alpha$/,
    componentClass(
      'q-color-picker__alpha',
      qe`[&_.q-slider__track-container]:(pt-0) [&_.q-slider__track:before]:(content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] [border-radius:inherit] bg-[linear-gradient(90deg,_rgba(255,_255,_255,_0),_#757575)])`
    )
  ],

  [
    /^q-color-picker__sliders$/,
    componentClass(
      'q-color-picker__sliders',
      qe`px-[16px] py-[0] [&_.q-slider__thumb]:(text-[#424242]) [&_.q-slider__thumb_path]:(stroke-[2px] fill-[transparent]) [&_.q-slider--active_path]:(stroke-[3px])`
    )
  ],

  [
    /^q-color-picker__tune-tab$/,
    componentClass(
      'q-color-picker__tune-tab',
      `[&_.q-slider]:(ml-[18px] mr-[18px]) [&_input]:(text-[11px] border-[1px] border-solid border-[#e0e0e0] rounded-[4px] w-[3.5em])`
    )
  ],

  [
    /^q-color-picker__palette-tab$/,
    componentClass('q-color-picker__palette-tab', `!p-0`)
  ],

  [
    /^q-color-picker__palette-rows--editable$/,
    componentClass(
      'q-color-picker__palette-rows--editable',
      qe`[&_.q-color-picker__cube]:(cursor-pointer)`
    )
  ],

  [
    /^q-color-picker__cube$/,
    componentClass('q-color-picker__cube', `pb-[10%] !w-[10%]`)
  ],

  [
    /^q-color-picker--dark$/,
    componentClass(
      'q-color-picker--dark',
      qe`[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] [&_.q-color-picker__tune-tab_input]:(border-[1px] border-solid border-[rgba(255,255,255,0.3)]) [&_.q-slider__thumb]:(text-[#fafafa])`
    )
  ]
]

export { shortcuts }
