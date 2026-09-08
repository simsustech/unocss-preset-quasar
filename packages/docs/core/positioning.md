# Positioning

The preset provides Quasar-compatible positioning utility classes for absolute, fixed, and relative layouts.

## Position Types

```html
<div class="relative-position">position: relative</div>
<div class="fixed">position: fixed</div>
<div class="absolute">position: absolute</div>
<div class="sticky">position: sticky (via UnoCSS)</div>
```

## Fixed Positioning

```html
<div class="fixed-center">Centered fixed</div>
<div class="fixed-full">Full fixed overlay</div>
<div class="fixed-bottom">Fixed to bottom</div>
<div class="fixed-left">Fixed to left</div>
<div class="fixed-right">Fixed to right</div>
<div class="fixed-top">Fixed to top</div>
<div class="fixed-top-left">Fixed top left</div>
<div class="fixed-top-right">Fixed top right</div>
<div class="fixed-bottom-left">Fixed bottom left</div>
<div class="fixed-bottom-right">Fixed bottom right</div>
```

## Absolute Positioning

```html
<div class="absolute-center">Centered absolute</div>
<div class="absolute-full">Full absolute overlay</div>
<div class="absolute-bottom">Absolute bottom</div>
<div class="absolute-left">Absolute left</div>
<div class="absolute-right">Absolute right</div>
<div class="absolute-top">Absolute top</div>
<div class="absolute-top-left">Absolute top left</div>
<div class="absolute-top-right">Absolute top right</div>
<div class="absolute-bottom-left">Absolute bottom left</div>
<div class="absolute-bottom-right">Absolute bottom right</div>
```

## Vertical Alignment

```html
<div class="vertical-top">vertical-align: top</div>
<div class="vertical-middle">vertical-align: middle</div>
<div class="vertical-bottom">vertical-align: bottom</div>
```

## Fullscreen

```html
<div class="fullscreen">
  <!-- position: fixed; inset: 0 -->
</div>
```

## On-Left / On-Right

```html
<div class="on-left">Float/margin left</div>
<div class="on-right">Float/margin right</div>
```

## UnoCSS Fallback

All standard UnoCSS positioning utilities work:

```html
<div class="relative">
  <div class="absolute top-0 left-0">Corner</div>
  <div class="absolute inset-0">Full</div>
  <div class="absolute right-2 bottom-2">Bottom right with offset</div>
</div>
```
