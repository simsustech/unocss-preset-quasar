# Material Design 3

Material You: one source color generates the palette, surfaces carry elevation through tone rather than shadow, and controls take pill shapes. MD3 is the recommended entry and the usual baseline.

```ts
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'

QuasarPreset({ styles: [MaterialDesign3], sourceColor: '#6750A4' })
```

## Dynamic color

`sourceColor` expands into the full tonal palette — light and dark schemes, primary/secondary/tertiary/error families, the surface container rungs, and Quasar's alias set (`--q-primary`, `--q-positive`, …). The same palette serves every style; MD3 simply uses more of it.

## Surfaces instead of shadows

Elevation is expressed through the surface container scale — higher surfaces shift tone, not shadow:

| Token                       | Typical use           |
| --------------------------- | --------------------- |
| `surface-container-lowest`  | deepest background    |
| `surface-container-low`     | default card          |
| `surface-container`         | sheets, menus         |
| `surface-container-high`    | dialogs, raised cards |
| `surface-container-highest` | the highest layer     |

Box shadows still exist as five levels ([Elevation](/core/elevation)) — but MD3's primary elevation language is tonal.

## Shape

MD3 radii (the entry's `shape` tokens):

| Step          | Value        |
| ------------- | ------------ |
| extra small   | 4px          |
| small         | 8px          |
| medium        | 12px         |
| large         | 16px         |
| extra large   | 28px         |
| full / circle | 9999px / 50% |

Component tokens alias these steps — cards read `--q-radius-lg` (16px), buttons `--q-radius-xl` (28px), round buttons `50%`.

## Buttons

| Variant | Background                                                                         | Text             | Border            |
| ------- | ---------------------------------------------------------------------------------- | ---------------- | ----------------- |
| filled  | `--q-primary`                                                                      | `--q-on-primary` | none              |
| flat    | transparent                                                                        | `--q-primary`    | none              |
| outline | transparent                                                                        | `--q-primary`    | 1px `--q-outline` |
| push    | `--q-primary`                                                                      | `--q-on-primary` | 3px bottom lip    |
| round   | `--q-primary`, circle — width takes the 48 dp floor so it cannot render as an oval | `--q-on-primary` | none              |

Button geometry comes from tokens: `btn-padding-x` 24px, `btn-font-size` 14px, `control-height` 48px (the shared accessibility floor).

## Typography

The MD3 type scale rides the shared `text-h1…text-caption` classes ([Typography](/core/typography)); the entry supplies the `--q-type-*` values (e.g. label small `500 11px/16px Roboto`). State-layer opacities: hover 8 %, focus 12 %, press 12 %, drag 16 %.

## Where the values live

The MD3 entry is `MaterialDesign3` in `src/styles/md3/index.ts`; its token block is `md3Style` in `src/theme/index.ts` (`shape`, `typography`, `elevation`, `sizing`, `motion`, `component`). It carries **no rules of its own** — every value MD3 states is expressible as a token, which is why MD3 can serve as the baseline that ships unscoped.

Related: [Theming & Tokens](/core/theming) · [Runtime Switching](/styles/scoping)
