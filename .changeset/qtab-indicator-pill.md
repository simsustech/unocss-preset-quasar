---
'unocss-preset-quasar': minor
---

Fix `q-tab__indicator` to span the parent QTab width

- **md3**: the tab indicator is now a full-width, bottom-anchored pill whose
  height is 40% of the tab height (radius `--q-radius-full`, background
  `--light-secondary-container`). Previously it was a fixed 56×32px pill that
  only covered ~60% of the tab and rendered left-aligned because
  `left-[calc(50%-28px)]` is invalid CSS (missing spaces around `-`).
- **md2 / unstyled**: the indicator matches Quasar's own design — a 2px
  full-width bottom bar with `background: currentColor`.
- Per-style values are expressed through the `--q-tab-indicator-*` tokens, so
  the shared shortcut stays style-agnostic.
