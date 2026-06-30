# `setThemeColors()`

Applies a `QuasarTheme['colors']` object to `document.body` as CSS custom properties at runtime. Enables dynamic theme switching without a page reload.

## Import

```ts
import { setThemeColors } from 'unocss-preset-quasar/theme'
```

## Signature

```ts
function setThemeColors(themeColors: QuasarTheme['colors']): void
```

## Usage

Generate a new theme and apply it at runtime:

```ts
import { setThemeColors, generateTheme } from 'unocss-preset-quasar/theme'

// Generate a new theme
const newTheme = generateTheme('#FF6F00') // Amber-based

// Apply to the page (sets CSS custom properties on document.body)
setThemeColors(newTheme.colors)
```

## What It Does

Sets CSS custom properties on `document.body.style`:

- `--light-primary`, `--light-on-primary`, ... (all 30+ light scheme vars)
- `--dark-primary`, `--dark-on-primary`, ... (all 30+ dark scheme vars)
- `--primary`, `--secondary`, `--accent`, `--positive`, `--negative`, `--info`, `--warning`, `--dark-page`

## Notes

- **Client-side only.** Throws `TypeError` if `element` is not a DOM Element.
- The color names are kebab-cased: `primaryContainer` → `primary-container`, `onPrimaryContainer` → `on-primary-container`.
- Non-string values in `themeColors` (the `light` and `dark` nested objects) are iterated recursively.

## Related

- [`generateTheme()`](/api/quasar-theme) — generates a full `QuasarTheme` from a source color
- [`QuasarTheme`](/api/quasar-theme) — the theme interface
