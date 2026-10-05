# ADR 0014 — `.q-card` carries no `display`

Status: accepted (2026-10-05)

## Context

The preset's base `.q-card` rule declared `display: flex; flex-direction:
column` — an invented divergence. Stock Quasar states no `display` for
`.q-card` (`node_modules/quasar/dist/quasar.css`, `.q-card` block: padding,
border-radius, vertical-align, background, position — nothing else), and the
reference bundle agrees (`specs/reference/raw/reference-bundle.css.txt`,
`.q-card{padding:16px;…}` with no `display`).

The divergence was not free. Making the card a flex container turns every
`q-card__section` into a flex item, and a flex item's used size is definite —
so descendant percentage heights **resolve** instead of falling back to content
height. petboarding's `PetChip` sets an inline `height: 100%` on its `q-chip`
(deliberately, to defeat the fixed `height: 32px` and let long names wrap, see
petboarding commit `5312889f2`). Under block-card CSS that percentage resolves
against nothing and the chip sizes to its content; under flex-card CSS the chip
filled its container — the "PetChips expand to full height of the container"
regression on the KennelLayout page. A/B toggling `display` on the live page
flipped the same chip between 92px (fill) and 20px (content).

## Decision

The base `.q-card` rule declares no `display` and no `flex-direction`.
Sections stack as blocks, exactly as stock Quasar lays them out. The comment in
`packages/preset/src/components/card/rules.ts` records both sources; this ADR
records the reason.

## Consequences

- Percentage heights inside a card fall back to content height whenever the
  containing chain declares no definite height — consumers such as
  petboarding's `PetChip` (`height: 100%`) depend on that fallback and need no
  app-side override.
- Margin collapsing inside cards behaves like stock; nothing in the repo or in
  petbooking relies on the flex layout for spacing (no `margin-top: auto`
  consumers were found at the time of the decision).
- `.q-card--horizontal` keeps `flex-direction: row` and `.q-card__actions`
  keeps its flex declarations — those are component structure, not the base
  card. Only the base rule's `display`/`flex-direction` were removed.
- `tests/q-card-percentage-height.spec.ts` in quasar-testing-harness guards
  this: a chip with `height: 100%` in a `min-height` card section must stay
  content-height across md3, md2 and unstyled.
