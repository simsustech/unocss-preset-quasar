---
title: Carousel
desc: The QCarousel Vue component allows you to display a series of slides, useful for wizards or an image gallery.
keys: QCarousel
examples: QCarousel
---

The QCarousel component allows you to display more information with less real estate, using slides. Useful for creating Wizards or an image gallery too.

<DocApi file="QCarousel" />

<DocApi file="QCarouselControl" />

<DocApi file="QCarouselSlide" />

## Usage

::: tip
If the QCarouselSlide content also has images and you want to use swipe actions to navigate, you might want to add `draggable="false"` to them, otherwise the native browser behavior might interfere in a negative way.
:::

::: danger Keep Alive

- Please take notice of the Boolean `keep-alive` prop for QCarousel, if you need this behavior. Do NOT use Vue's native `<keep-alive>` component over QCarouselSlide.
- Should you need the `keep-alive-include` or `keep-alive-exclude` props then the QCarouselSlide `name`s must be valid Vue component names (no spaces allowed, don't start with a number etc).
  :::

### Basic

Below is an almost stripped down basic Carousel (it is just animated and only has custom transitions specified) with no navigation embedded. For this reason, we are controlling the current slide through the model.

<DocExample title="Basic" file="Basic" />

### Transitions

In the example below:

- There are just a few transitions demoed. For a complete list of transitions, head to the [Transitions](/options/transitions) page.
- You can also swipe with your finger (or swiping with the mouse -- clicking and quickly dragging to left/right then releasing).

<DocExample title="Transitions, bottom navigation, arrows and auto padding" file="Transitions" />

### Vertical

<DocExample title="Vertical mode" file="Vertical" />

### Control type

The notion of "control" here refers to the arrows and navigation buttons. Since they are buttons, you can also pick their type to better match your design. You also benefit from the `control-color` and `control-text-color` props.

<DocExample title="Control Type" file="ControlType" />

### Navigation position

<DocExample title="Navigation position" file="NavigationPosition" />

### Custom navigation

For a full list of properties of the `navigation-icon` slot, please consult the API card.

<DocExample title="Custom navigation" file="CustomNavigation" />

### Auto padding

Below is an example with which you can play with different QCarousel settings so you can see the padding (or lack of) in action:

<DocExample title="Padding" file="AutoPadding" />

### Media content

<DocExample title="Image slides" file="ImageSlides" />

<DocExample title="Multi-image slides" file="MultiImageSlides" />

<DocExample title="Captions" file="Captions" />

<DocExample title="Video slides" file="VideoSlides" />

In the example below there are thumbnails being generated automatically. Thumbnails only applies to image slides.

<DocExample title="Thumbnails" file="Thumbnails" />

::: tip
Don't use the property `navigation` along with `thumbnails` as the first supercedes the latter so the thumbnails will not be displayed.
:::

### Infinite and autoplay

You can pause autoplay when the pointer is over the carousel or over a region of interest.

<DocExample title="Autoplay" file="InfiniteAutoplay" />

### Controls

<DocExample title="Controls" file="Controls" />

### With QScrollArea

Please note how [QScrollArea](/vue-components/scroll-area) is used in the two examples below. Also note the `q-carousel--padding` CSS helper class in the second example.

<DocExample title="With QScrollArea and padding" file="WithScrollareaPadding" />

<DocExample title="With QScrollArea on whole slide" file="WithScrollareaFull" />

### Fullscreen

<DocExample title="Fullscreen" file="Fullscreen" />
