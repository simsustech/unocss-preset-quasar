# `QuasarStyle`

Interface for a design system style. Each exported style (`MaterialDesign3`, `MaterialDesign2`, `Unstyled`) satisfies this interface.

## Definition

```ts
export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: Shortcut<QuasarTheme>[]
  postprocess?: Postprocessor[]
  bodyClass?: string
}
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `rules` | `Rule<QuasarTheme>[]` | UnoCSS rules — generate CSS property sets from patterns |
| `variants` | `Variant<QuasarTheme>[]` | UnoCSS variants — dark mode, breakpoints, conditional styles |
| `preflights` | `Preflight<QuasarTheme>[]` | Global CSS — resets, CSS variables, base styles |
| `shortcuts` | `Shortcut<QuasarTheme>[]` | Component class mappings — regex patterns to utility strings |
| `postprocess` | `Postprocessor[]` | Optional post-processing hooks for utility mutation |
| `bodyClass` | `string` | CSS class for body-class scoping (e.g., `'quasar-style-md3'`) |

## Built-in Styles

```ts
import {
  MaterialDesign3,  // bodyClass: 'quasar-style-md3'
  MaterialDesign2,  // bodyClass: 'quasar-style-md2'
  Unstyled,         // bodyClass: 'quasar-style-unstyled'
} from 'unocss-preset-quasar/styles'
```

## Usage Context

`QuasarStyle` is consumed by `QuasarPreset()`. The preset:

1. Optionally wraps the style with `scopeStyle()` for body-class scoping
2. Merges the style's `rules`, `variants`, `preflights`, and `shortcuts` with core utilities
3. Passes `postprocess` hooks to UnoCSS for utility mutation
4. Uses `bodyClass` as the UnoCSS preset name and layer name

## Custom Styles

You can create custom `QuasarStyle` objects to define your own design system. The interface is open for extension — just provide the required arrays.

```ts
import type { QuasarStyle } from 'unocss-preset-quasar'
import type { QuasarTheme } from 'unocss-preset-quasar/theme'

const myStyle: QuasarStyle = {
  rules: [],
  variants: [],
  preflights: [
    {
      getCSS: ({ theme }) => `
        :root {
          --my-primary: #ff0000;
        }
      `,
    },
  ],
  shortcuts: [
    [/^q-btn$/, 'px-4 py-2 rounded bg-[var(--my-primary)] text-white'],
  ],
}
```
