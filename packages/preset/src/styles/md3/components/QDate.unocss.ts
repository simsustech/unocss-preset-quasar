import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-date$/,
    componentClass(
      'q-date',
      `bg-$light-surface-container-high dark:bg-$dark-surface-container-high inline-flex [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] bg-[#fff] w-[290px] min-w-[290px] max-w-full`
    )
  ],

  [
    /^q-date--bordered$/,
    componentClass(
      'q-date--bordered',
      `[border-width:1px] border-solid border-[rgba(0,0,0,0.12)]`
    )
  ],

  [
    /^q-date__header$/,
    componentClass(
      'q-date__header',
      `bg-$light-primary dark:bg-$dark-surface-container-high text-$light-on-primary dark:text-$dark-on-surface [border-top-left-radius:inherit] p-[12px]`
    )
  ],

  [/^q-date__actions$/, staticClass(`pt-[0] px-[16px] pb-[16px]`)],

  [
    /^q-date__content$/,
    componentClass('q-date__content', `outline-0 [&_.q-btn]:(font-normal)`)
  ],

  [/^q-date__main$/, staticClass(`outline-0`)],

  [
    /^q-date__header-link$/,
    componentClass(
      'q-date__header-link',
      `opacity-[0.64] outline-0 
      [transition:_opacity_0.3s_ease-out] 
      [&:hover]:(opacity-100) 
      [&:focus]:(opacity-100)`
    )
  ],

  [/^q-date__header-link--active$/, staticClass(`opacity-100`)],

  [
    /^q-date__header-subtitle$/,
    componentClass(
      'q-date__header-subtitle',
      `text-[14px] leading-[1.75] tracking-[0.00938em] mb--16px`
    )
  ],

  [
    /^q-date__header-title-label$/,
    componentClass(
      'q-date__header-title-label',
      `pt-54px text-[24px] leading-[1.2] tracking-[0.00735em]`
    )
  ],

  [
    /^q-date__view$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-date__view'] ?? `min-h-[160px] p-12px`
    // h-full w-full
  ],

  [
    /^q-date__navigation$/,
    componentClass(
      'q-date__navigation',
      `h-[12.5%]
      [&_>_div:first-child]:(w-[8%] min-w-[24px] justify-end) [&_>_div:last-child]:(w-[8%] min-w-[24px] justify-start)
      [&_.q-btn]:(text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date__calendar-weekdays$/,
    componentClass(
      'q-date__calendar-weekdays',
      `h-[12.5%] [&_>_div]:(opacity-[0.38] text-[12px])`
    )
  ],

  [
    /^q-date__calendar-item$/,
    componentClass(
      'q-date__calendar-item',
      `inline-flex items-center justify-center align-middle !w-[14.285%] !h-[12.5%] relative [&:after]:(content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border) [&_>_div]:(w-[30px] h-[30px] rounded-[50%]) [&_button]:(w-[30px] h-[30px] rounded-[50%]) [&_>_div]:(leading-[30px] text-center) [&_>_button]:(leading-[22px])`
    )
  ],

  [/^q-date__calendar-item--out$/, staticClass(`opacity-[0.18]`)],

  [/^q-date__calendar-item--fill$/, staticClass(`invisible`)],

  [
    /^q-date__calendar-item--in$/,
    componentClass(
      'q-date__calendar-item--in',
      `[&_.q-btn]:(text-$light-on-primary dark:text-$dark-on-primary bg-$light-primary dark:bg-$dark-primary)
       [&_.q-btn--flat]:(text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date__range$/,
    componentClass(
      'q-date__range',
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)`
    )
  ],

  [
    /^q-date__range-from$/,
    componentClass(
      'q-date__range-from',
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none) [&:before]:(left-2/4)`
    )
  ],

  [
    /^q-date__range-to$/,
    componentClass(
      'q-date__range-to',
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none) [&:before]:(right-2/4)`
    )
  ],

  [
    /^q-date__edit-range$/,
    componentClass(
      'q-date__edit-range',
      `[&:after]:(border-$light-primary dark:border-$dark-primary border-l-transparent border-r-transparent) 
      [&:nth-child(7n-6):after]:(rounded-tl-none rounded-bl-none) 
      [&:nth-child(7n):after]:(rounded-tr-none rounded-br-none)`
    )
  ],

  [
    /^q-date__edit-range-from$/,
    componentClass(
      'q-date__edit-range-from',
      `[&:after]:(left-[4px] 
      border-r-0 border-$light-primary dark:border-$dark-primary rounded-tl-[28px] rounded-bl-[28px])`
    )
  ],

  [
    /^q-date__edit-range-from-to$/,
    componentClass(
      'q-date__edit-range-from-to',
      `[&:after]:(left-[4px] border-$light-primary dark:border-$dark-primary border-r-transparent rounded-tl-[28px] rounded-bl-[28px]) 
      [&:after]:(right-[4px] [border-color:$light-primary] dark:[border-color:$dark-primary] border-l-transparent rounded-tr-[28px] rounded-br-[28px])`
    )
  ],

  [
    /^q-date__edit-range-to$/,
    componentClass(
      'q-date__edit-range-to',
      `[&:after]:(right-[4px] border-l-transparent border-$light-primary dark:border-$dark-primary rounded-tr-[28px] rounded-br-[28px])`
    )
  ],

  [
    /^q-date__calendar-days-container$/,
    componentClass(
      'q-date__calendar-days-container',
      `h-3/4 min-h-[192px] pt-12px`
    )
  ],

  [/^q-date__calendar-days$/, staticClass(`[&_>_div]:(!h-1/6)`)],

  [
    /^q-date__event$/,
    componentClass(
      'q-date__event',
      `absolute bottom-[2px] left-2/4 h-[5px] w-[8px] rounded-[5px] [transform:translate3d(-50%,_0,_0)] bg-$light-primary dark:bg-$dark-primary`
    )
  ],

  [
    /^q-date__today$/,
    componentClass('q-date__today', `[box-shadow:0_0_1px_0_currentColor]`)
  ],

  [
    /^q-date__years-content$/,
    componentClass('q-date__years-content', `px-[8px] py-[0] gap-y-0.5em`)
  ],

  [
    /^q-date__years-item$/,
    componentClass(
      'q-date__years-item',
      `flex-[0_0_33.3333%]
        [&_.q-btn]:(h-30px w-60px text-$light-on-primary dark:text-$dark-on-primary bg-$light-primary dark:bg-$dark-primary)
       [&_.q-btn--flat]:(h-30px w-60px text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date__arrow$/,
    componentClass(
      'q-date__arrow',
      qe`flex-initial
    [&.q-date__arrow:has(+.q-date__arrow)]:(pr-40px)`
    )
  ],

  [/^q-date__months$/, componentClass('q-date__months', `flex-wrap`)],

  [
    /^q-date__months-item$/,
    componentClass(
      'q-date__months-item',
      `flex-[0_0_33.3333%]
          [&_.q-btn]:(text-$light-on-primary dark:text-$dark-on-primary bg-$light-primary dark:bg-$dark-primary)
       [&_.q-btn--flat]:(text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date--readonly$/,
    componentClass(
      'q-date--readonly',
      qe`[&_.q-date__header]:(pointer-events-none) [&_.q-date__content]:(pointer-events-none) [&_.q-date__navigation]:(hidden)`
    )
  ],

  [/^q-date--portrait$/, staticClass(`flex-col`)],

  [
    /^q-date--portrait-standard$/,
    componentClass(
      'q-date--portrait-standard',
      qe`[&_.q-date__content]:(h-[calc(100%-36px)]) 
       [&_.q-date__header]:([border-top-right-radius:inherit] h-[52px])
       [&_.q-date__header-title]:(items-center h-[30px])`
    )
  ],

  [
    /^q-date--portrait-minimal$/,
    componentClass(
      'q-date--portrait-minimal',
      qe`[&_.q-date__content]:(h-full)`
    )
  ],

  [
    /^q-date--landscape$/,
    componentClass(
      'q-date--landscape',
      qe`flex-row items-stretch min-w-[420px]
      [&_>_div]:(flex flex-auto flex-col)
      [&_.q-date__content]:(h-full)`
    )
  ],

  [
    /^q-date--landscape-standard$/,
    componentClass(
      'q-date--landscape-standard',
      qe`min-w-[420px] [&_.q-date__header]:([border-bottom-left-radius:inherit] max-w-[110px] w-[110px]) [&_.q-date__header-title]:(flex-col) [&_.q-date__header-today]:(mt-[12px] -ml-[8px])`
    )
  ],

  [/^q-date--landscape-minimal$/, staticClass(`w-[310px]`)],

  [
    /^q-date--dark$/,
    componentClass(
      'q-date--dark',
      `bg-$dark-surface-container text-$dark-on-surface [box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] border-[rgba(255,_255,_255,_0.28)]`
    )
  ]
]

export { shortcuts }
