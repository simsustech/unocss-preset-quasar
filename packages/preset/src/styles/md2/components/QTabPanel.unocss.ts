import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-tab-panels$/, ([, c], { theme }) => `bg-inherit`],

  [/^q-tab-panel$/, ([, c], { theme }) => `p-[var(--q-space-lg)]`]
]

export { shortcuts }
