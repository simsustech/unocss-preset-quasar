# Theming

The preset generates a complete Material Design 3 color system using [@poupe/material-color-utilities](https://github.com/material-foundation/material-color-utilities). A single `sourceColor` drives the entire tonal palette.

## Source Color

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'

QuasarPreset({
  styles: [MaterialDesign3],
  sourceColor: '#6750A4' // ← this one color generates everything
})
```

The `sourceColor` is fed through Google's Material Color Utilities to compute:

- **Light scheme**: primary, secondary, tertiary, error, surface, and container colors optimized for light backgrounds
- **Dark scheme**: the same palette adjusted for dark backgrounds (higher contrast ratios, brighter tones)
- **Surface elevations**: `surface-dim`, `surface-bright`, and 5 container levels (`lowest` through `highest`)

## Design Token System

The preset emits a full design token system as `--q-*` CSS custom properties, scoped by body class for per-style isolation. Component shortcuts reference these tokens — change the body class, and every component's appearance updates without reloading CSS.

### Token Structure

Tokens are organized into four categories, emitted as `--q-{category}-{name}`:

| Category   | Prefix                    | Examples                                                             |
| ---------- | ------------------------- | -------------------------------------------------------------------- |
| **Color**  | `--q-`                    | `--q-primary`, `--q-on-primary`, `--q-surface`, `--q-outline`        |
| **Shape**  | `--q-radius-`             | `--q-radius-xs` (4px), `--q-radius-sm` (8px), `--q-radius-xl` (28px) |
| **Sizing** | `--q-space-`, `--q-size-` | `--q-space-md` (12px), `--q-size-icon` (24px)                        |
| **Type**   | `--q-font-`               | `--q-font-md` (14px), `--q-font-lead` (1.715em)                      |

### Body-Class Scoping

Tokens are emitted for three body classes, enabling multi-style builds:

```css
body.quasar-style-md3 {
  --q-primary: var(--light-primary);
  --q-on-primary: var(--light-on-primary);
  --q-radius-xl: 28px;
  --q-font-md: 14px;
  /* ...all tokens */
}

body.quasar-style-md2 {
  --q-primary: var(--light-primary);
  --q-radius-xl: 28px;
  --q-font-md: 14px;
  /* ...MD2-specific values */
}

body.quasar-style-unstyled {
  --q-primary: transparent;
  --q-on-primary: inherit;
  --q-radius-xl: 0;
  --q-font-md: inherit;
  /* ...all values set to transparent/0/inherit/none */
}
```

Add the corresponding class to `<body>` to switch styles at runtime. The component shortcuts (which reference `var(--q-primary)`, `var(--q-radius-xl)`, etc.) automatically pick up the active style's values.

### Per-Style Defaults

Each style defines its own token values:

| Style        | Colors                             | Shapes                   | Typography                |
| ------------ | ---------------------------------- | ------------------------ | ------------------------- |
| **MD3**      | `var(--light-*)` / `var(--dark-*)` | MD3 shape scale (4-28px) | MD3 type scale (11-20px)  |
| **MD2**      | `var(--light-*)` / `var(--dark-*)` | Quasar defaults (3-28px) | Quasar defaults (12-18px) |
| **Unstyled** | `transparent` / `inherit`          | All `0`                  | All `inherit`             |

When loading in Unstyled mode, every `--q-*` color resolves to `transparent` or `inherit` — no theme colors leak through. Components render with their structural CSS only.

## CSS Custom Properties

All raw Material Design 3 colors are also emitted as CSS custom properties on `:root`:

All colors are emitted as CSS custom properties on `:root`:

```css
:root {
  /* Light scheme */
  --light-primary: #6750a4;
  --light-on-primary: #ffffff;
  --light-primary-container: #eaddff;
  --light-on-primary-container: #21005d;
  /* ... 60+ variables covering the full MD3 palette */

  /* Dark scheme */
  --dark-primary: #d0bcff;
  --dark-on-primary: #381e72;
  --dark-primary-container: #4f378a;
  --dark-on-primary-container: #eaddff;
  /* ... */

  /* Quasar aliases */
  --q-primary: #6750a4;
  --q-secondary: #625b71;
  --q-accent: #7d5260;
  --q-positive: #21ba45;
  --q-negative: #c10015;
  --q-info: #31ccec;
  --q-warning: #f2c037;
  --q-dark: #d0bcff;
  --q-dark-page: #1c1b1f;
}
```

## Using Theme Colors

### Via Utility Classes

The preset generates color utilities using the Material Design 3 palette:

```html
<!-- Text colors — auto light/dark -->
<div class="text-primary">Primary text</div>
<div class="text-secondary">Secondary text</div>
<div class="text-accent">Accent text</div>

<!-- Background colors — auto light/dark -->
<div class="bg-primary text-white">Primary background</div>
<div class="bg-secondary text-white">Secondary background</div>
```

These shortcuts resolve to light/dark pairs:

```css
.text-primary {
  color: var(--light-primary);
}
.dark .text-primary {
  color: var(--dark-primary);
}
```

### Via UnoCSS Arbitrary Values

You can reference any CSS variable directly:

```html
<div class="bg-[var(--light-surface-container)] text-[var(--light-on-surface)]">
  Surface container
</div>
<div
  class="dark:bg-[var(--dark-surface-container)] dark:text-[var(--dark-on-surface)]"
>
  Dark surface container
</div>
```

### Via CSS

Use the variables in your own stylesheets:

```css
.my-card {
  background: var(--light-surface-container-highest);
  color: var(--light-on-surface);
  border: 1px solid var(--light-outline-variant);
}

body.body--dark .my-card {
  background: var(--dark-surface-container-highest);
  color: var(--dark-on-surface);
  border-color: var(--dark-outline-variant);
}
```

## Full Color Palette Reference

### Light Scheme Variables

| Variable                            | Purpose                            |
| ----------------------------------- | ---------------------------------- |
| `--light-primary`                   | Primary brand color                |
| `--light-on-primary`                | Text/icon on primary               |
| `--light-primary-container`         | Primary container background       |
| `--light-on-primary-container`      | Text on primary container          |
| `--light-secondary`                 | Secondary brand color              |
| `--light-on-secondary`              | Text/icon on secondary             |
| `--light-secondary-container`       | Secondary container background     |
| `--light-on-secondary-container`    | Text on secondary container        |
| `--light-tertiary`                  | Tertiary brand color               |
| `--light-on-tertiary`               | Text/icon on tertiary              |
| `--light-tertiary-container`        | Tertiary container background      |
| `--light-on-tertiary-container`     | Text on tertiary container         |
| `--light-error`                     | Error color                        |
| `--light-on-error`                  | Text/icon on error                 |
| `--light-error-container`           | Error container background         |
| `--light-on-error-container`        | Text on error container            |
| `--light-background`                | App background                     |
| `--light-on-background`             | Text on background                 |
| `--light-surface`                   | Surface color                      |
| `--light-on-surface`                | Text on surface                    |
| `--light-surface-variant`           | Surface variant                    |
| `--light-on-surface-variant`        | Text on surface variant            |
| `--light-outline`                   | Outline/border color               |
| `--light-outline-variant`           | Subtle outline variant             |
| `--light-shadow`                    | Shadow color                       |
| `--light-scrim`                     | Scrim/overlay color                |
| `--light-inverse-surface`           | Inverse surface                    |
| `--light-inverse-on-surface`        | Text on inverse surface            |
| `--light-inverse-primary`           | Primary on inverse surface         |
| `--light-surface-dim`               | Dimmed surface (lowest elevation)  |
| `--light-surface-bright`            | Bright surface (highest elevation) |
| `--light-surface-container-lowest`  | Lowest container                   |
| `--light-surface-container-low`     | Low container                      |
| `--light-surface-container`         | Default container                  |
| `--light-surface-container-high`    | High container                     |
| `--light-surface-container-highest` | Highest container                  |

### Dark Scheme Variables

Same set, prefixed with `--dark-` instead of `--light-`.

## Quasar Aliases

For compatibility with Quasar's existing API:

| Variable        | Value                      |
| --------------- | -------------------------- |
| `--q-primary`   | `--light-primary`          |
| `--q-secondary` | `--light-secondary`        |
| `--q-accent`    | `--light-tertiary`         |
| `--q-positive`  | `#21BA45` (success green)  |
| `--q-negative`  | `#C10015` (error red)      |
| `--q-info`      | `#31CCEC` (info blue)      |
| `--q-warning`   | `#F2C037` (warning yellow) |
| `--q-dark`      | `--dark-primary`           |
| `--q-dark-page` | `--dark-surface`           |

## Theme Colors Object

The theme also exposes a **260+ color palette** (Material Design color swatches, red-1 through blue-grey-14). These are accessible via theme extension but not emitted as CSS variables by default.

## `setThemeColors()` — Runtime Theme Update

For applications that need to update theme colors at runtime (e.g., a theme picker), use `setThemeColors()`:

```ts
import { setThemeColors, generateTheme } from 'unocss-preset-quasar/theme'

// Generate a new theme from a different source color
const newTheme = generateTheme('#FF6F00') // Amber-based

// Apply it at runtime
setThemeColors(newTheme.colors)
```

This sets CSS custom properties on `document.body`, enabling runtime theme switching without a page reload. Use only on the client side.

## Shape Corners

The theme includes shape corner sizes for consistent border-radius values:

```ts
// Theme shape values
theme.shape.corner.extraSmall // '4px'
theme.shape.corner.small // '8px'
theme.shape.corner.medium // '12px'
theme.shape.corner.large // '16px'
theme.shape.corner.extraLarge // '28px'
```
