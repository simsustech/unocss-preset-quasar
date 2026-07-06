import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-touch$/, ([, c], { theme }) => `select-none`],

  [/^q-touch-x$/, ([, c], { theme }) => ``],

  [/^q-touch-y$/, ([, c], { theme }) => ``]
]

export { shortcuts }
