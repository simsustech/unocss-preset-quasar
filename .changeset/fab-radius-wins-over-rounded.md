---
'unocss-preset-quasar': patch
---

Let the md3 FAB radius win over `q-btn--rounded`.

Quasar's `QBtn` adds `q-btn--rounded` to every fab (`rounded || fab ||
fabMini`), and `.q-btn--rounded` resolves to `var(--q-btn-rounded-radius)`
= `--q-radius-xl` = 28px, emitted after `.q-btn--fab`. A 56px fab
therefore computed to a full circle instead of md3's 16px.

Applied as `!important` on `--fab` and `--fab-mini`, restoring the intent
main carried as `!rounded-$q-fab-radius` (`07306d6`) after the rewrite
deleted the shortcut file it lived in.
