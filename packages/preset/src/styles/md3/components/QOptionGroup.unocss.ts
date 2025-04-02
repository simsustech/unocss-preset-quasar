import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-option-group--inline$/, ([, c], { theme }) => `[&_>_div]:(inline-block)`]
]

export { shortcuts }
