# ADR 0008 — style-independent preset policies are not style defects

Status: accepted (2026-09-29)

## Context

The md2 audit (`specs/audit/md2-audit.md`) asked, of every declaration where md2 and
md3 differ, whether the difference is a defect. Two ways of getting that wrong
surfaced before the question could be answered, in opposite directions.

**Treating a shared policy as a defect.** These differ between md2 and md3 by
design, and an audit that reads every difference as a defect will flag all of them:

| policy                    | md2        | md3        | why it is shared                                                             |
| ------------------------- | ---------- | ---------- | ---------------------------------------------------------------------------- |
| generated palette         | identical  | identical  | one palette authority; `--light-surface-container-high` is `#e9e8eb` in both |
| 48dp control-height floor | 48px       | 48px       | accessibility; the md2 spec's own `bounding_touch_target_px` is 48           |
| five screen breakpoints   | same steps | same steps | `--q-size-*`, an app-layout contract                                         |

**Treating a style's own value as a defect.** Symmetrically, some md2 values that
_look_ like drift are the values `quasar.css` states, with md3 as the deviating
style. md2's flat/outline colour is `currentColor` and its outline border is
`1px solid currentColor`; dist says `.q-btn--outline:before { border: 1px solid
currentColor }` and declares no `color` at all. md3 is the style that moves toward
`--q-primary`. The same holds for md2's toggle track
(`color-mix(in oklab, var(--q-secondary) 50%, transparent)`).

## Decision

The arbiter — `quasar/dist/quasar.css`, and `specs/md2/*.json` wherever the spec
states a metric — governs what a style **owns**. It does not govern these, and a
divergence in them is recorded, not fixed:

1. **the generated palette** — one authority, style-independent by construction;
2. **the 48dp control floor** — an accessibility policy, expressed through
   `--q-control-height`;
3. **the screen breakpoints** — `--q-size-*`, an app-layout contract;
4. **a style's own accent policy where dist states none** — md2's `currentColor`
   mirrors dist, so md3's `--q-primary` is the deviation, not the reverse.

`--q-space-*` is **not** exempt. It is a style-varying scale, and using it to
express a metric the arbiter states absolutely is a defect: AUD-MD2-001 was exactly
that, and it produced an overlap (a 16px push-down under a label box ending at
25px) rather than a cosmetic difference. The test is whether a _correctness_
invariant is at stake, not whether the value differs.

## Consequences

- An audit row must name the bucket it rests on: `spec-declared`, `dist-only`,
  `invariant`, `palette-driven`, `preset-policy`. The first three can be defects;
  the last two are records. `specs/audit/md2-value-sweep.mjs` enforces that every
  divergence it finds carries one, so a new one cannot slip through unclassified.
- A style may hold its own value for a _shared_ rule through its own token — md2's
  field push-down is 28px where md3's is 24px. What it may not do is fork the rule
  itself (`if (style === 'md2')`), which is why these are tokens.
- "Dist states it" is not sufficient grounds for a fix: where md2's value _is_
  dist's value (3, 4 above), the fix would be to break md2's fidelity.
