---
'unocss-preset-quasar': patch
---

QSelect's expand/collapse arrow no longer jumps while the menu is open.

`.q-select__dropdown-icon` was centered with `transform: translateY(-50%)`.
Opening the menu makes Quasar add `.rotate-180` to that same element, and the
utility's full `transform` stack is emitted in a later cascade band, so it
replaced the centering entirely: for as long as the menu was open the arrow sat
half its own height too low — 12px on md3 (24px icon), 16px on md2 (32px icon) —
and only snapped back on close.

The centering now uses the individual `translate: 0 -50%` property, which the
rotation composes with instead of overwriting. Collapsed geometry is unchanged;
expanded, the arrow stays on the control's centerline through open, close, and
the reverse toggle. Covered by an emitted-CSS unit test in the preset
(`test/select-dropdown-icon.test.ts`) and a rendered-geometry test in
quasar-testing-harness (`tests/preset-fixes.spec.ts`), which measures the icon
against the control across md3/md2 × default/use-input and asserts the
`rotate-180` toggle in unstyled.
