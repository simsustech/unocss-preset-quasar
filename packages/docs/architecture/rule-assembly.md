# Rule Assembly

UnoCSS resolves two ways that both cut against a large rule set: matchers are checked in reverse preset order (first match wins, last registered), and only the _last_ rule per regex survives. The preset neutralises both at assembly time, then orders what remains into explicit cascade bands.

## Cascade bands

Rules are assigned to layers, emitted in this order:

| Layer               | Order | Contents                                                       | Why it sits here                                                                                                                                                                                       |
| ------------------- | ----- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quasar.grid`       | −4    | `row`, `column`, `col-*`, gutters                              | Must precede component rules: `.column { flex: 1 1 auto }` has to lose to `.q-item__section--main { flex: 10000 1 0% }` — the reference puts the utility first and the component wins on cascade order |
| `quasar.components` | −3    | All `src/components/` rules                                    | Component layout beats equal-specificity utilities                                                                                                                                                     |
| `quasar.app`        | −2    | Declared app-extension rules                                   | Opt-in libraries band between components and styles                                                                                                                                                    |
| `quasar.styles`     | −1    | Style entries' own rules (scoped)                              | A style's reset must come _after_ the base rule it neutralises and _before_ the utilities meant to override either                                                                                     |
| `default`           | 0     | This preset's remaining core utilities, the engine's utilities | `bg-*` / `text-*` win: otherwise `.q-btn { background: transparent }` would beat `bg-secondary`                                                                                                        |

The bands exist because array order cannot reach every utility. The engine's palette classes (`bg-pink`) are generated from `extendTheme` and land wherever the engine puts them; explicit layers — not array position — guarantee component rules and palette utilities resolve correctly regardless.

The preset also carries `enforce: 'post'`, so it is registered after nested presets. Quasar-owned class names (`col-6`, `row`, `q-btn`) stay this preset's in either array order, even when the app adds a second engine.

## Duplicate-rule merge

UnoCSS keeps only the last rule registered for a given regex and silently discards earlier ones. The preset once declared 42 regexes more than once — 71 lost entries, including `/^q-header$/`, whose base rule was dropped by a second registration, leaving `.q-header` transparent in every app.

`mergeDuplicateRules()` collapses duplicates at assembly: declarations are yielded in source order inside one merged entry, so a later declaration still overrides an earlier one for the same property — the previous cascade result, with nothing dropped. Async matchers pass through unmerged, and a test asserts the preset contains no duplicate sync regex at all.

## The engine

The nested engine is `@unocss/preset-mini` — the classes this preset does not own (`flex`, `p-4`, the palette utilities) come from it. mini was chosen over wind4 by measurement, not preference:

- wind4 states `--un-*` variables on demand; with Quasar-only content it emitted a zero-length sheet, breaking chains like `.q-dialog`'s shadow.
- wind4's base reset clobbers Quasar's own control styling; mini ships no reset.
- wind4's bare `col-6` is a grid rule that would shadow Quasar's flexbox `.col-6`.

Apps that want wind4 add it themselves:

```ts
import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'
import presetWind4 from '@unocss/preset-wind4'

presets: [
  presetWind4(quasarWind4Options),
  QuasarPreset({ styles: QuasarStyleEntries })
]
```

`quasarWind4Options` carries the two settings the old nested setup required: `preflights: { reset: false }` and `dark: { light: '.body--light', dark: '.body--dark' }` (wind4's default `.dark` class is never set by Quasar).

## Variable ownership

Rules read engine-internal names engine-first with a `--q-*` fallback — `var(--un-outline-style, var(--q-outline-style))` — except the opacity quartet (`--q-bg-opacity` and friends), which reads `--q-*` outright because mini and wind4 disagree about the _type_ of the same name (a number vs. a registered percentage), and `color-mix()` needs the percentage. All `--q-*` defaults are stated in the preset's `:root` block, so the sheet renders correctly regardless of which engine is present.
