# ADR 0009 — center with individual transform properties on utility-toggled elements

Status: accepted (2026-10-05)

## Context

`.q-select__dropdown-icon` was centred with `transform: translateY(-50%)`.
Quasar adds `.rotate-180` to that same element when the menu opens, and the
utility's full `transform` stack lands in the `default` band — after this
preset's `quasar.components` band — so on equal specificity it _replaced_ the
centring entirely. Measured on the harness: the arrow sat 12px (md3, 24px
icon) / 16px (md2, 32px icon) below the control's centreline for as long as the
menu was open, and snapped back on close.

That band ordering is deliberate — the layers note in
`packages/preset/src/index.ts` (~line 328) spells it out: utilities are
supposed to win over component rules on equal specificity, which is what makes
`bg-*`, `text-*` and friends work from anywhere. The bug was never the
ordering; it was putting a geometric invariant on the one CSS property a
utility is allowed to overwrite wholesale.

## Rationale

`transform` is a shorthand: any declaration of it — from a component rule or
from `.rotate-180` — replaces the entire transform list, so a centring
`translateY(-50%)` and a utility rotation cannot coexist on it no matter which
band wins. The individual properties `translate`, `rotate`, and `scale` are
independent slots; they compose in any order, and each survives declarations
of the others. The reference behaves the same way — it emits
`.rotate-180 { rotate: 180deg }` as an individual property — which is why the
reference never had this defect.

## Decision

Any rule that centres an element which can also receive a Quasar or UnoCSS
transform utility (`rotate-*`, `scale-*`, `translate-*`) expresses that
centring with the individual `translate` property — `translate: 0 -50%`, not
`transform: translateY(-50%)`.

Scope: centring on utility-toggled elements only. The other
`transform: translateY(-50%)` sites in this preset (fab, range, slider,
carousel, …) sit on elements no utility toggles today; they are correct as
written and are deliberately untouched — converting them would be churn, not a
fix. If Quasar ever puts a transform utility on one of those elements, that
site converts under this ADR.

## Consequences

- `packages/preset/src/components/select/rules.ts` centred with
  `translate: 0 -50%`; `test/select-dropdown-icon.test.ts` pins the emitted
  sheet (the positioning block must carry `translate` and must not carry
  `transform:`), and `quasar-testing-harness/tests/preset-fixes.spec.ts` pins
  the rendered geometry across the menu's open/close/re-close cycle.
- A future explorer who reaches for `transform: translateY(-50%)` for
  consistency with the untouched sites should read this ADR first; the
  inconsistency with fab/range/slider is the scope boundary, not drift.
- The unit test's shape — reject `transform:` inside a positioning block that
  must coexist with `.rotate-180` — is reusable for any newly toggled element.
