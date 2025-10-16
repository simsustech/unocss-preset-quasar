import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-drawer$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer'] ??
      `absolute top-[0] bottom-[0] bg-$light-surface-container-low dark:bg-$dark-surface-container-low z-${theme.quasar.z['side']} sm:!w-full`
  ],

  [
    /^q-drawer--on-top$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--on-top'] ??
      `z-${theme.quasar.z['top']}`
  ],

  [
    /^q-drawer--left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--left'] ??
      `left-[0] -translate-x-full [&.q-drawer--bordered]:([border-right:1px_solid_rgba(0,_0,_0,_0.12)]) [&_.q-layout\\_\\_shadow]:(left-[10px] -right-[10px]) [&_.q-layout\\_\\_shadow:after]:(right-[10px])`
  ],

  [
    /^q-drawer--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--right'] ??
      `right-[0] translate-x-full [&.q-drawer--bordered]:([border-left:1px_solid_rgba(0,_0,_0,_0.12)]) [&_.q-layout\\_\\_shadow]:(-left-[10px]) [&_.q-layout\\_\\_shadow:after]:(left-[10px])`
  ],

  [
    /^q-drawer-container$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer-container'] ??
      `[&:not(.q-drawer--mini-animate)_.q-drawer--mini]:(!p-0)
      [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item]:(text-center justify-center pl-0 pr-0 min-w-[0])
      [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item\\_\\_section]:(text-center justify-center pl-0 pr-0 min-w-[0])
      [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item\\_\\_label]:(hidden)
      [&:not(.q-drawer--mini-animate)__.q-drawer--mini__.q-item\\_\\_section--main]:(hidden)
      [&:not(.q-drawer--mini-animate)__.q-drawer--mini__.q-item\\_\\_section--side__~_.q-item\\_\\_section--side]:(hidden)`
  ],

  [
    /^q-drawer--mini$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--mini'] ??
      `rounded-none
      [&_>_.q-drawer\\_\\_content]:(!py-9px)
      [&_>_.q-drawer\\_\\_content_>_*]:(!px-4px)
      [&_.q-mini-drawer-hide]:(hidden) [&_.q-expansion-item\\_\\_content]:(hidden)
      [&_.q-tab\\_\\_label]:(text-12px)
      [&_.q-tabs--vertical_.q-tab]:(px-0px)`
  ],

  [
    /^q-drawer--mini-animate$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--mini-animate'] ??
      `[&_.q-drawer\\_\\_content]:(!overflow-x-hidden whitespace-nowrap)`
  ],

  [
    /^q-drawer--standard$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--standard'] ??
      `[&_.q-mini-drawer-only]:(hidden)`
  ],

  [
    /^q-drawer--mobile$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer--mobile'] ??
      `[&_.q-mini-drawer-only]:(hidden) [&_.q-mini-drawer-hide]:(hidden) rounded-e-$shape-corner-large`
  ],

  [
    /^q-drawer__backdrop$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer__backdrop'] ??
      `z-${theme.quasar.z['top'] - 1}`
  ],

  [
    /^q-drawer__opener$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer__opener'] ??
      `h-full w-[15px] select-none z-${theme.quasar.z['marginals'] + 1}`
  ],

  [
    /^q-drawer__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-drawer__content'] ??
      `py-14px 
      [&_>_*]:(px-28px)
      [&_>_.q-scrollarea]:(px-0)
      [&_>_.q-list]:(px-12px)
      [&_.q-list_.q-item]:(border-rd-32px)
      [&_.q-list_>_.q-router-link--active]:(text-$light-primary dark:text-$dark-primary)
      [&_.q-list_.q-router-link--active]:(bg-$light-secondary-container dark:bg-$dark-secondary-container)
      `
  ]
]

export { shortcuts }
