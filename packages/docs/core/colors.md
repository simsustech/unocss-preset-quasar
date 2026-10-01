# Colors

Color utilities come from two sources: `--q-*` token rules this preset owns, and the palette utilities the engine generates from the shared theme. Both read the same authority — `sourceColor` — so they cannot disagree.

## Token-backed utilities (`text-*` / `bg-*`)

Generated for three groups:

| Group                | Names                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quasar aliases       | `primary`, `secondary`, `accent`, `positive`, `negative`, `info`, `warning`, `dark`, `dark-page`                                                                        |
| MD3 scheme roles     | `on-primary`, `primary-container`, `surface-*` (incl. the five container rungs), `outline`, `outline-variant`, `inverse-*`, `error*`, `tertiary*`, `shadow`, `scrim`, … |
| Light-scheme primary | `light-primary` — the reference exposes it as a utility-addressed color                                                                                                 |

```html
<span class="text-primary">themed</span>
<div class="bg-surface-container-high">elevated</div>
<span class="text-negative">error</span>
```

The brand trio (`primary`, `secondary`, `accent`) additionally emits a `.body--dark` scoped copy — the reference emits that selector, and an app's own dark override has to beat _something_ concrete.

```css
.bg-primary {
  background-color: var(--q-primary);
}
.body--dark .bg-primary {
  background-color: var(--q-primary);
}
```

## Palette utilities (engine)

`extendTheme` feeds the flat Quasar palette — `red-1…red-9`, `grey-1…grey-9`, `blue`, `deep-orange`, `light-green`, … — into the engine's theme, so the classic utility names work:

```html
<div class="bg-grey-8 text-deep-orange">palette</div>
```

Two palette names are emitted by the preset itself rather than the engine: `bg-light-blue` / `text-light-blue`. mini spells that family `sky` and would resolve the bare name to `#38bdf8`; the preset takes the class back with Quasar's `#03a9f4` (and `enforce: 'post'` displaces the engine's rule for exactly these two, measured — nothing is duplicated).

## Opacity modifiers

`bg-primary/50` works: color declarations read `--q-*-opacity` (`--q-bg-opacity`, `--q-text-opacity`, …), which the preset states at `100%` on `:root` and the engine's modifier writes per element. The read is `--q-*`-only by design — mini sets the engine's `--un-bg-opacity` to the _number_ `1` while `color-mix()` needs a percentage, so an engine-first read would invalidate the declaration and inherit the number into the subtree.

## Dark scheme

Dark values are not a second rule set. `body.body--dark` re-declares the same `--q-*` names with dark values, so every utility above flips with the body class. Two variables have their own dark truth independent of the palette:

- `--q-dark-page`, `--q-dark-surface` — the dark page background / foreground pair (the `q-dark` utility applies them to a subtree regardless of body class)
- `--q-positive` / `--q-negative` — status colors keep a scheme-aware variant (light green/red tuned per scheme; `info`/`warning` stay shared)

```html
<div class="q-dark">forces dark colors on this element only</div>
```

## What not to do

- **Don't re-declare palette values.** `var(--colors-white, #fff)` style reads are fine; hard-coding a palette color in a rule forks the authority and the next `sourceColor` change will disagree with it.
- **Don't expect `text-white` / `text-black` from `--q-*`** — those are engine palette names (`--colors-*`), deliberately not mirrored into the Quasar namespace (a `--q-white` the theme never defines would silently fall back to the inherited color).

Related: [Theming & Tokens](/core/theming) · [Colors API](/api/theme)
