# ADR 0004 — the defaults we own live in `--q-*`, not in the engine's namespace

**Status:** accepted · **Context:** 67 declarations read engine-internal `--un-*`
names and the theme's `--colors-*`; that was safe only while the nested engine was
wind4, which registers those names globally with the right types.

## Decision

Two read forms, decided per family by _who guarantees the name_:

- **The opacity quartet reads `--q-{bg,text,border,outline}-opacity` outright.**
  mini sets `--un-bg-opacity` to the _number_ `1` per utility, and registers no
  `@property`, so an engine-first read inside `color-mix(…)` — which needs a
  percentage — becomes invalid on any element under a mini colour utility, and the
  number inherits into the subtree. wind4 registers
  `syntax: "<percentage>"; initial-value: 100%`, so the two engines genuinely
  disagree about the type of the same name.
- **Everything else keeps the engine first and our value as the fallback**:
  `var(--un-outline-style, var(--q-outline-style))`, the `--q-inset-*` /
  `--q-ring-*` / `--q-shadow` chain, `var(--un-translate-x/y, var(--q-translate-x/y))`.
  No engine states these globally (measured: wind4 leaves them undefined in a
  Quasar-only app; mini's eager block covers only the transform/ring/shadow
  family), so our default is what renders — while a consumer's own utility can
  still compose into a Quasar declaration.
- **Theme colours get literal or token fallbacks**:
  `var(--colors-white, #fff)`, `var(--colors-black, #000)`. mini emits no
  `--colors-*` at all (it inlines the palette); wind4 emits them from the theme.
- **Names we set _and_ read are ours alone** and moved wholesale:
  `--q-content` (four components declare and read it) and
  `--q-border-left-opacity`.
- The defaults themselves are stated in the preset's `:root` block from
  `src/theme/engine.ts` (`quasarDefaults`), with the values pinned to the vendored
  reference bundle by `test/engine-namespaces.test.ts` — the `*` block for the
  opacity/contain/content/translate family, the `@property` initial values for the
  ring/shadow family. `--un-translate-*` is `initial` there and `0` here: both mean
  "no translation", and `0` keeps `translateX(var(--q-translate-x))` valid.

## Consequences

- The sheet no longer ships engine-named defaults, so it cannot be wrong about
  which engine is present. `test/engine-reads.test.ts` guards the two forms (a
  source scan for engine-first opacity reads; emitted-declaration assertions for
  the rest) and `test/runtime-variables.test.ts` now holds the stronger invariant:
  every `var()` reference **without a fallback** is one Quasar's JavaScript sets at
  runtime. The old blanket `--un-*` exclusion is gone.
- One consequence is visible to consumers: the declarations read `--q-*-opacity`,
  so an app that overrode `--un-text-opacity` to tint a Quasar element has to
  override `--q-text-opacity` instead. Nothing in Quasar's documented API does
  that; the note lives in the changeset.
- `--q-*` is now the preset's public custom-property namespace for defaults, not
  just for tokens — a name in it may be read by consumer CSS rather than only
  written.
