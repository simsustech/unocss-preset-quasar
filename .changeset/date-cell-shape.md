---
'unocss-preset-quasar': patch
---

fix(preset): keep QDate's day cell and year buttons square under the button floor

A calendar day cell is a *date*, not an action button. Quasar's own
`quasar.css` and the local reference bundle both size it `30x30` with a `50%`
radius (a circle), and the year selector's buttons `60x30`. `width` and `height`
lose to `min-width`/`min-height`, so the preset's button floor leaked into both
boxes: `1ed9f77` raised `.q-btn` / `.q-btn--dense` `min-height` from the
2em/2.572em of dist to `var(--q-control-height)` (48px), and md2's `.q-btn`
carries `min-width: var(--q-btn-min-width)` (64px) for its spec's 64dp action
buttons. The day cell therefore rendered `30x48` in md3 (a tall ellipse) and
`64x48` in md2, and the year button `60x48` — reported as an oval today ring in
petboarding.

`date/rules.ts` now restates the square on the component's own rules — day cell
`min-width`/`min-height: 30px`, year button `min-width: 60px; min-height: 30px` —
so neither floor reaches a date selector. `30x30` is Quasar's and the reference's
own value (kept where previous commits pinned it as "Quasar's own"), not a
Material date-picker redline: the component reproduces Quasar's geometry, and the
fix only restores what the 48dp raise broke.

Guarded by `test/date-cell-shape.test.ts` and, in the consumer's configuration,
`quasar-testing-harness/tests/date-cell-shape.spec.ts` (day cell and year button
in md3, md2 and unstyled).
