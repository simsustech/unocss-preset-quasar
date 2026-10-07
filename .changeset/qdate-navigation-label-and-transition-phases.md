---
'unocss-preset-quasar': patch
---

Fix the clipped QDate month label: the nav arrows take the reference's 2.4em
(24px) instead of the preset's 48dp dense-round floor, which had starved the
month column (26px md3 / 0px md2 → `ctob`), and a `flat dense` button now takes
`--dense`'s padding — UnoCSS emits the entries of one rule in selector order, so
`--dense` sorted before `--flat` and inverted the reference's flat-before-dense
order. Also emit the six transition phases for a transition family in a
component's vocabulary, so QDate's runtime-composed month slide and label jump
stop doubling the day numbers: the leaving grid took `-leave-active` but never
`-leave-to`, so its `transform` stayed `none` and it painted on top of the
entering grid.
