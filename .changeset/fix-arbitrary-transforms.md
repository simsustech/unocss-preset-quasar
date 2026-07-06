---
"unocss-preset-quasar": patch
---

fix: replace UnoCSS shorthand translate utilities with explicit [transform:...] arbitrary values to prevent specificity conflicts when other transform properties (scale, origin) are present

fix: remove opacity-0 from q-img\_\_image base class and use !important on q-img\_\_image--loaded to ensure loaded images display correctly

fix: remove overflow:hidden from html,body in QLayout preflights to restore page scrollability

fix: add unstyled QDrawer background color tokens
