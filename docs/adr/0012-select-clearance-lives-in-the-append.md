# ADR 0012 — the select's right-side clearance lives in the append row

Status: accepted (2026-10-05)

## Context

`components/select/rules.ts` reserved the dropdown arrow's clearance twice:
`padding-right: 48px` on `.q-select .q-field__native` **and** on
`.q-select .q-field__input`. The input sits inside the native's content box, so
the two paddings stacked — 96px of dead space on the right of the input — and
the arrow was additionally pulled out of flow (`position: absolute;
right: 12px; top: 50%`), which is why the flow had to reserve that space by
hand in the first place.

Measured on the petboarding app (Playwright, 2026-10-05): at a 320px viewport
with a value selected, the field box was 200px → native 138px → input 90px →
**42px of usable text area**, so typing scrolled after ~2 characters; at 375px
the text area was 87–123px. The report was "the input of QSelect in mobile view
is too small".

Neither reservation exists upstream. `quasar@2.34.0`
(`src/components/select/QSelect.sass`, `dist/quasar.css`) ships
`.q-select .q-field__input { min-width: 50px !important; cursor: text }`, no
`padding-right` on either selector, and the arrow as a normal child of the
append row carrying only
`.q-select__dropdown-icon { cursor: pointer !important; transition: transform 0.28s }`.

The reference bundle (`specs/reference/raw/reference-bundle.css.txt`) _does_
carry both paddings, so the parity ratchet enforces this defect rather than
catching it: a future parity sweep will propose re-adding them unless the
decision is written down.

## Rationale

Clearance for a right-side marginal is a layout fact, not a padding: the
control already pads `0 12px` (`components/field/rules.ts`), which puts the
in-flow arrow's right edge exactly the 12px from the control's edge that
`right: 12px` used to state — and it does so without the flow also paying for
the arrow's width twice. With the arrow in flow there is no centering
declaration on it either, so `.rotate-180` (toggled by Quasar on open) simply
rotates it in its own box.

## Decision

The select's right-side clearance comes from the in-flow append row. The select
rule family reserves no `padding-right` on `.q-field__native` or
`.q-field__input`, and does not position `.q-select__dropdown-icon`.

Scope: the select component only. The field family's own paddings, the
`--padding` modifier's `padding-left`, and every other component are untouched.

## Consequences

- `components/select/rules.ts`: the `.q-select .q-field__native` padding yield is
  deleted, the input yield keeps upstream's `min-width: 50px !important` and
  `cursor: text` without the `padding-right`, and the arrow's positioning yield
  (with the ADR 0009 `translate: 0 -50%` instance) is deleted. The arrow keeps
  the cursor/transition yield, which matches the reference exactly.
- Guards: `test/select-text-area.test.ts` (new — no `padding-right` on either
  selector, upstream's two declarations still emitted) and
  `test/select-dropdown-icon.test.ts` (rewritten — the icon block must not carry
  `position:absolute`, `right:12px` or `translate:`, must still carry the
  cursor/transition pair, and `.rotate-180` must still reach it).
- Parity: the ratchet records the deliberate divergence as select `target: 2` —
  missing `.q-select .q-field__native`, absent
  `.q-select .q-field__input|padding-right` — in
  `test/fixtures/parity-baseline.json`. A green ratchet therefore means "no
  _new_ gap", not "the reference's paddings are back". Do not re-add them to
  silence the two entries.
- ADR 0009's rule (`translate`, not `transform`, for centering on a
  utility-toggled element) stands for future sites; its select instance is gone
  with the positioning yield.
- Rendered coverage: the existing `q-select` describe in
  `quasar-testing-harness/tests/preset-fixes.spec.ts` still measures the arrow's
  dx/dy against the control across md3/md2 × default/use-input. A rendered guard
  that asserts the _text area_ width at a mobile viewport (the user-visible
  symptom) is the follow-up this change owes; it could not be written with the
  preset-only change set and is handed off.
- Consumers on the published `0.6.0` keep the old behaviour until this is
  released and their pin is bumped.
