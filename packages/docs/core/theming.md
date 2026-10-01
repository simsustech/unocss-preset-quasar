# Theming & Tokens

Every visual value in the preset resolves through a CSS custom property. Components state _structure_ once; tokens supply _values_ per style, per scheme, per palette — which is why style switching, dark mode and runtime re-coloring are all variable writes instead of CSS regeneration.

## Where variables live

| Emitted on                              | Contents                                                                                                                                                                                      | Varies with             |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `:root`                                 | Light-scheme roles (`--light-primary`, `--light-surface-container`, …), dark-scheme roles (`--dark-*`), Quasar aliases (`--q-primary`, `--q-positive`, …)                                     | `sourceColor`           |
| `:root`                                 | Shape roles, screen breakpoints `--q-size-{xs…xl}`, engine namespace (`--spacing`, `--radius-*`, `--fontWeight-*`), owned defaults (`--q-bg-opacity`, `--q-outline-style`, ring/shadow chain) | fixed                   |
| `body`                                  | The **baseline** style's tokens (`--q-btn-radius`, `--q-space-md`, `--q-elevation-level1`, …)                                                                                                 | first entry in `styles` |
| `body.quasar-style-{name}`              | Each additional style's _diff_ against the baseline                                                                                                                                           | listed styles           |
| `body.body--dark` (+ `.quasar-style-*`) | Dark values of the same tokens                                                                                                                                                                | scheme                  |
| `body.body--dark`                       | `--q-positive`/`--q-negative` dark exceptions, dark page colors                                                                                                                               | scheme                  |

Reading a variable in your own CSS works exactly as it does in the preset's rules:

```css
.my-widget {
  background: var(--light-surface-container);
  color: var(--light-on-surface);
}
.body--dark .my-widget {
  background: var(--dark-surface-container);
  color: var(--dark-on-surface);
}
```

## The color pipeline

`sourceColor` (option, default `#1976d2`) → `generateColorTokens()` → three blocks:

- **`light` / `dark`** — Material scheme roles: primary/secondary/tertiary/error families, the surface-container rung, outline, inverse, scrim, … Computed with `@poupe/material-color-utilities`, including the MD3 surface tones the library's `Scheme` class does not expose (they come from the _neutral_ palette at fixed tones, so surfaces stay near-neutral instead of tinting with the primary).
- **`quasar`** — Quasar's alias set harmonized to the source color (`primary`, `secondary`, `accent`, `positive`, `negative`, `info`, `warning`, `dark`, `dark-page`).
- **`quasarDark`** — the scheme-aware exceptions (`--q-positive`/`--q-negative` flip under `body.body--dark`; the rest of the alias block is light-scheme by contract).

The same generator feeds UnoCSS's theme through `extendTheme`, so the engine's palette utilities (`bg-grey-8`, `text-deep-orange`) and the `--q-*` tokens always agree — one authority for color.

## Token categories

Each style entry's `tokens` block (see [Styles & Scoping](/architecture/style-configuration)):

| Category     | Examples                                                                |
| ------------ | ----------------------------------------------------------------------- |
| `shape`      | `cornerMedium: '12px'`, `radiusXl: '28px'`, `cornerCircle: '50%'`       |
| `typography` | `labelSmall: '500 11px/16px Roboto'`, `hoverOpacity: '0.08'`            |
| `elevation`  | `elevationLevel1…5`, `elevationLevel0: 'none'`                          |
| `sizing`     | `spaceXs…spaceXl`, `controlHeight: '48px'`, `compIcon: '24px'`          |
| `motion`     | `durationMedium: '300ms'`, `easingStandard: 'cubic-bezier(…)'`          |
| `component`  | `btnRadius`, `btnBg`, `cardRadius`, `toggleTrackBg`, `itemMinHeight`, … |

Component tokens frequently reference other tokens (`cardRadius: 'var(--q-radius-lg)'`), so overriding one shape token restyles everything that aliases it.

## Deliberate conventions

- **Missing tokens default safely.** A hand-built entry that omits a category emits `transparent` / `none` / `0` / `inherit` rather than an undefined `var()` — an undefined custom property invalidates the whole declaration at computed-value time (this is also why the elevation chain once rendered nothing, silently).
- **`--q-*` is the public namespace for defaults we own** — consumer CSS may read it. Engine-internal `--un-*` names are read engine-first with a `--q-*` fallback, except the opacity quartet, which reads `--q-*-opacity` outright (mini and wind4 disagree about the _type_ of the same name).
- **Some variables are Quasar's runtime, not ours.** `--q-drawer-width` and `--q-fab-stagger` are written inline by Quasar's JavaScript; a test asserts every unresolvable `var()` in the emitted sheet is exactly one of those two.
- **Screen breakpoints are literals on `:root`** (`--q-size-*`) because Quasar's Screen plugin _parses them out of the stylesheet_ — this preset replaces `quasar.css` wholesale, so without them `$q.screen` misreads every breakpoint. Media queries cannot use `var()` at all, so the responsive classes carry the numbers directly.

## Changing the palette

| When                       | How                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build time                 | `QuasarPreset({ sourceColor: '#6750A4' })`                                                                                                                     |
| Runtime, one source color  | [`applySourceColor('#6750A4')`](/api/runtime) — re-derives the palette and overrides the `--q-*` colors on `:root`; `resetSourceColor()` restores build values |
| Runtime, full theme object | [`setThemeColors(theme.colors)`](/api/set-theme-colors) — writes `--light-*`/`--dark-*`/alias variables onto `document.body`                                   |

Dark mode needs none of these: flip it with Quasar's `Dark.set(true)` — the preflight already carries both schemes.

Related: [Colors](/core/colors) · [Theme API](/api/theme)
