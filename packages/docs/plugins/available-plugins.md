# Available Plugins

Every Quasar plugin, and whether it affects CSS. The list is short on purpose: five plugins generate DOM, and those are the only ones the safelist knows.

## UI-generating plugins (safelisted)

### `Dialog`

```ts
plugins: ['Dialog']
```

Safelists `q-dialog`. The dialog rule yields the rest itself — `__backdrop`, `__inner` and its maximized/bottom variants, nested `.q-card` adjustments. Covers `$q.dialog()` and `$q.bottomSheet()`-style card dialogs.

### `Notify`

```ts
plugins: ['Notify']
```

Safelists `q-notification` and `q-notifications`. The notification rule yields `__message`, `__caption`, `__icon`, `__avatar`, `__spinner`, `__actions`, `__badge`, `__progress`, position variants, and the enter/leave animation classes.

### `Loading`

```ts
plugins: ['Loading']
```

Safelists `q-loading` — the backdrop, box and message follow from the rule. Sits in the 9500 z-index tier.

### `LoadingBar`

```ts
plugins: ['LoadingBar']
```

Safelists `q-loading-bar` with `--top`, `--bottom`, `--left`, `--right`. This is the QAjaxBar sheet, driven by the LoadingBar plugin (band 9998).

### `BottomSheet`

```ts
plugins: ['BottomSheet']
```

Safelists `q-bottom-sheet`, `__avatar`, `__item`, `__empty-icon`, `--list`, `--grid` — the list/grid modes render from the plugin API with no template hint.

## Non-UI plugins (no CSS effect)

These create no DOM, so listing them is harmless and omitting them is equally fine — the safelist lookup simply finds nothing:

`AddressbarColor`, `AppFullscreen`, `AppVisibility`, `Cookies`, `Dark`, `LocalStorage`, `Meta`, `Platform`, `Screen`, `SessionStorage`

Two of them deserve a note despite being CSS-inert:

- **`Dark`** — its visual effect is entirely the `body--dark` class, which the token preflight and the engine's `dark:` variant already respond to.
- **`Platform` / `Screen`** — they _set_ body classes (`desktop`, `mobile`, `touch`, `platform-ios`, …) that the [Input & Platform](/core/input-platform) utilities and the `--q-size-*` breakpoints read. The classes are safelisted as part of the base list, not per plugin.

## Recommended configuration

```js
const plugins = [
  // UI-generating — keep in sync with QuasarPreset({ plugins })
  'BottomSheet',
  'Dialog',
  'Loading',
  'LoadingBar',
  'Notify',

  // harmless either way
  'Dark',
  'Platform',
  'Screen'
]

QuasarPreset({ styles: QuasarStyleEntries, plugins })
// framework: { plugins }
```

See [Plugins Overview](/plugins/overview) for the mechanism and the sync rule.
