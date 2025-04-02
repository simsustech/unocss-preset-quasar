import { type Preflight } from '@unocss/core'
import { type QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
:root {
  --q-primary: ${theme.colors.primary};
  --q-secondary: ${theme.colors.secondary};
  --q-accent: ${theme.colors.accent};
  --q-positive: ${theme.colors.positive};
  --q-negative: ${theme.colors.negative};
  --q-info: ${theme.colors.info};
  --q-warning: ${theme.colors.warning};
  --q-dark: ${theme.colors.dark};
  --q-dark-page: ${theme.colors['dark-page']};
}`
  }
]

export { preflights }
