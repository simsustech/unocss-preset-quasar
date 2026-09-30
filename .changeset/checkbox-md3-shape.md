---
'unocss-preset-quasar': patch
---

The checkbox is an 18dp box with a 2dp corner, and its check is on-primary.

Rendered in the app (the payments page's bank-link dialog holds the only
QCheckbox, so Quasar's markup was injected into a running page and shot at 4×),
the checkbox drew a 36px **circle** containing a tiny framed square, and when
checked it drew a **dark square** on the primary fill instead of a check.

Three causes in `components/checkbox/rules.ts`:

- `__inner` carried `font-size: 36px` with `border-radius: 50%`, so the `1em`
  box was a 36px circle — the radio's shape at double MD3's icon size. It is now
  `18px` with a `2px` corner.
- `__inner--truthy .q-checkbox__bg { background-color: currentColor }` filled the
  glyph box with `on-surface-variant`, because the truthy state changes only the
  border and background, never `color`. The check path now states
  `stroke: var(--q-on-primary)` for both the truthy and indeterminate states,
  over the primary fill.
- Quasar's dist insets `__bg` to the middle 50% with its own 2px border — the
  tiny framed square. The glyph box now fills the 18dp square.

The 40dp MD3 state layer is stated explicitly instead of inheriting the box's
footprint.

`duplicate-yield-folds.test.ts` pins `.q-checkbox__inner` to the reference's
values, so this is recorded there as the preset's first **documented MD3
deviation** (`MD3_DEVIATIONS`, with the value and the reason) rather than by
editing the reference fixture or dropping the site's coverage. The `q-radio`
entry stays pinned to dist — untouched here.

Covered by the new `test/checkbox-shape.test.ts`.
