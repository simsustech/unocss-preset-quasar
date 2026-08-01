# `QuasarStyle`

Interface for the shared component tree — rules, variants, preflights, and shortcuts for all Quasar components. Style differences live in token entries (`QuasarStyleEntry`), not in the tree.

## Definition

```ts
export interface QuasarStyle {
  rules: Rule<QuasarTheme>[]
  variants: Variant<QuasarTheme>[]
  preflights: Preflight<QuasarTheme>[]
  shortcuts: Shortcut<QuasarTheme>[]
  postprocess?: Postprocessor[]
}
```

## Properties

| Property      | Type                       | Description                                                  |
| ------------- | -------------------------- | ------------------------------------------------------------ |
| `rules`       | `Rule<QuasarTheme>[]`      | UnoCSS rules — generate CSS property sets from patterns      |
| `variants`    | `Variant<QuasarTheme>[]`   | UnoCSS variants — dark mode, breakpoints, conditional styles |
| `preflights`  | `Preflight<QuasarTheme>[]` | Global CSS — resets, CSS variables, base styles              |
| `shortcuts`   | `Shortcut<QuasarTheme>[]`  | Component class mappings — regex patterns to utility strings |
| `postprocess` | `Postprocessor[]`          | Optional post-processing hooks for utility mutation          |

## Built-in Style Entries

Styles are token entries, not trees:

```ts
import {
  Md3StyleEntry, // name: 'md3' — Material You
  Md2StyleEntry, // name: 'md2' — classic Material
  UnstyledStyleEntry, // name: 'unstyled' — structural only
  QuasarStyleEntries // all three
} from 'unocss-preset-quasar/styles'
```

## Usage Context

`QuasarPreset()` registers the shared tree once. Each entry's tokens become a `body.quasar-style-{name}` CSS-variable block via the token preflight, so the same shortcuts resolve differently per active body class.
