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
