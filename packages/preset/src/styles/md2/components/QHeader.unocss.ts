import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-header--hidden$/, mdStatic(`-translate-y-[110%]`)],

  [
    /^q-header--bordered$/,
    mdComponent(
      'q-header--bordered',
      `[border-bottom:1px_solid_rgba(0,_0,_0,_0.12)]`
    )
  ],

  [
    /^q-header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-header'] ??
      `z-2000 [&_.q-layout\\_\\_shadow]:(-bottom-10px) [&_.q-layout\\_\\_shadow:after]:(bottom-10px)`
    // relative
  ]
]

export { shortcuts }
