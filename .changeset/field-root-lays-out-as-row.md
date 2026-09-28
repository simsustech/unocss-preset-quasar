---
'unocss-preset-quasar': patch
---

Lay the field root out as a row, so `__before`/`__after` sit beside the inner.

`.q-field` (and `.q-select`, which is the same element) was emitted with
`flex-direction: column`. Quasar's own sheet sets no flex-direction on the root
at all — the root carries `row no-wrap items-start`, and its children are
`__before`, `__inner`, `__after`: siblings. With `column` every marginal stacked
above `__inner`, so a field with a `#before` slot grew a second row: on
petboarding's `/employee/labels/pets` the search field measured 112px tall with
its control's centre 28px below the print button's, and the toolbar grew with
it. Declaring `row` matches what `.row` already resolves to; no other field
changes, because without a marginal the single child lays out the same either
way (measured across 19 petboarding routes: only the labels field was affected).
