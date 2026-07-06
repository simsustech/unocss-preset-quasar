# Flex & Grid

The preset provides Quasar-compatible flex and grid utility classes. These are shortcuts that map to standard UnoCSS/Wind flex utilities.

## Flex Container

```html
<div class="flex">Flex container</div>
<div class="row">Flex row (direction: row)</div>
<div class="column">Flex column (direction: column)</div>
<div class="inline">Inline flex</div>
```

## Flex Alignment (Container)

```html
<div class="flex-center">Centered content</div>
<div class="items-center">Center items vertically</div>
<div class="items-start">Align items start</div>
<div class="items-end">Align items end</div>
<div class="items-stretch">Stretch items</div>
<div class="items-between">Space between items</div>
<div class="justify-center">Center content horizontally</div>
<div class="justify-between">Space between</div>
<div class="justify-end">Justify end</div>
<div class="justify-start">Justify start</div>
<div class="content-center">Align content center</div>
```

## Flex Children

```html
<div class="self-center">Center self</div>
<div class="self-start">Start self</div>
<div class="self-end">End self</div>
<div class="self-stretch">Stretch self</div>
```

## Flex Grow

```html
<div class="col">Grow column (flex: 1)</div>
<div class="col-grow">Grow (flex-grow: 1)</div>
```

## Wrapping

```html
<div class="wrap">Wrap items</div>
<div class="no-wrap">No wrap</div>
```

## Full Width

```html
<div class="full-width">width: 100%</div>
```

## Gutters

```html
<div class="q-gutter-xs">Extra small gutter</div>
<div class="q-gutter-sm">Small gutter</div>
<div class="q-gutter-md">Medium gutter</div>
<div class="q-gutter-lg">Large gutter</div>
<div class="q-gutter-xl">Extra large gutter</div>
<div class="q-gutter-x-sm">Horizontal small gutter</div>
<div class="q-gutter-y-md">Vertical medium gutter</div>
```

Gutter spacing values from the theme:

| Gutter        | Value |
| ------------- | ----- |
| `xs` / `none` | 4px   |
| `sm`          | 8px   |
| `md`          | 16px  |
| `lg`          | 24px  |
| `xl`          | 48px  |

## UnoCSS Fallback

All standard UnoCSS/Wind flex utilities work:

```html
<div class="flex flex-col gap-4 items-center justify-between">
  <div class="flex-1">Item</div>
  <div class="shrink-0">Item</div>
</div>
```
