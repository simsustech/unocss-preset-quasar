---
'unocss-preset-quasar': patch
---

fix(preset): center dialogs in the viewport instead of a top-left 90vw box

`.q-dialog__inner` carried `max-width: 90vw; max-height: 90vh` — a leftover from when the
inner painted the dialog surface. Under Quasar's runtime `fixed-full` (`position: fixed;
inset: 0`) the clamp is over-constrained: left/top win, so the centering box lands at
(0, 0) at 90vw × 90vh and `flex-center` centres every card inside it. Measured on the
plugin dialog at 546 × 1146: left gap 46px vs right gap 100px, top 401px vs bottom 515px
(5vw / 5vh of drift); the ResponsiveDialog fixture measured 32px vs 160px at 1280. The
reference bundle and stock Quasar state no size clamp on the inner — fitting belongs to
the child (`max-width: 560px`, `max-height: calc(100vh - 48px)`) and the row-flex shrink.
Dialogs now centre symmetrically (harness: plugin at 320/375/546, ResponsiveDialog at
1280) with the phone-fit guards still green.
