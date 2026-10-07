---
'unocss-preset-quasar': patch
---

Fix the oversized QEditor toolbar buttons: the toolbar's dense flat icon buttons
took the preset's global 48dp button floor (and md2's 64px `.q-btn` min-width),
so each rendered 20.6x48 (md3) / 64x48 (md2) and the wrapping toolbar grew to
73px on desktop and 305px on a 390px phone. A component-scoped
`.q-editor__toolbar .q-btn` carve-out restores the reference's `.q-btn--dense`
metric (`min-height: 2em`, `min-width: auto`), leaving the 48dp floor intact
everywhere else.
