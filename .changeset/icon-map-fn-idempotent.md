---
'unocss-preset-quasar': patch
---

Make `quasarIconSet`'s `iconMapFn` idempotent: a value that is already an
iconify class (`i-mdi-star` — Quasar hands back the rewritten set values and an
explicit `i-mdi-*` prop through the same mapping) is returned unchanged instead
of being double-prefixed to `i-mdi-i-mdi-star`. Preserve the icon set's own
`name` identifier through the leaf rewrite too: QMediaPlayer resolves
`$q.iconSet.name` against its `iconSetLoaders` table, which knows `mdi-v7`, not
`i-mdi-v7`.
