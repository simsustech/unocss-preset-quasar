---
title: Material Ripples
desc: Vue directive for easily adding material ripples to your components and DOM elements.
keys: material-ripple
examples: Ripple
---

Material Ripple effect can easily be added to any DOM element (or component) through the `v-ripple` Quasar directive.

::: danger
Do not use this directive on components that already have material ripples baked in (example: `QBtn`). Rather configure the internal ripples through those component's `ripple` property.
:::

<DocApi file="Ripple" />

<DocInstallation title="Configuration" config="ripple" />

## Usage

::: warning
Make sure that your DOM element or component has CSS `position: relative` or Quasar CSS helper class `relative-position` attached to it.
:::

### Basic

<DocExample title="Basic" file="Basic" />

### Coloring

The Material Ripple takes the CSS color of text by default, but you can configure it:

<DocExample title="Colored" file="Colored" />

### Positioning

You can also configure if the ripple should always start from center or not, regardless of the touch point:

<DocExample title="Positioning" file="Positioning" />

### Triggering early

By default, the Ripple directive is triggered on click or keyup. However, you can change that and make it trigger earlier, on the first user interaction (mousedown, touchstart, keydown). Please note that in most situations the event sets may overlap (small delay between first and last user interaction) and there is no difference in the user perception, but in certain conditions it may lead to misleading the user.

This is especially noticeable on touchscreens where if a user accidentally moves their finger after the touchstart it can sometimes be interpreted as a very small scroll event instead of a click so the click event isn't triggered but there is still a ripple.

<DocExample title="Triggering immediately" file="Early" />

### Disable

If for some reason you have a scenario where the ripples need to be disabled, then you can assign a Boolean as value for the directive:

<DocExample title="Disable" file="Disable" />
