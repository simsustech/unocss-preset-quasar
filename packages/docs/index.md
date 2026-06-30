---
layout: home

hero:
  name: "unocss-preset-quasar"
  text: "Utility-first Quasar styling"
  tagline: Drop Quasar's Sass bundle. Use UnoCSS utility classes instead. Material Design 3, Material Design 2, and Unstyled — all tree-shakeable.
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
    details: Full MD3 color system with dynamic source color, tonal palettes, elevation levels 1–24, and state layers. Dark and light themes built in.
  - icon: 🧩
    title: 70+ Quasar Components
    details: Every Quasar component styled as UnoCSS shortcuts — QBtn, QCard, QDialog, QTable, QTree, QDate, QTime, and more. Tree-shaken at build time.
  - icon: ⚡
    title: Zero Sass
    details: Strip Quasar's ~200 KB Sass bundle entirely. The preset replaces all component styles with UnoCSS utilities. Only the CSS you actually use ships.
  - icon: 🌓
    title: Dark Mode Ready
    details: Light and dark themes via CSS custom properties. Switch with Quasar's Dark plugin — classes update automatically.
  - icon: 🔌
    title: Quasar Plugin Support
    details: Notify, Dialog, Loading, LoadingBar, BottomSheet — all plugin-generated UI gets safelisted so styles are never missing.
  - icon: 🛠️
    title: Scoped Multi-Style Mode
    details: Bundle MD3, MD2, and Unstyled in one build. Switch at runtime by toggling a body class. Each style's CSS scoped to its own selector.
  - icon: 📦
    title: Tree-Shakeable
    details: UnoCSS scans your templates and only generates CSS for the classes you use. No dead code, no unused component styles.
  - icon: 🚀
    title: HMR-Ready Dev
    details: Edit shortcut files and see changes instantly without rebuilding. Vite aliases map imports to TypeScript sources for live feedback.
---

## What is unocss-preset-quasar?

`unocss-preset-quasar` is an [UnoCSS](https://unocss.dev) preset that replaces Quasar Framework's Sass-based styling with utility-first, tree-shakeable CSS classes. Instead of importing `quasar/dist/quasar.sass` (~200 KB of CSS you can't tree-shake), you use UnoCSS utilities that are generated on demand from your templates.

```ts
// quasar.config.js — replace quasar.sass with virtual:uno.css
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  vitePlugins: [
    UnoCSS({
      presets: [QuasarPreset({ style: MaterialDesign3, plugins })],
    }),
  ],
})
```

## How It Works

The preset registers **shortcuts** that map Quasar's BEM class names (`.q-btn`, `.q-card__section`, `.q-dialog__backdrop`) to UnoCSS utility classes. When UnoCSS scans your Vue templates, it detects Quasar components, generates the matching utilities, and includes only the CSS that your app actually uses.

### Architecture

```
Your Vue Templates
        │
        ▼
  UnoCSS Scanner ─── QuasarPreset extractor
        │                  │
        │         detects q-btn, QBtn, etc.
        ▼                  │
  Shortcut Resolver ◄──────┘
        │
        ▼
  Generated CSS (only used classes)
```

The preset also generates **CSS custom properties** for the full Material Design 3 color scheme — light and dark variants of primary, secondary, tertiary, error, surface, and container colors. These are available as `--light-primary`, `--dark-primary`, etc. and used internally by the shortcut system.

## Quick Start

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

Then configure your Quasar project's `quasar.config.js`:

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

const plugins = ['Dark', 'Dialog', 'Notify', 'LoadingBar', /* ... */]

export default defineConfig((ctx) => ({
  vitePlugins: [
    // Strip the Sass import, replace with UnoCSS
    {
      name: 'quasar-strip-sass',
      enforce: 'pre',
      transform(code, id) {
        if (code.includes(`import 'quasar/dist/quasar.sass'`)) {
          code = code.replaceAll(
            `import 'quasar/dist/quasar.sass'`,
            `import 'virtual:uno.css'`
          )
        }
        return code
      },
    },
  ],
  extendViteConf(viteConf, { isClient }) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({
            style: MaterialDesign3,
            plugins,
          }),
        ],
      })
    )
  },
  framework: { plugins },
}))
```

See the [Getting Started](/guide/getting-started) guide for detailed setup instructions.

## Playground

Try it live on StackBlitz:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/unocss-preset-quasar)
