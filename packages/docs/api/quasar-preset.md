# `QuasarPreset()`

The preset factory. Returns an UnoCSS `Preset` you pass to the `presets` array of the UnoCSS Vite plugin.

## Import & signature

```ts
import { QuasarPreset } from 'unocss-preset-quasar'

function QuasarPreset(options?: QuasarPresetOptions): Preset
```

It is callable and usable directly — `definePreset` types the result as a plain `Preset`, and the factory type (`QuasarPresetFactory`) restores the call signature so option-carrying call sites type-check.

## Behaviour

| Aspect                | Value                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `styles` / `style`    | **Required.** Missing both throws `QuasarPreset: no style configured — pass styles: QuasarStyleEntry[] (first entry = baseline) or style` |
| Entry validation      | A non-entry in `styles[i]` (no `name`, no `tokens`) throws with its index                                                                 |
| `sourceColor` default | `'#1976d2'`                                                                                                                               |
| Nested presets        | `preset-mini` (dark: `.body--light` / `.body--dark`), `preset-icons`, `animated-unocss`, `preset-web-fonts` (Roboto @ Bunny)              |
| `enforce`             | `'post'` — Quasar class names stay this preset's in either array order                                                                    |
| Layers                | `quasar.grid` (−4), `quasar.components` (−3), `quasar.app` (−2), `quasar.styles` (−1), `default` (0)                                      |
| Extractors            | component vocabulary + literal-value derivation                                                                                           |
| Safelist              | base list + per-declared-plugin roots + `iconSet` classes                                                                                 |
| Transformers          | `transformerVariantGroup`, `transformerDirectives`                                                                                        |
| `extendTheme`         | merges the flat Quasar palette into the engine's theme                                                                                    |

## Minimal example

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

UnoCSS({
  presets: [QuasarPreset({ styles: QuasarStyleEntries })]
})
```

## Full example

```ts
import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'
import {
  MaterialDesign3,
  MaterialDesign2,
  Unstyled
} from 'unocss-preset-quasar/styles'
import { mdiSet } from 'quasar/icon-set'
import UnoCSS from 'unocss/vite'

UnoCSS({
  presets: [
    QuasarPreset({
      styles: [MaterialDesign3, MaterialDesign2, Unstyled], // first = baseline
      sourceColor: '#6750A4',
      plugins: ['Dialog', 'Notify', 'Loading', 'LoadingBar', 'BottomSheet'],
      iconSet: mdiSet,
      appExtensions: ['qmarkdown'],
      presetWebFonts: { provider: 'bunny', fonts: { roboto: 'Roboto' } }
    })
  ]
})
```

Option-by-option: [`QuasarPresetOptions`](/api/quasar-preset-options).

## Related exports from the root package

| Export                    | Purpose                                                                   |
| ------------------------- | ------------------------------------------------------------------------- |
| `quasarWind4Options`      | Options fragment for adding wind4 as a second engine                      |
| `iconSetClasses(iconSet)` | The `i-*` classes contained in an icon set (what the safelist step walks) |
| `QuasarStyleEntry` (type) | The style-entry shape, re-exported for convenience                        |
