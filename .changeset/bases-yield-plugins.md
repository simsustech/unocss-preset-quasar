---
"unocss-preset-quasar": minor
---

one rule per base; safelist derived, plugin classes opt in

Every component is now one rule keyed by its BEM base (`/^q-fab$/`), with each
element and modifier yielded inside through `[symbols.selector]` — 419 per-class
matchers folded to one regex per base. Bodies moved verbatim, so the emitted CSS
did not change: tsc clean, 194 tests, the parity gate holds (present 2214,
missing 227, absent 42, mismatch 16) and the harness's DOM class-coverage stays
at its 84 baseline on md3 and md2.

The safelist is derived rather than hand-written (`scripts/compose-safelist.mjs`):
an entry is dropped when the extractors supply it, when no arbiter knows it, and
when it is a BEM member no rule can fire on — its styling flows from the base.
What remains splits into a base list plus `pluginSafelistMap`, and a plugin's
classes join only when the app declares them:

    QuasarPreset({ plugins: ['Dialog', 'Notify'] })

Apps that drive Quasar only through `$q.dialog()`, `$q.notify()` or `$q.loading()`
must declare those plugins or those classes are not safelisted; tag-only usage is
unaffected, since the component extractor supplies the vocabulary from markup.
