# unocss-preset-quasar

UnoCSS preset for Quasar Framework — utility-first, tree-shakeable component styles. Drop Quasar's ~200 KB Sass bundle and use UnoCSS utilities that are generated on demand from your templates.

[![npm version](https://img.shields.io/npm/v/unocss-preset-quasar)](https://www.npmjs.com/package/unocss-preset-quasar)
[![license](https://img.shields.io/npm/l/unocss-preset-quasar)](./LICENCE)

📖 **[Full documentation](https://simsustech.github.io/unocss-preset-quasar/)**

## Why this preset

Quasar ships Sass stylesheets that get imported once at build time, growing your bundle by ~200 KB regardless of which components you use. This preset **inverts that model**:

- Every Quasar component (`q-btn`, `q-card`, `q-table`, …) is a **CSS-var-driven UnoCSS rule set** in one shared tree (`src/components/`) — no parallel copies per design system.
- **Styles are token entries, not shortcut trees.** `md3`, `md2` and `unstyled` differ only in the CSS variables a single preflight emits — plus, each entry owns the literal declarations tokens cannot express.
- **Explicit, tree-shaken configuration.** `QuasarPreset()` throws without `styles`/`style`: the first entry is the baseline, every other entry ships as a `body.quasar-style-{name}` switch block, and an unlisted style ships zero bytes.
- **Switch styles at runtime** by swapping a `quasar-style-{name}` body class — no page reload, no module re-import.
- **Verified against Quasar's own output.** Vocabulary sweeps, dist-coverage gates and engine-parity tests keep every class and value honest against `quasar/dist/quasar.css` and the MD2/MD3 specs.

## Installation

```bash
pnpm add unocss unocss-preset-quasar @iconify-json/mdi
```

- `unocss` — the UnoCSS engine and Vite plugin
- `unocss-preset-quasar` — the Quasar component rules and MD3 theme
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
    transform(code) {
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
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import UnoCSS from 'unocss/vite'

const quasarPlugins = [
  'BottomSheet',
  'Dialog',
  'Loading',
  'LoadingBar',
  'Notify',
  'Dark',
  'Platform',
  'Screen'
]

export default defineConfig(() => ({
  vitePlugins: [/* strip-sass from step 1 */],

  extendViteConf(viteConf) {
    viteConf.plugins.push(
      UnoCSS({
        enforce: 'pre',
        presets: [
          QuasarPreset({ styles: QuasarStyleEntries, plugins: quasarPlugins })
        ]
      })
    )
  },

  framework: { plugins: quasarPlugins }
}))
```

> The `plugins` array must match between `QuasarPreset()` and `framework.plugins`. A plugin in `framework` but missing from the preset works but its generated UI has no styles — see [Plugins](https://simsustech.github.io/unocss-preset-quasar/plugins/overview).

### 3. Complete example

See the [Quasar Integration guide](https://simsustech.github.io/unocss-preset-quasar/guide/quasar-integration) for a full real-world `quasar.config.js`.

## Choosing a Style

Styles are **token entries**, not parallel rule trees. The preset ships three named entries:

```js
import {
  MaterialDesign3, // Material You (recommended)
  MaterialDesign2, // Material Design 2
  Unstyled // structural only, no visual styling
} from 'unocss-preset-quasar/styles'
```

You must say which ones ship — `QuasarPreset()` with neither `styles` nor `style` throws, because a default would either ship CSS for styles you never switch to or make `setStyle()` a silent no-op:

```js
QuasarPreset({ styles: [MaterialDesign3] }) // single style
QuasarPreset({ styles: QuasarStyleEntries }) // all three, switchable
QuasarPreset({ styles: [MaterialDesign3, MaterialDesign2] }) // baseline + escape hatch
```

The **first entry is the baseline**: its tokens land on `body` and its rules ship unscoped. Later entries ship only as `body.quasar-style-{name}` diff blocks.

### Switching styles at runtime

```js
import { setStyle, getActiveStyle } from 'unocss-preset-quasar/styles'

setStyle('md2') // body.quasar-style-md2 — instant CSS-var swap, no reload
getActiveStyle() // 'md2'
```

Only styles listed at build time are switchable; `setStyle('<unlisted>')` silently keeps the baseline.

### Dark mode

A single `body.body--dark.quasar-style-{name}` selector flips every light reference to its dark value:

```js
import { Dark } from 'quasar'
Dark.set(true) // body.body--dark — all tokens flip to their dark values
```

## Custom Theme Color

Change the entire MD3 palette with one source color:

```js
QuasarPreset({
  styles: QuasarStyleEntries,
  sourceColor: '#6750A4' // purple theme
})
```

The source color expands into the full MD3 tonal palette (primary, primaryContainer, secondary, surface, onSurface, …) and is emitted as CSS variables. To change it **after** build, use `applySourceColor()` from `unocss-preset-quasar/runtime`.

## Custom Token Overrides

Override any token by deriving your own style entry:

```js
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'

const myStyle = {
  name: 'my',
  tokens: {
    ...MaterialDesign3.tokens,
    shape: { ...MaterialDesign3.tokens.shape, cornerMedium: '2px' }
  }
}

QuasarPreset({ styles: [myStyle] })
```

Missing token categories are defaulted to safe values (`transparent` / `none` / `0` / `inherit`), so an incomplete entry can never produce an undefined `var()` read.

## What's Included

| Feature                 | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| **80+ components**      | QBtn, QCard, QDialog, QTable, QTree, QDate, QTime, and more — one rule tree       |
| **3 style entries**     | MD3, MD2, Unstyled — token values, runtime-switchable, tree-shaken                |
| **MD3 color system**    | Dynamic tonal palette from a single source color                                  |
| **Dark mode**           | Light and dark schemes as CSS variables, flipped by `body--dark`                  |
| **5 elevation levels**  | MD3 spec vectors / Quasar's `$shadow-N`, plus tonal surfaces                      |
| **CSS helper families** | typography, spacing, flex/grid, positioning, visibility, platform                 |
| **Transitions**         | slide, fade, scale, rotate, jump, flip + animation helpers                        |
| **Typography**          | Quasar's `text-h1`…`text-caption` scale, weights, transforms                      |
| **Quasar plugins**      | Dialog, Notify, Loading, LoadingBar, BottomSheet — safelisted per declared plugin |
| **App extensions**      | Opt-in ports of qcalendar, qmarkdown, qmediaplayer                                |
| **Tree-shakeable**      | Only the classes your templates mention — plus exactly the styles you list        |

## Architecture

### One shared rule tree

All component rules live in `packages/preset/src/components/<name>/rules.ts`. Each rule states structure and reads CSS variables (`var(--q-btn-radius)`, `var(--q-primary)`) instead of hard-coding values:

```ts
// src/components/btn/rules.ts
export const btnRules = [
  [
    /^q-btn$/,
    function* (_, { symbols }) {
      yield { 'border-radius': 'var(--q-btn-radius)' /* … */ }
      yield { [symbols.selector]: (sel) => `${sel}:before` /* … */ }
    }
  ]
]
```

One tree, so name collisions are impossible and a style never forks a rule.

### One token preflight

`packages/preset/src/theme/preflight.ts` builds a single preflight that emits:

- `:root` — color roles (`--light-*`, `--dark-*`), Quasar aliases (`--q-primary`, …), shape roles, screen breakpoints, engine-namespace defaults
- `body { … }` — the baseline style's tokens, defaulted to safe values where missing
- `body.quasar-style-{name} { … }` — each additional style's diff
- `body.body--dark[.quasar-style-{name}] { … }` — dark values

### Runtime switching

The body-class swap is the entire switch mechanism (`src/styles/index.ts`):

```ts
export function setStyle(name: string): void {
  if (typeof document === 'undefined') return
  for (const cls of Array.from(document.body.classList))
    if (cls.startsWith('quasar-style-')) document.body.classList.remove(cls)
  document.body.classList.add(`quasar-style-${name}`)
}
```

No module re-import, no rule-table lookup, no preflight rebuild — just a class flip.

### Assembly guarantees

- **Duplicate regexes are merged** at assembly — UnoCSS keeps only the last rule per regex, and dropped registrations once left `.q-header` transparent.
- **Cascade bands** (grid → components → app extensions → styles → utilities) order the output; the preset carries `enforce: 'post'`.
- **Non-baseline style rules are scoped** under `body.quasar-style-{name}` — per top-level comma member — so a style cannot leak into its neighbours.

## Migration from the old preset

The old preset shipped **three parallel rule trees** (`styles/md3/components/*`, `styles/md2/components/*`, `styles/unstyled/components/*`). That architecture made `?style=md2` only flip a `bodyClass` while only MD3 shortcuts were actually generated — md2 and unstyled rendered identically to md3.

The current architecture is one shared tree plus per-style token entries. If you were using:

```js
// OLD
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
QuasarPreset({ style: MaterialDesign3 })

// NEW — explicit, and the list decides what ships
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
QuasarPreset({ styles: [MaterialDesign3] })
// or register all three and switch at runtime:
// QuasarPreset({ styles: QuasarStyleEntries })
```

Switching styles at runtime also used to require a page reload — the current `setStyle()` works instantly:

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

# Run the preset's test suites
cd packages/preset
pnpm test
```

See the [Development guide](https://simsustech.github.io/unocss-preset-quasar/guide/development) for the repository layout, the audit scripts, and the component-porting workflow.

## Adding New Component Shortcuts

1. Create the folder: `packages/preset/src/components/QComponentName/` with `rules.ts` (+ `shortcuts.ts`), exporting `qComponentNameRules` / `qComponentNameShortcuts`
2. Export it from `packages/preset/src/components/index.ts` — exports are discovered **by suffix**, so the names must end in `Rules` / `Shortcuts`
3. Regenerate the class vocabulary if the component's classes are new upstream: `node scripts/generate-quasar-classes.mjs`
4. Add a safelist entry in `packages/preset/src/safelist.ts` **only** if the base class appears in no markup (purely runtime-applied)

## License

MIT
