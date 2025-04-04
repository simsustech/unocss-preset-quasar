---
title: QSplitter
desc: The QSplitter Vue component allow containers to be split vertically and/or horizontally through a draggable separator bar.
keys: QSplitter
examples: QSplitter
related:
  - /vue-components/expansion-item
  - /vue-components/slide-item
  - /vue-components/separator
---

The QSplitter component allow containers to be split vertically and/or horizontally through a draggable separator bar.

<DocApi file="QSplitter" />

## Usage

::: warning
The use of the `before` and `after` slots is required.
:::

Click and drag on the splitter separator bar to see results.

### Basic

<DocExample title="Basic" file="Basic" />

### Horizontal

<DocExample title="Horizontal" file="Horizontal" />

### Custom dragging limits

<DocExample title="Custom dragging limits (50-100)" file="Limits" />

### Model units

By default, the CSS `unit` used is '%' (percentage). But you can also use 'px' (pixels), as in the example below.

<DocExample title="Model in pixels" file="PixelModel" />

### Reverse model

By default, the model is connected to the `before` slot size. But you can reverse that and make it connect to the `after` slot, as in the example below. This feature turns out especially useful if your `unit` is set to pixels and you want to control the `after` slot.

<DocExample title="Reverse model" file="ReverseModel" />

### Adding content to separator

::: tip
If you use images as content for the separator slot, you might want to add `draggable="false"` to them, otherwise the native browser behavior might interfere in a negative way.
:::

<DocExample title="Adding to separator" file="SeparatorSlot" />

### Dark design

<DocExample title="On a dark background with customized separator" file="CustomizedSeparator" />

### Embedded

A QSplitter can be embedded in another QSplitter's `before` and/or `after` slots, like shown in example below.

<DocExample title="Embedded" file="Embedded" />

### Fun examples

<DocExample title="Image Fun" file="ImageFun" />

<DocExample title="Reactive Images" file="ReactiveImages" />
