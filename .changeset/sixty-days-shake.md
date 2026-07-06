---
'unocss-preset-quasar': minor
---

fix: QField dark mode, QTooltip position, QCarousel styling, QDate calendar

- QField: dark mode input text uses #fff, labels use on-surface-variant per MD3 spec
- QTooltip: add position:fixed in MD3/MD2 preflights to fix hover not showing
- QCarousel: slide explicit h-[400px], no-repeat background, remove default padding
- QDate: fix calendar overlapping header and missing width in md3
- Replace hardcoded dark:text-* utilities with token-based colors throughout
- Restore qe tagged templates for BEM __ in brackets
