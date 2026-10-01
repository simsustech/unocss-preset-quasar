# Spacing

Quasar-compatible margin and padding classes, resolved through `--spacing` so the scale follows the root font size instead of freezing pixels into the stylesheet.

## Classes

```html
<div class="q-ma-md">16px margin all around</div>
<div class="q-pt-sm">8px padding top</div>
<div class="q-mx-auto">centered block</div>
```

Pattern: `q-{p|m}{side}-{size}` where side is `a` (all), `t`, `b`, `l`, `r`, `x` (inline), `y` (block) and size is one of `none`, `xs`, `sm`, `md`, `lg`, `xl`.

Logical properties: `x` maps to `-inline` and `y` to `-block`, so RTL layouts mirror correctly.

## The scale

Each step computes to `calc(var(--spacing) * N)` with `--spacing: 0.25rem` (4px at the default root size):

| Size   | Multiplier | At 16px root |
| ------ | ---------- | ------------ |
| `none` | 0          | 0            |
| `xs`   | ×1         | 4px          |
| `sm`   | ×2         | 8px          |
| `md`   | ×4         | 16px         |
| `lg`   | ×6         | 24px         |
| `xl`   | ×8         | 32px         |

Because the value is a `calc()`, changing `--spacing` (or the root font size) rescales every `q-*` spacing utility at once.

## Auto margins and sizing

| Class                                              | Effect                                            |
| -------------------------------------------------- | ------------------------------------------------- |
| `q-ml-auto`, `q-mr-auto`, `q-mt-auto`, `q-mb-auto` | single-side auto margin                           |
| `q-mx-auto`, `q-my-auto`                           | inline/block auto margin                          |
| `fit`                                              | `width: 100%; height: 100%`                       |
| `full-width`                                       | `width: 100%` + zero inline margin                |
| `full-height`                                      | `height: 100%`                                    |
| `window-width`, `window-height`                    | `100vw` / `100vh` with the matching margin zeroed |

## Engine spacing still works

The nested engine's own spacing utilities (`p-4`, `mt-2`, `gap-3`, arbitrary `m-[6px]`) come from `preset-mini` and coexist — the `q-*` family is Quasar's vocabulary, the bare numbers are the engine's:

```html
<div class="q-pa-lg gap-2 flex">both scales</div>
```

Note the scale difference: `q-pa-md` is 16px (`calc(var(--spacing) * 4)`), while the engine's `p-4` is its own `1rem`. Prefer one family per surface.

Related: [Flex & Grid](/core/flex) · [Theming & Tokens](/core/theming)
