import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-header--hidden$/, staticClass(`-translate-y-[110%]`)],

  [
    /^q-header$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-header'] ??
      qe`z-2000 [&_.q-layout__shadow]:(-bottom-10px) [&_.q-layout__shadow:after]:(bottom-10px)
      [&_.q-toolbar__title]:(flex-grow-1000)`
  ]
]

export { shortcuts }
