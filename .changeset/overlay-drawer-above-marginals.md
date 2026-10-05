---
'unocss-preset-quasar': patch
---

fix(preset): let the overlay drawer win the stack against both marginals

`.q-drawer--on-top` moves from `z-index: 1500` to **3000** and
`.q-drawer__backdrop` from `1499` to **2999** (`!important` kept) — the values
`quasar.css` already uses, below the dialog tier (6000).

The drawer's box spans the full viewport height (`Md3Layout` lays its shell out
as `view="lHh Lpr lFf"`, so Quasar skips the `top` offset it gives a drawer
outside the header row), so at 1500 both marginals painted over it: the app bar
covered the drawer's own close button and the fixed bottom nav covered its last
nav item — neither visible to the pointer nor tappable on a phone.

What is deliberately *not* taken from the reference bundle is its 7000, which
sits above `.q-dialog`; that is the half consumers had to patch out.

Recorded in ADR 0007 (amended) and guarded by
`drawer-backdrop.test.ts` ("outranks the app bar and the bottom nav, and stays
under dialogs") plus `tests/md3-layout.spec.ts` in the harness.
