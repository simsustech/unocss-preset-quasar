---
'unocss-preset-quasar': patch
---

Restore `MaterialDesign2` / `MaterialDesign3` / `Unstyled` as the canonical style-entry exports

- The style entries exported from `unocss-preset-quasar/styles` are named
  `MaterialDesign2`, `MaterialDesign3`, and `Unstyled` again (as in 0.4.x),
  matching the module path (`styles/`).
- The 0.5.x names — `Md2StyleEntry` / `Md3StyleEntry` / `UnstyledStyleEntry` —
  are kept as deprecated aliases, so configs written against 0.5.0–0.5.2 keep
  working unchanged.
- This restores the `MaterialDesign*` / `Unstyled` exports that 0.5.2 removed,
  which broke `import { MaterialDesign3 } from 'unocss-preset-quasar/styles'`
  for existing consumers at module-load time.
