---
title: Layout Drawer
desc: How to use the QDrawer component. The sidebars of your Quasar app.
keys: QDrawer
examples: QDrawer
related:
  - /layout/layout
  - /vue-components/list-and-list-items
---

QLayout allows you to configure your views as a 3x3 matrix, containing optional left-side and/or right-side Drawers. If you haven’t already, please read [QLayout](/layout/layout) documentation page first.

QDrawer is the sidebar part of your QLayout.

<DocApi file="QDrawer" />

## Layout Builder

Scaffold your layout(s) by clicking on the button below.

<q-btn icon-right="launch" label="Layout Builder" href="/layout-builder" target="_blank" />

## Usage

::: tip

- Since QDrawer needs a layout and QLayout by default manages the entire window, then for demoing purposes we are going to use containerized QLayouts. But remember that by no means you are required to use containerized QLayouts for QDrawer.
- If the QDrawer content also has images and you want to use touch actions to close it, you might want to add `draggable="false"` to them, otherwise the native browser behavior might interfere in a negative way.
  :::

::: danger
By default, QDrawer has touch actions attached to it. If this interferes with your drawer content components, disable it by specifying the Boolean `no-swipe-close` property.
:::

::: warning
When QDrawer is set into overlay mode, **it will force it to go into fixed position**, regardless if QLayout's "view" prop is configured with "l/r" or "L/R". Also, **if on iOS platform and QLayout is containerized**, the fixed position will also be forced upon QDrawer due to platform limitations that cannot be overcome.
:::

### Basic

<DocExample title="Basic" file="Basic" />

Consider using QItems with routing props (like `to`) below. For demoing purposes these props have not been added as it would break the UMD version.

<DocExample title="With navigation menu" file="Menu" />

<DocExample title="Seamless menu" file="MenuSeamless" />

<DocExample title="Header Picture" file="HeaderPicture" />

### Mini-mode

Drawer can operate in two modes: 'normal' and 'mini', and you can switch between them by using the Boolean `mini` property on QLayoutDrawer.

::: warning
Please note that **`mini` mode** does not apply when in **mobile** behavior.
:::

There are some CSS classes that will help you customize the drawer when dealing with "mini" mode. These are very useful especially when using the "click" trigger:

| CSS Class            | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `q-mini-drawer-hide` | Hide when drawer is in "mini" mode or in "mobile" mode. |
| `q-mini-drawer-only` | Show only when drawer is in "mini" mode.                |

You can also write your own CSS classes based on the fact that QLayoutDrawer has `q-drawer--standard` CSS class when in "normal" mode and `q-drawer--mini` when in "mini" mode. Also, when drawer is in "mobile" behavior, it gets `q-drawer--mobile` CSS class.

#### Mouseover/mouseout trigger

Consider using QItems with routing props (like `to`) below. For demoing purposes these props have not been added as it would break the UMD version.

<DocExample title="Mini-mode with mouseover/mouseout trigger" file="MiniMouseEvents" />

#### Mini to overlay

The `mini-to-overlay` Boolean property will always set your drawer with fixed position, regardless of your configuration from the `view` prop, but will occupy space on the layout only as wide as when in mini-mode.

<DocExample title="Mini to overlay" file="MiniToOverlay" />

#### Click trigger

In the example below, when in "mini" mode, if the user clicks on Drawer then we switch to normal mode.

Consider using QItems with routing props (like `to`) below. For demoing purposes these props have not been added as it would break the UMD version.

<DocExample title="Mini-mode with click trigger" file="MiniClickEvent" />

#### Slots

By default, when in "mini" mode, Quasar CSS hides a few DOM elements to provide a neat narrow drawer. But there may certainly be use-cases where you need a deep tweak. You can use the "mini" Vue slot of QLayoutDrawer just for that. The content of this slot will replace your drawer's default content when in "mini" mode.

<DocExample title="Mini-mode with slot" file="MiniSlot" />

### Overlay mode

The overlay mode prevents the drawer from occupying space on the layout and rather hover over the page instead. This will always set your drawer with fixed position, regardless of your configuration from the `view` prop.

On the example below, click the menu icon to see the drawer in action. It's best viewed on a desktop with a window of at least 500px width (this is the breakpoint that is set on this demo).

<DocExample title="Overlay mode" file="OverlayMode" />
