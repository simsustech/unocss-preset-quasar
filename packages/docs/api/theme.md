# `/theme`

The public theme module: the `QuasarTheme` type, the generator behind the preset's colors, and the runtime applier.

```ts
import {
  type QuasarTheme,
  generateTheme,
  defaultTheme,
  setThemeColors
} from 'unocss-preset-quasar/theme'
```

## `QuasarTheme`

```ts
export interface QuasarTheme {
  typography: { font: string }
  breakpoints: { xs: '0'; sm: '600px'; md: '1024px'; lg: '1440px'; xl: '1920px' }
  shape: { corner: { extraSmall; small; medium; large; extraLarge } }
  colors: {
    light: MaterialColorScheme
    dark: MaterialColorScheme
    primary; secondary; accent; positive; negative; info; warning
    'dark-page': string
    'red-1' … 'red-14', 'pink-1' …, … // the flat Quasar palette, 14 shades per family
  }
  quasar: {
    tokens?: QuasarStyleEntry[]
    components?: { 'q-btn'?: string; … } // legacy override map — see below
    spaces: { none: 0; xs: 1; sm: 2; md: 4; lg: 6; xl: 12 }
    z: { fab: 990; side: 1000; marginals: 2000; fullscreen: 6000; top: 7000; tooltip: 9000; notify: 9500; max: 9998 }
    transition: { duration: '.3s'; easing: 'cubic-bezier(0.215,0.61,0.355,1)' }
  }
}
```

### `MaterialColorScheme`

The MD3 role set, camelCased: `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`, secondary/tertiary/error equivalents, `background`, `surface`, `surfaceVariant`, `onSurfaceVariant`, `outline`, `outlineVariant`, `shadow`, `scrim`, `inverseSurface`, `inverseOnSurface`, `inversePrimary`, `surfaceDim`, `surfaceBright`, `surfaceContainerLowest` … `surfaceContainerHighest`.

These are _scheme objects_ — spreading them into a color namespace would make the engine treat every role as a palette entry. They reach CSS through the token preflight as `--light-*` / `--dark-*`.

### `quasar.components` is legacy

The typed per-class override map exists for compatibility; **no rule reads it** (the helper that did was removed with the shared-tree architecture). To override a component class today, add your own UnoCSS shortcut in your app's config:

```ts
// uno.config.ts
shortcuts: { 'my-btn': 'tracking-widest rounded-full' }
```

Apply the new name in markup rather than shadowing `q-btn` — the preset's `q-btn` _rule_ states the component's CSS and which of the two wins is cascade-dependent.

## `generateTheme(sourceColor?)`

```ts
function generateTheme(sourceColor?: string): QuasarTheme
// default sourceColor: '#806cb0' — the historical published default;
// pass the same color the preset is configured with
```

Returns `defaultTheme` merged with color tokens derived from `sourceColor` — the same `generateColorTokens()` the preset's preflight uses, so JS-side and CSS-side colors agree.

## `defaultTheme`

The static theme: typography, breakpoints, shape, the flat palette, and the `quasar` block — with the historical color values. `generateTheme` spreads it.

## `setThemeColors(colors)`

```ts
function setThemeColors(themeColors: QuasarTheme['colors']): void
```

Writes the scheme onto `document.body` as CSS custom properties (`--light-*`, `--dark-*`, and the flat alias names). Client-side only — throws `TypeError` on non-string values or a non-Element target. Full details: [`setThemeColors()`](/api/set-theme-colors).

For changing only the _palette_ at runtime, prefer [`applySourceColor()`](/api/runtime) — it re-derives everything from one color instead of requiring a full theme object.

Related: [Theming & Tokens](/core/theming) · [Colors](/core/colors)
