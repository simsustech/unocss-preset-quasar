import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-header--hidden$/, ([, c], { theme }) => `-translate-y-[110%]`],

  [
    /^q-header--bordered$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-header--bordered'] ??
      `[border-bottom:1px_solid_rgba(0,_0,_0,_0.12)]`
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
