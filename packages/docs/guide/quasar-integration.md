# Quasar Integration

A complete Quasar CLI with Vite integration: the three changes to `quasar.config.js`, the variables you can then use in your own CSS, and the failure modes worth knowing.

## Prerequisites

- Quasar project using **Quasar CLI with Vite** (not Webpack)
- Node.js ≥ 20, pnpm recommended

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

## The three changes

### 1. Strip the Sass import

```js
vitePlugins: [
  {
    name: 'quasar-strip-sass',
    enforce: 'pre',
    transform(code) {
      if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
        return code.replaceAll(
          `import 'quasar/dist/quasar.sass'`,
          `import 'virtual:uno.css'`
        )
      }
    }
  }
]
```

### 2. Register UnoCSS with the preset

```js
extendViteConf(viteConf) {
  viteConf.plugins.push(
    UnoCSS({
      enforce: 'pre',
      presets: [QuasarPreset({ styles: QuasarStyleEntries, plugins, iconSet: mdiSet })]
    })
  )
}
```

### 3. Keep `framework.plugins`

The preset replaces **styles**, not JavaScript functionality — `framework.plugins` stays exactly as it was:

```js
framework: {
  plugins
}
```

## Complete `quasar.config.js`

```js
import { defineConfig } from 'quasar'
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import { mdiSet } from 'quasar/icon-set'
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

export default defineConfig(() => ({
  boot: [
    // your boot files
  ],

  css: [
    'app.scss' // your own styles; NOT quasar/dist/quasar.sass
  ],

  extras: ['roboto-font', 'material-icons'],

  vitePlugins: [
    {
      name: 'quasar-strip-sass',
      enforce: 'pre',
      transform(code) {
        if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
          return code.replaceAll(
            `import 'quasar/dist/quasar.sass'`,
            `import 'virtual:uno.css'`
          )
        }
      }
    }
  ],

  extendViteConf(viteConf) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({ styles: QuasarStyleEntries, plugins, iconSet: mdiSet })
        ]
      })
    )
  },

  framework: { plugins }
}))
```

## CSS custom properties

The token preflight exposes the whole color system as variables. In your own CSS:

```css
.my-widget {
  background: var(--light-surface-container);
  color: var(--light-on-surface);
}

.body--dark .my-widget {
  background: var(--dark-surface-container);
  color: var(--dark-on-surface);
}
```

| Namespace                           | Contents                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `--light-*`, `--dark-*`             | Material scheme roles: `primary`, `on-primary`, `surface-container-*`, `outline`, `inverse-*`, … — both schemes emitted, flip by body class |
| `--q-primary`, `--q-positive`, …    | Quasar's alias set, harmonized to `sourceColor` (dark variants re-emitted under `body.body--dark`)                                          |
| `--q-btn-radius`, `--q-space-md`, … | Active style's tokens — change with `setStyle()`                                                                                            |
| `--q-size-{xs,sm,md,lg,xl}`         | Quasar's screen breakpoints, parsed at runtime by the Screen plugin                                                                         |
| `--q-elevation-level1..5`           | Elevation per active style                                                                                                                  |

Full map: [Theming & Tokens](/core/theming).

## Dark mode

Quasar's Dark plugin sets `body--dark` / `body--light`. Two mechanisms respond:

1. The token preflight emits the dark values of every `--q-*` token under `body.body--dark` — components restyle with no per-rule dark logic.
2. The nested engine's `dark:` variant is mapped to `.body--dark` / `.body--light`, so `dark:*` utilities follow the same class.

```ts
const $q = useQuasar()
$q.dark.toggle()
```

## Custom `uno.config.ts`

The preset's rules, shortcuts and preflights live in the `presets` array you pass to the Vite plugin. A separate `uno.config.ts` for your own utilities merges normally:

```ts
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'my-btn': 'px-4 py-2 rounded bg-primary text-white'
  }
})
```

The transformers the preset enables — `transformerVariantGroup` (`hover:(bg-red text-white)`) and `transformerDirectives` (`@apply`) — apply to the preset's own output. You only configure them in a standalone config file if you run a second UnoCSS instance.

## Troubleshooting

| Symptom                                  | Cause                                                                       | Fix                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Plugin UI unstyled (dialog, notify, …)   | Plugin listed in `framework.plugins` but not in `QuasarPreset({ plugins })` | Add it to the preset's `plugins`                                                                 |
| Icons render as empty boxes              | `iconSet` not passed, and icon classes come from internal Quasar markup     | Pass `iconSet: mdiSet` (or your set)                                                             |
| Styles missing everywhere                | Sass strip plugin not running first                                         | Ensure `enforce: 'pre'` on `quasar-strip-sass`                                                   |
| `QuasarPreset: no style configured`      | `styles`/`style` omitted — this is intentional                              | Pass `styles: QuasarStyleEntries` or your entries                                                |
| `setStyle('md2')` has no effect          | md2 not in the build-time `styles` list                                     | Add it; runtime cannot add styles the build excluded                                             |
| Dark colors wrong after a palette change | `sourceColor` invalid                                                       | Pass a valid hex to `QuasarPreset({ sourceColor })` or call [`applySourceColor()`](/api/runtime) |
