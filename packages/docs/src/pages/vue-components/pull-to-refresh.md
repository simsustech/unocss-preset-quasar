---
title: Pull to refresh
desc: The QPullToRefresh Vue component allows the user to pull down in order to refresh or retrieve the newest content on a page.
keys: QPullToRefresh
examples: QPullToRefresh
related:
  - /vue-components/infinite-scroll
  - /vue-components/intersection
  - /vue-components/icon
---

The QPullToRefresh is a component that allows the user to pull down in order to refresh page content (or retrieve the newest content).

<DocApi file="QPullToRefresh" />

## Usage

### Basic

::: warning
In your `@refresh` function, don't forget to call the passed in `done()` function when you have finished loading more data.
:::

To refresh, pull down (with mouse or through finger touch) on the content below when the inner scroll position is the top.

<DocExample title="Basic" file="Basic" />

### Custom icon

<DocExample title="Custom icon" file="Icon" />

### Custom coloring

<DocExample title="Custom coloring" file="CustomColoring" />

## Tips

::: tip Scrolling container
Please read [here](/vue-components/scroll-observer#determining-scrolling-container) about how Quasar determines the container to attach scrolling events to.
:::

- If using a QLayout, then it's recommended that you put QPullToRefresh as direct child of QPage and wrap your page content with it.
- If you change the parent of this component, don't forget to call `updateScrollTarget()` on the QPullToRefresh Vue reference.
- QPullToRefresh also allows text selection, so if your content also has images, you might want to add `draggable="false"` to them, otherwise the native browser behavior might interfere in a negative way.
