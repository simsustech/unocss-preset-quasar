# ADR 0017 — the preset provides the Quasar icon set, parameterised by library

Status: accepted (2026-10-07)

## Context

Quasar's `parseIcon` resolves an icon name in order: an `iconSet` function, a
`libPrefixes` guess (`i-`/`mdi-`/…), Font Awesome legacy, an SVG path — and
finally a **Material Icons ligature** (`cls: 'notranslate material-icons'`,
`ligature: true`; `quasar/dist/quasar.client.js:1690-1720`). An icon name the
app's `iconSet` does not resolve therefore renders the literal name **as text**,
because nothing ships the Material Icons font. Measured in
`quasar-testing-harness` on 2026-10-07 (BUG-003): 69 vision units across 11
components were that one path.

Two alternatives were on the table:

- **Ship the font.** The preset would carry a Material Icons webfont and its
  `@font-face` rule. It covers one of the libraries `@quasar/extras` ships, adds
  a font download to every consumer that may never render an icon, and leaves
  the fallback reachable for every other library's names.
- **Let each app hand-write the nested set.** The harness had done exactly that:
  a 140-line literal transcribing all 20 Quasar keys. It drifts from
  `quasar/dist/icon-set` silently, duplicates the same data in every app, and
  does not close the fallback — without an `iconMapFn` a bare name the map lacks
  (`icon="star"`) still reaches the ligature.

## Decision

The preset owns the icon set and parameterises it by library:
`QuasarPreset({ iconSet: 'mdi-v7' })` and `quasarIconSet('mdi-v7')`. The set is
derived from Quasar's own `quasar/dist/icon-set/<library>` data
(`scripts/generate-icon-sets.mjs` → `src/icons/quasar-icon-sets.generated.ts`):
every value is rewritten to its iconify class, and an `iconMapFn` maps _any_
bare name to `i-<collection>-<name>` (or to `none` when the library has no
collection). `svg-*` sets and themify pass their leaves through — they are SVG
path data and font classes, not icon names. The `iconSet` option is unchanged
for an app that passes a nested map or a function: `resolveIconSet` passes those
through exactly as before.

The iconify packs stay **consumer-installed optional peerDependencies**, never
`dependencies`. The preset supports every `@quasar/extras` library, but a
consumer installs the one collection (`@iconify-json/mdi`, …) whose icons it
renders; as dependencies they would land in every install and tie the preset's
release cadence to theirs. `peerDependenciesMeta.*.optional: true` states the
compatible range without requiring the install, and when a collection the chosen
library resolves to is missing the preset warns at config time naming the
`@iconify-json/<collection>` package. `@quasar/extras` is not a preset
dependency either: the library union is transcribed type-only and guarded by a
test against the installed package.

Three substitutions are deliberate and lossy — the best iconify equivalent, not
an assertion of parity:

- every `material-icons*` variant (`material-icons`, `-outlined`, `-round`,
  `-sharp`, and their `svg-*` twins) → the `ic` collection. These are ligature
  fonts, not iconify collections; their names are already `ic` names, so the
  class resolves without the font.
- every `material-symbols*` variant → `material-symbols`, with the `sym_[ors]_`
  prefix stripped.
- `fontawesome-v7-pro` → the **free** `fa7-solid` collection, like
  `fontawesome-v7`. Pro-only icons have no CSS and render empty.

A consumer that genuinely wants a substituted variant keeps passing its own
nested map — that path is untouched.

`themify` is the exception with no substitution at all: iconify ships no `ti`
collection (`@iconify-json/ti` does not exist), so `LIBRARY_ICONIFY.themify` is
`{ collection: null }`. Its set values pass through as the font classes Quasar
resolves through `libPrefixes`, no `@iconify-json/ti` peer is declared, and
`iconMapFn` returns `none` — a bare name renders empty rather than as ligature
text.

## Consequences

- A consumer that passes a library string no longer reaches the ligature path:
  both the set values and bare names resolve through an `i-*` class.
- Runtime-computed names remain the consumer's safelist problem: the class
  exists only once the app renders it, so an app whose `icon` prop comes from
  data must safelist the classes (the harness derives them through
  `quasarIconSet(...).iconMapFn`).
- A library `@quasar/extras` adds must be transcribed into `QuasarIconLibrary`
  and `LIBRARY_ICONIFY`; the `satisfies Record<QuasarIconLibrary, …>` on the
  table and the drift test against `@quasar/extras/index.d.ts` fail until it is.
- `quasar/dist/icon-set` is the data source, so regenerating
  `quasar-icon-sets.generated.ts` (`pnpm generate:icon-sets`) is the only way to
  track a Quasar icon-set update; never hand-edit it.
