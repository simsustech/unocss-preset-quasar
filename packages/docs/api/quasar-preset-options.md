# `QuasarPresetOptions`

Options interface for `QuasarPreset()`.

## Definition

```ts
export interface QuasarPresetOptions extends PresetOptions {
  style: QuasarStyle
  sourceColor?: string
  plugins?: (keyof QuasarPlugins)[]
  iconSet?: QuasarIconSet
  presetWebFonts?: WebFontsOptions
  scoped?: boolean
}
```

## Properties

| Property         | Type                      | Required | Default                                              | Description                                    |
| ---------------- | ------------------------- | -------- | ---------------------------------------------------- | ---------------------------------------------- |
| `style`          | `QuasarStyle`             | Yes      | —                                                    | Design system (MD3, MD2, or Unstyled)          |
| `sourceColor`    | `string`                  | No       | `'#1976d2'`                                          | Hex color driving MD3 palette generation       |
| `plugins`        | `(keyof QuasarPlugins)[]` | No       | `[]`                                                 | Quasar plugin names for safelist generation    |
| `iconSet`        | `QuasarIconSet`           | No       | —                                                    | Icon set for safelist generation               |
| `presetWebFonts` | `WebFontsOptions`         | No       | `{ provider: 'bunny', fonts: { roboto: 'Roboto' } }` | Web font configuration                         |
| `scoped`         | `boolean`                 | No       | `false`                                              | Scope CSS to body class for multi-style builds |

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
