---
"unocss-preset-quasar": minor
---

feat(preset): tree-shaken style entries and style-owned rules

Style configuration is now explicit and tree-shaken:

- `QuasarPreset()` throws when neither `styles` nor `style` is passed
- only listed entries ship (tokens + rules)
- `QuasarStyleEntry` gains `rules` for declarations tokens cannot express
- unstyled resets moved out of component rules into the style itself
- fix: QMarkdown token colours in md3 (grouped stub selectors were only partly scoped)
