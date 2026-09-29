---
'unocss-preset-quasar': patch
---

Stop `.q-btn-group > .q-btn-item` from overriding its buttons' colour.

The rule carried `color: color-mix(in oklab, var(--light-on-surface) …)`, which
the reference does not have — Quasar's own rule is
`.q-btn-group > .q-btn-item { border-radius: inherit; align-self: stretch }` and
sets no colour at all.

That hardcoded surface colour only made sense while the base `.q-btn` painted no
fill. The MD3 and MD2 style entries fill it (`btnBg: var(--q-primary)` with
`btnColor: var(--q-on-primary)`), and this rule won on specificity — two classes
against `.q-btn`'s one — so grouped buttons rendered the primary fill with dark
on-surface text. Removing the declaration lets each button keep its own paired
tokens: `--q-btn-color` when filled, `inherit` in the unstyled entry, which is the
reference's behaviour.

The `align-self: stretch` in the same rule is kept; it is the reference's.
