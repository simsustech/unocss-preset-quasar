import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic, mdComponentCtx } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-drawer$/,
    mdComponentCtx(
      'q-drawer',
      ({ theme }) =>
        `absolute top-[0] bottom-[0] bg-$light-surface-container-low dark:bg-$dark-surface-container-low z-${theme.quasar.z['side']}`
    )
  ],

  [
    /^q-drawer--on-top$/,
    mdComponentCtx(
      'q-drawer--on-top',
      ({ theme }) => `z-${theme.quasar.z['top']}`
    )
  ],

  [
    /^q-drawer--left$/,
    mdComponentCtx(
      'q-drawer--left',
      ({ theme }) =>
        `left-[0] -translate-x-full [&.q-drawer--bordered]:([border-right:1px_solid_rgba(0,_0,_0,_0.12)]) [&_.q-layout\\_\\_shadow]:(left-[10px] -right-[10px]) [&_.q-layout\\_\\_shadow:after]:(right-[10px])`
    )
  ],

  [
    /^q-drawer--right$/,
    mdComponentCtx(
      'q-drawer--right',
      ({ theme }) =>
        `right-[0] translate-x-full [&.q-drawer--bordered]:([border-left:1px_solid_rgba(0,_0,_0,_0.12)]) [&_.q-layout\\_\\_shadow]:(-left-[10px]) [&_.q-layout\\_\\_shadow:after]:(left-[10px])`
    )
  ],

  [
    /^q-drawer-container$/,
    mdComponentCtx(
      'q-drawer-container',
      ({ theme }) => `[&:not(.q-drawer--mini-animate)_.q-drawer--mini]:(!p-0)
      [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item]:(text-center justify-center pl-0 pr-0 min-w-[0])
      [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item\\_\\_section]:(text-center justify-center pl-0 pr-0 min-w-[0])
      [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item\\_\\_label]:(hidden)
      [&:not(.q-drawer--mini-animate)__.q-drawer--mini__.q-item\\_\\_section--main]:(hidden)
      [&:not(.q-drawer--mini-animate)__.q-drawer--mini__.q-item\\_\\_section--side__~_.q-item\\_\\_section--side]:(hidden)`
    )
  ],

  [
    /^q-drawer--mini$/,
    mdComponentCtx(
      'q-drawer--mini',
      ({ theme }) => `rounded-none
      [&_>_.q-drawer\\_\\_content]:(!py-9px)
      [&_>_.q-drawer\\_\\_content_>_*]:(!px-4px)
      [&_.q-mini-drawer-hide]:(hidden) [&_.q-expansion-item\\_\\_content]:(hidden)
      [&_.q-tab\\_\\_label]:(text-12px)
      [&_.q-tabs--vertical_.q-tab]:(px-0px)`
    )
  ],

  [
    /^q-drawer--mini-animate$/,
    mdComponentCtx(
      'q-drawer--mini-animate',
      ({ theme }) =>
        `[&_.q-drawer\\_\\_content]:(!overflow-x-hidden whitespace-nowrap)`
    )
  ],

  [
    /^q-drawer--standard$/,
    mdComponentCtx(
      'q-drawer--standard',
      ({ theme }) => `[&_.q-mini-drawer-only]:(hidden)`
    )
  ],

  [
    /^q-drawer--mobile$/,
    mdComponentCtx(
      'q-drawer--mobile',
      ({ theme }) =>
        `[&_.q-mini-drawer-only]:(hidden) [&_.q-mini-drawer-hide]:(hidden) rounded-e-$shape-corner-large`
    )
  ],

  [
    /^q-drawer__backdrop$/,
    mdComponentCtx(
      'q-drawer__backdrop',
      ({ theme }) => `z-${theme.quasar.z['top'] - 1}`
    )
  ],

  [
    /^q-drawer__opener$/,
    mdComponentCtx(
      'q-drawer__opener',
      ({ theme }) =>
        `h-full w-[15px] select-none z-${theme.quasar.z['marginals'] + 1}`
    )
  ],

  [
    /^q-drawer__content$/,
    mdComponentCtx(
      'q-drawer__content',
      ({ theme }) => `py-14px 
      [&_>_*]:(px-28px)
      [&_>_.q-scrollarea]:(px-0)
      [&_>_.q-list]:(px-12px)
      [&_.q-list_.q-item]:(border-rd-32px)
      [&_.q-list_>_.q-router-link--active]:(text-$light-primary dark:text-$dark-primary)
      [&_.q-list_.q-router-link--active]:(bg-$light-secondary-container dark:bg-$dark-secondary-container)
      `
    )
  ]
]

export { shortcuts }
