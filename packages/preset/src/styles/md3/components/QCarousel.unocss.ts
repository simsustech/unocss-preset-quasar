import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-carousel$/,
    componentClass(
      'q-carousel',
      qe`bg-$light-surface h-[400px] [&_.q-carousel--padding]:(p-[16px]) [&_.q-carousel__thumbnail]:(m-[2px] h-[50px] w-auto inline-block cursor-pointer [border-width:1px] border-solid border-[transparent] rounded-[4px] align-middle opacity-70 [transition:opacity_0.3s]) [&_.q-carousel__thumbnail:hover]:(opacity-100) [&_.q-carousel__thumbnail--active]:(opacity-100) [&_.q-carousel__thumbnail--active]:(border-current cursor-default)`
    )
  ],

  [
    /^q-carousel__slide$/,
    componentClass(
      'q-carousel__slide',
      `h-[400px] bg-cover bg-no-repeat bg-[50%]`
    )
  ],

  [/^q-carousel__slides-container$/, staticClass(`h-full`)],

  [/^q-carousel__control$/, staticClass(`text-[#fff]`)],

  [
    /^q-carousel__arrow$/,
    componentClass(
      'q-carousel__arrow',
      `pointer-events-none [&_.q-icon]:(text-[28px]) [&_.q-btn]:(pointer-events-all)`
    )
  ],

  [
    /^q-carousel__prev-arrow--horizontal$/,
    componentClass(
      'q-carousel__prev-arrow--horizontal',
      `top-[16px] bottom-[16px] left-[16px]`
    )
  ],

  [
    /^q-carousel__next-arrow--horizontal$/,
    componentClass(
      'q-carousel__next-arrow--horizontal',
      `top-[16px] bottom-[16px] right-[16px]`
    )
  ],

  [
    /^q-carousel__prev-arrow--vertical$/,
    componentClass(
      'q-carousel__prev-arrow--vertical',
      `left-[16px] right-[16px] top-[16px]`
    )
  ],

  [
    /^q-carousel__next-arrow--vertical$/,
    componentClass(
      'q-carousel__next-arrow--vertical',
      `left-[16px] right-[16px] bottom-[16px]`
    )
  ],

  [
    /^q-carousel__navigation--top$/,
    componentClass(
      'q-carousel__navigation--top',
      `left-[16px] right-[16px] overflow-x-auto overflow-y-hidden top-[16px]`
    )
  ],

  [
    /^q-carousel__navigation--bottom$/,
    componentClass(
      'q-carousel__navigation--bottom',
      `left-[16px] right-[16px] overflow-x-auto overflow-y-hidden bottom-[16px]`
    )
  ],

  [
    /^q-carousel__navigation--left$/,
    componentClass(
      'q-carousel__navigation--left',
      qe`top-[16px] bottom-[16px] overflow-x-hidden overflow-y-auto [&_>_.q-carousel__navigation-inner]:(flex-col) left-[16px]`
    )
  ],

  [
    /^q-carousel__navigation--right$/,
    componentClass(
      'q-carousel__navigation--right',
      qe`top-[16px] bottom-[16px] overflow-x-hidden overflow-y-auto [&_>_.q-carousel__navigation-inner]:(flex-col) right-[16px]`
    )
  ],

  [/^q-carousel__navigation-inner$/, staticClass(`flex-auto`)],

  [
    /^q-carousel__navigation$/,
    componentClass(
      'q-carousel__navigation',
      `[&_.q-btn]:(mx-[4px] my-[6px] p-[5px])`
    )
  ],

  [
    /^q-carousel__navigation-icon--inactive$/,
    componentClass('q-carousel__navigation-icon--inactive', `opacity-70`)
  ],

  [
    /^q-carousel--navigation-top$/,
    componentClass(
      'q-carousel--navigation-top',
      `[&_.q-carousel--padding]:(pt-[60px])`
    )
  ],

  [
    /^q-carousel--arrows-vertical$/,
    componentClass(
      'q-carousel--arrows-vertical',
      `[&_.q-carousel--padding]:(pt-[60px]) [&_.q-carousel--padding]:(pb-[60px])`
    )
  ],

  [
    /^q-carousel--navigation-bottom$/,
    componentClass(
      'q-carousel--navigation-bottom',
      `[&_.q-carousel--padding]:(pb-[60px])`
    )
  ],

  [
    /^q-carousel--navigation-left$/,
    componentClass(
      'q-carousel--navigation-left',
      `[&_.q-carousel--padding]:(pl-[60px])`
    )
  ],

  [
    /^q-carousel--arrows-horizontal$/,
    componentClass(
      'q-carousel--arrows-horizontal',
      `[&_.q-carousel--padding]:(pl-[60px]) [&_.q-carousel--padding]:(pr-[60px])`
    )
  ],

  [
    /^q-carousel--navigation-right$/,
    componentClass(
      'q-carousel--navigation-right',
      `[&_.q-carousel--padding]:(pr-[60px])`
    )
  ]
]

export { shortcuts }
