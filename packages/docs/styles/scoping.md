# Runtime Switching

Switching styles is a body-class swap. No second preset, no duplicated component CSS, no reload — one rule tree, N variable blocks, and `setStyle()` flipping which block is live.

## The mechanism

```css
/* one shared rule tree … */
.q-btn { border-radius: var(--q-btn-radius); background: var(--q-btn-bg); }

/* … N value blocks, one per listed entry */
body                    { --q-btn-radius: 28px; --q-btn-bg: var(--q-primary); } /* baseline (md3) */
body.quasar-style-md2   { --q-btn-radius: 4px; }
body.quasar-style-unstyled { --q-btn-radius: 0; --q-btn-bg: transparent; }

/* dark is the same diff, stacked */
body.body--dark.quasar-style-md2 { … }
```

`setStyle(name)` removes any `quasar-style-*` class from `<body>` and adds `quasar-style-{name}`. The cascade resolves the new values; nothing is regenerated.

```ts
import { setStyle, getActiveStyle } from 'unocss-preset-quasar/styles'

setStyle('md3') // Material You
setStyle('md2') // classic Material
setStyle('unstyled') // structure only
getActiveStyle() // 'unstyled'
```

Both helpers are no-ops on the server (`typeof document === 'undefined'`), so they are safe to import in shared code.

## What has to be true

| Requirement                                   | Why                                                                                                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The entry was in the build-time `styles` list | An unlisted style ships no token block and no rules; `setStyle()` on it adds a class nothing matches — and silently stays on the baseline. A runtime helper cannot see build-time configuration. |
| You know the `name`                           | The class suffix is the entry's `name` field: `md3`, `md2`, `unstyled`, or your own                                                                                                              |
| Only one `quasar-style-*` class at a time     | `setStyle()` removes the others; if you manipulate `classList` yourself, keep the invariant                                                                                                      |

Built-in names:

| Entry             | Body class              | `setStyle()` argument |
| ----------------- | ----------------------- | --------------------- |
| `MaterialDesign3` | `quasar-style-md3`      | `'md3'`               |
| `MaterialDesign2` | `quasar-style-md2`      | `'md2'`               |
| `Unstyled`        | `quasar-style-unstyled` | `'unstyled'`          |

## Manual control

The class _is_ the API — anything that sets it works:

```html
<body class="quasar-style-md2"></body>
```

```ts
document.body.classList.replace('quasar-style-md3', 'quasar-style-md2')
```

`getActiveStyle()` reads it back (`null` when no style class is present — i.e. the baseline runs unnamed).

## Interaction with dark mode

Style and scheme are independent axes. `setStyle()` never touches `body--dark`; Quasar's Dark plugin never touches `quasar-style-*`. The preflight emits the intersection — `body.body--dark.quasar-style-md2` — so both combinations are always correct.

## Persistence across reloads

`setStyle()` is deliberately not persistence. Read the choice yourself and reapply it in your app's boot file:

```ts
const saved = localStorage.getItem('style') // 'md2' | 'md3' | 'unstyled'
if (saved) setStyle(saved)
```

Because the baseline (first entry) applies with _no_ class, an app that wants MD2 as the default should put it first in `styles` rather than relying on a boot-time `setStyle()` — there is one flash-free path and it is the baseline.

Related: [Styles & Scoping](/architecture/style-configuration) · [`/styles` API](/api/styles)
