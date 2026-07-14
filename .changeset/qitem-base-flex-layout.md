---
'unocss-preset-quasar': patch
---

fix: add missing base `.q-item` and `.q-item__section` flex layout rules

The preset only emitted `q-item__section--side`, `--main`, `--avatar`, etc.
modifiers but never the base structural rules that make a Quasar item lay
out as a horizontal flex row. As a result every section stacked as a
block-level element, so the side section (rating / action buttons) rendered
on top of the main content and caption rows could not stretch to full width
— most visible on narrow screens (e.g. PetItem in a narrow card column).

- `.q-item` now gets `display:flex; flex-wrap:nowrap`
- new base `.q-item__section` rule adds `display:flex; flex-direction:column;
  flex-wrap:nowrap; align-items:stretch`

Applied to md3, md2 and unstyled styles.
