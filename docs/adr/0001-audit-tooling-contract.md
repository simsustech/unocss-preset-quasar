# ADR 0001 — the audit tooling contract

**Status:** accepted · **Context:** the rule audit needed evidence that cannot
rot, and a completion criterion that can fail.

## Decision

Three committed scripts, each a gate with a rationale-bearing ledger (the third was
added 2026-09-29):

1. `packages/preset/scripts/audit-vocabulary.mjs` — matcher tokens versus the
   scraper vocabulary. **Gate:** zero unknown tokens. Runtime-applied classes
   (the ripple directive's modifiers) are allowlisted _with a reason_.
2. `specs/audit/coverage-sweep.mjs` — classes dist styles that the sheet never
   emits. **Gate:** every flagged class has a disposition row in
   `specs/audit/DISPOSITION.md`; the script fails on an undispositioned one.
3. `specs/audit/md2-value-sweep.mjs` — **added 2026-09-29.** Declarations where
   `quasar/dist/quasar.css` states an absolute value while this sheet routes it
   through something that varies by style, and geometry where dist keeps two
   dimensions equal (a circle) while this sheet's two dimensions resolve
   differently (an ellipse). **Gate:** every divergence names a bucket of the
   audit's authority model (`spec-declared`, `dist-only`, `invariant`,
   `palette-driven`, `preset-policy`); the script exits 1 on an undispositioned
   one. This is item 2's contract applied to _values_ instead of _classes_, and it
   exists because that gap was real: AUD-MD2-001 (a floated label overlapping its
   value) is invisible to a coverage sweep — the class was present and correct,
   only the value was wrong.

All three replaced `/tmp` worklists. The audit's original sweep lived in a scratch
file and treated "no _new_ flag" as success, which passes on pre-existing residue
(`float-left`, `inset-shadow`, `q-link--focusable`) — the exact classes the audit
was looking for.

## Consequences

- A fix is done when the flag disappears _and_ the row records the commit.
- `q-tree__vnode--*` and the eight `PENDING_MERGE` AUD-024 sites are visible as
  work, not as silence.
- The scripts must be run after a preset build; a stale bundle makes a real fix
  look broken (learned the hard way during the run).
