import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-tab$/,
    mdComponent(
      'q-tab',
      `px-[16px] py-[0] min-h-[48px] [transition:color_0.3s,_background-color_0.3s] whitespace-nowrap [color:inherit] no-underline
      [&_.q-badge]:(top-[3px] -right-[12px])
      [&_>_.q-focus-helper]:(!absolute !h-[calc(80%)] !w-[calc(80%)] !top-[calc(10%)] !left-[calc(10%)] !rounded-$shape-corner-large)
      `
    )
  ],

  [/^q-tab--full$/, mdComponent('q-tab--full', `min-h-72px h-72px`)],

  [/^q-tab--no-caps$/, mdComponent('q-tab--no-caps', `normal-case`)],

  [
    /^q-tab__content$/,
    mdComponent(
      'q-tab__content',
      `[height:inherit] z-2 px-[0] py-[4px] min-w-[40px] [&_.q-chip--floating]:(top-[0] -right-[16px])`
    )
  ],

  [
    /^q-tab__content--inline$/,
    mdComponent(
      'q-tab__content--inline',
      `[&_.q-tab\\_\\_icon_+_.q-tab\\_\\_label]:(pl-[8px])`
    )
  ],

  [
    /^q-tab__icon$/,
    mdComponent('q-tab__icon', `w-[24px] h-[24px] text-[24px]`)
  ],

  [
    /^q-tab__label$/,
    mdComponent('q-tab__label', `text-[14px] leading-[1.715em] font-medium`)
  ],

  [
    /^q-tab__alert$/,
    mdComponent(
      'q-tab__alert',
      `absolute top-[7px] -right-[9px] h-[10px] w-[10px] rounded-[50%] bg-current`
    )
  ],

  [
    /^q-tab__alert-icon$/,
    mdComponent(
      'q-tab__alert-icon',
      `absolute top-[2px] -right-[12px] text-[18px]`
    )
  ],

  [
    /^q-tab__indicator$/,
    mdComponent('q-tab__indicator', `opacity-0 h-[2px] bg-current`)
  ],

  [
    /^q-tab--active$/,
    mdComponent(
      'q-tab--active',
      `text-$light-primary dark:text-$dark-primary [&_.q-tab\\_\\_indicator]:(opacity-100 origin-left)`
    )
  ],

  [/^q-tab--inactive$/, mdComponent('q-tab--inactive', `opacity-[0.85]`)],

  [
    /^q-tabs$/,
    mdComponent(
      'q-tabs',
      `!flex-initial relative [transition:color_0.3s,_background-color_0.3s]`
    )
  ],

  [
    /^q-tabs--scrollable$/,
    mdComponent(
      'q-tabs--scrollable',
      `[&.q-tabs__arrows--outside.q-tabs--horizontal]:(pl-[36px] pr-[36px]) [&.q-tabs__arrows--outside.q-tabs--vertical]:(pt-[36px] pb-[36px]) [&.q-tabs__arrows--outside_.q-tabs\\_\\_arrow--faded]:(opacity-30 pointer-events-none) [&.q-tabs__arrows--inside_.q-tabs\\_\\_arrow--faded]:(hidden)`
    )
  ],

  [
    /^q-tabs--not-scrollable$/,
    mdComponent(
      'q-tabs--not-scrollable',
      `[&.q-tabs__arrows--outside]:(pl-0 pr-0) [&_.q-tabs\\_\\_arrow]:(!hidden) [&_.q-tabs\\_\\_content]:([border-radius:inherit])`
    )
  ],

  [
    /^q-tabs__arrow$/,
    mdComponent(
      'q-tabs__arrow',
      `cursor-pointer text-[32px] min-w-[36px] [text-shadow:0_0_3px_#fff,_0_0_1px_#fff,_0_0_1px_#000] [transition:opacity_0.3s]`
    )
  ],

  [
    /^q-tabs__content$/,
    mdComponent('q-tabs__content', `overflow-hidden flex-auto`)
  ],

  [
    /^q-tabs__content--align-center$/,
    mdComponent('q-tabs__content--align-center', `justify-center`)
  ],

  [
    /^q-tabs__content--align-right$/,
    mdComponent('q-tabs__content--align-right', `justify-end`)
  ],

  [
    /^q-tabs__content--align-justify$/,
    mdComponent('q-tabs__content--align-justify', `[&_.q-tab]:(flex-auto)`)
  ],

  [/^q-tabs__offset$/, mdComponent('q-tabs__offset', `hidden`)],

  [
    /^q-tabs--horizontal$/,
    mdComponent(
      'q-tabs--horizontal',
      `[&_.q-tabs\\_\\_arrow]:(h-full) [&_.q-tabs\\_\\_arrow--left]:(top-[0] left-[0] bottom-[0]) [&_.q-tabs\\_\\_arrow--right]:(top-[0] right-[0] bottom-[0])`
    )
  ],

  [
    /^q-tabs--vertical$/,
    mdComponent(
      'q-tabs--vertical',
      `!block h-full [&_.q-tabs\\_\\_content]:(!block h-full) 
      [&_.q-tabs\\_\\_arrow]:(w-full h-[36px] text-center) 
      [&_.q-tabs\\_\\_arrow--left]:(top-[0] left-[0] right-[0]) 
      [&_.q-tabs\\_\\_arrow--right]:(left-[0] right-[0] bottom-[0]) 
      [&_.q-tab]:(px-[8px] py-[0]) 
      [&_.q-tab\\_\\_indicator]:(h-[unset] w-2px min-h-100%)
      [&_.q-tabs--not-scrollable_.q-tabs\\_\\_content]:(h-full) 
      [&_.q-tabs--dense_.q-tab\\_\\_content]:(min-w-[24px])`
    )
  ],

  [
    /^q-tabs--dense$/,
    mdComponent(
      'q-tabs--dense',
      `[&_.q-tab]:(min-h-[36px]) [&_.q-tab--full]:(min-h-[52px])`
    )
  ]
]

export { shortcuts }
