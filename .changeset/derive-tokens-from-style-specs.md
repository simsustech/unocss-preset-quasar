---
'unocss-preset-quasar': patch
---

refactor: derive runtime tokens from the StyleSpecs — single source of truth

- The per-style runtime token values (`--q-*`) are no longer hand-maintained
  in `core/_tokens.ts`; they are derived from the StyleSpecs
  (`spec/md3.spec.ts`, `spec/md2.spec.ts`, `spec/unstyled.spec.ts`) via
  `core/_tokenDerive.ts`. Edit a spec to change a style.
- Removed the deprecated `MaterialDesign2` / `MaterialDesign3` / `Unstyled`
  style-entry aliases, the unused `mergeTokens()` export, and the dead
  `DesignTokens.dark` block. `style` remains a supported shorthand for
  `styles: [style]`.
- Corrected MD2 hover-state opacity from 0.08 to 0.04 to match the MD2
  specification (the old value was a copy of MD3's).
- Added a drift-guard test (`test/token-derive.test.ts`) that fails if a
  spec edit silently changes an emitted `--q-*` value.
