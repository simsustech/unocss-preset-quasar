import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-header--hidden$/, staticClass(`[transform:translateY(-110%)]`)],

  [
    /^q-header--bordered$/,
    componentClass(
      'q-header--bordered',
      `[border-bottom:1px_solid_rgba(0,_0,_0,_0.12)]`
    )
  ],

  [
    /^q-header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-header'] ??
      qe`z-2000 [&_.q-layout__shadow]:(-bottom-10px) [&_.q-layout__shadow:after]:(bottom-10px)
      [&_.q-toolbar__title]:(flex-grow-1000)`
    // relative
  ]
]

export { shortcuts }
