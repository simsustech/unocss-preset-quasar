---
'unocss-preset-quasar': patch
---

fix(preset): render QCheckbox's check, state layer and icon mode correctly

Four defects in `components/checkbox/rules.ts`, found by screenshot and
computed-style probes against `/q-checkbox` in the harness:

- **The indeterminate dash painted over the check.** The AUD-024 fold dropped
  the reference's `transform: rotate(-280deg) scale(0)` down to `rotate`, so the
  dash stayed visible at its intrinsic 3.9×9.6px in the truthy *and* the falsy
  state. `scale(0)` is restored as the hidden default; the `--indet` state yield
  cancels it with `transform: scale(1)`.
- **The glyph box sat 2px up-left**, clipping the strokes into the border: the
  full-cover rule reset `top/left/width/height/border` but not the reference
  inset's own `margin: -2px`.
- **The hover/focus state layer anchored on the control's top-left corner**
  instead of its centre: the hover yield re-declared the reference's
  `top/left/right/bottom: 0`, which combined with the base 40dp width and
  `translate: -50% -50%` threw the 48px circle off the inner. Hover now only
  scales the base layer, as `:focus`/`:focus-visible` already did.
- **Icon mode (`checkedIcon`/`uncheckedIcon`) rendered a 24px glyph** inside the
  18px box, over the label: `.q-checkbox__icon`'s 0.5em lost to
  `.q-icon { font-size: var(--q-comp-icon) }`, emitted later at the same (0,1,0)
  specificity. The size now also ships component-scoped
  (`.q-checkbox .q-checkbox__icon`); the reference's single-class rule stays for
  the parity ratchet.

Why a component icon needs the scoped selector, and why both yields exist, is
recorded in ADR 0013.

Guarded in the harness by `tests/rewrite-comprehensive.spec.ts` (indeterminate
dash, glyph centring, hover centring, icon size, plus the screenshot baseline
`q-checkbox-md3.png`) and by `tests/spec-conformance.spec.ts` (AUD-029).
