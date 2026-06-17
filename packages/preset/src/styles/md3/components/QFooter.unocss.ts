import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic, mdComponentCtx } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-footer--hidden$/, ([, c], { theme }) => `translate-y-[110%]`],

  [
    /^q-footer--bordered$/,
    mdComponentCtx(
      'q-footer--bordered',
      ({ theme }) => `[border-top:1px_solid_rgba(0,_0,_0,_0.12)]`
    )
  ],

  [
    /^q-footer$/,
    mdComponentCtx(
      'q-footer',
      ({ theme }) =>
        `[&_.q-layout\\_\\_shadow]:(-top-[10px]) [&_.q-layout\\_\\_shadow:after]:(top-[10px])  z-${theme.quasar.z['marginals']}`
    )
  ]
]

export { shortcuts }
