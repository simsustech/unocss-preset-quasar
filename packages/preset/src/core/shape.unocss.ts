import { type Preflight } from '@unocss/core'
import { type QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
:root {
  --shape-corner-small: ${theme.shape.corner.small};
  --shape-corner-medium: ${theme.shape.corner.medium};
  --shape-corner-large: ${theme.shape.corner.large};
}`
  }
]

export { preflights }
