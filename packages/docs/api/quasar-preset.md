# `QuasarPreset()` <Badge type="tip" text="factory" />

The main entry point. Creates an UnoCSS preset for Quasar Framework component styles.

## Import

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
```

## Signature

```ts
function QuasarPreset(options: QuasarPresetOptions): Preset<QuasarTheme>
```

## Parameters

### `options.styles`

Style entries — named token specs, one per design system. The preset registers **one** shared component tree and emits a `body.quasar-style-{name}` CSS-variable block per entry, so styles switch at runtime by swapping the body class (see [`setStyle`](/styles/scoping)).

Default: `QuasarStyleEntries` (md3, md2, unstyled).

```ts
import {
  Md3StyleEntry, // MD3 (Material You)
  Md2StyleEntry, // MD2 (classic Material)
  UnstyledStyleEntry, // structural only
  QuasarStyleEntries // all three, bundled
} from 'unocss-preset-quasar/styles'
```

Each entry is `{ name, tokens }` — a token spec, not a component tree. Custom entries override individual tokens of a built-in entry.

### `options.sourceColor`

Hex color string driving the MD3 dynamic color palette. Changing it regenerates primary, secondary, tertiary, error, and surface colors for both light and dark themes.

**Default:** `'#1976d2'`

```ts
QuasarPreset({ styles: QuasarStyleEntries, sourceColor: '#6750A4' })
```

### `options.plugins`

Array of Quasar plugin names. The preset generates a safelist of CSS classes for plugin-generated UI (dialogs, notifications, loading bars). Must match `framework.plugins` in your Quasar config.

```ts
QuasarPreset({
  styles: QuasarStyleEntries,
  plugins: ['Dialog', 'Notify', 'LoadingBar']
})
```

### `options.iconSet`

A Quasar icon set object (e.g., `mdiSet` from `quasar/icon-set`). Icon names are added to the safelist.

### `options.presetWebFonts`

Configuration for `@unocss/preset-web-fonts`. Default loads Roboto from Bunny CDN.

## Returns

An UnoCSS `Preset<QuasarTheme>` object. Pass it to `UnoCSS()` plugin's `presets` array.

## Example

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

UnoCSS({
  presets: [
    QuasarPreset({
      styles: QuasarStyleEntries,
      sourceColor: '#6750A4',
      plugins: ['Dark', 'Dialog', 'Notify', 'LoadingBar']
    })
  ]
})
```

## What It Sets Up

Internally, `QuasarPreset()` configures:

| Component        | What                                                                       |
| ---------------- | -------------------------------------------------------------------------- |
| **Presets**      | `@unocss/preset-wind4`, `animated-unocss`, `presetIcons`, `presetWebFonts` |
| **Theme**        | Extended `QuasarTheme` with MD3 color generation                           |
| **Preflights**   | CSS reset, MD3 color variables, typography, transitions                    |
| **Rules**        | Mouse rules, helper rules, elevation rules, visibility rules               |
| **Shortcuts**    | All component shortcuts from the shared tree + core utilities              |
| **Variants**     | Dark mode, breakpoints                                                     |
| **Safelist**     | Component classes, plugin classes, icon classes, color classes             |
| **Extractor**    | Auto-detects Quasar components, transitions, colors, and icons             |
| **Transformers** | `transformerVariantGroup`, `transformerDirectives`                         |
| **Layers**       | `components` (-1), `default` (1), `utilities` (2)                          |
