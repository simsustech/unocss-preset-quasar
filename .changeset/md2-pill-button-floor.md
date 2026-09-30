---
"unocss-preset-quasar": patch
---

md2: the pill releases the button floor — its width was never the spec's to state

The md2 spec states `min_width_px: 64` on the variants it names — contained,
outlined, text — beside `padding_left_right_px`, as a floor under "the size of the
text label with 16dp padding". MD2 knows no pill at all (`border_radius_px: 4`), so
a pill's width is spec-silent, and the authority chain hands that to dist, which
declares no `min-width` anywhere in the `.q-btn` family. Quasar v1.22.10 — the
md2-era build — has none either.

`.q-btn--rounded` now states `min-width: auto`. In md3 and unstyled that is a
no-op (their base token is already `auto`), which is the md3-does-not-move proof;
in md2 it releases the 64px clamp. Scoped to `--rounded` and never `--rectangle`,
because QBtn's class assembly is `round ? 'round' : 'rectangle' + ...` — every
non-round button carries `q-btn--rectangle`, i.e. that class IS the spec's own
text/outlined/contained, and it keeps the floor.

The element that asked for this is the occupancy day cell: `q-btn--outline
q-btn--rectangle q-btn--rounded`, measured at 64x48 (a stadium — an action-button
width against the 48dp floor's height). It is a calendar date, and MD2 sizes dates
in the date-picker section: date bounding box 40x40dp, selected date 36x36dp,
4dp apart (m2.material.io/components/date-pickers), with a 32x32dp minimum touch
target. Live after: 35 day cells at 48x48 and 40x48, content-sized like dist and
md3, the 40-wide cells on the spec's own 40dp box.

Fabs carry `q-btn--rounded` too, and that rule emits after `--fab`, so the fab
rules re-assert `min-width: var(--q-fab-size|-mini-size) !important` — the same
treatment the file already gives their radius. Verified in a real engine over the
generated md2 CSS (pill 0px, plain 64px, round 64px, fab 56px, mini 40px) and live
in the app (the rail's `<q-btn fab>` measures 56x56 with min-width 56px).
