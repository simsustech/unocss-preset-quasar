---
'unocss-preset-quasar': patch
---

A dialog paints one surface — its card — and dims the page behind it.

Two rules in `components/dialog` were painting on *full-viewport* elements, and
both showed up as "a giant white backdrop behind the dialog" on the add-payment
dialog:

- `.q-dialog__backdrop` derived its colour from `--q-dark` with a comment
  asserting that token stays dark in both schemes. It is the MD3 *surface* role
  (light `#fcfcff`; `theme/colors.ts` derives `dark` from `light.surface`), so in
  the light scheme the scrim was a 32 % white veil instead of a dim. It now uses
  the reference's own scheme-independent `rgba(0, 0, 0, 0.4)`.

- `.q-dialog__inner` is rendered by Quasar as `… standard fixed-full flex-center`
  (QDialog.js) — inset 0, the whole viewport — where stock Quasar gives it no
  background. Giving it `var(--q-surface)` and `box-shadow` (clamped by this
  file's own `max-width: 90vw` / `max-height: 90vh`) painted a visible white
  90vw × 90vh rounded panel behind every dialog. Measured: inner `1296×810` at
  `(0,0)` with `rgb(252, 252, 255)` while the real card was `400×418`. The inner
  is transparent again, and the MD3 ambient shadow (`level_3`) moved onto the card
  that carries the `surface-container-high` background — the surface it belongs to.

Layering is untouched: the backdrop keeps `pointer-events: all !important` and
`z-index: -1`, and the inner keeps its `max-*` and centring. Covered by
`test/dialog-backdrop.test.ts`.
