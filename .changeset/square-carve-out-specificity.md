---
'unocss-preset-quasar': patch
---

Make the `--square` prop actually square the component.

`border-radius: 0` is declared by several components' square carve-outs, so
UnoCSS merges them into one rule —
`.q-btn-group--square,.q-field--square,.q-menu--square,…{border-radius:0}` —
and places it wherever its own sort decides. In the app build that merged rule
landed at offset 151011 while the base rules landed at 243361 and beyond. The
carve-outs and their bases sit in the same layer at equal specificity, so the
base's rounded token won: `square` rendered identical to `rounded` for
`q-menu` (`border-radius` stayed `var(--q-corner-extra-small)`), `q-field`,
`q-table`, `q-time`, `q-uploader`, `q-skeleton` and `q-btn-group`. Quasar's own
CSS orders each carve-out after its base, so the intended result is a squared
surface.

The carve-outs now carry a doubled class (`.q-menu.q-menu--square`, 0-2-0) and
therefore win wherever the merge lands, instead of depending on emission order.
`test/square-carve-out.test.ts` asserts the property directly and fails if a
carve-out is written in the unscoped form again. Four single-selector
divergences (`.q-btn-group--square`, `.q-chip--square`, `.q-menu--square`,
`.q-table--square`) are recorded in the parity baseline; `q-chip` keeps its
reference root radius on purpose and squares its avatar instead.
