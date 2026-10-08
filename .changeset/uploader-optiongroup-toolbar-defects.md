---
'unocss-preset-quasar': patch
---

Fix three confirmed preset defects. The QUploader header painted white text on a
transparent surface, so the header was invisible until a `color` prop was set;
it now carries the primary surface (`background-color: var(--q-primary)`, the
upstream QUploader rule) with the scheme-aware `--q-on-primary` text, and the
unstyled entry neutralises it. Inline QOptionGroups laid their options out
edge-to-edge, so a wrapped row's radio ring touched the previous label; the
inline container now carries `column-gap`/`row-gap` from `--q-space-sm`. And
md3's `--q-btn-flat-color: var(--q-primary)` made toolbar action icons invisible
on a `bg-primary` bar; a `.q-toolbar .q-btn--flat` carve-out sets the flat
colour to `currentColor` so the bar's foreground reaches its actions, leaving
the global md3 text-button colour intact.
