---
'unocss-preset-quasar': patch
---

Follow the md3 state-layer opacities for hover, focus and press.

The reference bundle hardcodes `0.15` for all three, which on a nav rail
or list row reads as a smudge rather than a state change. md3 specifies
hover +8%, focus +10%, press +10%, tinted with the content colour
(`m3.material.io/foundations/interaction/states/state-layers`).

There was no press rule at all, so clicking was indistinguishable from
hovering. The new press selector carries both `:hover` and `:active` on
purpose: its declarations match the focus rules, so UnoCSS folds it into
that group, and that group is emitted *before* `:hover` — at equal
specificity, hover would have won on source order alone.

`focusable`, `hoverable` and `manual-focusable` consequently move off
`target: 0` in the parity ratchet. They now diverge from the vendored
Quasar reference deliberately, and the divergence is recorded in the
baseline rather than hidden — same treatment `item/rules.ts` already
applies where md3 and the reference disagree.
