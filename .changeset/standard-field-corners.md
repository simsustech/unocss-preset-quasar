---
'unocss-preset-quasar': patch
---

fix(preset): give the standard field the underline container's corners

The base `.q-field__control` carried `border-radius: var(--q-radius-sm)`, while
`.q-field--standard .q-field__control` overrides only its two top corners — with
the reference's `inherit`. The variant classes are mutually exclusive
(`use-field.js`), so no other variant ever read the base value: only `standard`
did, and only through the two corners it leaves unset. A default field therefore
rendered `border-top-left-radius: 0px` with `border-bottom-left-radius: 8px`
under md3 — "bottom rounded, top square" (petboarding, md3, the login form).

Material's underline container is top-only extra-small with a flat bottom edge:
Flutter's `UnderlineInputBorder` documents "the top left and right corners have a
circular radius of 4.0" and zero bottom radii, and md3's text-field bottom edge
is `md.sys.shape.corner.none`. So the base radius is deleted, and
`.q-field__inner` — the control's *direct parent*, and the element the
reference-pinned `inherit` actually reads — now carries the top radii as
`var(--q-corner-extra-small)` (md3 4px, md2 4px, unstyled 0). Recorded in
ADR 0011.

Two further deviations the same probe turned up:

- md2's shape scale stated `cornerExtraSmall: '3px'` where its own spec (filled
  `4px 4px 0px 0px`, outlined `4`) and `quasar.css` both say 4px — every md2
  outlined and standout field drew 3px corners. Fixed at the token, which both
  emitted families read (`--q-corner-*` and `--shape-corner-*`); `radiusXs`
  keeps its own 3px as the skeleton/checkbox alias.
- the `.q-field--rounded` **root** rule was inert — `inherit` reads the direct
  parent (`.q-field__inner`), never the root, so no control could ever resolve
  it — and is removed. The variants that read the prop keep rounding the control
  themselves.

Guarded by `field-corner-shape.test.ts` and, in the consumer's configuration,
`quasar-testing-harness/tests/field-corners.spec.ts` (standard, filled, standout
and standard+rounded in md3; standard and outlined in md2).
