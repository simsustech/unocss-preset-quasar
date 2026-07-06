# Scoped Mode

Scoped mode lets you register **multiple** `QuasarPreset` instances in a single UnoCSS build and switch between styles at runtime by toggling a body class.

## Why Scoped Mode?

Normally, registering multiple presets with the same component shortcuts causes collisions — the last registered style wins. Scoped mode solves this by:

1. **Tagging** each style's shortcuts with a per-style UnoCSS layer name (the body class)
2. **Post-processing** utilities to wrap selectors with `body.<bodyClass> `
3. **Wrapping** preflight CSS with the same body-class guard

The result: MD3's `.q-btn` becomes `body.quasar-style-md3 .q-btn`, MD2's `.q-btn` becomes `body.quasar-style-md2 .q-btn`, and only the matching one applies at runtime.

## Enabling Scoped Mode

Set `scoped: true` on each `QuasarPreset` call:

```ts
import UnoCSS from 'unocss/vite'
import { QuasarPreset } from 'unocss-preset-quasar'
import {
  MaterialDesign3,
  MaterialDesign2,
  Unstyled
} from 'unocss-preset-quasar/styles'

UnoCSS({
  presets: [
    QuasarPreset({ style: MaterialDesign3, scoped: true }),
    QuasarPreset({ style: MaterialDesign2, scoped: true }),
    QuasarPreset({ style: Unstyled, scoped: true })
  ]
})
```

## Switching Styles at Runtime

Toggle the body class:

```html
<body class="quasar-style-md3">
  <!-- MD3 active -->
</body>
```

```ts
// Switch to MD2
document.body.className = 'quasar-style-md2'

// Switch to MD3
document.body.className = 'quasar-style-md3'

// Switch to Unstyled
document.body.className = 'quasar-style-unstyled'
```

## How It Works

### 1. Shortcut Layer Tagging

Each shortcut gets tagged with a UnoCSS layer matching the body class:

```ts
// Internally, shortcuts become:
;['q-btn', handlerFn, { layer: 'quasar-style-md3' }][ // MD3 preset
  ('q-btn', handlerFn, { layer: 'quasar-style-md2' })
] // MD2 preset
```

### 2. Postprocess Wrapping

A postprocess hook wraps each utility's selector:

```
// Before (collision):
.q-btn { ... }     // MD3 and MD2 both emit this

// After (scoped):
body.quasar-style-md3 .q-btn { ... }    // Only MD3's
body.quasar-style-md2 .q-btn { ... }    // Only MD2's
```

### 3. Preflight Guarding

Preflight CSS selectors are wrapped too:

```css
/* Scoped preflight */
body.quasar-style-md3 body {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}
```

### 4. Theme Tokens Stay Global

`:root` CSS custom property declarations are **not** scoped — they remain global so all styles can access theme variables:

```css
:root {
  --light-primary: #6750a4; /* Always available */
  --light-on-primary: #ffffff;
  --dark-primary: #d0bcff;
  /* ... */
}
```

## Performance Considerations

- **CSS size**: Scoped mode roughly **triples** the CSS output (each style gets its own body-class-prefixed copy). This is fine for a playground or dev tool but wasteful for production.
- **Runtime**: The browser evaluates three sets of selectors but only one matches. Unused selectors are just dead CSS — they don't cause repaints.
- **Recommendation**: Use scoped mode for **playgrounds, dev tools, and style explorers**. In production, register only the style you need (default `scoped: false`).

## Body Class Names

| Style             | Body Class              |
| ----------------- | ----------------------- |
| `MaterialDesign3` | `quasar-style-md3`      |
| `MaterialDesign2` | `quasar-style-md2`      |
| `Unstyled`        | `quasar-style-unstyled` |
