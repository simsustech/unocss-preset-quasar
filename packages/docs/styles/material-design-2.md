# Material Design 2

The classic Material aesthetic, matched against `quasar/dist/quasar.css` — MD2 is the fidelity entry: minimal radii, uppercase button labels, `currentColor` accents, and Quasar's own shadow scale.

```ts
import { MaterialDesign2 } from 'unocss-preset-quasar/styles'

QuasarPreset({ styles: [MaterialDesign3, MaterialDesign2] })
setStyle('md2') // at runtime
```

## What defines it

| Aspect                    | MD2                                                                              | MD3 (for comparison)         |
| ------------------------- | -------------------------------------------------------------------------------- | ---------------------------- |
| Button radius             | `--q-radius-sm` (4px), `min-width: 64px`                                         | `--q-radius-xl` (28px pill)  |
| Button label              | `text-transform: uppercase`                                                      | none                         |
| Flat/outline accent       | `currentColor` — dist states no `color`, so the element's own text color carries | `--q-primary`                |
| Outline border            | `1px solid currentColor`                                                         | 1px `--q-outline`            |
| Card radius               | 4px                                                                              | `--q-radius-lg` (16px)       |
| Toggle track              | rectangle, `0.175em` radius, 200 ms                                              | pill, 300 ms                 |
| Field labeled padding-top | 28px (clears the floated label)                                                  | 24px                         |
| Elevation                 | Quasar's `$shadow-1…5`                                                           | MD3 spec vectors (blur 3→20) |
| State layers              | hover 4 %, press 16 %                                                            | hover 8 %, press 12 %        |

MD2's flat buttons being `currentColor` is not an oversight: dist declares `.q-btn--outline:before { border: 1px solid currentColor }` and no `color` at all — md3's `--q-primary` is the deviation, not md2's neutrality.

## Color is still generated

`sourceColor` drives the same tonal palette for every style — MD2 components just consume it differently (e.g. the toggle's active track is `color-mix(… var(--q-secondary) 50%, transparent)`). Pass `sourceColor` normally; no special handling.

Dark pairs appear where the two schemes genuinely diverge: MD2's toggle track is `rgba(0,0,0,0.32)` in light and `rgba(255,255,255,0.3)` in dark — token values may be `{ light, dark }` objects for exactly this reason.

## Shared by design

These differ from MD3 _not at all_, deliberately — they are preset policies, not style values: the generated palette, the 48 dp control-height floor, and the `--q-size-*` screen breakpoints. A divergence in them would be a defect in the policy, not a style choice. The reasoning is recorded in [Decisions](/architecture/decisions) (ADR-0008).

## When to use it

- Migrating an existing Quasar MD2 app where pixel-parity with `quasar.css` matters
- A design system that specifies square-ish corners and uppercase buttons
- Side-by-side comparison during a migration — switch with `setStyle()`, no rebuild

## Where the values live

`MaterialDesign2` in `src/styles/md2/index.ts`; tokens in `md2Style` (`src/theme/index.ts`). Like MD3, MD2 carries **no rules of its own** — every value is a token.

Related: [Elevation](/core/elevation) · [Runtime Switching](/styles/scoping) · [Decisions](/architecture/decisions)
