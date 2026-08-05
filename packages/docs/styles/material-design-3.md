# Material Design 3

The Material Design 3 style implements Google's latest Material You design specification. It's the **default and recommended** style.

## Key Characteristics

### Dynamic Color

MD3 generates a full tonal palette from a single `sourceColor`. The palette includes light and dark variants of primary, secondary, tertiary, error, and surface colors with multiple container levels.

```ts
import { Md3StyleEntry } from 'unocss-preset-quasar/styles'

QuasarPreset({
  styles: [Md3StyleEntry],
  sourceColor: '#6750A4' // Purple theme
})
```

### Surface Elevation

Instead of box shadows, MD3 uses **tonal surface elevation** — higher surfaces are tinted lighter (in light mode) or darker (in dark mode):

```
surface-container-lowest  → dimmest (background)
surface-container-low     → slightly elevated
surface-container         → default card surface
surface-container-high    → elevated cards/dialogs
surface-container-highest → highest elevation
```

### Shape System

MD3 uses rounded corners with Material's shape scale:

- Extra small: 4px (chips, small inputs)
- Small: 8px (cards)
- Medium: 12px (dialogs)
- Large: 16px (sheets)
- Extra large: 28px (FAB, buttons — pill shape)

### State Layers

Interactive components apply state layers on hover, focus, and press:

- Hover: 8% overlay
- Focus: 12% overlay
- Press: 12% overlay

### Typography

MD3 type scale with 5 font weights (Roboto 300–700):

- Display: 6rem light (text-h1)
- Headline: 3.75rem light (text-h2) to 1.25rem medium (text-h6)
- Title: 1rem normal (text-subtitle1) to 0.875rem medium (text-subtitle2)
- Body: 1rem normal (text-body1) to 0.875rem normal (text-body2)
- Label: 0.75rem medium (text-overline) to 0.75rem normal (text-caption)

## Component Details

### QBtn

MD3 buttons use pill-shaped corners (28px border-radius). Variants:

| Variant          | Background                | Border  | Text                 |
| ---------------- | ------------------------- | ------- | -------------------- |
| Default (filled) | Primary container         | None    | On primary container |
| Flat             | Transparent               | None    | Primary              |
| Outline          | Transparent               | Outline | Primary              |
| Push             | Primary                   | None    | White                |
| Unelevated       | Surface container highest | None    | On surface           |

### QCard

MD3 cards use surface containers. Variants:

- Default: surface container
- Filled: surface container highest
- Outlined: outline variant border

### QDialog

MD3 dialogs use surface container high with 28px corner radius and a scrim overlay at 32% opacity.

### QField

MD3 fields support four styles:

- Filled: surface variant background, underline indicator
- Outlined: outline border, no background
- Standard: bottom border only
- Standout: elevated surface

MD3 component tokens are in `packages/preset/src/core/_tokens.ts` — the `md3` block. Component shortcuts live in the shared tree under `packages/preset/src/styles/shared/components/`.
