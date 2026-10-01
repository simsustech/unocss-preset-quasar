# Positioning

Absolute, fixed, and fullscreen placement helpers — Quasar's own vocabulary, with logical properties where the reference uses them so RTL mirrors correctly.

## Absolute / fixed

Every family exists in two forms: bare (`absolute`) and edge-pinned:

| Base       | Edges                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `absolute` | `absolute-top`, `-bottom`, `-left`, `-right`, `-top-left`, `-top-right`, `-bottom-left`, `-bottom-right` |
| `fixed`    | `fixed-top`, `-bottom`, `-left`, `-right`, `-top-left`, `-top-right`, `-bottom-left`, `-bottom-right`    |
| centered   | `absolute-center`, `fixed-center`                                                                        |

```html
<div class="absolute-full">covers the positioned parent</div>
<div class="fixed-bottom-right q-ma-md">floating action area</div>
```

| Related class                                          | Effect                                                                                                            |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `absolute-full` / `fixed-full`                         | pinned to all four edges of the containing block                                                                  |
| `fullscreen`                                           | fixed to the viewport, full size                                                                                  |
| `relative-position`                                    | creates a positioning context (`position: relative`) — Quasar's idiom for making an ancestor the containing block |
| `vertical-top` / `vertical-middle` / `vertical-bottom` | `vertical-align`                                                                                                  |
| `on-left` / `on-right`                                 | Quasar's inline spacing (12px logical margin) for toolbar items                                                   |
| `q-position-engine`                                    | the anchor-positioning hook Quasar's popup engine requires                                                        |

::: tip Prefer `relative-position` over `relative`
Both work, but `relative-position` is the name Quasar's own CSS and templates use; keeping one vocabulary keeps greps honest.
:::

## Stacking

Positioning and z-index are separate concerns — the tier values live in [Elevation & Z-index](/core/elevation#the-z-index-scale). `fixed` alone doesn't decide who wins; the overlay scale does.

## Fullscreen and scroll interplay

Components combine these with the behavioral helpers: `hide-scrollbar`, `scroll` / `scroll-x` / `scroll-y` / `no-scroll` (from [Input & Platform](/core/input-platform#scroll-and-cursor)), and Quasar's own `q-body--prevent-scroll` / `q-document--clip-scroll` classes, which the preset styles so full-screen dialogs and drawers behave without the Sass sheet.

Related: [Flex & Grid](/core/flex) · [Visibility & Responsiveness](/core/visibility)
