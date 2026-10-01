# `/styles`

The style-entry surface: the three built-ins, the bundle, and the runtime switch helpers.

```ts
import {
  MaterialDesign3,
  MaterialDesign2,
  Unstyled,
  QuasarStyleEntries,
  setStyle,
  getActiveStyle
} from 'unocss-preset-quasar/styles'
```

## Exports

| Export               | Kind                     | Value                                                              |
| -------------------- | ------------------------ | ------------------------------------------------------------------ |
| `MaterialDesign3`    | `QuasarStyleEntry`       | `{ name: 'md3', tokens }` — no rules                               |
| `MaterialDesign2`    | `QuasarStyleEntry`       | `{ name: 'md2', tokens }` — no rules                               |
| `Unstyled`           | `QuasarStyleEntry`       | `{ name: 'unstyled', tokens, rules }` — carries the literal resets |
| `QuasarStyleEntries` | `QuasarStyleEntry[]`     | `[MaterialDesign3, MaterialDesign2, Unstyled]`                     |
| `setStyle(name)`     | `(name: string) => void` | swap the active body class                                         |
| `getActiveStyle()`   | `() => string \| null`   | current style name, or `null`                                      |
| `QuasarStyleEntry`   | type                     | the entry shape                                                    |

Deprecated aliases — thin re-exports, same values, prefer the names above:

```ts
Md3StyleEntry // → MaterialDesign3
Md2StyleEntry // → MaterialDesign2
UnstyledStyleEntry // → Unstyled
```

## The `QuasarStyleEntry` type

```ts
export interface QuasarStyleEntry {
  name: string // becomes body.quasar-style-{name}
  tokens: StyleEntry['tokens'] // TokenBlock minus the color block
  rules?: Rule[] // declarations tokens cannot express; scoped if non-baseline
}
```

- `name` must be a non-empty string; it becomes a CSS class suffix, so keep it class-safe.
- `tokens` missing categories are defaulted to safe values (`transparent` / `none` / `0` / `inherit`) at emission — an incomplete entry cannot produce undefined `var()` reads.
- `rules` ship **iff** the entry is listed. Non-baseline entries have every top-level comma member of each selector prefixed with `body.quasar-style-{name} `.

Full contract: [Styles & Scoping](/architecture/style-configuration).

## `setStyle(name)`

```ts
setStyle(name: string): void
```

Removes every `quasar-style-*` class from `document.body`, adds `quasar-style-{name}`. No-op when `document` is undefined (SSR-safe). Names the build did not list add a class nothing matches — the stylesheet silently stays on the baseline.

## `getActiveStyle()`

```ts
getActiveStyle(): string | null
```

Returns the suffix of the active `quasar-style-*` class, or `null` when none is present (the baseline running unnamed).

## Usage

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import {
  QuasarStyleEntries,
  setStyle,
  getActiveStyle
} from 'unocss-preset-quasar/styles'

QuasarPreset({ styles: QuasarStyleEntries }) // build time

setStyle('md2') // runtime
getActiveStyle() // 'md2'
```

Related: [Runtime Switching](/styles/scoping) · [`QuasarPresetOptions.styles`](/api/quasar-preset-options)
