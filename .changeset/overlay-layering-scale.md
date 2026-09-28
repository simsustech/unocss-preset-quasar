---
'unocss-preset-quasar': minor
---

One overlay layering scale, and the overlay drawer moves under the app bar
(ADR 0007).

The preset owned every layer as unrelated numbers, and the reference's own
`.q-drawer--on-top: 7000` / `.q-drawer__backdrop: 6999` put an open mobile drawer
above `.q-header` (2000) and above `.q-dialog` / `.q-menu` (6000). A consumer
(petboarding) had to patch that out — and could not stop at one patch: raising
the header to `7100` then covered dialogs, so dialogs went to `7200`. Two
`!important` bumps, each forcing the next, recorded only in one app's `<style>`
block.

| selector | was | now |
|---|---|---|
| `.q-drawer--on-top` | 7000 | **1500** |
| `.q-drawer__backdrop` | 6999 | **1499** |
| `.q-page-sticky` | 7000 | **1400** |

Everything else stays: in-flow `.q-drawer` 1000, marginals 2000 (opener 2001),
menus and dialogs 6000, `z-top` 7000, tooltip 9000, notify/loading 9499/9500,
ajax bar and `.z-max` 9998. The contract, in edges: overlay drawer < marginals <
menus/dialogs, overlay drawer > floating content, so an open drawer can no longer
cover the app bar or a dialog, and a modal drawer still blocks a floating action
button. `.q-page-sticky` at 7000 was above dialogs — and the reference carries no
z-index for that selector at all.

`docs/adr/0007-overlay-layering-scale.md` states the scale and why the
alternative (raising the header, as consumers did) was rejected.

Parity: the gate is declaration-level for finished modules, so `drawer` leaves
`target: 0` and records two declared divergences
(`.q-drawer--on-top|z-index`, `.q-drawer__backdrop|z-index`) in
`parity-baseline.json`. The ratchet still fails on any *new* drawer gap; only
the "gap-free" assertion for that module is dropped, because the ordering is now
a decision rather than a port.
