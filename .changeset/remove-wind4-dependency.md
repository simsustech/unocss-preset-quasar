---
"unocss-preset-quasar": minor
---

feat(preset): nest `@unocss/preset-mini` instead of `@unocss/preset-wind4`

The preset shipped wind4 as its nested engine. wind4 registers its `--un-*`
custom properties *on demand* through `@property`, so a Quasar-only app (no
wind4 utility in the content) referenced declarations nobody had defined: the
`q-dialog` shadow chain `var(--un-inset-shadow), var(--un-inset-ring-shadow), …`
was invalid and silently rendered nothing. It also marked every one of those
properties `inherits: false`, which a consumer's engine cannot undo. On top of
that its base reset clobbers Quasar's controls, and its bare `col-N` grid rule
(``.col-6 { grid-column: 6 }``) shadows Quasar's flexbox `.col-6`.

`preset-mini` has none of those problems: it states its defaults eagerly in one
`*, ::before, ::after` block, ships no reset, and defines no bare `col-N`. The
palette still reaches the engine through our `extendTheme`, so every
`bg-*`/`text-*` class resolves to Quasar's value — verified for all 546 palette
classes against the wind4 build (the only divergence, the two bare
`light-blue` names, is now emitted by the preset itself).

What this changes for consumers:

- **Tailwind-ish utilities are no longer free.** The engine stays nested, so
  `flex`, `p-4`, `grid`, `gap-*` and friends still work, but their values come
  from mini's vocabulary. An app that wants wind4's value forms or its
  colour-mix output adds wind4 itself, with the exported options:

      import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'

      presets: [presetWind4(quasarWind4Options), QuasarPreset()]

  Passing the fragment preserves the behaviour the preset used to set up for
  you — no base reset (which otherwise clobbers Quasar's buttons) and the
  `dark:` variant mapped to Quasar's own `.body--dark` / `.body--light`.
  Without it, `dark:` utilities hang off Tailwind's `.dark` class, which Quasar
  never sets, so they never match.

- **Order decides shared utilities.** With two engines present, the last preset
  wins for names both define (`bg-light-blue` in particular). Keep
  `QuasarPreset()` where it is in the array; Quasar-owned class names (`row`,
  `col-6`, `q-btn`, …) win in either order because the preset carries
  `enforce: 'post'`.

- **Defaults we own moved into `--q-*`.** Declarations that referenced
  engine-internal names now read `var(--un-<name>, var(--q-<name>))` with our
  own default, and the opacity quartet reads `--q-<bg|text|border|outline>-opacity`
  outright — mini sets `--un-bg-opacity` to the *number* `1` and registers no
  `@property`, so an engine-first read would invalidate our
  `color-mix(… var(--un-bg-opacity) …)` on any element carrying a mini colour
  utility. `--q-*` defaults are stated in the preset's `:root` block.

- The `all-pointer-events` preflight workaround added in 0.5.5 stays: consumers
  who add wind4 still need their `all-` utility scoped the way wind4 writes it.

`@unocss/preset-mini` moves from `devDependencies` to `dependencies`;
`@unocss/preset-wind4` moves the other way, since it is now only used by the
test suite's reference comparison.
