---
title: Floating Action Button
desc: How to use the QFab component. Floating Action Buttons for your Quasar app.
keys: QFab
examples: QFab
related:
  - /layout/layout
  - /layout/page
---

A Floating Action Button (FAB) represents the primary action in a Page. But, it's not limited to only a single action. It can contain any number of sub-actions too. And more importantly, it can also be used inline in your Pages or Layouts.

Note that you don’t need a QLayout to use FABs.

<DocApi file="QFab" />

<DocApi file="QFabAction" />

## Usage

There are two types of FABs: expandable (has sub-actions) and non-expandable.

::: tip
For an exhausting list of options, please read the API cards (at the top of this page).
:::

### Non-Expandable

If you want a non-expandable FAB, all you need is a round button – wrapped in QPageSticky if used on a QLayout.

<DocExample title="Non expandable" file="NonExpandable" />

### Expandable

<DocExample title="Expandable" file="Expandable" />

### Internal labels

<DocExample title="Internal label" file="InternalLabel" />

<DocExample title="Toggling internal label" file="InternalLabelToggling" />

When the labels are internal and your QFab opens up vertically (up or down) then you also have the ability to choose how to vertically align the sub-actions:

<DocExample title="Vertical actions alignment" file="VerticalActionsAlignment" />

### External labels

By default, when the label is external on the main QFab (not the sub-actions), it gets shown only when QFab is opened. However, you can override that by setting a Boolean value for `hide-label` prop.

<DocExample title="External label" file="ExternalLabel" />

<DocExample title="Custom styled external label" file="ExternalLabelStyled" />

<DocExample title="Toggling external label" file="ExternalLabelToggling" />

### Hide icons

If we hide the icon (through specific prop), we should at least use an internal label:

<DocExample title="Hide icon" file="HideIcon" />

### Padding

The default padding for QFab is "md" and for QFabAction is "sm". However, you can use `padding` prop to customize it (accepts CSS units too):

<DocExample title="Playing with padding" file="Padding" />

### Square style

<DocExample title="Square style" file="SquareStyle" />

### Slots <q-badge label="v2.4+" />

Notice the slots for QFab and the slots for QFabAction below:

<DocExample title="Slots: icon, active-icon and label" file="FabSlots" />

### With QPageSticky

<DocExample title="With QPageSticky" file="PageSticky" />

### Draggable

Below is a nice example of using [TouchPan](/vue-directives/touch-pan) for making the QFab draggable across the screen.

<DocExample title="Draggable" file="Draggable" />
