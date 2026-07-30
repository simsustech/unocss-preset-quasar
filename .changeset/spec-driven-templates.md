---
"unocss-preset-quasar": minor
---

feat(spec): introduce StyleSpec as single source of truth

- Add `StyleSpec` schema with token, component, accessibility, and layout sections
- Add `md3`, `md2`, and `unstyled` spec modules under `src/spec/`
- Add spec registry with `getStyleSpec()` and `listStyles()`
- Add `bindSpec()` interpolation helper for spec-driven component templates
- Migrate components to spec-driven templates where templates differ only in literals
- Delete `material_design_2_machine_spec.json` and `material_design_3_machine_spec.json` (superseded)
- Add `docs/CONVERSION.md` documenting the migration rationale
- Add `"./spec"` subpath export for the spec module
