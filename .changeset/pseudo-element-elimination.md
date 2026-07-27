---
'@simsustech/unocss-preset-quasar': patch
---

Phase 3 complete: eliminate `::before` / `::after` pseudo-elements from preset atoms.

All preset `[&:before]` / `[&:after]` / `content-empty` atoms now target real child elements
introduced by Phase 2 (Quasar SASS refactor). One exception: `.q-editor__content`'s
`[&:empty:not(:focus):before]:(content-[attr(placeholder)])` is retained because
`content: attr()` only works inside pseudo-elements — Phase 4 will replace with a
JS-driven placeholder.
