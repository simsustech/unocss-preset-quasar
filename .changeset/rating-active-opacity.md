---
'unocss-preset-quasar': patch
---

Selected rating stars are opaque again: `.q-rating__icon--active` keeps its
`opacity: 1`.

The rule was already right. The generator yields `.q-rating__icon { opacity: 40% }`
and then `.q-rating__icon--active { opacity: 100% }`, in the order
`quasar.css` states them. What the sheet did with that order was not.

UnoCSS's `mergeSelectors` groups selectors that share a declaration body and re-homes
the group to the alphabetically first of them, and ten components yield
`opacity: 100%`. `.q-carousel .q-carousel__thumbnail:hover` sorts before
`.q-rating__icon`, so the group carrying `.q-rating__icon--active` was parked 91 kB
earlier in the built sheet — above the base rule it has to override. Both selectors
are 0,1,0, so source order decided it, and the base won:

```text
128947  .q-carousel…,.q-rating__icon--active,… { opacity:100% }
220471  .q-rating__icon { color:currentColor; opacity:40%; … }
```

Measured on `/q-rating?style=md3` before the change: every star computed
`opacity: 0.4`, the four selected ones painted `rgb(252, 219, 167)` instead of
`#f9a825` — 0 strongly-orange pixels against 420 pale ones, which is what the 219-dump
pass saw as washed-out stars. After: the four compute `1` with `rgb(249, 168, 37)`
(380 orange pixels), the unselected one stays at `0.4` as the reference has it, and
`.q-rating--no-dimming .q-rating__icon` still wins — on specificity (0,2,0) rather
than on where the sheet happens to place it.

The `/^q-rating$/` entry now carries `{ noMerge: true }`, which keeps this component's
selectors out of the merge and lets reference order stand. Covered by
`test/cascade-order.test.ts`, which generates `q-rating q-carousel` on purpose: against
`q-rating` alone there is nothing to merge with, and the inversion cannot reproduce.
