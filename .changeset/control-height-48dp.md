---
'unocss-preset-quasar': patch
---

Raise control heights to 48dp through a dedicated `--q-control-height` token.

The audit probed 375px and found `48x40`, `64x40`, `72x40`, `56x40` buttons and
~250 sub-48 controls: `.q-btn` took its height from `btnMinHeight: 2.857em`
(40px at the 14px md3 button font), `.q-field__control` from the shared
`--q-comp-md` (40px), round buttons from `3em` (42px) and the dense variants
from `2em`/`2.4em` (30/33.6px — the header's Menu button among them).

Every control *height* declaration now reads `var(--q-control-height)`
(`48px` for MD3 and MD2, `auto` for Unstyled). The shared component scale does
**not** move: `--q-comp-md` is also `font-size` for banners, list items and
radios, and raising it would jump body text to 48px. Width declarations
(`min-width` on round/dense-round) keep their reference values — this is a
height-only change.
