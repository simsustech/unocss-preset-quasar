# Material Design 2

The Material Design 2 style implements the classic Material Design aesthetic. It's maintained for backward compatibility and for apps that prefer the traditional Material look.

## Key Characteristics

### Flat & Square

MD2 components have **square corners** and **flat edges**. Buttons, cards, dialogs — all use `border-radius: 0` or minimal rounding.

### Shadow-Based Elevation

Unlike MD3's tonal surfaces, MD2 uses **box shadows** for elevation. Components cast shadows based on their z-axis position. The elevation scale goes from 0 (flat) to 24 (maximum).

### Uppercase Buttons

MD2 button labels are traditionally uppercase. The `text-transform: uppercase` style is applied to buttons by default.

### Lower Contrast Surfaces

MD2 surfaces have less tonal variation between elevation levels compared to MD3. The surface hierarchy is flatter.

## Component Differences from MD3

| Component       | MD3                | MD2                       |
| --------------- | ------------------ | ------------------------- |
| QBtn            | Pill shape (28px)  | Square corners            |
| QBtn text       | Normal case        | Uppercase                 |
| QCard           | Surface container  | Flat with optional shadow |
| QDialog         | 28px corners       | Square corners            |
| QField (filled) | Surface variant bg | Grey background           |
| QFab            | Rounded            | Square-ish                |

## Usage

```ts
import { MaterialDesign2 } from 'unocss-preset-quasar/styles'

QuasarPreset({
  style: MaterialDesign2,
  sourceColor: '#1976d2' // Still uses MD3 color generation
})
```

Even though MD2 uses the classic aesthetic, it still benefits from the MD3 color generation system. The `sourceColor` generates the same tonal palette, but components apply it differently.

## Files

MD2 component shortcuts are in `packages/preset/src/styles/md2/components/` — one file per component.

## When to Use MD2

- You're migrating from Quasar's default Sass-based MD2 and want pixel-identical output
- Your design system specifies square corners and uppercase buttons
- You need backward compatibility with existing Quasar MD2 themes
