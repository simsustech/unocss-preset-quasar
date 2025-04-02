import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-touch$/, ([, c], { theme }) => `select-none`],

  [/^q-touch-x$/, ([, c], { theme }) => ``],

  [/^q-touch-y$/, ([, c], { theme }) => ``]
]

export { shortcuts }
