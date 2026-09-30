---
'unocss-preset-quasar': patch
---

An active tab's label takes the palette colour in the light scheme too.

The preset already stated the colour — `.q-tab--active { color: var(--q-primary) }`,
merged into one block with its `.body--dark` twin — but it never won the cascade.
Plain `.q-tab--active` is 0,1,0, exactly like the base `.q-tab { color: inherit }`
(dist's value) that the sheet emits *later*, so the inherited page colour won and
the label computed `rgb(0, 0, 0)` on a transparent background. In dark it worked,
because `.body--dark .q-tab--active` carries an extra class and outranks the base.

Measured on `/admin/payments` before the change: the active rail item's label
`rgb(0, 0, 0)` with `--q-primary: #00658f`, so the only selected affordance was the
indicator pill (56×32, radius 16px, `oklab(0.9126 -0.0133 -0.0267)`, opacity 1).
After: `rgb(0, 101, 143)` — the palette value — with the pill byte-identical.

The rule now carries both classes (`.q-tab.q-tab--active`, 0,2,0), so it wins
wherever the sheet places it — the same two-class idiom as the reference's
`.flex.inline` companion. The pill is untouched and stays as the deliberate MD3
deviation from Quasar's 3 dp tab indicator.

Covered by the new `test/tab-active.test.ts`, which asserts the two-class selector
states `var(--q-primary)`, that the inactive tab still inherits (dist's value), and
that the pill keeps its geometry and its `--q-secondary-container` fill — including
its `.body--dark` override.
