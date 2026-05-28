import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-space$/, ([, c], { theme }) => `!flex-grow`]
]

export { shortcuts }
