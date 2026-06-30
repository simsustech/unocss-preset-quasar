# `QuasarTheme`

The theme object type used throughout the preset. Extended by UnoCSS's theme system.

## Definition

```ts
export interface QuasarTheme {
  typography: {
    font: string
  }
  breakpoints: {
    xs: string // '0'
    sm: string // '600px'
    md: string // '1024px'
    lg: string // '1440px'
    xl: string // '1920px'
  }
  shape: {
    corner: {
      extraSmall: string // '4px'
      small: string // '8px'
      medium: string // '12px'
      large: string // '16px'
      extraLarge: string // '28px'
    }
  }
  colors: {
    light: MaterialColorScheme
    dark: MaterialColorScheme
    primary: string
    secondary: string
    accent: string
    positive: string
    negative: string
    info: string
    warning: string
    'dark-page': string
    // ... 260+ Material Design color shade entries
    // red-1 through blue-grey-14
  }
  quasar: {
    spaces: {
      none: number // 0
      xs: number // 1
      sm: number // 2
      md: number // 4
      lg: number // 6
      xl: number // 12
    }
    z: {
      fab: number // 990
      side: number // 1000
      marginals: number // 2000
      'fixed-drawer': number // 3000
      fullscreen: number // 6000
      menu: number // 6000
      top: number // 7000
      tooltip: number // 9000
      notify: number // 9500
      max: number // 9998
    }
    transition: {
      duration: string // '.3s'
      easing: string // 'cubic-bezier(0.215,0.61,0.355,1)'
    }
    components?: {
      [className: string]: string // Theme override map for component classes
    }
  }
}
```

## `MaterialColorScheme`

```ts
interface MaterialColorScheme {
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string
  background: string
  onBackground: string
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  outline: string
  outlineVariant: string
  shadow: string
  scrim: string
  inverseSurface: string
  inverseOnSurface: string
  inversePrimary: string
  surfaceDim: string
  surfaceBright: string
  surfaceContainerLowest: string
  surfaceContainerLow: string
  surfaceContainer: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string
}
```

## Related

- `generateTheme(sourceColor)` — generates a full `QuasarTheme` from a source color
- `setThemeColors(colors)` — applies theme colors to `document.body` at runtime
- `defaultTheme` — exported default theme with fallback colors

## Import

```ts
import type { QuasarTheme } from 'unocss-preset-quasar/theme'
import {
  generateTheme,
  setThemeColors,
  defaultTheme
} from 'unocss-preset-quasar/theme'
```
