import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-panel$/, ([, c], { theme }) => `h-full w-full [&_div]:(h-full w-full)`],
  [/^q-panel-parent$/, ([, c], { theme }) => `overflow-hidden relative`]
]

export { shortcuts }
