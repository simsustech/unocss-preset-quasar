---
'unocss-preset-quasar': patch
---

Give `.q-link` the interactive colour, not just the outline reset.

The reference leaves the colour to the consumer — its reset states
`a { color: inherit }` — so a bare anchor with no classes fell through to the
browser's `rgb(0, 0, 238)`. Six petboarding content links each hand-paired
`text-$light-primary dark:text-$dark-primary` to work around it (2026-10-06
audit: `/information`, `/availability`, `/account/{pets,bookings,daycare,contactpeople}`).

`.q-link` now states `color: var(--q-primary)`. That role already flips per
scheme, so one declaration covers both (6.5:1 in light, ~10:1 on the dark
surface) and no `.body--dark` twin is needed. Pages can drop the token pairing
and mark the anchor with the semantic class instead.
