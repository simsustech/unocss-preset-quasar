---
'unocss-preset-quasar': patch
---

fix(preset): align a `q-item` used as a select's value with the list icon column

`QLanguageSelect` (through `@simsustech/quasar-components`' `LocaleSelect`
`is-item` mode) renders its selected value as a `q-item` inside a `q-select`.
That item therefore sat inside `.q-field__control`, whose inline padding and
standard surface pushed its icon off the list column — `12 + 16px` where a
plain `q-item`'s icon sits at `16px` — and painted a filled field behind the
row, so the flag read as an input rather than a menu item.

A select whose `.q-field__native` holds a `q-item` now drops the control's
inline padding and background:

```css
.q-select .q-field__control:has(> .q-field__control-container > .q-field__native > .q-item) {
  padding-inline: 0;
  background-color: transparent;
}
```

Measured in petboarding's header menu (2026-10-06): the flag moved from
`x: 1091` to `x: 1079`, matching the terms and privacy icons, and the control's
fill went `rgb(227, 226, 230)` to transparent.
