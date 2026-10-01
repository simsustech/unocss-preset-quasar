# Configuration

Every option `QuasarPreset()` accepts, what it changes, and its default. Full type definitions: [`QuasarPresetOptions`](/api/quasar-preset-options).

```ts
import { QuasarPreset } from 'unocss-preset-quasar'
import { QuasarStyleEntries } from 'unocss-preset-quasar/styles'
import { mdiSet } from 'quasar/icon-set'

QuasarPreset({
  styles: QuasarStyleEntries,
  sourceColor: '#1976d2',
  plugins: ['Dialog', 'Notify'],
  iconSet: mdiSet,
  appExtensions: ['qmarkdown']
})
```

## `styles` / `style` — required

The styles that ship, as token entries. **The first entry is the baseline**; the rest become runtime-switchable `body.quasar-style-{name}` blocks.

```ts
import {
  MaterialDesign3,
  MaterialDesign2,
  Unstyled,
  QuasarStyleEntries // [md3, md2, unstyled]
} from 'unocss-preset-quasar/styles'
```

| Value            | Meaning                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `styles: [A, B]` | A is baseline; B ships as a switch block                                |
| `style: A`       | Shorthand for `styles: [A]` (ignored if `styles` is given)              |
| neither          | **throws** — a default would ship dead CSS or make `setStyle()` a no-op |

Each entry is `{ name, tokens, rules? }`. Custom entries override individual tokens of a built-in — see [Styles & Scoping](/architecture/style-configuration).

## `sourceColor`

Hex color that drives the Material 3 tonal palette — primary, secondary, tertiary, error, surfaces, containers — for both light and dark schemes.

**Default:** `'#1976d2'`

```ts
QuasarPreset({ styles: QuasarStyleEntries, sourceColor: '#6750A4' })
```

To change it after build, use [`applySourceColor()`](/api/runtime).

## `plugins`

Quasar plugin names whose runtime-generated UI must be safelisted. Keep this list in sync with `framework.plugins` — only the UI-generating five affect CSS:

| Plugin        | Safelisted roots                          |
| ------------- | ----------------------------------------- |
| `Dialog`      | `q-dialog`                                |
| `Loading`     | `q-loading`                               |
| `LoadingBar`  | `q-loading-bar` + four position variants  |
| `Notify`      | `q-notification`, `q-notifications`       |
| `BottomSheet` | `q-bottom-sheet` + list/grid/avatar parts |

All other Quasar plugins (`Dark`, `Platform`, `Screen`, …) generate no DOM and cost nothing whether listed or not. Details: [Plugins](/plugins/overview).

**Default:** `[]`

## `iconSet`

Quasar's icon set object (`framework.iconSet`, e.g. `mdiSet` from `quasar/icon-set`). Every `i-*` class in the set joins the safelist — Quasar's internal components (a table's expand chevron, a select's arrow) request icons that no markup mentions.

**Default:** omitted — icons then appear only where markup or literal values name them.

## `appExtensions`

Third-party Quasar libraries whose CSS the preset ports. Declared libraries ship their CSS; undeclared ones ship nothing.

```ts
appExtensions: ['qcalendar', 'qmarkdown', 'qmediaplayer']
```

**Default:** `[]` — output is byte-identical to a preset without the ports. See [App Extensions](/app-extensions/overview).

## `presetIcons`

Options forwarded to `@unocss/preset-icons`. The preset always registers the plugin (Quasar's runtime-composed icon classes depend on it); pass options to customize behavior.

**Default:** `{}`

## `presetWebFonts`

Options forwarded to `@unocss/preset-web-fonts`.

**Default:**

```ts
{ provider: 'bunny', fonts: { roboto: 'Roboto' } }
```

```ts
QuasarPreset({
  presetWebFonts: {
    provider: 'google',
    fonts: { roboto: 'Roboto:400,500,700' }
  }
})
```

## Using wind4 as well

The nested engine is `preset-mini`. To add wind4's vocabulary:

```ts
import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'
import presetWind4 from '@unocss/preset-wind4'

presets: [
  presetWind4({ ...quasarWind4Options }),
  QuasarPreset({ styles: QuasarStyleEntries })
]
```

`quasarWind4Options` disables wind4's base reset and points its `dark:` variant at Quasar's `.body--dark` class. Keep `QuasarPreset()` in the array in any position — it carries `enforce: 'post'`, so Quasar-owned class names stay its own. Full rationale: [Rule Assembly](/architecture/rule-assembly).

## Runtime style switching

```ts
import { setStyle } from 'unocss-preset-quasar/styles'

QuasarPreset({ styles: QuasarStyleEntries }) // build time
setStyle('unstyled') // runtime — one class swap
```

Details and edge cases: [Runtime Switching](/styles/scoping).
