---
'unocss-preset-quasar': patch
---

Give `q-btn-group` the MD3 segmented-control treatment.

Every `.q-btn` is filled with `--q-btn-bg`, so grouped segments inherited the
primary fill: the Day/Week toggle painted the *unselected* segment
`rgb(0,95,175)` while the selected one carried its own treatment — the two
halves of the control looked inverted. The group scope now resets the fill to
the reference's no-fill (`background-color: transparent; color: inherit` on
`.q-btn-group > .q-btn` — Quasar's reference groups carry no fill), the
selected segment is painted on `secondary-container` (light/dark pair, keyed
off `aria-pressed`, which is how `q-btn-toggle` marks selection), and the
outer edges take the group's pill radius via `border-radius: inherit` — the
reference's own mechanism — while inner corners stay square.

The `.q-btn-item.bg-primary` special-cases are untouched and keep winning
through their `!important` at higher specificity, so explicitly marked
buttons still render filled. Unstyled stays flat: the inherited radius
resolves to its zeroed corner tokens.
