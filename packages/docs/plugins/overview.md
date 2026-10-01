# Plugins Overview

Quasar plugins that generate UI do it at runtime — `$q.dialog()` injects markup no template mentions, so UnoCSS's scanner never sees its classes. The preset closes that gap with per-plugin safelist entries, gated by the same rule as everything else: declare what you use.

```ts
QuasarPreset({
  styles: QuasarStyleEntries,
  plugins: ['Dialog', 'Notify', 'Loading', 'LoadingBar', 'BottomSheet']
})
```

## What actually happens

Only five plugins affect CSS. Each contributes the **root classes its rules key on**; the rule then yields the family (`q-dialog__inner`, `q-notification__message`, …) itself:

| Plugin        | Safelisted roots                                                           | Why it cannot be scanned         |
| ------------- | -------------------------------------------------------------------------- | -------------------------------- |
| `Dialog`      | `q-dialog`                                                                 | Created by `$q.dialog()`         |
| `Notify`      | `q-notification`, `q-notifications`                                        | Created by `$q.notify()`         |
| `Loading`     | `q-loading`                                                                | Created by `$q.loading()`        |
| `LoadingBar`  | `q-loading-bar` + `--top/--bottom/--left/--right`                          | Mounted by the LoadingBar plugin |
| `BottomSheet` | `q-bottom-sheet`, `__avatar`, `__item`, `__empty-icon`, `--list`, `--grid` | Created by `$q.bottomSheet()`    |

Everything else Quasar calls a plugin (`Dark`, `Platform`, `Screen`, `LocalStorage`, …) manipulates no DOM of its own. Listing or omitting them changes nothing in the CSS output.

## Match both arrays

A plugin used through its API must appear in **both** places, or it works with missing styles:

```ts
// 1. CSS side — safelist
QuasarPreset({ styles: QuasarStyleEntries, plugins })

// 2. JS side — functionality
framework: {
  plugins
}
```

::: tip One shared array
Define `const plugins = [...]` once and pass it to both. The two lists drifting apart is the classic failure mode, and it fails silently — the dialog opens, unstyled.
:::

## Why safelist only the roots

Safelist entries are unconditional CSS — every entry ships whether or not the app renders it. Component markup, by contrast, is _derived_: the component extractor gives `<QCard>` its full vocabulary the moment the template mentions it, and rules yield their own sub-selectors. The safelist carries only what has no signal at all: the root class of a plugin-opened element.

Full mechanism: [Extraction & Safelisting](/architecture/extraction).
