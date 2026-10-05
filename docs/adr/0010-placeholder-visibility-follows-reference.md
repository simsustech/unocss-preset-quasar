# ADR 0010 — placeholder visibility follows the reference sheet

Status: accepted (2026-10-05)

## Context

Placeholder colour is decided in two places by the reference bundle, and both
had drifted:

1. **Hide only under a resting label.** `.q-field--labeled:not(.q-field--float)
.q-field__native::placeholder` (and the `__input` twin) — the only rules the
   reference declares for hiding.
2. **Restore otherwise.** `.q-placeholder::placeholder { color: inherit;
opacity: 0.7 }` — Quasar's `q-input`/`q-select` natives carry the
   `q-placeholder` class, so outside a resting label the placeholder takes the
   input's own colour at 0.7.

The preset deviated in both directions, on 2026-10-05:

- `components/field/rules.ts` emitted **unconditional** `.q-field__native::placeholder`
  and `.q-field__input::placeholder { color: transparent }` — both listed as
  parity _extras_. Probed on the harness fixture on 2026-10-05: a `DateInput`
  segment input computed `rgba(0, 0, 0, 0)`, and so did a stock `q-input`'s
  native — the two extras cover those selectors unconditionally, so any
  placeholder they matched was hidden regardless of state.
- `core/helpers/rules.ts` carried the restore as
  `rule(/^q-placeholder::placeholder$/, …)`. No extractor output or safelist
  entry ever produces a literal `q-placeholder::placeholder` candidate (the
  safelist contains zero `::` entries), so the matcher could never fire — the
  same defect family as `test/dead-matchers.test.ts`, which scans bare regex
  literals and missed this one because it sits inside `rule(…)`.

## Decision

- Unconditional `::placeholder` transparency is forbidden. Hiding happens only
  under `.q-field--labeled:not(.q-field--float)`, exactly as the reference
  declares.
- The restore is emitted from `components/field/rules.ts`, keyed on the
  producible `q-field` base via `symbols.selector`:
  `{ [symbols.selector]: () => '.q-placeholder::placeholder', color: 'inherit',
opacity: 0.7 }`. The matcher stays on a token the extractor produces; the
  pseudo lives in the emitted selector.
- The dead `core/helpers/rules.ts` matcher is deleted rather than safelisted: a
  safelist entry would pin a candidate that mirrors markup no consumer writes.

## Consequences

- Placeholders under the two removed extras are no longer forced transparent;
  `quasar-testing-harness/tests/date-input-placeholder.spec.ts` pins this from
  the consumer side (both tests green on 2026-10-05). Consumers pick the fix up
  on their next install of a release containing it — petboarding's own app was
  not re-run for this ADR.
- Consumer components whose natives lack `q-placeholder` — `DateInput`'s raw
  segment inputs — fall back to the UA default grey rather than the md3 token;
  `DateInput` styles its own segments with `--q-on-surface-variant` at 0.6 in
  `quasar-components`, which is a component concern, not a preset one.
- `parity-report.json` extras drop by two. Extras were never ratcheted, so
  `parity-baseline.json` is untouched.
