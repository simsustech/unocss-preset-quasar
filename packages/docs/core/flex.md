# Flex & Grid

Quasar's layout vocabulary — `row`, `column`, `col-*`, gutters — as flex utilities, plus responsive column variants. These rules sit in their own cascade band _ahead of_ component rules, because the reference puts the utility first and lets component layout win on cascade order.

## Containers

```html
<div class="row q-gutter-md">…</div>
<div class="column">…</div>
<div class="flex flex-center">…</div>
```

| Class                             | Effect                                           |
| --------------------------------- | ------------------------------------------------ |
| `row` / `row-reverse`             | flex container, row direction, `flex-wrap: wrap` |
| `column` / `column-reverse`       | flex container, column direction, wrap           |
| `flex`                            | bare flex container                              |
| `wrap`, `no-wrap`, `reverse-wrap` | `flex-wrap` overrides                            |
| `flex-center`                     | centered on both axes                            |

Containers deliberately do **not** set `flex: 1 1 auto` — growth belongs to the column classes. (A growing `.row` stretched every consumer's drawer content to full height; that was measured, not guessed.)

## Columns

| Class                                       | Effect                                    |
| ------------------------------------------- | ----------------------------------------- |
| `col`                                       | `flex: 1 1 0%` + `max-width: 100%`        |
| `col-auto`                                  | sized by content                          |
| `col-grow` / `col-shrink`                   | grow and/or shrink only                   |
| `col-1` … `col-12`                          | `flex: 0 0 <N/12*100>%`, `max-width` same |
| `offset-1` … `offset-11`                    | `margin-inline-start: <N/12*100>%`        |
| `shrink`                                    | shrink factor                             |
| `order-first` / `order-last` / `order-none` | `order: -1` / `9999` / `0`                |

## Responsive columns

The breakpoint travels _inside the class name_ — `col-md-6`, not `md:col-6` — and the media wrapper comes from a variant:

| Class form                          | Wraps in                                     |
| ----------------------------------- | -------------------------------------------- |
| `col-sm`, `col-sm-6`, `col-sm-auto` | `@media (min-width: 600px)`                  |
| `col-md-…`                          | `@media (min-width: 1024px)`                 |
| `col-lg-…`                          | `@media (min-width: 1440px)`                 |
| `col-xl-…`                          | `@media (min-width: 1920px)`                 |
| `col-xs-…`                          | no wrapper — xs is the base breakpoint (0px) |
| `offset-md-6` etc.                  | same wrappers                                |

```html
<div class="col-12 col-md-6 col-lg-4">
  third on large, half on tablet, full on phone
</div>
```

The wrapper is load-bearing: without an at-rule frame, `.col-12` and `.col-sm` are equal specificity and source order decides — the base span would win at every viewport, stacking cells that should be rows.

## Gutters

```html
<div class="row q-gutter-md">column gap 16px</div>
<div class="row q-gutter-x-sm">gap along the inline axis</div>
<div class="row q-gutter-y-lg">gap along the block axis</div>
```

| Form                                    | Emits                                  |
| --------------------------------------- | -------------------------------------- |
| `q-gutter-{size}` / `q-gutter-x-{size}` | `column-gap: calc(var(--spacing) * N)` |
| `q-gutter-y-{size}`                     | `row-gap: calc(var(--spacing) * N)`    |

Same steps as [Spacing](/core/spacing): `none 0, xs 1, sm 2, md 4, lg 6, xl 8`. The plain `q-gutter-*` emits only the column gap, as the reference does.

## Engine flex still applies

`items-center`, `justify-between`, `gap-*`, `grid` come from the nested engine and layer after these bands. Quasar's `row`/`col` vocabulary stays the preset's regardless of array order (`enforce: 'post'`).

Related: [Positioning](/core/positioning) · [Rule Assembly](/architecture/rule-assembly)
