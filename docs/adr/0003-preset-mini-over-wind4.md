# ADR 0003 — the nested engine is `preset-mini`, not `preset-wind4`

**Status:** accepted · **Context:** the preset shipped wind4 as its nested engine,
and a Quasar-only app never made wind4 emit the variables its own output needs.

## Decision

Nest `@unocss/preset-mini`. wind4 is no longer a dependency of the runtime sheet;
consumers who want it add it themselves with the exported `quasarWind4Options`
fragment (ADR 0004 covers the namespace side, the fragment is documented in
`packages/docs/api/quasar-preset-options.md`).

Measured reasons, each verified by generating the two engines side by side:

- **wind4 states `--un-*` on demand.** With Quasar-only content `presetWind4()`
  alone emits a zero-length sheet: the declarations that name `--un-*-opacity`,
  `--un-outline-style` and the ring/shadow chain never resolve. The `q-dialog`
  shadow chain was invalid and silently rendered nothing. mini states an eager
  `*, ::before, ::after` block instead.
- **wind4's reset clobbers Quasar's controls** (`*` + `::backdrop` plus
  `@supports` fallbacks). mini ships no
  reset at all, so `preflights: { reset: false }` disappears from the wiring.
- **wind4's bare `col-N` is a grid rule** (`.col-6 { grid-column: 6 }`) and would
  shadow Quasar's flexbox `.col-6`; mini has no such rule. `enforce: 'post'`
  stays anyway, because a _consumer's_ engine is still in the array.
- **`--un-bg-opacity` is a number in mini and a percentage registration in wind4.**
  `color-mix(… var(--un-bg-opacity) …)` needs a percentage, so the opacity quartet
  reads our own `--q-*-opacity` (ADR 0004) rather than either engine's name.

Kept deliberately:

- The shape had to stay byte-comparable: swapping the nested preset in place
  changes 1732 of 1733 class selectors **not at all**, and the palette is
  identical for 611 of the 613 `bg-*`/`text-*` classes. The two that differ
  (`bg-light-blue`, `text-light-blue`) are emitted by the preset itself, because
  mini spells that name as its Tailwind `sky` family — measured: injecting a
  nested palette entry through `extendTheme` does **not** change mini's resolution.
- `test/palette-engine-parity.test.ts` is the ratchet: same colour on mini and on
  a consumer's wind4, class for class.

## Consequences

- `@unocss/preset-mini` moves to `dependencies`; `@unocss/preset-wind4` moves to
  `devDependencies`, where the tests use it as the second engine.
- The parity gate's recorded baseline absorbs the engine-vocabulary deltas once
  (mini's `rotate-180` is a `transform` composite where wind4 emits `rotate: 180deg`;
  wind4's reset family; wind4's `@supports` colour-mix upgrade twins). It was
  re-recorded with those reasons, not regenerated blind.
- The `all-pointer-events` preflight workaround from 0.5.5 stays: consumers who add
  wind4 still need their `all-` utility scoped the way wind4 writes it.
- Wording that says "wind4" in this repo now means "the engine wind4, when a
  consumer brings it"; the nested engine is mini.
