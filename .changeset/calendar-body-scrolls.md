---
'unocss-preset-quasar': patch
---

Let the calendar month body scroll horizontally instead of clipping.

`.q-calendar-month__body` is ported verbatim from
`@quasar/quasar-ui-qcalendar/dist/QCalendarMonth.css`, `overflow: hidden`
included. The vertical clip is the library's contract and is kept; the shorthand
also swallowed the horizontal overflow, so a month grid wider than its container
— a narrow viewport, or a fixed-width panel — had its later columns clipped with
no way to reach them. `overflow-x: auto` restores that.

A deliberate divergence from the ported stylesheet, recorded here rather than
applied silently. The workaround it replaces appeared twice downstream, as
byte-identical overrides.
