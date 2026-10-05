---
'unocss-preset-quasar': patch
---

fix(preset): drop the invented `display: flex` from `.q-card`

Stock Quasar 2.34 states no `display` for `.q-card`
(`quasar/dist/quasar.css`, `.q-card` block) and neither does the reference
bundle. The flex made every `q-card__section` a flex item, whose used size is
definite — so descendants' percentage heights resolved instead of deferring to
content height. petboarding's PetChip carries an inline `height: 100%` (so long
names wrap) and filled its container instead of sizing to its content: the
"PetChips expand to full height" regression on the KennelLayout page.

`.q-card--horizontal` and `.q-card__actions` keep their flex declarations —
only the base rule's `display`/`flex-direction` were removed.

Recorded in ADR 0014; guarded by `tests/q-card-percentage-height.spec.ts` in
quasar-testing-harness (md3/md2/unstyled) and the chip-height assertion in
petboarding's `kennelLayout` e2e.
