---
'unocss-preset-quasar': patch
---

Return the shape Quasar's `iconMapFn` actually reads.

`QIcon` resolves the function's result through `getMappedType`, which accepts
`undefined` (parse the name), `{ icon }` (use that icon) or `{ cls, content }`.
It does not accept a bare string: both `cls` and `content` come out `undefined`
and the icon renders as an empty `<i class="q-icon">` with no class at all.

`iconMapFn` returned a string, so **every icon drawn through it disappeared** —
including the ones Quasar draws for its own components, starting with the
`q-btn-dropdown` arrow. It now returns `{ icon }`; the internal mapping used to
rewrite the icon set keeps the string form, where the string is what is wanted.
