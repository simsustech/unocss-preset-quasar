# ADR 0001 — the audit tooling contract

**Status:** accepted · **Context:** the rule audit needed evidence that cannot
rot, and a completion criterion that can fail.

## Decision

Two committed scripts, each a gate with a rationale-bearing ledger:

1. `packages/preset/scripts/audit-vocabulary.mjs` — matcher tokens versus the
   scraper vocabulary. **Gate:** zero unknown tokens. Runtime-applied classes
   (the ripple directive's modifiers) are allowlisted _with a reason_.
2. `specs/audit/coverage-sweep.mjs` — classes dist styles that the sheet never
   emits. **Gate:** every flagged class has a disposition row in
   `specs/audit/DISPOSITION.md`; the script fails on an undispositioned one.

Both replaced `/tmp` worklists. The audit's original sweep lived in a scratch
file and treated "no _new_ flag" as success, which passes on pre-existing residue
(`float-left`, `inset-shadow`, `q-link--focusable`) — the exact classes the audit
was looking for.

## Consequences

- A fix is done when the flag disappears _and_ the row records the commit.
- `q-tree__vnode--*` and the eight `PENDING_MERGE` AUD-024 sites are visible as
  work, not as silence.
- The scripts must be run after a preset build; a stale bundle makes a real fix
  look broken (learned the hard way during the run).
