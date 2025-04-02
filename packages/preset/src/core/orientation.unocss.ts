import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^flip-horizontal$/, ([, c], { theme }) => `scale-x-[-1]`],

  [/^flip-vertical$/, ([, c], { theme }) => `scale-y-[-1]`]
]

export { shortcuts }
