---
'unocss-preset-quasar': patch
---

Pair the navigation drawer's selected item text with its container.

`.q-drawer__content .q-list > .q-router-link--active` painted a
`secondary-container` background with `--q-primary` text. md3 wants
`on-secondary-container` on both — the pairing the preset's own
`specs/reference/normalized/md3-lists.json` records as
`label/selected_text_color_token`.

The correct token already existed (`--q-item-active-color`) but was only
bound to `.q-item--active`, a class `to=` links never receive; router
links take `q-router-link--active` instead. Applied in both light and
dark rules.
