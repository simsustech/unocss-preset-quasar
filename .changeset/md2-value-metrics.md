---
"unocss-preset-quasar": patch
---

md2: a metric token for the labeled push-down, and round buttons that are round

Two values rode a style-varying scale where `quasar.css` states an absolute one, so
md2 — whose spacing scale is compressed — rendered them wrong.

**Labeled fields (AUD-MD2-001).** The push-down that clears a floated label was
`padding-top: var(--q-space-xl)`: 24px in md3, 16px in md2. Every floated field in
md2 therefore rendered its value underneath its label — measured live at −9.2px of
text overlap on the pet edit dialog, 10 of 10 floated fields. It now reads
`--q-field-labeled-padding-top`, a *metric* token: 28px in md2, 24px in md3. 28px
because the invariant decides it (a label and its value must not intersect):
dist's own 24px still intersects by up to 1.2px at this geometry, 28px clears by
+1.8px. Both paths take the metric — the labeled native and the
auto-height/select control container.

**Round buttons (AUD-MD2-002).** `.q-btn--round` paired `min-width: 3em`
(font-relative, so 19/24/30/34/42px across contexts) with `min-height:
var(--q-control-height)` (48px), making every round button an ellipse: 178
instances over both viewports, 54 of 56 on the admin routes alone. Both sides now
come from one metric per style — md2 takes the md2 spec's button `min_width_px`
(64) as its width *and* height, md3 keeps `3em`/`auto` so its own audited
rendering does not move. `min-height` still reads the 48dp floor token, so the
square only ever raises it; dense round keeps dist's own tighter width (2.4em on
md3). After: 0 of 56 non-square, every round button 64x64, `--fab` untouched at
56x56.

The md3 sheet's *resolved* values are unchanged from before these commits apart
from an explicit `height: auto` — the property's initial value, declared so md2 can
put a square side there.
