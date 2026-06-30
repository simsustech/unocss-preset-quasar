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

### `options.style` <Badge type="danger" text="required" />

The design system. One of:

```ts
import {
  MaterialDesign3,
  MaterialDesign2,
  Unstyled,
} from 'unocss-preset-quasar/styles'
```

Each is a `QuasarStyle` object containing rules, variants, preflights, and shortcuts for its design system.

### `options.sourceColor`

Hex color string. Drives the MD3 dynamic color system. Default: `'#1976d2'`.

### `options.plugins`

Array of Quasar plugin names. Used to generate the CSS safelist for programmatic UI. Must match `framework.plugins` in your Quasar config.

### `options.iconSet`

A Quasar icon set object (e.g., `mdiSet` from `quasar/icon-set`). Icon names are added to the safelist.

### `options.presetWebFonts`

Configuration for `@unocss/preset-web-fonts`. Default loads Roboto from Bunny CDN.

### `options.scoped`

When `true`, component CSS is scoped to a body class. Enables multi-style builds.

## Returns

An UnoCSS `Preset<QuasarTheme>` object. Pass it to `UnoCSS()` plugin's `presets` array.

## Example

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

UnoCSS({
  presets: [
    QuasarPreset({
      style: MaterialDesign3,
      sourceColor: '#6750A4',
      plugins: ['Dark', 'Dialog', 'Notify', 'LoadingBar'],
    }),
  ],
})
```

## What It Sets Up

Internally, `QuasarPreset()` configures:

| Component | What |
|-----------|------|
| **Presets** | `@unocss/preset-wind3` (Wind4), `animated-unocss`, `presetIcons`, `presetWebFonts` |
| **Theme** | Extended `QuasarTheme` with MD3 color generation |
| **Preflights** | CSS reset, MD3 color variables, typography, transitions |
| **Rules** | Mouse rules, helper rules, elevation rules, visibility rules |
| **Shortcuts** | All component shortcuts from the selected style + core utilities |
| **Variants** | Style-specific variants (dark mode, breakpoints) |
| **Safelist** | Component classes, plugin classes, icon classes, color classes |
| **Extractor** | Auto-detects Quasar components, transitions, colors, and icons |
| **Transformers** | `transformerVariantGroup`, `transformerDirectives` |
| **Layers** | `components` (-1), `default` (1), `utilities` (2) + optional body-class layer |
