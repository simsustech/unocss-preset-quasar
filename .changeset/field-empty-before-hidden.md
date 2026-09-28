---
'unocss-preset-quasar': patch
---

Hide `__before` while it is empty, like `__after` and `__append` already are.

`.q-field__before` carries `padding-right: 12px` in Quasar's own sheet, and the
reference's `min-width: 56px` rides on the same selector, so a field with an
empty `#before` slot reserved a gutter in front of its control — while
`__after:empty` and `__append:empty` collapsed. The slot now collapses too.

Consumers that relied on the reserved gutter for a slot they deliberately keep
empty (a fixed-width lead-in) see a tighter field. That is the point of the
change: the alternative is every consumer repeating
`:deep(.q-field__before:empty) { display: none }`, which is what this replaces.
