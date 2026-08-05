# Configuration

The `QuasarPreset()` function accepts a single options object of type `QuasarPresetOptions`.

## `QuasarPresetOptions`

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import { mdiSet } from 'quasar/icon-set'

QuasarPreset({
  styles: QuasarStyleEntries,
  sourceColor: '#1976d2',
  plugins: ['Dark', 'Dialog', 'Notify'],
  iconSet: mdiSet,
  presetWebFonts: {
    provider: 'bunny',
    fonts: { roboto: 'Roboto' }
  }
})
```

### `styles`

Style entries — one named token spec per style. The preset registers **one** shared component tree; each entry emits a `body.quasar-style-{name}` CSS-variable block, so styles switch at runtime by swapping the body class (see `setStyle`).

```ts
import {
  Md3StyleEntry, // MD3 (Material You)
  Md2StyleEntry, // MD2 (classic Material)
  UnstyledStyleEntry, // structural only, no visual styling
  QuasarStyleEntries // all three, bundled
} from 'unocss-preset-quasar/styles'
```

Each entry is `{ name, tokens }`. Custom styles override individual tokens of a built-in entry.

### `sourceColor`

A hex color string that drives Material Design 3's dynamic color system. Changing this value regenerates the entire MD3 tonal palette — primary, secondary, tertiary, error, and all surface/container colors for both light and dark themes.

```ts
QuasarPreset({
  styles: QuasarStyleEntries,
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
  styles: QuasarStyleEntries,
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

### Runtime style switching

Every style entry emits a `body.quasar-style-{name}` CSS-variable block. Because the component tree is shared, you register **one** `QuasarPreset` and switch styles at runtime by swapping the body class — no multiple presets, no duplicate CSS.

```ts
import { setStyle } from 'unocss-preset-quasar/styles'

// One preset with all entries
QuasarPreset({ styles: QuasarStyleEntries })

// Later, at runtime
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
// Switch to MD2 at runtime
document.body.classList.toggle('quasar-style-md2')
```

Both approaches switch the active CSS-variable block instantly — no reload. The body class is the single runtime switch.

See [Runtime Style Switching](/styles/scoping) for the full explanation of the body-class mechanism.

## Full Example

```ts
// quasar.config.js
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
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
            styles: QuasarStyleEntries,
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
