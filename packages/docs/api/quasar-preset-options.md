# `QuasarPresetOptions`

The options object accepted by [`QuasarPreset()`](/api/quasar-preset).

## Definition

```ts
export interface QuasarPresetOptions {
  /** Styles that ship; FIRST entry = baseline. Required (throws if absent). */
  styles?: QuasarStyleEntry[]
  /** Shorthand for `styles: [style]`; ignored when `styles` is given. */
  style?: QuasarStyleEntry
  sourceColor?: string
  presetIcons?: IconsOptions
  presetWebFonts?: WebFontsOptions
  iconSet?: unknown
  plugins?: (keyof QuasarPlugins)[]
  appExtensions?: AppExtensionName[]
}
```

## Properties

| Property         | Type                                               | Default                                              | Effect                                                                                                                                           |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `styles`         | `QuasarStyleEntry[]`                               | — (**required** unless `style`)                      | Which styles ship; first entry is the baseline (unscoped rules, tokens on `body`), later entries become `body.quasar-style-{name}` switch blocks |
| `style`          | `QuasarStyleEntry`                                 | —                                                    | Single-entry shorthand for `styles`                                                                                                              |
| `sourceColor`    | `string`                                           | `'#1976d2'`                                          | Drives the Material tonal palette and Quasar's alias colors                                                                                      |
| `presetIcons`    | `IconsOptions`                                     | `{}`                                                 | Options for the always-registered `@unocss/preset-icons`                                                                                         |
| `presetWebFonts` | `WebFontsOptions`                                  | `{ provider: 'bunny', fonts: { roboto: 'Roboto' } }` | Web font loading                                                                                                                                 |
| `iconSet`        | `unknown` (Quasar icon set)                        | —                                                    | Every `i-*` class in the set is safelisted — Quasar's internals request icons no markup mentions                                                 |
| `plugins`        | `(keyof QuasarPlugins)[]`                          | `[]`                                                 | UI-generating plugins safelist their root classes (see [Plugins](/plugins/overview))                                                             |
| `appExtensions`  | `('qcalendar' \| 'qmarkdown' \| 'qmediaplayer')[]` | `[]`                                                 | Declared libraries' ported CSS ships; undeclared ships nothing                                                                                   |

`AppExtensionName` is the union of the keys of `appExtensionModules` — the same names the [App Extensions](/app-extensions/overview) pages use.

## The `plugins` type

Keys of Quasar's `QuasarPlugins`: `AddressbarColor`, `AppFullscreen`, `AppVisibility`, `BottomSheet`, `Cookies`, `Dark`, `Dialog`, `Loading`, `LoadingBar`, `LocalStorage`, `Meta`, `Notify`, `Platform`, `Screen`, `SessionStorage`. Only `BottomSheet`, `Dialog`, `Loading`, `LoadingBar`, `Notify` affect CSS output.

## Using your own engine

`QuasarPreset()` nests `preset-mini`. An app wanting wind4 adds it with the exported fragment:

```ts
import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'
import presetWind4 from '@unocss/preset-wind4'

presets: [
  presetWind4({ ...quasarWind4Options }),
  QuasarPreset({ styles: QuasarStyleEntries })
]
```

| Fragment option                                        | Why                                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `preflights: { reset: false }`                         | wind4's base reset clobbers Quasar's own control styling                                        |
| `dark: { light: '.body--light', dark: '.body--dark' }` | wind4's default `.dark` class is never set by Quasar — every `dark:*` utility would be dead CSS |

Notes for a two-engine setup:

- Keep `QuasarPreset()` in the array — `enforce: 'post'` keeps Quasar-owned names (`row`, `col-6`, `q-btn`) its own in either order.
- The palette has one authority: this preset's `extendTheme`. Array order only decides classes _both_ engines define.
- The fragment is deliberately not frozen (wind4's factory assigns its own defaults onto it) — spread it for a private copy.
- `bg-light-blue` / `text-light-blue` are emitted by the preset regardless: mini spells that family `sky`.

## Errors

| Message                                                                                                 | Cause                       |
| ------------------------------------------------------------------------------------------------------- | --------------------------- |
| `QuasarPreset: no style configured — pass styles: QuasarStyleEntry[] (first entry = baseline) or style` | neither option given        |
| `QuasarPreset: styles[i] is not a style entry — expected { name, tokens }`                              | bad entry shape             |
| `QuasarPreset: style entry "<name>" has no tokens`                                                      | entry without a token block |
