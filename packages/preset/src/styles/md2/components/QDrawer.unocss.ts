import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass,
  qe
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-drawer$/,
    componentCtxClass(
      'q-drawer',
      ({ theme }) =>
        `absolute top-[0] bottom-[0] bg-[#fff] z-${theme.quasar.z['side']}`
    )
  ],

  [
    /^q-drawer--on-top$/,
    componentCtxClass(
      'q-drawer--on-top',
      ({ theme }) => `z-${theme.quasar.z['top']}`
    )
  ],

  [
    /^q-drawer--left$/,
    componentCtxClass(
      'q-drawer--left',
      ({ theme }) =>
        qe`left-[0] -translate-x-full [&.q-drawer--bordered]:([border-right:1px_solid_rgba(0,_0,_0,_0.12)]) [&_.q-layout__shadow]:(left-[10px] -right-[10px]) [&_.q-layout__shadow:after]:(right-[10px])`
    )
  ],

  [
    /^q-drawer--right$/,
    componentCtxClass(
      'q-drawer--right',
      ({ theme }) =>
        qe`right-[0] translate-x-full [&.q-drawer--bordered]:([border-left:1px_solid_rgba(0,_0,_0,_0.12)]) [&_.q-layout__shadow]:(-left-[10px]) [&_.q-layout__shadow:after]:(left-[10px])`
    )
  ],

  [
    /^q-drawer-container$/,
    componentCtxClass(
      'q-drawer-container',
      ({ theme }) =>
        qe`[&:not(.q-drawer--mini-animate)_.q-drawer--mini]:(!p-0) [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item]:(text-center justify-center pl-0 pr-0 min-w-[0]) [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item__section]:(text-center justify-center pl-0 pr-0 min-w-[0]) [&:not(.q-drawer--mini-animate)_.q-drawer--mini_.q-item__label]:(hidden)`
    )
  ],

  [
    /^q-drawer--mini$/,
    componentCtxClass(
      'q-drawer--mini',
      ({ theme }) =>
        qe`[&_.q-mini-drawer-hide]:(hidden) [&_.q-expansion-item__content]:(hidden)`
    )
  ],

  [
    /^q-drawer--mini-animate$/,
    componentCtxClass(
      'q-drawer--mini-animate',
      ({ theme }) =>
        qe`[&_.q-drawer__content]:(!overflow-x-hidden whitespace-nowrap)`
    )
  ],

  [
    /^q-drawer--standard$/,
    componentCtxClass(
      'q-drawer--standard',
      ({ theme }) => `[&_.q-mini-drawer-only]:(hidden)`
    )
  ],

  [
    /^q-drawer--mobile$/,
    componentCtxClass(
      'q-drawer--mobile',
      ({ theme }) =>
        `[&_.q-mini-drawer-only]:(hidden) [&_.q-mini-drawer-hide]:(hidden)`
    )
  ],

  [
    /^q-drawer__backdrop$/,
    componentCtxClass(
      'q-drawer__backdrop',
      ({ theme }) => `z-${theme.quasar.z['top'] - 1}`
    )
  ],

  [
    /^q-drawer__opener$/,
    componentCtxClass(
      'q-drawer__opener',
      ({ theme }) =>
        `h-full w-[15px] select-none z-${theme.quasar.z['marginals'] + 1}`
    )
  ]
]

export { shortcuts }
