---
'unocss-preset-quasar': patch
---

fix: QField root element now has w-full for full-width layout

- QField: add `w-full` to `.q-field` shortcut so QField-based components (QSelect, QInput, etc.) fill their container width
