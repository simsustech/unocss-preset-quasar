---
'unocss-preset-quasar': patch
---

Fix the QTable `square` and `flat` carve-outs (BUG-064, BUG-083). Both named a
class the card element does not carry. The `square` carve-out expanded to
`.q-table.q-table--square`, but the element is
`.q-table__container … .q-table__card .q-table--square` with no bare `.q-table`,
so the rule never matched anything. And `.q-table--flat` (0,1,0) only tied with
`.q-table__card` (0,1,0), so the base won on UnoCSS's intra-layer emission
order.

Measured live on the SSG build: `.q-table__card` kept `border-radius: 4px` with
`square=true`, and its default `box-shadow` with `flat=true` — `square` and
`flat` rendered identical to defaults.

The carve-outs now name the card — `.q-table__card.q-table--square`, and
`.q-table--flat,.q-table__card.q-table--flat` (the bare selector is kept so the
reference-parity ratchet still sees it) — so they match the real element and win
on specificity rather than emission order. Verified live: `border-radius: 0px`
with `square=true`, `box-shadow: none` with `flat=true`.
