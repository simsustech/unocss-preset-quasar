import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tab$/,
    componentClass(
      'q-tab',
      `px-[16px] py-[0] min-h-[48px] [transition:color_0.3s,_background-color_0.3s] whitespace-nowrap no-underline
      [&_.q-badge]:(top-[3px] -right-[12px])
      [&_>_.q-focus-helper]:(!absolute !h-[calc(80%)] !w-[calc(80%)] !top-[calc(10%)] !left-[calc(10%)])
      `
    )
  ],

  [/^q-tab--full$/, componentClass('q-tab--full', `min-h-72px h-72px`)],

  [/^q-tab--no-caps$/, componentClass('q-tab--no-caps', `normal-case`)],

  [
    /^q-tab__content$/,
    componentClass(
      'q-tab__content',
      `[height:inherit] z-2 px-[0] py-[4px] min-w-[40px] [&_.q-chip--floating]:(top-[0] -right-[16px])`
    )
  ],

  [
    /^q-tab__content--inline$/,
    componentClass(
      'q-tab__content--inline',
      qe`[&_.q-tab__icon_+_.q-tab__label]:(pl-[8px])`
    )
  ],

  [
    /^q-tab__icon$/,
    componentClass('q-tab__icon', `w-[24px] h-[24px] text-[24px]`)
  ],

  [
    /^q-tab__label$/,
    componentClass('q-tab__label', `text-[14px] leading-[1.715em]`)
  ],

  [
    /^q-tab__alert$/,
    componentClass(
      'q-tab__alert',
      `absolute top-[7px] -right-[9px] h-[10px] w-[10px]`
    )
  ],

  [
    /^q-tab__alert-icon$/,
    componentClass(
      'q-tab__alert-icon',
      `absolute top-[2px] -right-[12px] text-[18px]`
    )
  ],

  [
    /^q-tab__indicator$/,
    componentClass('q-tab__indicator', `opacity-0 h-[2px]`)
  ],

  [
    /^q-tab--active$/,
    componentClass(
      'q-tab--active',
      qe`[&_.q-tab__indicator]:(opacity-100 origin-left)`
    )
  ],

  [/^q-tab--inactive$/, componentClass('q-tab--inactive', `opacity-[0.85]`)],

  [
    /^q-tabs$/,
    componentClass(
      'q-tabs',
      `!flex-initial relative [transition:color_0.3s,_background-color_0.3s]`
    )
  ],

  [
    /^q-tabs--scrollable$/,
    componentClass(
      'q-tabs--scrollable',
      qe`[&.q-tabs__arrows--outside.q-tabs--horizontal]:(pl-[36px] pr-[36px]) [&.q-tabs__arrows--outside.q-tabs--vertical]:(pt-[36px] pb-[36px]) [&.q-tabs__arrows--outside_.q-tabs__arrow--faded]:(opacity-30 pointer-events-none) [&.q-tabs__arrows--inside_.q-tabs__arrow--faded]:(hidden)`
    )
  ],

  [
    /^q-tabs--not-scrollable$/,
    componentClass(
      'q-tabs--not-scrollable',
      qe`[&.q-tabs__arrows--outside]:(pl-0 pr-0) [&_.q-tabs__arrow]:(!hidden)`
    )
  ],

  [
    /^q-tabs__arrow$/,
    componentClass(
      'q-tabs__arrow',
      `cursor-pointer text-[32px] min-w-[36px] [transition:opacity_0.3s]`
    )
  ],

  [
    /^q-tabs__content$/,
    componentClass('q-tabs__content', `overflow-hidden flex-auto`)
  ],

  [
    /^q-tabs__content--align-center$/,
    componentClass('q-tabs__content--align-center', `justify-center`)
  ],

  [
    /^q-tabs__content--align-right$/,
    componentClass('q-tabs__content--align-right', `justify-end`)
  ],

  [
    /^q-tabs__content--align-justify$/,
    componentClass('q-tabs__content--align-justify', `[&_.q-tab]:(flex-auto)`)
  ],

  [/^q-tabs__offset$/, componentClass('q-tabs__offset', `hidden`)],

  [
    /^q-tabs--horizontal$/,
    componentClass(
      'q-tabs--horizontal',
      qe`[&_.q-tabs__arrow]:(h-full) [&_.q-tabs__arrow--left]:(top-[0] left-[0] bottom-[0]) [&_.q-tabs__arrow--right]:(top-[0] right-[0] bottom-[0])`
    )
  ],

  [
    /^q-tabs--vertical$/,
    componentClass(
      'q-tabs--vertical',
      qe`!block h-full [&_.q-tabs__content]:(!block h-full) 
      [&_.q-tabs__arrow]:(w-full h-[36px] text-center) 
      [&_.q-tabs__arrow--left]:(top-[0] left-[0] right-[0]) 
      [&_.q-tabs__arrow--right]:(left-[0] right-[0] bottom-[0]) 
      [&_.q-tab]:(px-[8px] py-[0]) 
      [&_.q-tab__indicator]:(h-[unset] w-2px min-h-100%)
      [&_.q-tabs--not-scrollable_.q-tabs__content]:(h-full) 
      [&_.q-tabs--dense_.q-tab__content]:(min-w-[24px])`
    )
  ],

  [
    /^q-tabs--dense$/,
    componentClass(
      'q-tabs--dense',
      `[&_.q-tab]:(min-h-[36px]) [&_.q-tab--full]:(min-h-[52px])`
    )
  ]
]

export { shortcuts }
