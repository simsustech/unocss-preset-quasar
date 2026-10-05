---
'unocss-preset-quasar': patch
---

fix(preset): pad the standard and outlined field controls 12px in every style

`components/field/rules.ts` derived the control's inline padding from the general
spacing scale (`var(--q-space-md)`), which is 12px in md3 but 8px in md2 — so a
standard or outlined field lost 4px of inline padding in md2, pulling a trailing
marginal (the q-select dropdown arrow) 8px from the edge instead of 12px.

The reference is 12px in every style: its `quasar-style-md2` block carries no
field rule, so md2 inherits the base
`.q-field--standard .q-field__control { padding-inline: 12px }` and
`.q-field--outlined .q-field__control { padding-inline: 12px }`. The field's own
token `--q-field-padding-x` is 12px in md2 and md3 (0 unstyled); both variants now
use it. Filled keeps `--q-space-lg` (16px), which already matches the reference's
`.q-field--filled > .q-field__inner > .q-field__control { padding-inline: 16px }`.
