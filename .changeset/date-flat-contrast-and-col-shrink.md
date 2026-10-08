---
'unocss-preset-quasar': patch
---

Keep the dark calendar's day numerals readable, and safelist `col-shrink`.

The dark date calendar painted its in-month day buttons
`--q-on-primary` on `--q-primary` — 1.10:1, i.e. invisible — instead of the
intended `--q-on-surface`. The override was written as
`.body--dark .q-date__calendar-item--in .q-btn--flat`, which merely *ties* the
plain `.body--dark .q-date__calendar-item--in .q-btn` rule and relied on being
emitted last. UnoCSS merges rules with identical bodies, and the merged
`color: var(--q-on-surface)` block — which also carries
`.q-date__navigation .q-btn` and roughly ten unrelated selectors — lands early,
while the plain on-primary rule lands later and wins. An existing test asserted
the emission order, so it passed in isolation while the shipped bundle was
broken. The override now carries a doubled class (`… .q-btn--flat.q-btn--flat`)
and wins on specificity whatever order the merge produces; the test asserts that
instead of the order.

`col-shrink` joins the safelist beside `col`, `col-all`, `col-auto` and
`col-grow`. `QTabs.js:173` and `QToolbarTitle.js:19` apply it at runtime when
`shrink` is set, and no extractor signal names it, so its
`/^col-shrink$/` rule never reached the sheet and a shrinking toolbar title kept
its natural width. Same class of gap as the earlier `col` regression.

`date` records two single-selector parity divergences for the doubled class.
