---
'unocss-preset-quasar': patch
---

Restore the `!important` on the drawer backdrop's z-index.

The reference states `.q-drawer__backdrop { z-index: 2999 !important }`, with the
flag doing real work: Quasar renders that element as
`<div class="fullscreen q-drawer__backdrop">`, `.fullscreen` carries
`z-index: 6000`, and both selectors are a single class — so without the flag the
later `.fullscreen` won on source order and the backdrop landed at 6000, above the
app bar's 2000. With the drawer open at mobile width the backdrop covered the
whole viewport and swallowed every click on the header's controls, which is the
`layout-polish` "header controls are hittable at 375px" guard and the
`nav-drift` drawer-item click.

The scale itself is unchanged: this preset keeps ADR 0007's 1499, one step below
the overlay drawer. The parity gate strips `!important` before comparing, so it
could not see the missing flag. `test/drawer-backdrop.test.ts` now pins it.
