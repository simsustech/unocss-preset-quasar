import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-page$/, ([, c], { theme }) => `relative`]
]

export { shortcuts }
