---
'unocss-preset-quasar': patch
---

Keep a popup off screen until the positioning engine places it, and state every individual transform inside `transform`.

Two defects, one cause each — both reported from a client's staging deployment (Firefox/Safari plus a minified build):

- `.q-position-engine` was missing the reference's `visibility: hidden`, the only guard that keeps a popup off screen until Quasar's JS positioning engine writes its placement. That engine is the one every browser without CSS anchor positioning gets, it retries on a 10ms timer while the popup still measures 0×0, and an unplaced popup paints at its *static* position: inside a dialog the portal node lands in `.q-dialog.fixed-full.flex-center`, so a QSelect menu flashed in the middle of the screen before snapping under its field. The declaration is deliberately not `!important` — the reveal *is* the engine's inline `visibility: visible`.
- `rotate`/`scale`/`translate` were declared next to `transform` in the same rule. Lightning CSS (the CSS minifier in Vite 8 production builds) folds the pair in source order and drops the earlier declaration, so a production build lost the QCheckbox state layer's centring (the hover circle rendered 20px down-right of the box), the floating field label's 0.75 scale, and the indeterminate dash's rotation — while an unminified build composed the two instead, which doubled the QFab and QExpansionItem arrow rotations to 360° so they never turned.

Every site now states one `transform`, as Quasar's own CSS does: the checkbox state layer is centred with half-size negative margins, the field-label float is `translateY(-40%) scale(0.75)`, the fab/expansion/indeterminate rotations live on `transform`, and the q-btn push press uses `transform` (which its `transition: transform` also animates).

Guards: the parity ratchet records the individual properties it no longer requires (`checkbox` 3→4 gaps, `expansion-item` 0→1, `fab` 0→4, the field `transform` values), and `emission.test.ts` now runs Lightning CSS over the emitted sheet — the only seam that can see a declaration the build rewrites away, since the testing harness builds with `cssMinify: false`.
