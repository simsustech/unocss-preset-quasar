---
'unocss-preset-quasar': patch
---

Emit the dark date-picker day colour after the rule it must beat.

`.q-date__calendar-item--in .q-btn--flat` (day numbers → `--q-on-surface`) sat
*before* `.q-date__calendar-item--in .q-btn` (→ `--q-on-primary` + primary
background) in the dark pass, while the light pass has them the other way round.
Both selectors weigh (0,3,0), so the plain rule won: day numbers rendered in
`--q-on-primary` — a dark teal in dark mode — and the primary background that was
meant to fill the cell lost to Quasar's own unlayered
`.q-btn--flat { background: transparent }`. Measured on `/availability` at
1440×900: `#003739` text on the `#191c1c` surface, contrast 1.31:1, i.e. a
calendar whose days are invisible in dark mode.

The dark pass now mirrors the light pass for the day, month and year cells.
Guarded by `packages/preset/test/date-time-dark.test.ts`.
