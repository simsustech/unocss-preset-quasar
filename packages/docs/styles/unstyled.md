# Unstyled

Structure without paint: geometry, layout, and behavior kept; color, radius, typography, elevation, spacing and state layers removed. Unstyled is the foundation for building your own design system on top of Quasar's markup.

```ts
import { Unstyled } from 'unocss-preset-quasar/styles'

QuasarPreset({ styles: [Unstyled] }) // Unstyled is the baseline — nothing else ships
```

## How it removes paint

Two halves work together:

1. **Tokens resolve to neutral.** Every token in the entry becomes `0`, `transparent`, `inherit`, `none`, or `linear` — so `var(--q-btn-radius)` computes to `0`, `var(--q-primary)` to `transparent`, durations to `0s`. No theme value can leak through, because the block simply has no color in it.

   ```css
   body.quasar-style-unstyled {
     --q-btn-radius: 0;
     --q-btn-bg: transparent;
     --q-elevation-level1: none;
     /* …every token neutralised */
   }
   ```

2. **Literals get resets.** A ported rule that states a literal (`background: rgba(…)`, a literal shadow) cannot be neutralised by a token flip — so those declarations are reset by **rules the Unstyled entry owns** (`src/styles/unstyled/rules/`). They ship if and only if `Unstyled` is listed, and non-baseline entries are scoped to `body.quasar-style-unstyled`.

## What survives

- `position`, `display`, flex/grid layout
- `overflow`, sizing, z-index (overlays still stack correctly)
- `cursor`, pointer behavior, transitions' _structure_ (durations zero out)
- Native geometry — controls keep their boxes (an unstyled toggle still tracks and slides; it just paints nothing)

## What goes

| Removed                              | Resolves to               |
| ------------------------------------ | ------------------------- |
| Backgrounds, text/border colors      | `transparent` / `inherit` |
| Radii                                | `0`                       |
| Font sizes/weights (component-level) | `inherit`                 |
| Box shadows                          | `none`                    |
| Spacing tokens                       | `0`                       |
| State-layer opacities                | `0`                       |
| Motion durations                     | `0s`                      |

## Usage patterns

**As the whole style** — Unstyled alone, baseline first, your utilities do the painting:

```ts
QuasarPreset({ styles: [Unstyled] })
// first entry = baseline: its resets apply unconditionally, no body class needed
```

```ts
// your shortcuts
shortcuts: {
  'q-btn': 'px-6 py-2 bg-blue-500 text-white rounded-lg font-medium',
  'q-card': 'bg-white rounded-xl shadow-lg p-6'
}
```

**As a runtime escape hatch** — listed after your baseline, so users can opt in:

```ts
QuasarPreset({ styles: [MaterialDesign3, Unstyled] })
// setStyle('unstyled') at runtime
```

## Coverage

Every component — Unstyled is not a reduced component set. The shared rule tree is identical; only the values differ. Components whose _literal_ declarations exist solely for visual effect get their resets from the entry's `rules`, which is also why an unlisted `Unstyled` leaves those literals untouched: inclusion is the switch.

Related: [Styles & Scoping](/architecture/style-configuration) · [Component Catalogue](/components/catalogue)
