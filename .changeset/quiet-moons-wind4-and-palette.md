---
'unocss-preset-quasar': minor
---

Ship the bare Quasar colours, and fix the package's dependency shape.

**Palette.** `brown`, `grey`, `separator` and `dark-separator` are real palette
entries now. They were commented out, and neither engine supplies them — wind4 has no
`brown` in any form and spells its own palette `gray`, not `grey` — so `bg-brown`,
`text-grey`, `bg-separator` … were unstyled while safelisted. The eight hand-written
rules that stood in for them are gone; the palette provides them on demand.

**Packaging.** `@unocss/core` is a peer dependency (it was a dependency, which gave
consumers a second core instance and made `QuasarPreset`'s type incompatible with
`Preset<any>` in their config). The source imports the concrete `@unocss/*` packages
instead of the `unocss` meta-package, which also pinned exact versions, and
`@unocss/preset-icons` plus the two transformers — all imported by `src/` — are
dependencies rather than devDependencies.

Consumers who want wind4's vocabulary compose it themselves; see
`remove-wind4-dependency.md` for why the preset no longer nests it and what
`quasarWind4Options` preserves.
