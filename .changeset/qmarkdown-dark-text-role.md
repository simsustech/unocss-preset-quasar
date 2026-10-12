---
'unocss-preset-quasar': patch
---

fix(preset): paint QMarkdown dark-mode text with an on-surface role

The ported `.body--dark .q-markdown` block mapped upstream's literal greys onto
`--q-surface-container-low` (a **surface** role) for BODY TEXT, so in dark mode
every heading, paragraph and list item resolved to `#1c1b1e` — the same colour
as the page — and disappeared. The mirrored mistake put
`--q-on-surface-variant` (`#cac4cf`, a light **text** role) behind inline code
and the striped table rows. Text now uses `--q-on-surface` and the surfaces use
`--q-surface-container-high`, so contrast survives a token flip. Guarded by
`test/markdown-dark.test.ts`.

Fixes BUG-085 (harness vision audit).
