---
'unocss-preset-quasar': patch
---

Safelist the bare `grey` palette utilities (`text-grey`, `bg-grey`). Quasar's
`color="grey"` prop composes `text-grey` at runtime, and a palette class reaches
the sheet only through the safelist: `grey-1` … `grey-14` were listed, the bare
name was not, so `color="grey"` on a component rendered unstyled. `grey` is the
only bare palette name that was missing — every other material name is listed,
and `dark-page` is emitted by the preset's own colour rule.
