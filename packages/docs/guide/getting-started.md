# Getting Started

## Installation

Install the preset alongside UnoCSS and the Material Design Icons icon set:

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

Required peer dependencies:

- `quasar` ^2.19.3
- `unocss` ^66.7.0

## Prerequisites

You need an existing Quasar project (Quasar CLI with Vite). If you don't have one:

```bash
pnpm create quasar
# Choose: Quasar CLI with Vite
```

## Stripping Quasar's Sass

The preset replaces Quasar's Sass bundle entirely. Add a Vite plugin to strip the Sass import and replace it with UnoCSS's virtual CSS:

```ts
// quasar.config.js
{
  name: 'quasar-strip-sass',
  enforce: 'pre',
  transform(code, id) {
    if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
      return code.replaceAll(
        `import 'quasar/dist/quasar.sass'`,
        `import 'virtual:uno.css'`
      )
    }
  },
}
```

This plugin must run **before** Vite processes the import, hence `enforce: 'pre'`.

## Registering the Preset

Import and register the preset with UnoCSS inside `extendViteConf`:

```ts
// quasar.config.js
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

export default defineConfig((ctx) => ({
  extendViteConf(viteConf, { isClient }) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({
            styles: QuasarStyleEntries, // one preset, all styles switchable at runtime
            plugins: [
              'Dark',
              'Dialog',
              'Notify',
              'LoadingBar',
              'Loading',
              'BottomSheet'
            ]
          })
        ]
      })
    )
  }
}))
```

The preset ships one shared component tree; styles are just token entries. The built-in entries are `MaterialDesign3`, `MaterialDesign2`, `Unstyled`, all bundled in `QuasarStyleEntries`. Each entry emits a `body.quasar-style-{name}` CSS-variable block, so you switch styles at runtime by swapping the body class:

```ts
import { setStyle } from 'unocss-preset-quasar/styles'

setStyle('md2') // swaps the active CSS-variable block, no reload
```

Custom token overrides:

````ts
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'

const myStyle = {
  name: 'md3',
  tokens: {
    ...MaterialDesign3.tokens,
    shape: { ...MaterialDesign3.tokens.shape, radiusXl: '8px' } // square buttons
  }
}

QuasarPreset({ styles: [myStyle] })

::: warning Plugin List
You **must** list every Quasar plugin your app uses. The preset generates a safelist of CSS classes for plugin-generated UI (dialogs, notifications, loading bars). Missing plugins → missing styles for those components at runtime.
:::

## Enabling Transforms

The preset includes two UnoCSS transformers. Enable them in your `uno.config.ts` if you want to use them separately:

```ts
// uno.config.ts (optional — the preset includes these)
import { transformerDirectives, transformerVariantGroup } from 'unocss'

export default {
  transformers: [
    transformerVariantGroup(), // group variants: hover:(bg-red text-white)
    transformerDirectives() // @apply directive
  ]
}
````

These are **already included** in the preset, so you only need this if you want them in a separate UnoCSS config file.

## Verifying the Setup

1. Start the dev server: `quasar dev`
2. Open your app in the browser
3. Inspect any Quasar component — it should have utility-based styles instead of Sass-generated classes

To verify the Sass was stripped, check that no `quasar.sass` requests appear in the network tab.

## Next Steps

- [Configuration](/guide/configuration) — all preset options explained
- [Quasar Integration](/guide/quasar-integration) — full quasar.config.js setup
- [Theming](/core/theming) — source color, dark mode, CSS variables
