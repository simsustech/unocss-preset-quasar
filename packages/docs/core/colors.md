# Colors

The preset provides color utility shortcuts for text and background colors using the Material Design 3 palette. Colors automatically respond to dark mode.

## Text Colors

```html
<span class="text-primary">Primary text</span>
<span class="text-secondary">Secondary text</span>
<span class="text-accent">Accent text</span>
<span class="text-positive">Positive/success</span>
<span class="text-negative">Negative/error</span>
<span class="text-info">Information</span>
<span class="text-warning">Warning</span>
```

These are shortcuts that expand to light/dark pairs:

```
.text-primary → text-$light-primary dark:text-$dark-primary
.text-secondary → text-$light-secondary dark:text-$dark-secondary
.text-accent → text-$light-tertiary dark:text-$dark-tertiary
```

## Background Colors

```html
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-accent">Accent background</div>
<div class="bg-positive">Success background</div>
<div class="bg-negative">Error background</div>
<div class="bg-info">Info background</div>
<div class="bg-warning">Warning background</div>
```

Expands to:

```
.bg-primary → bg-$light-primary dark:bg-$dark-primary
```

## Material Design Color Palette

The preset includes the full Material Design 19-color palette with 14 shades each (260+ colors). These are **theme values**, not utility classes. Use them via `theme.colors` in shortcuts:

```ts
// Available color keys: red, pink, purple, deep-purple, indigo, blue, light-blue,
// cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange,
// brown, grey, blue-grey
// Each has shades 1-14 plus base (e.g., 'blue', 'blue-1' through 'blue-14')
```

## Color Utility Classes (from UnoCSS/Wind)

The preset inherits all color utilities from `@unocss/preset-wind4`. This includes:

```html
<div class="text-red-500 bg-blue-100">Tailwind-style colors</div>
<div class="text-[#6750A4] bg-[var(--light-surface)]">Arbitrary colors</div>
<div class="text-opacity-50">Opacity modifiers</div>
```

## Dark Mode

All `text-primary`, `text-secondary`, `text-accent`, `bg-primary`, `bg-secondary`, `bg-accent` shortcuts automatically include dark mode variants. The dark mode is triggered by `.body--dark` on the body element (Quasar's Dark plugin convention).

## Custom Color Shortcuts

You can define additional color shortcuts in your `uno.config.ts`:

```ts
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'text-surface':
      'text-[var(--light-on-surface)] dark:text-[var(--dark-on-surface)]',
    'bg-surface': 'bg-[var(--light-surface)] dark:bg-[var(--dark-surface)]',
    'text-on-primary-container':
      'text-[var(--light-on-primary-container)] dark:text-[var(--dark-on-primary-container)]'
  }
})
```
