# Getting Started

Replace Quasar's Sass bundle with generated-on-demand UnoCSS in three steps: install, strip the Sass import, register the preset with the styles you want.

## Installation

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

| Package                | Role                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `unocss`               | The UnoCSS engine and Vite plugin                             |
| `unocss-preset-quasar` | Quasar component CSS, tokens, and utilities                   |
| `@iconify-json/mdi`    | Material Design Icons, consumed by the built-in `presetIcons` |

Peer dependencies: `quasar` ^2.34.0, `@unocss/core` ^66.10.5.

No Quasar project yet? `pnpm create quasar` and choose **Quasar CLI with Vite**.

## 1. Strip the Sass import

Quasar's CLI imports `quasar/dist/quasar.sass` once at build time (~200 KB, untree-shakeable). A `enforce: 'pre'` Vite plugin swaps it for UnoCSS's virtual CSS:

```js
// quasar.config.js
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

`enforce: 'pre'` matters: the swap must happen before Vite resolves the import.

## 2. Register the preset

```js
// quasar.config.js
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

const plugins = [
  'Dark',
  'Dialog',
  'Notify',
  'Loading',
  'LoadingBar',
  'BottomSheet'
]

export default defineConfig(() => ({
  vitePlugins: [/* the strip-sass plugin from step 1 */],

  extendViteConf(viteConf) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [QuasarPreset({ styles: QuasarStyleEntries, plugins })]
      })
    )
  },

  framework: { plugins }
}))
```

Two things are deliberately explicit:

- **`styles` is required.** `QuasarPreset()` throws without it — the first entry becomes the baseline, the rest are runtime-switchable. Pass `QuasarStyleEntries` for all three built-ins, or a subset (`[MaterialDesign3]`) to ship less. See [Styles & Scoping](/architecture/style-configuration).
- **The `plugins` array must match `framework.plugins`.** The preset safelists CSS for plugin-generated UI; a plugin present in `framework` but missing from the preset works but renders unstyled. See [Plugins](/plugins/overview).

## 3. Verify

```bash
quasar dev
```

- Inspect any Quasar component: styles come from utility rules and `--q-*` variables, not Sass classes.
- The network tab shows no `quasar.sass` request.
- Toggle dark mode (`$q.dark.toggle()`): the whole page flips via `body.body--dark`, no reload.

## Switching styles at runtime

With all three entries listed, switching is one class swap:

```ts
import { setStyle, getActiveStyle } from 'unocss-preset-quasar/styles'

setStyle('md2') // instant CSS-variable swap — no reload, no re-import
getActiveStyle() // 'md2'
```

Only listed entries are switchable; `setStyle()` on an unlisted name silently keeps the baseline.

## Customizing the palette

```js
QuasarPreset({
  styles: QuasarStyleEntries,
  sourceColor: '#6750A4' // MD3 tonal palette derives from this one color
})
```

For runtime changes see [`applySourceColor()`](/api/runtime).

## Next steps

- [Configuration](/guide/configuration) — every preset option with defaults
- [Quasar Integration](/guide/quasar-integration) — complete `quasar.config.js` and troubleshooting
- [Theming & Tokens](/core/theming) — the variable system your own CSS can read
- [Component Catalogue](/components/catalogue) — what is styled out of the box
