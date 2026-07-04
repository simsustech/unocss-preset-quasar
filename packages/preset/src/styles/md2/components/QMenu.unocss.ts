import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-menu$/,
    componentCtxClass(
      'q-menu',
      ({ theme }) =>
        `!fixed inline-block max-w-[95vw] max-h-[65vh] [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] bg-[#fff] [border-radius:var(--q-radius-sm)] overflow-y-auto overflow-x-hidden outline-0 z-${theme.quasar.z['menu']}`
    )
  ],

  [/^q-menu--square$/, ([, c], { theme }) => `rounded-none`],

  [
    /^q-menu--dark$/,
    componentCtxClass(
      'q-menu--dark',
      ({ theme }) =>
        `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)]`
    )
  ]
]

export { shortcuts }
