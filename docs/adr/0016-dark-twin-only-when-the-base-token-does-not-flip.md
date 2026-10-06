# ADR 0016 — a dark twin only exists when the base token does not flip

Status: accepted (2026-10-06)

## Context

The reference bundle carries a `.body--dark <component>` companion for several component
backgrounds — `.body--dark .q-badge`, `.body--dark .q-date__event`. The reason is visible in the
reference's own base rule: `.q-badge { background-color: color-mix(in oklab, var(--light-primary)
…) }`. `--light-primary` is a _scheme-scoped_ variable: it holds the light value in both schemes,
so without the twin an uncoloured badge would stay on the light primary once `.body--dark` was
set. The twin is how the reference gets its dark fill.

This preset's base reads `var(--q-primary)` instead — a token the dark token block redefines
(`body.body--dark { --q-primary: … }`) — so the twin restates what the base already does. It
looked harmless. It was not: the twin carries an extra class, so at (0,2,0) it outranked every
`bg-*` utility (0,1,0) regardless of sheet order. In dark mode, a `bg-green` status badge rendered
primary. Measured end-to-end in petboarding's dark sweep (2026-10-06): all five dots of a status
legend — approved, canceled, pending, rejected, standby — came out `#4cd9df`, and the same
collapse covered the app's 13 coloured QBadges (pet chips, vaccination badges, agenda chips).

Light mode was never affected, which is why the bug survived every light-mode gate: there the
twin does not exist and `.q-badge` (0,1,0) loses to `.bg-green` on order alone.

## Decision

A `.body--dark` twin is emitted **only when the base declaration reads a token that does not
flip**. When the base reads `var(--q-primary)` (or any token the dark block redefines), the twin
is deleted, not kept for parity: it is redundant for uncoloured elements and a cascade hazard for
coloured ones.

The reference still carries both selectors, so the divergence is recorded instead of hidden:
`test/fixtures/parity-baseline.json` lists `.body--dark .q-badge` in `badge.missing` and
`.body--dark .q-date__event` in `date.missing` with `date`'s target moved 0 → 1. Regenerating the
baseline refuses `target: 0` while a module has gaps, so this state cannot be re-broken by a
routine `--update`.

## Consequences

- Never re-add `.body--dark .q-badge` / `.body--dark .q-date__event` "to match the reference":
  the match is bought at the cost of every coloured badge in dark. `test/cascade-order.test.ts`
  ("dark component twins vs utilities") fails if either comes back.
- Any new component rule whose base reads a flipping token must not gain a dark twin; one whose
  base reads a scheme-scoped token (`--light-*`) must have one, because the base cannot follow
  the scheme by itself.
- Parity for `date` is now "one accepted gap", not zero. Closing it means re-introducing the
  collapse, so the honest end state is this recorded divergence, not `target: 0`.
