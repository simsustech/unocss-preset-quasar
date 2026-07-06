# Configuration

The `QuasarPreset()` function accepts a single options object of type `QuasarPresetOptions`.

## `QuasarPresetOptions`

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import { mdiSet } from 'quasar/icon-set'

QuasarPreset({
  style: MaterialDesign3,
  sourceColor: '#1976d2',
  plugins: ['Dark', 'Dialog', 'Notify'],
  iconSet: mdiSet,
  presetWebFonts: {
    provider: 'bunny',
    fonts: { roboto: 'Roboto' }
  },
  scoped: false
})
```

### `style` (required)

The design system to use. Must be one of the exported style objects:

```ts
import {
  MaterialDesign3, // MD3 (Material You)
  MaterialDesign2, // MD2 (classic Material)
  Unstyled // structural only, no visual styling
} from 'unocss-preset-quasar/styles'
```

Each style provides its own set of component shortcuts, preflights, and variants.

### `sourceColor`

A hex color string that drives Material Design 3's dynamic color system. Changing this value regenerates the entire MD3 tonal palette — primary, secondary, tertiary, error, and all surface/container colors for both light and dark themes.

```ts
QuasarPreset({
  style: MaterialDesign3,
  sourceColor: '#6750A4' // Purple-based theme
})
```

The color is fed through [@poupe/material-color-utilities](https://github.com/material-foundation/material-color-utilities) which computes the full Material 3 tonal palette.

**Default:** `'#1976d2'` (Material Blue)

### `plugins`

An array of Quasar plugin names. The preset uses this to generate a **safelist** — CSS classes that must always be included even if the scanner doesn't detect them in templates (because plugins generate UI programmatically at runtime).

```ts
const plugins = [
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
  'SessionStorage'
]
```

Supported plugins and their safelisted components:

| Plugin        | Safelisted Classes                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `BottomSheet` | `q-bottom-sheet`, `q-bottom-sheet__avatar`, `q-bottom-sheet--list`, `q-bottom-sheet--grid`, `q-bottom-sheet__item` |
| `Dialog`      | `q-dialog-plugin`, `q-dialog__*`, `q-card__*`, `q-btn__*`, `q-field__*`, `q-radio__*`                              |
| `LoadingBar`  | `q-loading-bar`, `q-loading-bar--top`, `q-loading-bar--bottom`, `q-loading-bar--right`, `q-loading-bar--left`      |
| `Loading`     | `q-loading`, `q-loading__backdrop`, `q-loading__box`, `q-loading__message`                                         |
| `Notify`      | `q-notifications__*`, `q-notification__*`, `q-avatar__*`, `q-btn__*`, `q-icon`, `q-spinner`                        |

### `iconSet`

A Quasar icon set object (e.g., `mdiSet` from `quasar/icon-set`). The preset extracts icon names from the set and adds them to the safelist.

```ts
import { mdiSet } from 'quasar/icon-set'

QuasarPreset({
  style: MaterialDesign3,
  iconSet: mdiSet
})
```

### `presetWebFonts`

Configuration for `@unocss/preset-web-fonts`, which loads web fonts. Override the default Roboto font or change the provider.

```ts
QuasarPreset({
  presetWebFonts: {
    provider: 'google', // or 'bunny' (default), 'fontshare', 'none'
    fonts: {
      roboto: 'Roboto:400,500,700',
      mono: 'Fira Code'
    }
  }
})
```

**Default:**

```ts
{
  provider: 'bunny',
  fonts: {
    roboto: 'Roboto',
  },
}
```

### `scoped`

When `true`, all component CSS is scoped to a body class (`body.quasar-style-*`). This lets you register **multiple** `QuasarPreset` instances in the same UnoCSS build and switch styles at runtime.

```ts
// Register all three styles in one build
UnoCSS({
  presets: [
    QuasarPreset({ style: MaterialDesign3, scoped: true }),
    QuasarPreset({ style: MaterialDesign2, scoped: true }),
    QuasarPreset({ style: Unstyled, scoped: true })
  ]
})
```

At runtime, toggle the body class to switch styles:

```html
<body class="quasar-style-md3">
  <!-- MD3 active -->
  <body class="quasar-style-md2">
    <!-- MD2 active -->
    <body class="quasar-style-unstyled">
      <!-- Unstyled active -->
    </body>
  </body>
</body>
```

**Default:** `false` (global CSS, no body-class prefix)

See [Scoped Mode](/styles/scoping) for details.

## Full Example

```ts
// quasar.config.js
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import { mdiSet } from 'quasar/icon-set'
import UnoCSS from 'unocss/vite'

const plugins = [
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
  'SessionStorage'
]

export default defineConfig(async (ctx) => ({
  vitePlugins: [
    {
      name: 'quasar-strip-sass',
      enforce: 'pre',
      transform(code, id) {
        if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
          code = code.replaceAll(
            `import 'quasar/dist/quasar.sass'`,
            `import 'virtual:uno.css'`
          )
        }
        return code
      }
    }
  ],
  extendViteConf(viteConf, { isClient }) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({
            style: MaterialDesign3,
            sourceColor: '#6750A4',
            plugins,
            iconSet: mdiSet
          })
        ]
      })
    )
  },
  framework: { plugins }
}))
```
