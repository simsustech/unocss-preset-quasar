# Quasar Integration

This guide covers a complete Quasar CLI with Vite integration.

## Prerequisites

- Quasar project using **Quasar CLI with Vite** (not Webpack)
- Node.js ≥ 20.0.0
- pnpm (recommended)

## Package Installation

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

- `unocss` — the UnoCSS engine and Vite plugin
- `unocss-preset-quasar` — the Quasar component shortcuts and theme
- `@iconify-json/mdi` — Material Design Icons (used via `presetIcons`)

## quasar.config.js

The full integration involves three changes to your `quasar.config.js`:

### 1. Strip the Sass Import

Quasar automatically imports `quasar/dist/quasar.sass`. Replace it with UnoCSS:

```ts
vitePlugins: [
  {
    name: 'quasar-strip-sass',
    enforce: 'pre',
    transform(code, id) {
      if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
        return code.replaceAll(
          `import 'quasar/dist/quasar.sass'`,
          `import 'virtual:uno.css'`
        )
      }
    },
  },
],
```

### 2. Register the UnoCSS Plugin

Add `UnoCSS` to Vite's plugin array with the preset:

```ts
extendViteConf(viteConf, { isClient }) {
  viteConf.plugins.push(
    UnoCSS({
      enforce: 'pre',
      presets: [
        QuasarPreset({
          styles: QuasarStyleEntries,
          plugins: ['Dark', 'Dialog', 'Notify', /* ... */],
        }),
      ],
    })
  )
},
```

### 3. Keep the Framework Plugins Array

Quasar's `framework.plugins` array must still list your plugins — the preset only replaces the **styles**, not the JavaScript functionality:

```ts
framework: {
  plugins: ['Dark', 'Dialog', /* ... */],
},
```

## Complete quasar.config.js

```ts
import { defineConfig } from 'quasar'
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

const plugins = [
  'Dark',
  'Dialog',
  'Notify',
  'Loading',
  'LoadingBar',
  'BottomSheet',
  'Platform',
  'Screen'
]

export default defineConfig(async (ctx) => ({
  supportTS: true,

  boot: [
    // your boot files
  ],

  css: [
    'app.scss' // your custom styles
    // Note: do NOT include 'quasar/dist/quasar.sass'
  ],

  extras: ['roboto-font', 'material-icons'],

  build: {
    target: {
      browser: ['es2022', 'firefox115', 'chrome115', 'safari16']
    }
  },

  vitePlugins: [
    {
      name: 'quasar-strip-sass',
      enforce: 'pre',
      transform(code, id) {
        if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
          return code.replaceAll(
            `import 'quasar/dist/quasar.sass'`,
            `import 'virtual:uno.css'`
          )
        }
      }
    }
  ],

  extendViteConf(viteConf, { isClient }) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({
            styles: QuasarStyleEntries,
            plugins
          })
        ]
      })
    )
  },

  framework: { plugins }
}))
```

## CSS Custom Properties

The preset emits CSS custom properties on `:root` for the full MD3 color system. These are available globally:

```css
/* Use in your own CSS */
.my-custom-element {
  background: var(--light-surface-container);
  color: var(--light-on-surface);
}

body.body--dark .my-custom-element {
  background: var(--dark-surface-container);
  color: var(--dark-on-surface);
}
```

Available variables include (for both `--light-*` and `--dark-*`):

- `--*-primary`, `--*-on-primary`, `--*-primary-container`, `--*-on-primary-container`
- `--*-secondary`, `--*-on-secondary`, `--*-secondary-container`, `--*-on-secondary-container`
- `--*-tertiary`, `--*-on-tertiary`, `--*-tertiary-container`, `--*-on-tertiary-container`
- `--*-error`, `--*-on-error`, `--*-error-container`, `--*-on-error-container`
- `--*-background`, `--*-on-background`
- `--*-surface`, `--*-on-surface`, `--*-surface-variant`, `--*-on-surface-variant`
- `--*-outline`, `--*-outline-variant`
- `--*-shadow`, `--*-scrim`
- `--*-inverse-surface`, `--*-inverse-on-surface`, `--*-inverse-primary`
- `--*-surface-dim`, `--*-surface-bright`
- `--*-surface-container-lowest`, `--*-surface-container-low`
- `--*-surface-container`, `--*-surface-container-high`, `--*-surface-container-highest`

Plus Quasar-specific:

- `--q-primary`, `--q-secondary`, `--q-accent`
- `--q-positive`, `--q-negative`, `--q-info`, `--q-warning`
- `--q-dark`, `--q-dark-page`

## Dark Mode

The preset works with Quasar's Dark plugin. When the user toggles dark mode:

1. Quasar adds `body--light` or `body--dark` class to the body
2. The preset's shortcuts use `dark:` variant internally
3. CSS custom properties already include both light and dark values

```ts
// In your app
import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.toggle() // Toggle dark mode
```

## Using with a Custom uno.config.ts

If you have a separate `uno.config.ts` for custom utilities, the preset integrates seamlessly:

```ts
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'my-btn': 'px-4 py-2 rounded bg-primary text-white'
    // ... your custom shortcuts
  }
})
```

The preset's shortcuts, rules, and preflights are all set via the `presets` array in the Vite plugin config. Your `uno.config.ts` shortcuts and rules are merged with the preset's.

## Troubleshooting

### "Some component styles are missing"

Check that:

1. The **plugin list** in `QuasarPreset({ plugins })` matches `framework.plugins`
2. You haven't forgotten any plugin (Dialog, Notify, LoadingBar are common omissions)
3. The `quasar-strip-sass` plugin is `enforce: 'pre'` and runs before Vite

### "Dark mode colors are wrong"

Ensure you're using `QuasarPreset({ sourceColor: '...' })` with a valid hex color. The `sourceColor` drives the entire MD3 palette generation.

### "HMR is slow when editing shortcut files"

See the [Development](/guide/development) guide for setting up vite-aliases for instant HMR.
