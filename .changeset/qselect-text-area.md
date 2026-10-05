---
'unocss-preset-quasar': patch
---

QSelect's text input no longer reserves the dropdown arrow's clearance twice.

`select/rules.ts` emitted `padding-right: 48px` on `.q-select .q-field__native`
**and** on `.q-select .q-field__input`. The input sits inside the native's
content box, so the two stacked: 96px of dead space on the right of the input.
Measured on a phone-sized viewport (320px, value selected), the field box was
200px → native 138px → input 90px → **42px of usable text area**, so typing
scrolled after about two characters. At 375px the text area was 87–123px.

Both paddings are gone. The arrow also went back into upstream's in-flow append
row (`.q-select__dropdown-icon` no longer carries `position: absolute;
right: 12px; top: 50%; translate: 0 -50%`), which is what had forced the flow to
reserve the arrow's space by hand — `quasar@2.34.0` ships neither the paddings
nor the positioning, and the control's own `padding: 0 12px` already holds the
arrow 12px off the control's right edge. The input keeps upstream's
`min-width: 50px !important` and `cursor: text`; the icon keeps the reference's
`cursor: pointer !important` + `transition: transform 0.28s`. Typing now spans
the native's whole content box instead of a 42px slot.

The parity ratchet records the divergence from the reference bundle (which does
carry both paddings) as select `target: 2`; guarded by `select-text-area.test.ts`
(no `padding-right` on either selector, upstream's declarations still emitted)
and the rewritten `select-dropdown-icon.test.ts` (no positioning, cursor and
transition preserved, `rotate-180` still reaches the icon). Recorded in ADR 0012,
which also supersedes ADR 0009's select instance.

Supersedes the pending `.changeset/select-dropdown-icon-position.md`, which
documented the arrow-centering behaviour this change removes; that behaviour
never shipped in a release, so the file is deleted rather than left to contradict
these notes.
