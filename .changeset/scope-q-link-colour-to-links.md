---
'unocss-preset-quasar': patch
---

fix(preset): keep `.q-link`'s colour off list items and breadcrumbs

`.q-link` has carried `color: var(--q-primary)` since the link-colour change,
so content links stop hand-pairing primary. But Quasar reuses `q-link` on
**clickable `q-item`s** (`QItem.js`: `isClickable` -> `q-item--clickable q-link
cursor-pointer`) and on every **breadcrumb element** (`QBreadcrumbsEl.js`), and
neither is a link. Unscoped, the colour painted every drawer, dashboard and menu
row primary where the list spec wants `on-surface`
(`ListTokens.ItemLabelTextColor`), and flattened the breadcrumb roles.

The colour is scoped to real links:

```css
.q-link:not(.q-item):not(.q-breadcrumbs__el) {
  color: var(--q-primary);
}
```

The outline reset stays on every `.q-link`. List items keep their own roles —
`.q-item` inherits (on-surface) and `.q-item--active` states primary — and the
content `<router-link class="q-link">` / `<a class="q-link">` links are
unchanged.

Measured in petboarding's menu (2026-10-06): Terms/Privacy/Documentation labels
went from `rgb(0, 105, 109)` (`--q-primary`) back to `rgb(25, 28, 28)`
(`--q-on-surface`).
