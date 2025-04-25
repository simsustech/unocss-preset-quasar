import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.body--dark {
  color: #fff;
  background: ${theme.colors['dark-page']};
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-dark$/,
    ([, c], { theme }) => `dark:text-dark-on-surface bg-dark-surface`
  ]
]

export { preflights, shortcuts }
