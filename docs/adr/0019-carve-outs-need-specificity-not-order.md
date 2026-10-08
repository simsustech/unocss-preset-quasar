# ADR 0019 — a carve-out that only ties its base will lose to UnoCSS's sort

Status: accepted (2026-10-08)

## Context

Several components need a _carve-out_: a rule that re-colours or de-shapes an
element the base rule has already styled. The `q-date` dark calendar is the
clearest case. The base rule paints the day button on-primary:

```
.body--dark .q-date__calendar-item--in .q-btn { color: var(--q-on-primary); background-color: var(--q-primary) }
```

and the carve-out is meant to override it for the `--flat` variant:

```
.body--dark .q-date__calendar-item--in .q-btn--flat { color: var(--q-on-surface) }
```

Both selectors have the **same shape** — `body--dark` + one class + one element
class — so the carve-out wins only by being emitted later. That assumption is
unsafe, and it broke three times.

UnoCSS merges rules whose declaration bodies are identical and repositions the
merged rule by its own sort. `color: var(--q-on-surface)` is declared by many
unrelated selectors (`.q-menu`, `.q-layout__section--marginal`, `.q-message-text-content--received`,
`.q-tree--dark .q-tree__node-header-content`, …), so the carve-out's body gets
merged into one shared rule that lands **early** — while the component's plain
on-primary rule lands late and wins.

Measured in the harness app bundle, 2026-10-08:

| symptom                                                                                     | measurement                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUG-065 — dark calendar day numerals                                                        | on-primary `#381e72` on on-primary `#381e72` = **1.10:1**, numerals invisible; the intended `--q-on-surface` is `#e6e1e6` (13.29:1 on the dark surface)                                                                                                                                                                     |
| BUG-070 — dark month/year pickers                                                           | `#381e72` on `--q-surface` `#1c1b1e` = **1.30:1**; every unselected month and year invisible                                                                                                                                                                                                                                |
| BUG-064 — `square` on q-menu, q-field, q-table, q-time, q-uploader, q-skeleton, q-btn-group | `border-radius: 0` is declared by several components, so UnoCSS merged them into `.q-btn-group--square,.q-field--square,.q-menu--square,…{border-radius:0}` and placed it at offset **152402**, before the bases (`.q-menu{` at **243983**) — so the base's rounded token won and `square` was a no-op in 7 of 8 components |

(Offsets move whenever the sheet is regenerated; the invariant is the
relationship — merge first, base later — so re-measure them rather than trusting
these numbers.)

The failure is silent in two ways. First, a **unit test that asserts emission
ORDER passes**: `createGenerator` in isolation orders the yields as written, so
the test is green while the shipped bundle is inverted. Second, the bug is
invisible until the contrast collapses — a no-op `square` or an unreadable
numeral looks like a design choice rather than a defect.

## Decision

**A carve-out must not rely on emission order. Give it more specificity than the
rule it overrides.**

The preset's mechanism is a doubled class, which raises specificity without
adding a new token or an `!important`:

```ts
[symbols.selector]: (selector) => `.body--dark ${selector}__calendar-item--in .q-btn--flat.q-btn--flat`,
color: 'var(--q-on-surface)'
```

`(0,4,0)` beats the base's `(0,3,0)` regardless of where the merge lands.

Apply the doubling to **every sibling selector in the same block**, not just the
one that was observed failing. BUG-065 was fixed on `__calendar-item--in` alone,
and the two siblings (`__months-item`, `__years-item`) were left single-class —
which is exactly how BUG-070 came to exist. The regression guard is
correspondingly parametrised over the whole family
(`test/date-time-dark.test.ts`, `it.each`).

Verify against the **built bundle**, not the generator. `createGenerator` in
isolation does not reproduce UnoCSS's whole-candidate-set sort; the offsets in
`packages/app/dist/static/assets/unocss-*.css` are what proved BUG-064.

## Consequences

- Carve-outs in this preset carry a doubled class where they override a same-shaped
  base. A reader who finds `.q-x--mod.q-x--mod` should read it as "this must win",
  not as a typo.
- Guards must assert **specificity**, not order. `date-time-dark.test.ts` no
  longer checks that the override comes last; it checks that the doubled-class
  form is present and that no single-class form survives.
- A carve-out that adds declarations the base does not have (a different
  `height`, `width`, `min-width`) is **not** merged and does not need the
  doubling — this is why the light-mode `__years-item .q-btn--flat` rule, which
  carries its own sizing, is fine as written. Judge each case by whether the
  body could merge with an unrelated rule.
- Raising specificity changes the emitted selector, so the parity ratchet records
  a divergence. That is expected and is recorded through the tool's own path
  (`parity-report.mjs --set-target date=5`), never by hand-editing the baseline.
- Cost of getting this wrong is high and quiet: three separate defects (1.10:1
  and 1.30:1 contrast failures, and a 7-component no-op) shipped past a green
  suite. Expect to find more of this shape; the diagnostic is "does this rule
  tie its base, and could its body merge with an unrelated rule?"
