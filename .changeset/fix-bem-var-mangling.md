---
"unocss-preset-quasar": patch
---

Fix BEM class-name mangling in bracket-variant selectors

UnoCSS preset-wind4's cssVarsRE incorrectly converts BEM double-dash modifiers
(e.g. `--flat`, `--mini`, `--highlighted`) inside bracket-variant selectors to
`var()` references, producing invalid CSS class selectors like
`.q-btnvar(--flat)` instead of `.q-btn--flat`.

Added a `fixBemVarMangling` postprocessor that undoes this mangling with a
two-pass regex loop, handling nested `var(var(--xxx))` cases and
multi-modifier selectors spanning whitespace/dots.

Fixes lightningcss build failures when using preset-wind4 with BEM class names.
