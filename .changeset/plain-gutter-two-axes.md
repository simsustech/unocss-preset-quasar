---
'unocss-preset-quasar': patch
---

fix(preset): give the plain gutter class its second axis back

`q-gutter-md` / `q-col-gutter-md` emitted `column-gap` only. Quasar states the plain class on
both axes (`.q-col-gutter-md` → `margin-left: -16px; margin-top: -16px` on the container plus
`padding-left: 16px; padding-top: 16px` on every child), so the vertical half was missing: in a
wrapping grid the items got a 16px channel sideways and **0px between rows** — pet cards in
petboarding's pets grid touched vertically while sitting 16px apart horizontally (measured
2026-10-06). The plain matcher now yields `column-gap` and `row-gap` together; `-x-`/`-y-` keep
their single axis. The gap pair rather than the negative-margin pair because it preserves the
current edge alignment: margins would bleed card backgrounds 16px outside the page padding.
