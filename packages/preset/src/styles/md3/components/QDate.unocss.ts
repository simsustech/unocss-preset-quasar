import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-date$/,
    mdComponent(
      'q-date',
      `bg-$light-surface-container-high dark:bg-$dark-surface-container-high inline-flex [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] bg-[#fff] w-[290px] min-w-[290px] max-w-full`
    )
  ],

  [
    /^q-date--bordered$/,
    mdComponent(
      'q-date--bordered',
      `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
    )
  ],

  [
    /^q-date__header$/,
    mdComponent('q-date__header', `[border-top-left-radius:inherit] p-[12px]`)
  ],

  [/^q-date__actions$/, mdStatic(`pt-[0] px-[16px] pb-[16px]`)],

  [
    /^q-date__content$/,
    mdComponent('q-date__content', `outline-0 [&_.q-btn]:(font-normal)`)
  ],

  [/^q-date__main$/, mdStatic(`outline-0`)],

  [
    /^q-date__header-link$/,
    mdComponent(
      'q-date__header-link',
      `opacity-[0.64] outline-0 
      [transition:\_opacity\_0.3s\_ease-out] 
      [&:hover]:(opacity-100) 
      [&:focus]:(opacity-100)`
    )
  ],

  [/^q-date__header-link--active$/, mdStatic(`opacity-100`)],

  [
    /^q-date__header-subtitle$/,
    mdComponent(
      'q-date__header-subtitle',
      `text-[14px] leading-[1.75] tracking-[0.00938em] mb--16px`
    )
  ],

  [
    /^q-date__header-title-label$/,
    mdComponent(
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
    mdComponent(
      'q-date__navigation',
      `h-[12.5%]
      [&_>_div:first-child]:(w-[8%] min-w-[24px] justify-end) [&_>_div:last-child]:(w-[8%] min-w-[24px] justify-start)
      [&_.q-btn]:(text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date__calendar-weekdays$/,
    mdComponent(
      'q-date__calendar-weekdays',
      `h-[12.5%] [&_>_div]:(opacity-[0.38] text-[12px])`
    )
  ],

  [
    /^q-date__calendar-item$/,
    mdComponent(
      'q-date__calendar-item',
      `inline-flex items-center justify-center align-middle !w-[14.285%] !h-[12.5%] relative [&:after]:(content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border) [&_>_div]:(w-[30px] h-[30px] rounded-[50%]) [&_button]:(w-[30px] h-[30px] rounded-[50%]) [&_>_div]:(leading-[30px] text-center) [&_>_button]:(leading-[22px])`
    )
  ],

  [/^q-date__calendar-item--out$/, mdStatic(`opacity-[0.18]`)],

  [/^q-date__calendar-item--fill$/, mdStatic(`invisible`)],

  [
    /^q-date__calendar-item--in$/,
    mdComponent(
      'q-date__calendar-item--in',
      `[&_.q-btn]:(text-$light-on-primary dark:text-$dark-on-primary bg-$light-primary dark:bg-$dark-primary)
       [&_.q-btn--flat]:(text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date__range$/,
    mdComponent(
      'q-date__range',
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)`
    )
  ],

  [
    /^q-date__range-from$/,
    mdComponent(
      'q-date__range-from',
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none) [&:before]:(left-2/4)`
    )
  ],

  [
    /^q-date__range-to$/,
    mdComponent(
      'q-date__range-to',
      `[&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30) [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none) [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none) [&:before]:(right-2/4)`
    )
  ],

  [
    /^q-date__edit-range$/,
    mdComponent(
      'q-date__edit-range',
      `[&:after]:(border-$light-primary dark:border-$dark-primary border-l-transparent border-r-transparent) 
      [&:nth-child(7n-6):after]:(rounded-tl-none rounded-bl-none) 
      [&:nth-child(7n):after]:(rounded-tr-none rounded-br-none)`
    )
  ],

  [
    /^q-date__edit-range-from$/,
    mdComponent(
      'q-date__edit-range-from',
      `[&:after]:(left-[4px] 
      border-r-0 border-$light-primary dark:border-$dark-primary rounded-tl-[28px] rounded-bl-[28px])`
    )
  ],

  [
    /^q-date__edit-range-from-to$/,
    mdComponent(
      'q-date__edit-range-from-to',
      `[&:after]:(left-[4px] border-$light-primary dark:border-$dark-primary border-r-transparent rounded-tl-[28px] rounded-bl-[28px]) 
      [&:after]:(right-[4px] [border-$light-primary dark:border-$dark-primary border-l-transparent rounded-tr-[28px] rounded-br-[28px])`
    )
  ],

  [
    /^q-date__edit-range-to$/,
    mdComponent(
      'q-date__edit-range-to',
      `[&:after]:(right-[4px] border-l-transparent border-$light-primary dark:border-$dark-primary rounded-tr-[28px] rounded-br-[28px])`
    )
  ],

  [
    /^q-date__calendar-days-container$/,
    mdComponent(
      'q-date__calendar-days-container',
      `h-3/4 min-h-[192px] pt-12px`
    )
  ],

  [/^q-date__calendar-days$/, mdStatic(`[&_>_div]:(!h-1/6)`)],

  [
    /^q-date__event$/,
    mdComponent(
      'q-date__event',
      `absolute bottom-[2px] left-2/4 h-[5px] w-[8px] rounded-[5px] [transform:translate3d(-50%,_0,_0)] bg-$light-primary dark:bg-$dark-primary`
    )
  ],

  [
    /^q-date__today$/,
    mdComponent('q-date__today', `[box-shadow:0_0_1px_0_currentColor]`)
  ],

  [
    /^q-date__years-content$/,
    mdComponent('q-date__years-content', `px-[8px] py-[0] gap-y-0.5em`)
  ],

  [
    /^q-date__years-item$/,
    mdComponent(
      'q-date__years-item',
      `flex-[0_0_33.3333%]
        [&_.q-btn]:(h-30px w-60px text-$light-on-primary dark:text-$dark-on-primary bg-$light-primary dark:bg-$dark-primary)
       [&_.q-btn--flat]:(h-30px w-60px text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date__arrow$/,
    mdComponent(
      'q-date__arrow',
      `flex-initial
    [&.q-date\\_\\_arrow:has(+.q-date\\_\\_arrow)]:(pr-40px)`
    )
  ],

  [/^q-date__months$/, mdComponent('q-date__months', `flex-wrap`)],

  [
    /^q-date__months-item$/,
    mdComponent(
      'q-date__months-item',
      `flex-[0_0_33.3333%]
          [&_.q-btn]:(text-$light-on-primary dark:text-$dark-on-primary bg-$light-primary dark:bg-$dark-primary)
       [&_.q-btn--flat]:(text-$light-on-surface dark:text-$dark-on-surface)`
    )
  ],

  [
    /^q-date--readonly$/,
    mdComponent(
      'q-date--readonly',
      `[&_.q-date\\_\\_header]:(pointer-events-none) [&_.q-date\\_\\_content]:(pointer-events-none) [&_.q-date\\_\\_navigation]:(hidden)`
    )
  ],

  [/^q-date--portrait$/, mdStatic(`flex-col`)],

  [
    /^q-date--portrait-standard$/,
    mdComponent(
      'q-date--portrait-standard',
      `[&_.q-date\\_\\_content]:(h-[calc(100%-36px)]) 
       [&_.q-date\\_\\_header]:([border-top-right-radius:inherit] h-[52px])
       [&_.q-date\\_\\_header-title]:(items-center h-[30px])`
    )
  ],

  [
    /^q-date--portrait-minimal$/,
    mdComponent('q-date--portrait-minimal', `[&_.q-date\\_\\_content]:(h-full)`)
  ],

  [
    /^q-date--landscape$/,
    mdComponent(
      'q-date--landscape',
      `flex-row items-stretch min-w-[420px]
      [&_>_div]:(flex flex-auto flex-col)
      [&_.q-date\\_\\_content]:(h-full)`
    )
  ],

  [
    /^q-date--landscape-standard$/,
    mdComponent(
      'q-date--landscape-standard',
      `min-w-[420px] [&_.q-date\\_\\_header]:([border-bottom-left-radius:inherit] max-w-[110px] w-[110px]) [&_.q-date\\_\\_header-title]:(flex-col) [&_.q-date\\_\\_header-today]:(mt-[12px] -ml-[8px])`
    )
  ],

  [/^q-date--landscape-minimal$/, mdStatic(`w-[310px]`)],

  [
    /^q-date--dark$/,
    mdComponent(
      'q-date--dark',
      `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] border-[rgba(255,_255,_255,_0.28)]`
    )
  ]
]

export { shortcuts }
