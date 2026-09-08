# Visibility

The preset provides visibility-related utility classes for showing, hiding, and controlling element rendering.

## Display

```html
<div class="block">display: block</div>
<div class="hidden">display: none</div>
<div class="invisible">visibility: hidden</div>
```

## Overflow

```html
<div class="overflow-auto">overflow: auto</div>
<div class="overflow-hidden">overflow: hidden</div>
<div class="scroll">overflow: scroll</div>
<div class="scroll-x">overflow-x: scroll</div>
<div class="scroll-y">overflow-y: scroll</div>
```

## Cursor

```html
<div class="cursor-pointer">pointer cursor</div>
```

## Text Overflow

```html
<div class="ellipsis">Text ellipsis overflow</div>
```

## Scrollbar

```html
<div class="hide-scrollbar">Hide scrollbar</div>
```

## Pointer Events

```html
<div class="no-pointer-events">No pointer events</div>
<div class="no-pointer-events--children">No pointer events on children</div>
```

## Selection

```html
<div class="non-selectable">Prevent text selection</div>
```

## Border & Outline

```html
<div class="no-border">Remove border</div>
<div class="no-border-radius">Remove border radius</div>
<div class="border-radius-inherit">Inherit border radius</div>
<div class="no-outline">Remove outline</div>
<div class="rounded-borders">Rounded borders</div>
```

## Miscellaneous

```html
<div class="disabled">Disabled appearance (opacity)</div>
<div class="readonly">Readonly appearance (opacity)</div>
<div class="transparent">Fully transparent</div>
<div class="glossy">Glossy effect</div>
<div class="rotate-180">Rotate 180 degrees</div>
<div class="no-transition">Disable transitions</div>
<div class="no-shadow">Remove box shadow</div>
<div class="fit">width: 100%; height: 100%</div>
```

## UnoCSS Fallback

All standard UnoCSS visibility utilities work:

```html
<div class="opacity-50">Half opacity</div>
<div class="cursor-not-allowed">Not allowed cursor</div>
<div class="pointer-events-none">No pointer events</div>
<div class="select-none">No text selection</div>
<div class="overflow-x-hidden">Hidden horizontal overflow</div>
```
