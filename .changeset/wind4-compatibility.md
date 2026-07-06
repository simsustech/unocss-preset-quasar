---
"unocss-preset-quasar": patch
---

wind4 compatibility upgrade

- Replace beasties normalize with modern reset in @layer 0-reset
- Disable wind4 base reset (`preflights: { reset: false }`)
- Fix `border-[Npx]` → `[border-width:Npx]` across 38 occurrences
- Remove `q-btn--rectangle` shortcut from MD3 (rounded by default)
- Increase QBtn standard specificity via `.q-btn--standard.q-btn--rectangle`
- Fix checkbox `stroke-dashoffset` and `stroke-width` for wind4
- Fix `q-dark` shortcut CSS variable references
- QField: control-container flex-grow, standard padding, append icon color
- QIcon: `text-inherit` for parent color override
- QTab indicator: centered pill with `secondary-container` bg
- QBtn flat/outline: add `rounded-[28px]`
- Layer config: `0-reset`, `1-modifier`, `2-base`, `3-components`, `4-state`
