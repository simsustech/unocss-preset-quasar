# Visibility & Responsiveness

Show, hide, truncate — plus the breakpoint classes Quasar injects into markup and its responsive helpers emit at runtime. Everything that needs `@media` is emitted as CSS text from the preset's preflight, because a rule body cannot carry an at-rule.

## Breakpoint ranges

Quasar's own five steps, stated exactly as the reference does (each upper bound is the next step minus 0.02px so ranges never overlap):

| Name | Range            |
| ---- | ---------------- |
| `xs` | 0 – 599.98px     |
| `sm` | 600 – 1023.98px  |
| `md` | 1024 – 1439.98px |
| `lg` | 1440 – 1919.98px |
| `xl` | 1920px+          |

Media queries reject `var()`, so these numbers cannot be tokens — they are literals in the emitted stylesheet, the same values the `--q-size-*` variables expose to Quasar's Screen plugin.

## Responsive visibility classes

Applied to an element, each class hides it _outside_ its condition:

| Class family                       | Meaning                             |
| ---------------------------------- | ----------------------------------- |
| `xs` `sm` `md` `lg` `xl`           | visible **only** at that breakpoint |
| `lt-sm`, `lt-md`, `lt-lg`, `lt-xl` | visible **below** that breakpoint   |
| `gt-xs`, `gt-sm`, `gt-md`, `gt-lg` | visible **above** that breakpoint   |
| `xs-hide`, `sm-hide`, …            | hidden at that breakpoint           |

```html
<div class="gt-sm">wide screens only</div>
<div class="lt-md md-hide">…</div>
```

`lt-xs` and `gt-xl` do not exist (nothing is below xs, nothing above xl). Inside each range, the emitted rule hides every non-active breakpoint class, the active breakpoint's `-hide`, the `lt-*` classes at or below it and the `gt-*` classes at or above it — one media block per range.

## Resets and truncation

| Class                                                                                     | Effect                                                                        |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `hidden`                                                                                  | `display: none` (Quasar applies this to native inputs)                        |
| `invisible`                                                                               | `visibility: hidden`                                                          |
| `no-margin`, `no-padding`, `no-border`, `no-border-radius`, `no-box-shadow`, `no-outline` | zero the property (`!important` where the reference uses it)                  |
| `ellipsis`                                                                                | single-line truncation (`text-overflow` + `nowrap` + `overflow`)              |
| `ellipsis-2-lines`, `ellipsis-3-lines`                                                    | line-clamp 2 / 3                                                              |
| `overflow-hidden-y`                                                                       | clip one axis                                                                 |
| `transparent`                                                                             | transparent background                                                        |
| `disabled`, `readonly`                                                                    | presentational states — `cursor: not-allowed`, `opacity: .6`, outline removal |

```html
<span class="ellipsis block q-px-sm">long label that truncates</span>
```

## Layout padding helper

`q-layout-padding` adjusts with the viewport: 8px below 600px, 16px to 1439.98px, 24px from 1440px — Quasar's default page padding, emitted as a media family.

## Platform-scoped hiding

`desktop-hide`, `mobile-only`, `platform-ios-hide`, … live with the platform classes in [Input & Platform](/core/input-platform).

Related: [Flex & Grid](/core/flex) (responsive columns) · [Transitions & Motion](/core/transitions)
