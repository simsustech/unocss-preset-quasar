---
'unocss-preset-quasar': minor
---

**Breaking: single shared component tree driven by CSS-variable tokens; runtime style switching.**

- Remove per-style component trees (`md3/`, `md2/`, `unstyled/`). A style is now only a token
  stylespec: `{ name, tokens }` (see `QuasarStyleEntry`). One shared `styles/shared/` tree is
  the base for all styles; `md3`/`md2`/`unstyled` are pure token entries.
- Drop `tokens`/`scoped` preset options and `bodyClass` scoping. The preset option is now
  `styles?: QuasarStyleEntry[]`; tokens live under `theme.quasar.tokens`.
- Add `setStyle(name)` / `getActiveStyle()` exports from `unocss-preset-quasar/styles` for
  runtime CSS-variable swapping (body-class switch). Dark mode still uses the `--light-*` →
  `--dark-*` token swap via `body--dark`.
- Component tokens (e.g. `btnRadius`, `btnBg`, `btnTextTransform`) are emitted per style block;
  md2 vs md3 vs unstyled differences are expressed as token values, not duplicate trees.
- Elevation utilities now also accept Quasar's native `q-elevation-N` class names (in addition
  to `elevation-N`).
