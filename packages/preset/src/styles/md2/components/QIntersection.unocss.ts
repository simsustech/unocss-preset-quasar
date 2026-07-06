import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-intersection$/, ([, c], { theme }) => `relative`]
]

export { shortcuts }
