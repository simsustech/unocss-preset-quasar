---
'unocss-preset-quasar': patch
---

Stop painting the timeline dot, which drew a second shape over the marker and
collapsed the connector line.

`.q-timeline__dot` was given `height: 12px`, `border-radius: 50%` and
`background-color: var(--q-primary)`. Reference Quasar's rule is only
`position: absolute; top: 0; bottom: 0; width: 15px` — the dot is a transparent,
full-height column, and the `::before` painted by the next rule is the visible
marker.

The extra background therefore rendered a flat ellipse on top of the marker
(an entry with an icon showed a blob instead of a dot), and the fixed height
became the containing block for `::after`, whose `top: 41px; bottom: 0`
resolved to zero height — so the timeline lost its connecting line as well.
