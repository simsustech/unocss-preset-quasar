# `QuasarPresetOptions`

Options interface for `QuasarPreset()`.

## Definition

```ts
  styles?: QuasarStyleEntry[]
  sourceColor?: string
  plugins?: (keyof QuasarPlugins)[]
  iconSet?: QuasarIconSet
  presetWebFonts?: WebFontsOptions
}
}
```

## Properties

| `styles` | `QuasarStyleEntry[]` | No | `QuasarStyleEntries` (md3, md2, unstyled) | Named token entries; each emits a `body.quasar-style-{name}` CSS-variable block |
| `sourceColor` | `string` | No | `'#1976d2'` | Hex color driving MD3 palette generation |
| `plugins` | `(keyof QuasarPlugins)[]` | No | `[]` | Quasar plugin names for safelist generation |
| `iconSet` | `QuasarIconSet` | No | — | Icon set for safelist generation |
| `presetWebFonts` | `WebFontsOptions` | No | `{ provider: 'bunny', fonts: { roboto: 'Roboto' } }` | Web font configuration |

## PresetOptions (inherited)

`QuasarPresetOptions` extends UnoCSS's `PresetOptions`, inheriting:

```ts
interface PresetOptions {
  /**
   * Layers to override in other presets.
   * @default []
   */
  layers?: string[]
}
```

## Plugin Type

The `plugins` array accepts keys of Quasar's `QuasarPlugins` type:

```ts
type QuasarPlugins = {
  AddressbarColor: true
  AppFullscreen: true
  AppVisibility: true
  BottomSheet: true
  Cookies: true
  Dark: true
  Dialog: true
  Loading: true
  LoadingBar: true
  LocalStorage: true
  Meta: true
  Notify: true
  Platform: true
  Screen: true
  SessionStorage: true
}
```

## Using your own UnoCSS engine

`QuasarPreset()` nests `@unocss/preset-mini` as its engine, so utilities outside
Quasar's own vocabulary (`flex`, `p-4`, `gap-*`) work without any extra
configuration. An app that wants wind4's value forms or its `color-mix()` output
adds wind4 itself, together with the exported options fragment:

```ts
import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  presets: [presetWind4(quasarWind4Options), QuasarPreset()]
})
```

| fragment option                                        | why                                                                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `preflights: { reset: false }`                         | wind4's base reset clobbers Quasar's own control styling                                                              |
| `dark: { light: '.body--light', dark: '.body--dark' }` | wind4 sends `dark:` to Tailwind's `.dark` class, which Quasar never sets, so every `dark:*` utility would be dead CSS |

The fragment is not frozen — wind4's factory assigns its own defaults onto the
options object it receives. Spread it (`{ ...quasarWind4Options }`) if you want to
hand wind4 a private copy.

Notes for a two-engine setup:

- Keep `QuasarPreset()` in the array. It carries `enforce: 'post'`, so Quasar's own
  class names (`row`, `col-6`, `q-btn`, …) stay the preset's in either order.
- The palette has one authority: `QuasarPreset()`'s `extendTheme`. Array order
  decides the classes _both_ engines define (`p-4`'s spelling, `bg-light-blue`), so
  pick an order and keep it.
- `bg-light-blue` and `text-light-blue` are emitted by the preset in either case:
  mini spells that name as its Tailwind `sky` family, and the preset takes the
  class back with Quasar's `#03a9f4`.
