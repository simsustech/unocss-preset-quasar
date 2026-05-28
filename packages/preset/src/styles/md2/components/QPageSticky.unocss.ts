import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-page-sticky--shrink$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-page-sticky--shrink'] ??
      `pointer-events-none [&_>_div]:(inline-block pointer-events-auto)`
  ]
]

export { shortcuts }
