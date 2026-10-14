---
'unocss-preset-quasar': patch
---

Size a class icon to the reference's own glyph in a QTimeline dot, and give the
entry title a typographic role.

`.q-timeline__dot .q-icon` sizes a 31×38 slot and centres a 1em glyph through the
icon font's `font-size`/`line-height`. A class icon — the mask glyph
`presetIcons` gives Quasar — is the element itself, so `mask-size: 100% 100%`
stretched it over the 30px circle and hid it. The class-icon case now carries the
reference's `1em` glyph, centred on the circle in the same slot; the reference's
own yield is untouched (ADR 0013/0019 — the parity ratchet owns it, the companion
selector wins on specificity).

`.q-timeline__title` also gained a role (`--q-title-small-*`): its size otherwise
came from a global bare-`h6` block this preset does not emit, leaving the browser
default 0.67em — a title smaller than its own subtitle.
