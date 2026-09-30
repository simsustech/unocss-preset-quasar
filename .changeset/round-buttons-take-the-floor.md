---
"unocss-preset-quasar": patch
---

round buttons are round in md3 and unstyled: both sides read the 48dp floor

dist pairs `.q-btn--round`'s `min-width: 3em` with `min-height: 3em` — both
font-relative, scaling together into a circle. Our deliberate 48dp touch floor
pins the height to an absolute instead, so the font-relative width drifted away
from it in every context: measured md2-before-fix, 19/24/30/34/42 wide against
48 tall; and md3 is no better off the floor — its button font is 14px, so 3em =
42 against 48 (an oval at default typography), while dense round was 2.4em
against 48 (an oval at every size).

`--q-btn-round-min-width` and `--q-btn-round-dense-min-width` now read
`var(--q-control-height)` in md3 and unstyled: one source for both sides of the
box, so the diameter *is* the touch floor and cannot drift apart from it again.
md2 keeps its spec's 64px (unchanged, still 64x64). Unstyled has no floor by
design (`controlHeight: auto`) — taking the same source still keeps its box
symmetric. Verified per style in a real engine at 14/16/18/24px fonts (24/24:
md3 48x48, md2 64x64, unstyled square); the sweep's shape divergences went 1 → 0.
