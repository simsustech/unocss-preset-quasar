import { Rule, UserShortcuts, type Preflight } from '@unocss/core'
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
  --light-primary: ${theme.colors.light.primary};
  --light-on-primary: ${theme.colors.light.onPrimary};
  --light-primary-container: ${theme.colors.light.primaryContainer};
  --light-on-primary-container: ${theme.colors.light.onPrimaryContainer};
  --light-secondary: ${theme.colors.light.secondary};
  --light-on-secondary: ${theme.colors.light.onSecondary};
  --light-secondary-container: ${theme.colors.light.secondaryContainer};
  --light-on-secondary-container: ${theme.colors.light.onSecondaryContainer};
  --light-tertiary: ${theme.colors.light.tertiary};
  --light-on-tertiary: ${theme.colors.light.onTertiary};
  --light-tertiary-container: ${theme.colors.light.tertiaryContainer};
  --light-on-tertiary-container: ${theme.colors.light.onTertiaryContainer};
  --light-error: ${theme.colors.light.error};
  --light-on-error: ${theme.colors.light.onError};
  --light-error-container: ${theme.colors.light.errorContainer};
  --light-on-error-container: ${theme.colors.light.onErrorContainer};
  --light-background: ${theme.colors.light.background};
  --light-on-background: ${theme.colors.light.onBackground};
  --light-surface: ${theme.colors.light.surface};
  --light-on-surface: ${theme.colors.light.onSurface};
  --light-surface-variant: ${theme.colors.light.surfaceVariant};
  --light-on-surface-variant: ${theme.colors.light.onSurfaceVariant};
  --light-outline: ${theme.colors.light.outline};
  --light-outline-variant: ${theme.colors.light.outlineVariant};
  --light-shadow: ${theme.colors.light.shadow};
  --light-scrim: ${theme.colors.light.scrim};
  --light-inverse-surface: ${theme.colors.light.inverseSurface};
  --light-inverse-on-surface: ${theme.colors.light.inverseOnSurface};
  --light-inverse-primary: ${theme.colors.light.inversePrimary};
  --light-surface-dim: ${theme.colors.light.surfaceDim};
  --light-surface-bright: ${theme.colors.light.surfaceBright};
  --light-surface-container-lowest: ${theme.colors.light.surfaceContainerLowest};
  --light-surface-container-low: ${theme.colors.light.surfaceContainerLow};
  --light-surface-container: ${theme.colors.light.surfaceContainer};
  --light-surface-container-high: ${theme.colors.light.surfaceContainerHigh};
  --light-surface-container-highest: ${theme.colors.light.surfaceContainerHighest};
  --dark-primary: ${theme.colors.dark.primary};
  --dark-on-primary: ${theme.colors.dark.onPrimary};
  --dark-primary-container: ${theme.colors.dark.primaryContainer};
  --dark-on-primary-container: ${theme.colors.dark.onPrimaryContainer};
  --dark-secondary: ${theme.colors.dark.secondary};
  --dark-on-secondary: ${theme.colors.dark.onSecondary};
  --dark-secondary-container: ${theme.colors.dark.secondaryContainer};
  --dark-on-secondary-container: ${theme.colors.dark.onSecondaryContainer};
  --dark-tertiary: ${theme.colors.dark.tertiary};
  --dark-on-tertiary: ${theme.colors.dark.onTertiary};
  --dark-tertiary-container: ${theme.colors.dark.tertiaryContainer};
  --dark-on-tertiary-container: ${theme.colors.dark.onTertiaryContainer};
  --dark-error: ${theme.colors.dark.error};
  --dark-on-error: ${theme.colors.dark.onError};
  --dark-error-container: ${theme.colors.dark.errorContainer};
  --dark-on-error-container: ${theme.colors.dark.onErrorContainer};
  --dark-background: ${theme.colors.dark.background};
  --dark-on-background: ${theme.colors.dark.onBackground};
  --dark-surface: ${theme.colors.dark.surface};
  --dark-on-surface: ${theme.colors.dark.onSurface};
  --dark-surface-variant: ${theme.colors.dark.surfaceVariant};
  --dark-on-surface-variant: ${theme.colors.dark.onSurfaceVariant};
  --dark-outline: ${theme.colors.dark.outline};
  --dark-outline-variant: ${theme.colors.dark.outlineVariant};
  --dark-shadow: ${theme.colors.dark.shadow};
  --dark-scrim: ${theme.colors.dark.scrim};
  --dark-inverse-surface: ${theme.colors.dark.inverseSurface};
  --dark-inverse-on-surface: ${theme.colors.dark.inverseOnSurface};
  --dark-inverse-primary: ${theme.colors.dark.inversePrimary};
  --dark-surface-dim: ${theme.colors.dark.surfaceDim};
  --dark-surface-bright: ${theme.colors.dark.surfaceBright};
  --dark-surface-container-lowest: ${theme.colors.dark.surfaceContainerLowest};
  --dark-surface-container-low: ${theme.colors.dark.surfaceContainerLow};
  --dark-surface-container: ${theme.colors.dark.surfaceContainer};
  --dark-surface-container-high: ${theme.colors.dark.surfaceContainerHigh};
  --dark-surface-container-highest: ${theme.colors.dark.surfaceContainerHighest};
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^text-(primary|secondary|accent)$/, ([, c], { theme }) => `text-$q-${c}`],
  [/^bg-(primary|secondary|accent)$/, ([, c], { theme }) => `bg-$q-${c}`]
]

export { preflights, shortcuts }
