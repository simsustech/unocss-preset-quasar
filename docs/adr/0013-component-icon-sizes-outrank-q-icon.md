# ADR 0013 — component icon sizes outrank `.q-icon` by specificity, not sheet order

Status: accepted (2026-10-05)

## Context

`icon/rules.ts` emits `.q-icon { font-size: var(--q-comp-icon) }` — a tokenised
default for every icon in the framework. Some components want a _smaller_ glyph
in icon mode: MD3's checkbox icon sits in an 18dp box, so `.q-checkbox__icon`
declares `font-size: 0.5em`. The same shape recurs in the radio and select
families.

Both selectors are a single class (0,1,0), so the outcome is decided by source
order. The reference gets what it wants because `quasar.css` writes `.q-icon`
early (line 129) and `.q-checkbox__icon` late (line 1012). Our sheet is generated
from an alphabetically ordered module array, so `.q-checkbox__icon` lands
_before_ `.q-icon` (block 17 against 55) and the tokenised default won: in icon
mode the glyph computed to 24px inside an 18px box and painted over the label.

## Decision

A component rule that must beat `.q-icon` carries one extra class. Here:
`.q-checkbox .q-checkbox__icon` (0,2,0), the same shape `.q-checkbox
.q-checkbox__bg` already uses. Specificity is preferred over reordering the
module array, which would shift every component's rules relative to each other;
emission order inside the preset is explicitly not a contract.

The reference's single-class yield **stays** next to the scoped twin.
`parity-coverage.test.ts` ratchets on the reference's selectors — dropping it
reports `checkbox missing: .q-checkbox__icon`. Both yields declare the same
0.5em, so the duplication is inert; it exists because two independent gates look
at different things, and each yield's literal needs its own `// quasar:` marker
(`no-role-literals.test.ts` scans per yield, not per file).

## Consequences

- Any future "the component sizes its own icon" rule needs the scoped selector;
  the single class alone loses to `.q-icon` whenever a component's module sorts
  before `icon`.
- Reviewers should not "simplify" the duplicated yields away: one satisfies
  parity, the other the cascade, and the comments say which is which.
- Guarded by `tests/rewrite-comprehensive.spec.ts` ("keeps the icon-mode glyph at
  its half-em size") and `tests/spec-conformance.spec.ts` (AUD-029).
