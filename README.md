# unocss-preset-quasar

UnoCSS preset for Quasar Framework — utility-first, tree-shakeable component styles. Drop Quasar's ~200 KB Sass bundle and use UnoCSS utilities that are generated on demand from your templates.

[![npm version](https://img.shields.io/npm/v/unocss-preset-quasar)](https://www.npmjs.com/package/unocss-preset-quasar)
[![license](https://img.shields.io/npm/l/unocss-preset-quasar)](./LICENCE)

📖 **[Full documentation](https://simsustech.github.io/unocss-preset-quasar/)**

## Playground

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/unocss-preset-quasar)

## Installation

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

- `unocss` — the UnoCSS engine and Vite plugin
- `unocss-preset-quasar` — the Quasar component shortcuts and MD3 theme
- `@iconify-json/mdi` — Material Design Icons (used via `presetIcons`)

## Quasar CLI Integration

### 1. Strip the Sass import

Add a Vite plugin that replaces Quasar's Sass import with UnoCSS:

```js
// quasar.config.js
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

### 2. Register the UnoCSS plugin

Add `UnoCSS` with `QuasarPreset` inside `extendViteConf`:

```js
// quasar.config.js
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

const quasarPlugins = [
  'AddressbarColor',
  'AppFullscreen',
  'AppVisibility',
  'BottomSheet',
  'Cookies',
  'Dark',
  'Dialog',
  'Loading',
  'LoadingBar',
  'LocalStorage',
  'Meta',
  'Notify',
  'Platform',
  'Screen',
  'SessionStorage',
]

export default defineConfig((ctx) => ({
  // ...

  vitePlugins: [
    // ... strip-sass plugin from step 1
  ],

  extendViteConf(viteConf, { isClient }) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({
            style: MaterialDesign3,
            plugins: quasarPlugins,
          }),
        ],
      })
    )
  },

  framework: {
    plugins: quasarPlugins,
  },
}))
```

> **Important:** The `plugins` array must match between `QuasarPreset()` and `framework.plugins`. Plugins in `framework` but missing from the preset will have missing styles.

### 3. Complete example

See [`packages/quasar-docs/quasar.config.js`](./packages/quasar-docs/quasar.config.js) for a full real-world Quasar CLI integration.

## Choosing a Style

```js
import {
  MaterialDesign3,  // MD3 (Material You) — default, recommended
  MaterialDesign2,  // MD2 (classic Material)
  Unstyled,         // structural only, no visual styling
} from 'unocss-preset-quasar/styles'

QuasarPreset({ style: MaterialDesign3 })
```

## Custom Theme Color

Change the entire MD3 palette with one color:

```js
QuasarPreset({
  style: MaterialDesign3,
  sourceColor: '#6750A4', // Purple theme
})
```

## What's Included

| Feature | Description |
|---------|-------------|
| **70+ components** | QBtn, QCard, QDialog, QTable, QTree, QDate, QTime, and more |
| **MD3 color system** | Dynamic tonal palette from a single source color |
| **Dark mode** | Light/dark themes via CSS custom properties |
| **24 elevation levels** | Material Design elevation 1–24 |
| **Transitions** | slide, fade, scale, rotate, jump, flip |
| **Typography** | Full MD3 type scale (h1–h6, subtitle, body, caption, overline) |
| **Quasar plugins** | Dialog, Notify, Loading, LoadingBar, BottomSheet |
| **Scoped mode** | Bundle multiple styles in one build, switch at runtime |
| **Tree-shakeable** | Only the utilities you use are included in the final CSS |

## Development

```bash
git clone https://github.com/simsustech/unocss-preset-quasar.git
cd unocss-preset-quasar
pnpm i
pnpm run build

# Preview the VitePress docs
cd packages/docs
pnpm run dev

# Run the dev playground
cd packages/dev
pnpm run dev
```

## Adding New Component Shortcuts

1. Create a shortcut file: `packages/preset/src/styles/<style>/components/QComponentName.unocss.ts`
2. Register it in the style's `index.ts`
3. Add the safelist entries in `packages/preset/src/safelist.ts`

## License

MIT
