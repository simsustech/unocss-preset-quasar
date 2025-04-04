---
title: Popup Proxy
desc: The QPopupProxy is a Vue component that should be used when you need either a QMenu or a QDialog (on smaller screens) to be displayed.
keys: QPopupProxy
examples: QPopupProxy
related:
  - /vue-components/menu
  - /vue-components/dialog
  - /vue-directives/close-popup
---

QPopupProxy should be used when you need either a [QMenu](/vue-components/menu) (on bigger screens) or a [QDialog](/vue-components/dialog) (on smaller screens) to be displayed. It acts as a proxy which picks either of the two components to use. QPopupProxy also handles context-menus.

<DocApi file="QPopupProxy" />

## Usage

::: tip
Use your browsers development tools to toggle the device between mobile or desktop (with browser refresh after each change) or, physically resize your browser's window to watch the QPopupProxy component switch between either a QMenu or a QDialog before clicking/tapping on its container. The default breakpoint is set at 450px.
:::

### Standard

<DocExample title="Standard" file="Standard" />

### Context menu

<DocExample title="Context menu (right click / long tap)" file="ContextMenu" />

### Breakpoint

On the example below, click on the icon in the input.

<DocExample title="Breakpoint @600px" file="Breakpoint" />

### Pass-through props

Keep in mind that all props from both [QMenu](/vue-components/menu) and [QDialog](/vue-components/dialog) are passed through via this component. So props like `offset` or `transition-show` (as a mere example) can be used in conjunction with QPopupProxy.

<DocExample title="Props from QMenu or QDialog" file="Passthrough" />

::: warning
QPopupProxy treats some components ([QDate](/vue-components/date), [QTime](/vue-components/time), [QCarousel](/vue-components/carousel) and [QColor](/vue-components/color-picker)) as special ones and forces `cover: true` and `maxHeight: '99vh'` on them. If you don't want this behavior just place a `div` as the first level child of QPopupProxy.
:::
