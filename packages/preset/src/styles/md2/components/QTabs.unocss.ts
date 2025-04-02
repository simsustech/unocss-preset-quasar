import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-tab$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab'] ??
      `px-[16px] py-[0] min-h-[48px] [transition:color_0.3s,_background-color_0.3s] uppercase whitespace-nowrap [color:inherit] no-underline [&_.q-badge]:(top-[3px] -right-[12px])`
  ],

  [
    /^q-tab--full$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab--full'] ?? `min-h-[72px]`
  ],

  [
    /^q-tab--no-caps$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab--no-caps'] ?? `normal-case`
  ],

  [
    /^q-tab__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__content'] ??
      `[height:inherit] px-[0] py-[4px] min-w-[40px] [&_.q-chip--floating]:(top-[0] -right-[16px])`
  ],

  [
    /^q-tab__content--inline$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__content--inline'] ??
      `[&_.q-tab\\_\\_icon_+_.q-tab\\_\\_label]:(pl-[8px])`
  ],

  [
    /^q-tab__icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__icon'] ??
      `w-[24px] h-[24px] text-[24px]`
  ],

  [
    /^q-tab__label$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__label'] ??
      `text-[14px] leading-[1.715em] font-medium`
  ],

  [
    /^q-tab__alert$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__alert'] ??
      `absolute top-[7px] -right-[9px] h-[10px] w-[10px] rounded-[50%] bg-current`
  ],

  [
    /^q-tab__alert-icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__alert-icon'] ??
      `absolute top-[2px] -right-[12px] text-[18px]`
  ],

  [
    /^q-tab__indicator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab__indicator'] ??
      `!relative opacity-0 h-[2px] bg-current`
  ],

  [
    /^q-tab--active$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab--active'] ??
      `[&_.q-tab\\_\\_indicator]:(opacity-100 origin-left)`
  ],

  [
    /^q-tab--inactive$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tab--inactive'] ?? `opacity-[0.85]`
  ],

  [
    /^q-tabs$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs'] ??
      `!flex-initial relative [transition:color_0.3s,_background-color_0.3s]`
  ],

  [
    /^q-tabs--scrollable$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs--scrollable'] ??
      `[&.q-tabs__arrows--outside.q-tabs--horizontal]:(pl-[36px] pr-[36px]) [&.q-tabs__arrows--outside.q-tabs--vertical]:(pt-[36px] pb-[36px]) [&.q-tabs__arrows--outside_.q-tabs\\_\\_arrow--faded]:(opacity-30 pointer-events-none) [&.q-tabs__arrows--inside_.q-tabs\\_\\_arrow--faded]:(hidden)`
  ],

  [
    /^q-tabs--not-scrollable$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs--not-scrollable'] ??
      `[&.q-tabs__arrows--outside]:(pl-0 pr-0) [&_.q-tabs\\_\\_arrow]:(!hidden) [&_.q-tabs\\_\\_content]:([border-radius:inherit])`
  ],

  [
    /^q-tabs__arrow$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs__arrow'] ??
      `cursor-pointer text-[32px] min-w-[36px] [text-shadow:0_0_3px_#fff,_0_0_1px_#fff,_0_0_1px_#000] [transition:opacity_0.3s]`
  ],

  [
    /^q-tabs__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs__content'] ??
      `overflow-hidden flex-auto`
  ],

  [
    /^q-tabs__content--align-center$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs__content--align-center'] ??
      `justify-center`
  ],

  [
    /^q-tabs__content--align-right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs__content--align-right'] ??
      `justify-end`
  ],

  [
    /^q-tabs__content--align-justify$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs__content--align-justify'] ??
      `[&_.q-tab]:(flex-auto)`
  ],

  [
    /^q-tabs__offset$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs__offset'] ?? `hidden`
  ],

  [
    /^q-tabs--horizontal$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs--horizontal'] ??
      `[&_.q-tabs\\_\\_arrow]:(h-full) [&_.q-tabs\\_\\_arrow--left]:(top-[0] left-[0] bottom-[0]) [&_.q-tabs\\_\\_arrow--right]:(top-[0] right-[0] bottom-[0])`
  ],

  [
    /^q-tabs--vertical$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs--vertical'] ??
      `!block h-full [&_.q-tabs\\_\\_content]:(!block h-full) [&_.q-tabs\\_\\_arrow]:(w-full h-[36px] text-center) [&_.q-tabs\\_\\_arrow--left]:(top-[0] left-[0] right-[0]) [&_.q-tabs\\_\\_arrow--right]:(left-[0] right-[0] bottom-[0]) [&_.q-tab]:(px-[8px] py-[0]) [&_.q-tab\\_\\_indicator]:(h-[unset] w-[2px]) [&.q-tabs--not-scrollable_.q-tabs\\_\\_content]:(h-full) [&.q-tabs--dense_.q-tab\\_\\_content]:(min-w-[24px])`
  ],

  [
    /^q-tabs--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tabs--dense'] ??
      `[&_.q-tab]:(min-h-[36px]) [&_.q-tab--full]:(min-h-[52px])`
  ]
]

export { shortcuts }
