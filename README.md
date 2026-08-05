# unocss-preset-quasar

UnoCSS preset for Quasar Framework — utility-first, tree-shakeable component styles. Drop Quasar's ~200 KB Sass bundle and use UnoCSS utilities that are generated on demand from your templates.

[![npm version](https://img.shields.io/npm/v/unocss-preset-quasar)](https://www.npmjs.com/package/unocss-preset-quasar)
[![license](https://img.shields.io/npm/l/unocss-preset-quasar)](./LICENCE)

📖 **[Full documentation](https://simsustech.github.io/unocss-preset-quasar/)**

## Why this preset

Quasar ships Sass stylesheets that get imported once at build time, growing your bundle by ~200 KB regardless of which components you use. This preset **inverts that model**:

- Every Quasar component shortcut (`q-btn`, `q-card`, `q-table`, …) is a **CSS-var-driven UnoCSS shortcut**.
- All component shortcuts live in a **single shared tree** (`styles/shared/`) — one shortcut set, no collisions.
- Styles (`md3`, `md2`, `unstyled`) are **token values, not parallel shortcut trees**. They differ only in the CSS variables emitted by a single preflight.
- **Switch styles at runtime** by swapping a `quasar-style-{name}` body class — no page reload, no module re-import.

## Installation

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

- `unocss` — the UnoCSS engine and Vite plugin
- `unocss-preset-quasar` — the Quasar component shortcuts and MD3 theme
- `@iconify-json/mdi` — Material Design Icons (used via `presetIcons`)

## Quick Start (Quasar CLI)

### 1. Strip the Sass import

Add a Vite plugin that replaces Quasar's Sass import with UnoCSS:

```js
// quasar.config.js
vitePlugins: [
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
  },
],
```

### 2. Register the UnoCSS plugin

```js
// quasar.config.js
import { QuasarPreset } from 'unocss-preset-quasar'
import UnoCSS from 'unocss/vite'

const quasarPlugins = [
  'AddressbarColor',
  'AppFullscreen',
  'AppVisibility',
  'BottomSheet',
  'Cookies',
  'Dark',
  'Dialog',
  'Loading',
  'LoadingBar',
  'LocalStorage',
  'Meta',
  'Notify',
  'Platform',
  'Screen',
  'SessionStorage'
]

export default defineConfig(() => ({
  vitePlugins: [/* strip-sass from step 1 */],

  extendViteConf(viteConf) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [QuasarPreset({ plugins: quasarPlugins })]
      })
    )
  },

  framework: { plugins: quasarPlugins }
}))
```

> The `plugins` array must match between `QuasarPreset()` and `framework.plugins`. Plugins in `framework` but missing from the preset will have missing styles.

### 3. Complete example

See [`packages/quasar-docs/quasar.config.js`](./packages/quasar-docs/quasar.config.js) for a full real-world Quasar CLI integration.

## Choosing a Style

Styles are **token values**, not parallel shortcut trees. The preset ships three named entries:

```js
import {
  Md3StyleEntry, // Material You (recommended)
  Md2StyleEntry, // Material Design 2
  UnstyledStyleEntry // structural only, no visual styling
} from 'unocss-preset-quasar/styles'
```

By default `QuasarPreset()` registers **all three** — switching happens at runtime via the body class. You can opt into a subset:

```js
QuasarPreset({
  styles: [Md3StyleEntry, Md2StyleEntry] // omit unstyled
})
```

### Switching styles at runtime

```js
import { setStyle, getActiveStyle } from 'unocss-preset-quasar/styles'

setStyle('md2') // body.quasar-style-md2 — instant CSS-var swap, no reload
getActiveStyle() // 'md2'
```

Each entry's CSS variables are emitted as `body.quasar-style-{name} { --q-primary: ...; --q-radius-xl: ...; }`. The same shortcut set resolves to different values depending on which body class is active.

### Dark mode

A single `body.body--dark.quasar-style-{name}` selector flips every `--light-*` reference to `--dark-*`:

```js
import { Dark } from 'quasar'
Dark.set(true) // body.body--dark — all styles flip to their dark token values
```

## Custom Theme Color

Change the entire MD3 palette with one source color:

```js
QuasarPreset({
  sourceColor: '#6750A4' // purple theme
})
```

The source color expands into the full MD3 tonal palette (primary, primaryContainer, secondary, surface, onSurface, …) and is emitted as CSS variables.

## Custom Token Overrides

Override any token via plain UnoCSS theme config:

```js
QuasarPreset({
  tokens: {
    md3: {
      color: { primary: '#ff5722' }, // override primary
      shape: { cornerMedium: '8px' } // override radius
    },
    md2: {
      // ...
    }
  }
})
```

User-supplied tokens are deep-merged onto the defaults; missing categories fall back to safe values (`transparent` / `none` / `0` / `inherit`).

## What's Included

| Feature                 | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| **70+ components**      | QBtn, QCard, QDialog, QTable, QTree, QDate, QTime, and more    |
| **3 style entries**     | MD3, MD2, Unstyled — token values, runtime-switchable          |
| **MD3 color system**    | Dynamic tonal palette from a single source color               |
| **Dark mode**           | `--light-*` ↔ `--dark-*` swap via body class                   |
| **24 elevation levels** | Material Design elevation 1–24                                 |
| **CSS helper families** | typography, spacing, flex, grid, elevation, visibility, …      |
| **Transitions**         | slide, fade, scale, rotate, jump, flip                         |
| **Typography**          | Full MD3 type scale (h1–h6, subtitle, body, caption, overline) |
| **Quasar plugins**      | Dialog, Notify, Loading, LoadingBar, BottomSheet               |
| **Tree-shakeable**      | Only the utilities you use are included in the final CSS       |

## Architecture

### Single shared shortcut tree

All component shortcuts live in `packages/preset/src/styles/shared/components/`. Each shortcut references CSS variables (`var(--q-btn-radius)`, `var(--q-primary)`) instead of hard-coded values:

```ts
// styles/shared/components/QBtn.unocss.ts
;[
  [
    'q-btn',
    `padding: var(--q-btn-padding); border-radius: var(--q-btn-radius); …`
  ],
  ['q-btn--standard', `{ ... }`]
  // …
]
```

This sidesteps UnoCSS's `expandShortcut` first-match-wins semantics — there is only one shortcut set, so name collisions are impossible.

### Single preflight per style

`packages/preset/src/core/_tokenPreflight.ts` builds one Preflight whose `getCSS({ theme })` reads `theme.quasar.tokens` and emits:

- `body.quasar-style-md3 { --q-primary: ...; --q-radius-xl: ...; … }` — every token from the entry, defaulted to safe values where missing.
- `body.body--dark.quasar-style-md3 { --q-primary: ...; … }` — dark-mode values, rewriting `--light-*` → `--dark-*` references.

### Runtime switching

The single body-class swap is the entire switch mechanism:

```ts
// packages/preset/src/styles/_helpers.ts
export function setStyle(name: string): void {
  if (typeof document === 'undefined') return
  for (const cls of Array.from(document.body.classList))
    if (cls.startsWith('quasar-style-')) document.body.classList.remove(cls)
  document.body.classList.add(`quasar-style-${name}`)
}
```

No module re-import, no shortcut table lookup, no preflight rebuild — just a class flip.

## Migration from the old preset

The old preset shipped **three parallel shortcut trees** (`styles/md3/components/*`, `styles/md2/components/*`, `styles/unstyled/components/*`) plus a `tokens` bundle concept with `MaterialDesign2/3/Unstyled` named exports. That architecture made `?style=md2` only flip a `bodyClass` while only MD3 shortcuts were actually generated — md2 and unstyled rendered identically to md3.

The new architecture replaces that with one shared tree plus per-style token entries. If you were using:

```js
// OLD
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
QuasarPreset({ style: MaterialDesign3 })

// NEW
import { Md3StyleEntry } from 'unocss-preset-quasar/styles'
QuasarPreset({ styles: [Md3StyleEntry] })
// or just register all three and switch at runtime:
// QuasarPreset()
```

Switching styles at runtime also used to require a page reload — the new `setStyle()` works instantly:

```js
// OLD — full page reload
window.location.search = '?style=md2'

// NEW — instant CSS-var swap
import { setStyle } from 'unocss-preset-quasar/styles'
setStyle('md2')
```

## Development

```bash
git clone https://github.com/simsustech/unocss-preset-quasar.git
cd unocss-preset-quasar
pnpm i
pnpm run build

# Preview the VitePress docs
cd packages/docs
pnpm run dev

# Run the dev playground
cd packages/dev
pnpm run dev

# Run the preset's spec assertions
cd packages/preset
pnpm test
```

## Adding New Component Shortcuts

1. Create a shortcut file: `packages/preset/src/styles/shared/components/QComponentName.unocss.ts`
2. Register it in `packages/preset/src/styles/shared/components/index.ts`
3. Add the safelist entries in `packages/preset/src/safelist.ts`

## License

MIT
