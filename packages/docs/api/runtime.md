# `/runtime`

Two functions for re-deriving the palette after build. Both are client-side no-ops on the server.

```ts
import {
  applySourceColor,
  resetSourceColor
} from 'unocss-preset-quasar/runtime'
```

## `applySourceColor(sourceColor)`

```ts
function applySourceColor(sourceColor: string): void
```

Runs the same `generateColorTokens()` the build used against a new source color and writes the result onto `document.documentElement` as inline custom properties: the light-scheme roles and Quasar's alias set, under their `--q-*` names. Component rules read `--q-*` almost exclusively (~1,400 references vs. a couple of dozen `--light-*`), so the app recolors instantly through the CSS-var chain — no reload, no per-component JS, no stylesheet rebuild.

```ts
import { applySourceColor } from 'unocss-preset-quasar/runtime'

// a theme picker
applySourceColor('#6750A4') // purple palette
applySourceColor('#00695C') // teal palette
```

Details worth knowing:

- **Only color tokens are written.** Shape, typography, elevation, motion and component tokens belong to the active style and are untouched — this changes the palette, not the style.
- **Inline `:root` overrides beat the build-time block** in the light scheme. The dark scheme is _not_ re-derived: `--dark-*` roles and the `body.body--dark` `--q-*` overrides are stylesheet values from the build, so dark-mode surfaces keep the build palette (as do the few rules that read `--light-*` directly). For a palette that must follow in both schemes, apply the full theme instead: `setThemeColors(generateTheme(hex).colors)`.
- **Previous values are remembered** in a module-level map, so the next `resetSourceColor()` restores exactly what was there before the first call.

## `resetSourceColor()`

```ts
function resetSourceColor(): void
```

Restores every variable `applySourceColor()` overrode to its build-time value (or removes it, if it had none) and clears the memory. After reset, the page renders exactly as the build emitted it.

```ts
applySourceColor(randomHex()) // e.g. from a theme picker

resetSourceColor() // back to the build-time palette
```

## Choosing a runtime API

| Goal                                                         | Use                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| New palette from one color                                   | `applySourceColor(hex)` — `/runtime`                                           |
| Full control over every scheme variable from a `QuasarTheme` | `setThemeColors(theme.colors)` — [`/theme`](/api/set-theme-colors)             |
| Different design system (radii, type, elevation)             | [`setStyle()`](/styles/scoping) — a different _style_, not a different palette |
| Everything at build time                                     | `QuasarPreset({ sourceColor })`                                                |

`applySourceColor()` and `setThemeColors()` both override variables at runtime; they differ in input (one hex vs a complete theme object) and in target (`:root` vs `document.body`). Do not interleave them without re-applying — whichever ran last owns the variables it touches.

Related: [Theming & Tokens](/core/theming) · [Colors](/core/colors)
