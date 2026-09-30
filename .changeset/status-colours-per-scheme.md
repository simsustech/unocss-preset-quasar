---
'unocss-preset-quasar': patch
---

Status colours resolve per scheme, so they clear 4.5:1 wherever Quasar uses them.

Quasar reads one token per status for two roles — `.text-positive` (text, e.g.
the money columns) *and* `.bg-negative` / `color="negative"` (a fill under a
white glyph or label) — and `theme/colors.ts` harmonized a single hex per
status for both schemes. Those brand hexes are mid-tone, so they clear 4.5:1
against neither a white nor a near-black surface:

- `text-positive` measured **2.33:1** on the light surface and **2.22:1** on the
  zebra row.
- `text-negative` measured **2.68:1** on the dark surface and **2.56:1** on the
  zebra row.

`renderQuasarDarkBlock` stated the reason it left them alone — "identical in
both schemes, like quasar.css constants" — but the dark palette is not the
light one, and the status fills are not constants.

Each status is now derived from a tonal palette built on the *harmonized* brand
hue and pinned to an MD3 tone per scheme (`STATUS_TONE` in `theme/colors.ts`),
never to a hand-picked hex: light takes MD3's own light-error rung (40) → 6.3:1
as text and 6.5:1 for white on the fill; dark takes 60, one rung below MD3's
dark error (80), because at 80 the fill drops to 2.1:1 under a white glyph
(below 1.4.11's 3:1) while 60 keeps the text ≥4.5:1 (5.2:1) and the glyph ≥3:1
(3.2:1). Light `--q-negative`, which already passed, keeps its rung.

`info`/`warning` stay shared on purpose: nothing in the app renders them, so no
contrast measurement covers them.

Covered by `test/status-colors.test.ts`, which asserts both the derivation (the
two schemes differ; every text pairing clears 4.5:1 on its own surface and on
the table row; a white glyph stays ≥3:1 on each fill) and the emission (`:root`
and `body.body--dark` both declare `--q-positive`/`--q-negative`, with different
values — the block that previously omitted them entirely).
