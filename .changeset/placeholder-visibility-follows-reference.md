---
'unocss-preset-quasar': patch
---

fix(preset): stop hiding placeholders unconditionally, emit the q-placeholder restore

`field/rules.ts` emitted `.q-field__native::placeholder` and
`.q-field__input::placeholder { color: transparent }` with no condition — both
`.q-field--labeled:not(.q-field--float)`. Probed on the harness fixture on
2026-10-05: a `DateInput` segment input and a stock `q-input`'s native both
computed `rgba(0, 0, 0, 0)` for `::placeholder` — the two extras matched them
unconditionally (petboarding's `PetForm` is where it was first reported).

The restore that was meant to balance them, `.q-placeholder::placeholder {
color: inherit; opacity: 0.7 }`, sat in `core/helpers/rules.ts` behind a
`/^q-placeholder::placeholder$/` matcher that can never fire — no extractor
output or safelist entry produces a literal `::` candidate (the same defect
family as `dead-matchers.test.ts`, which scans bare regex literals and misses
matchers wrapped in `rule(…)`).

Both unconditional extras are deleted and the restore is re-emitted from the
`q-field` rule family via `symbols.selector`, keyed on the producible base.
Recorded in ADR 0010; guarded by
`quasar-testing-harness/tests/date-input-placeholder.spec.ts`.
