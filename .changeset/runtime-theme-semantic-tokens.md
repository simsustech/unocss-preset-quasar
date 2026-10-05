---
'unocss-preset-quasar': patch
---

fix(theme): `setThemeColors` restates the semantic `--q-*` tokens so a runtime theme reaches components

The token preflight states `--q-*` as literals, so `setThemeColors()` writing only
the `--light-*` / `--dark-*` primitives left every component on the build-time
palette: a runtime source color (the `themeColors` option, a runtime
`setThemeColors(...)` call) never appeared, and the default scheme always won.

`setThemeColors` now also emits the semantic tier into one injected stylesheet:
the light roles on `:root` and the dark roles scoped to `body.body--dark` — an
inline value on `document.body` cannot be conditional on the dark body class.
The `--light-*` / `--dark-*` / scalar primitives are still written, unchanged.
