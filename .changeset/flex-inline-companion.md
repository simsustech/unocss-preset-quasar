---
'unocss-preset-quasar': patch
---

`.flex.inline` reaches the sheet, so a `flex inline` consumer stays inline-flex.

Quasar pairs each flex utility with a two-class companion
(`ui/src/css/core/flex.sass`): `.row,.column,.flex { display: flex }` plus
`.row.inline,.column.inline,.flex.inline { display: inline-flex }`. The preset's
own `^flex$` rule yields that companion exactly as `^row$`/`^column$` do — but
it never *runs*, so the companion never reached the sheet at all (not a cascade
loss: `.flex.inline` was absent from the built CSS). UnoCSS takes the first rule
that matches a token, and the engine's own `flex` utility claims `flex` before
the preset's rules are consulted. `.row`/`.column` have no engine counterpart,
which is why only `flex` was missing.

QBadge ships `class="q-badge flex inline …"`, so this is user-visible:

- `/admin/invoices` at 1440: the "Overdue" badge measured **287×16** — stretched
  to its 285px block parent (`div.col-3`) instead of hugging its ~56px label.
- the same badge at 375: **40×16** with `scrollWidth 42 > clientWidth 40`, so
  the label clipped to `Overdu`.

The companion is now stated as a transcribed reference default, alongside the
breakpoints. No rule of the preset's can win the matcher race, but it does not
need to: the two-class selector's 0,2,0 outranks `.flex`'s 0,1,0 wherever both
apply, so source position is irrelevant. Measured after the change: both
viewports render `display: inline-flex`, **56×16**, no clip, label intact.

Covered by the extended `test/grid.test.ts`, which loads `presetWind4` *and* the
preset to reproduce the matcher conflict, and asserts the companion is emitted
with `display: inline-flex` while `.flex` alone still grows and
`.row.inline`/`.column.inline` keep working.
