# Typography

Quasar's type classes are rules with fixed, Quasar-authored values — `text-h1` does not read the active style's type tokens, because these numbers are Quasar's own across every style. Style-varying type lives in the token system (`--q-type-*`), which component rules read.

## Headings and text

| Class            | Size     | Weight | Line-height | Letter-spacing |
| ---------------- | -------- | ------ | ----------- | -------------- |
| `text-h1`        | 6rem     | 300    | 6rem        | −0.01562em     |
| `text-h2`        | 3.75rem  | 300    | 3.75rem     | −0.00833em     |
| `text-h3`        | 3rem     | 400    | 3.125rem    | normal         |
| `text-h4`        | 2.125rem | 400    | 2.5rem      | 0.00735em      |
| `text-h5`        | 1.5rem   | 400    | 2rem        | normal         |
| `text-h6`        | 1.25rem  | 500    | 2rem        | 0.0125em       |
| `text-subtitle1` | 1rem     | 400    | 1.75rem     | 0.00937em      |
| `text-subtitle2` | 0.875rem | 500    | 1.375rem    | 0.00714em      |
| `text-body1`     | 1rem     | 400    | 1.5rem      | 0.03125em      |
| `text-body2`     | 0.875rem | 400    | 1.4rem      | 0.01786em      |
| `text-overline`  | 0.75rem  | 500    | 2rem        | 0.16667em      |
| `text-caption`   | 0.75rem  | 400    | 1.25rem     | 0.03333em      |

```html
<h1 class="text-h1">Title</h1>
<p class="text-body2 text-grey-8">Secondary copy</p>
```

`q-body` sets the base document text (14px, line-height 1.5, antialiased, margin 0) and, through the same rule, states `*, ::before, ::after { box-sizing: border-box }` — the universal box-sizing the old reset preflight used to ship.

## Modifiers

| Family    | Classes                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| Transform | `text-uppercase`, `text-lowercase`, `text-capitalize`                                                       |
| Alignment | `text-center`, `text-left`, `text-right`, `text-justify`                                                    |
| Style     | `text-italic`, `text-bold`, `text-strike`, `text-no-wrap`                                                   |
| Weight    | `text-weight-thin` (100), `-light` (300), `-regular` (400), `-medium` (500), `-bold` (700), `-bolder` (900) |

These compose: `class="text-h6 text-uppercase text-grey-7"`.

## Fonts

Web fonts come from the nested `presetWebFonts` — Roboto from Bunny by default, which the MD3/MD2 type tokens assume (`fontFamily: 'Roboto, sans-serif'`). Override via [`presetWebFonts`](/guide/configuration#presetwebfonts) or load your own and override the `typography` tokens.

## Style-varying type

The _component_ type scale is a token: each style entry carries `displayLarge…labelLarge`, tracking and state-layer opacities (`typography.hoverOpacity` — 8 % md3, 4 % md2; `pressedOpacity` — 12 % md3, 16 % md2). Those reach components through `var(--q-type-*)` references, so `setStyle()` changes them with everything else. The table above — the element-level `text-*` classes — stays constant by design.

Related: [Theming & Tokens](/core/theming) · [Typography tokens in MD3](/styles/material-design-3#typography)
