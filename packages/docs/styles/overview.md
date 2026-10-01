# Style System

A style is a **token entry** — a named bundle of values, not a parallel copy of the CSS. One set of component rules serves every style; the entries differ only in the custom properties those rules read.

```ts
import {
  MaterialDesign3, // name: 'md3' — Material You (recommended)
  MaterialDesign2, // name: 'md2' — classic Material, matches quasar.css
  Unstyled, // name: 'unstyled' — structure only
  QuasarStyleEntries // [MaterialDesign3, MaterialDesign2, Unstyled]
} from 'unocss-preset-quasar/styles'
```

## The model in one paragraph

Component rules state structure and read variables (`border-radius: var(--q-btn-radius)`). Each listed entry emits its values — `body.quasar-style-md3 { --q-btn-radius: 28px }`, `body.quasar-style-md2 { … 4px }` — and the active body class decides which values are live. A style owns _everything that makes it a style_: its tokens, plus any literal declarations no token can express (they ship as the entry's `rules`, only when the entry is listed). See [Styles & Scoping](/architecture/style-configuration) for the full contract.

## Choosing entries

| You want                                             | Pass                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| All three, switchable at runtime                     | `styles: QuasarStyleEntries`                                              |
| Only MD3                                             | `styles: [MaterialDesign3]` or `style: MaterialDesign3`                   |
| MD3 as baseline, offer a runtime escape hatch to MD2 | `styles: [MaterialDesign3, MaterialDesign2]`                              |
| A bare foundation for your own design system         | `styles: [Unstyled]` (first = baseline: its resets apply unconditionally) |
| Your own derived style                               | `{ name: 'my', tokens: { …MaterialDesign3.tokens, … } }`                  |

Omitted styles emit nothing — no token block, no rules. Listing costs bytes you can measure; the numbers are in [Styles & Scoping](/architecture/style-configuration#tree-shaking).

## What varies, what doesn't

| Aspect                                                                       | Varies per style?                                     |
| ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| Shape (radii), typography scale, elevation, sizing, motion, component tokens | Yes — these _are_ the style                           |
| Color palette                                                                | No — derived from `sourceColor`, shared by all styles |
| Structure (layout, positioning, selectors)                                   | No — one rule set                                     |
| Screen breakpoints, 48 dp control floor                                      | No — preset policies, deliberately shared             |

## Switching

```ts
import { setStyle, getActiveStyle } from 'unocss-preset-quasar/styles'

setStyle('md2') // one body-class swap — no reload, no rebuild
getActiveStyle() // 'md2' | 'md3' | 'unstyled' | null
```

Details, dark mode, and edge cases: [Runtime Switching](/styles/scoping).

## The three built-ins

- [Material Design 3](/styles/material-design-3) — dynamic color, tonal surfaces, pill buttons
- [Material Design 2](/styles/material-design-2) — quasar.css fidelity, minimal radii, uppercase buttons
- [Unstyled](/styles/unstyled) — geometry without paint; the base for a custom design system
