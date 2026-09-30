---
'unocss-preset-quasar': patch
---

Fix the responsive grid and the palette-colour cascade.

`col-<bp>` / `col-<bp>-N` were emitted with no media query. Quasar puts them
inside `@media (min-width: <bp>)`, and that wrapper is load-bearing: without an
at-rule frame between them, `.col-sm` and `.col-12` are equal specificity and the
base span wins by source order — so a `col-12 col-sm` cell stayed full width at
every viewport and a legend rendered as a vertical stack. A rule body cannot
carry an at-rule (a nested `@media` key stringifies to `[object Object]`), so the
wrapper now comes from a variant whose `match` returns `{ matcher, parent }`.
`xs` is the base breakpoint and stays unwrapped.

Rule bands are now explicit UnoCSS layers — `quasar.grid`, `quasar.components`,
`quasar.app`, `quasar.styles`, all ahead of `default`. Array order could not
reach utilities the consumer's engine generates: Quasar's palette colours
(`bg-pink`, `bg-yellow-2`) come from `extendTheme`, not from a rule here, so they
landed before the component rules and
`.q-badge{background-color:var(--q-primary)}` beat them on equal specificity —
every badge rendered primary regardless of its `color` prop. The relative order
is unchanged and still asserted: grid/container utilities stay ahead of the
components, so component layout keeps winning on equal specificity.

`mergeDuplicateRules` now carries a rule's meta through when it rebuilds a merged
group. The meta is where `layer` lives, and it was being dropped for every
duplicated regex, which would have silently returned those rules to `default`.
