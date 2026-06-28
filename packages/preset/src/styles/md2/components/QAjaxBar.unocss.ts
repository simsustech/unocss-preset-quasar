import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-loading-bar$/,
    componentCtxClass(
      'q-loading-bar',
      ({ theme }) =>
        `fixed z-${theme.quasar.z['max']} transition-transform bg-red`
    )
  ],
  [/^q-loading-bar--top$/, ([, c], { theme }) => `left-0 right-0 top-0 w-full`],
  [
    /^q-loading-bar--bottom$/,
    componentCtxClass(
      'q-loading-bar--bottom',
      ({ theme }) => `left-0 right-0 bottom-0 w-full`
    )
  ],
  [
    /^q-loading-bar--right$/,
    componentCtxClass(
      'q-loading-bar--right',
      ({ theme }) => `top-0 bottom-0 right-0 h-full`
    )
  ],
  [
    /^q-loading-bar--left$/,
    componentCtxClass(
      'q-loading-bar--left',
      ({ theme }) => `top-0 bottom-0 left-0 h-full`
    )
  ]
]

export { shortcuts }
