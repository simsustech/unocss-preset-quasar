---
'unocss-preset-quasar': patch
---

**Default style applies out of the box — no `body.quasar-style-*` class required.**

The first style entry is now also emitted unscoped on `:root` (with `body.body--dark`
dark overrides), so the default style applies with zero config and no JS —
`var(--q-*)` tokens resolve without any body class.

- Every entry — including the default — keeps its scoped `body.quasar-style-{name}`
  block, so `setStyle()` runtime switching still works and scoped selectors
  outrank the `:root` default in the cascade.
- Color palette tokens (`--light-*`, `--dark-*`) were already unscoped; this makes
  shape/size/component tokens behave the same way.
