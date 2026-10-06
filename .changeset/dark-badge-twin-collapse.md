---
'unocss-preset-quasar': patch
---

fix(preset): stop the dark badge/date twins from collapsing coloured badges to primary

`.q-badge` and `.q-date__event` each carried a `.body--dark` twin restating the base
`background-color`. The twin exists in the reference bundle because the reference's base reads
`var(--light-primary)` — a token that does **not** flip — so only the twin puts the badge on the
dark primary. Ours reads `var(--q-primary)`, which the dark token block redefines, so the twin
changed nothing for an uncoloured badge and cost the cascade everything for a coloured one: at
(0,2,0) it outranked every `bg-*` utility (0,1,0), so in dark mode each status badge rendered
primary. Measured in petboarding's dark sweep (2026-10-06): all five dots of the daycare status
legend — approved green, canceled orange, pending grey, rejected red, standby yellow — came out
`#4cd9df`, and the same collapse hit the pet chips, vaccination badges and agenda chips (13
coloured QBadges across the app).

Both twins are gone; the utilities win in dark exactly as they do in light (equal specificity,
later in the sheet — `test/cascade-order.test.ts` guards it). The reference still carries the two
selectors, so the divergence is recorded rather than hidden: `fixtures/parity-baseline.json` now
lists `.body--dark .q-badge` under `badge.missing` and `.body--dark .q-date__event` under
`date` with `target: 1`.
