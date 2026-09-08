# Runtime Style Switching

One `QuasarPreset` registers the shared component tree. Each style entry (`styles` option) emits a `body.quasar-style-{name}` CSS-variable block, so switching styles at runtime is just a body-class swap — no multiple presets, no duplicate CSS, no reload.

## Why a Single Preset?

The old approach registered one preset per style and scoped each style's CSS to its own body class. That tripled CSS output and risked shortcut collisions. Because the component tree is now **shared** and styles are pure token values, a single preset can emit all style blocks cheaply:

```css
/* One shared tree, N variable blocks */
body.quasar-style-md3 {
  --q-btn-radius: var(--q-radius-xl);
}
body.quasar-style-md2 {
  --q-btn-radius: var(--q-radius-sm);
}
body.quasar-style-unstyled {
  --q-btn-radius: 0;
}

.q-btn {
  border-radius: var(--q-btn-radius);
}
```

## Enabling All Styles

```ts
import UnoCSS from 'unocss/vite'
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'

UnoCSS({
  presets: [QuasarPreset({ styles: QuasarStyleEntries })]
})
```

## Switching Styles at Runtime

Use the `setStyle` helper:

```ts
import { setStyle } from 'unocss-preset-quasar/styles'

setStyle('md3') // Material You
setStyle('md2') // classic Material
setStyle('unstyled') // structural only
```

Or toggle the body class directly:

```html
<body class="quasar-style-md3">
  <!-- MD3 active -->
</body>
```

```ts
// Switch to MD2
document.body.className = 'quasar-style-md2'
```

## How It Works

1. **Shared shortcuts** reference `var(--q-*)` tokens, e.g. `border-radius: var(--q-btn-radius)`.
2. **Token preflight** reads `theme.quasar.tokens` (injected by the preset's `extendTheme`) and emits one CSS-variable block per entry under `body.quasar-style-{name}`.
3. **Dark mode** blocks (`body.body--dark.quasar-style-{name}`) swap `--light-*` refs to `--dark-*` automatically.

## Body Class Names

| Entry             | Body Class              |
| ----------------- | ----------------------- |
| `MaterialDesign3` | `quasar-style-md3`      |
| `MaterialDesign2` | `quasar-style-md2`      |
| `Unstyled`        | `quasar-style-unstyled` |
