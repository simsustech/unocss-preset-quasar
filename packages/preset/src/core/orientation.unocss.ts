import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^flip-horizontal$/, ([, c], { theme }) => `scale-x-[-1]`],

  [/^flip-vertical$/, ([, c], { theme }) => `scale-y-[-1]`]
]

export { shortcuts }
