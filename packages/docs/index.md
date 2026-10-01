---
layout: home

hero:
  name: 'unocss-preset-quasar'
  text: 'Utility-first Quasar styling'
  tagline: Drop Quasar's Sass bundle. One rule tree, token-driven styles — Material Design 3, Material Design 2, and Unstyled, all tree-shakeable and runtime-switchable.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/simsustech/unocss-preset-quasar

features:
  - icon: 🎨
    title: Material Design 3
    details: Full MD3 color system from one source color — tonal palettes, surface containers, five elevation levels, state layers. Dark and light schemes built in.
  - icon: 🧩
    title: 80+ Quasar Components
    details: Every Quasar component styled from one shared rule tree — QBtn, QCard, QDialog, QTable, QTree, QDate and more, with the class vocabulary derived from your markup.
  - icon: ⚡
    title: Zero Sass
    details: Strip Quasar's ~200 KB Sass bundle entirely. UnoCSS generates only the CSS your templates use — component families and all.
  - icon: 🌓
    title: Dark Mode Ready
    details: Both schemes ship as CSS custom properties. Quasar's Dark plugin flips one body class; every token follows.
  - icon: 🔌
    title: Quasar Plugin Support
    details: Notify, Dialog, Loading, LoadingBar, BottomSheet — declare the plugins you call and their runtime-generated UI is safelisted, nothing else.
  - icon: 🛠️
    title: Runtime Style Switching
    details: Styles are token entries, not parallel CSS. MD3 → MD2 → Unstyled is one body-class swap — and unlisted styles ship zero bytes.
  - icon: 📦
    title: Tree-Shakeable
    details: List the styles you use, declare the app extensions you render — inclusion is the switch, for styles, plugins, and libraries alike.
  - icon: ✅
    title: Verified, not assumed
    details: Every class and value is gated against Quasar's own dist bundle and specs — vocabulary sweeps, coverage dispositions, engine parity.
---

## What is unocss-preset-quasar?

An [UnoCSS](https://unocss.dev) preset that replaces Quasar Framework's Sass-based styling. Instead of importing `quasar/dist/quasar.sass` (~200 KB you can't tree-shake), component styles become CSS-variable-driven rules that are generated on demand from your templates.

```ts
// quasar.config.js — replace quasar.sass with virtual:uno.css
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  vitePlugins: [
    UnoCSS({
      presets: [QuasarPreset({ styles: QuasarStyleEntries, plugins })]
    })
  ]
})
```

## How It Works

Four stages — no runtime rebuild at any of them:

```text
Your Vue Templates
        │
        ▼
  UnoCSS Scanner ─── extractors: component vocabulary + literal values
        │                  │
        │         q-btn, QBtn, i-mdi-chevron-down, …
        ▼                  ▼
  Rules (one shared tree) ──► read var(--q-btn-radius), var(--q-primary), …
        │
        ▼
  Token preflight ──► :root color roles, body style tokens,
        │             body.quasar-style-* diffs, body--dark overrides
        ▼
  Generated CSS — only the classes your app uses, in cascade bands
        │
        ▼
  setStyle('md2') at runtime ──► one body-class swap, whole app restyles
```

The component rules state structure once and read custom properties for every value a style can vary; the [architecture pages](/architecture/overview) explain the layers, the extractors, and the cascade in detail.

## Quick Start

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

Then configure your Quasar project's `quasar.config.js`:

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

const plugins = ['Dark', 'Dialog', 'Notify', 'LoadingBar' /* … */]

export default defineConfig(() => ({
  vitePlugins: [
    // Strip the Sass import, replace with UnoCSS
    {
      name: 'quasar-strip-sass',
      enforce: 'pre',
      transform(code) {
        if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
          code = code.replaceAll(
            `import 'quasar/dist/quasar.sass'`,
            `import 'virtual:uno.css'`
          )
        }
        return code
      }
    }
  ],
  extendViteConf(viteConf) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({
            styles: QuasarStyleEntries,
            plugins
          })
        ]
      })
    )
  },
  framework: { plugins }
}))
```

See the [Getting Started](/guide/getting-started) guide for detailed setup instructions.

## Playground

Try it live on StackBlitz:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/unocss-preset-quasar)
