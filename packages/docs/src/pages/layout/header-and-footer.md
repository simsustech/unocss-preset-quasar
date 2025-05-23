---
title: Layout Header and Footer
desc: How to use the QHeader and QFooter components. The top and bottom bars of your Quasar app.
keys: QHeader,QFooter
examples: QHeader
related:
  - /layout/layout
  - /layout/page
  - /vue-components/toolbar
  - /vue-components/breadcrumbs
  - /vue-components/tabs
  - /vue-components/bar
---

QLayout allows you to configure your views as a 3x3 matrix, containing an optional Header and/or Footer (mostly used for navbar, but can be anything). If you haven’t already, please read [QLayout](/layout/layout) documentation page first.

<DocApi file="QHeader" />

<DocApi file="QFooter" />

## Layout Builder

Scaffold your layout(s) by clicking on the button below.

<q-btn icon-right="launch" label="Layout Builder" href="/layout-builder" target="_blank" />

## Usage

::: tip
Since the header and footer needs a layout and QLayout by default manages the entire window, then for demoing purposes we are going to use containerized QLayouts. But remember that by no means you are required to use containerized QLayouts for QHeader or QFooter.
:::

<DocExample title="Basic" file="Basic" />

You can use `glossy` class on toolbars in header and footer.

<DocExample title="Glossy" file="Glossy" />

### Various content

<DocExample title="Playing with QToolbar" file="Extended" />

<DocExample title="Playing with QBreadcrumb" file="Breadcrumbs" />

<DocExample title="Playing with QTabs" file="Tabs" />

### Reveal property

In the example below, scroll the page to see the QHeader and QFooter behavior.

<DocExample title="Reveal" file="Reveal" />

### iOS look and feel

In the example below, you could use Ionicons icons (v4) with `ion-ios-` prefix for QTabs, which would perfectly match the iOS look and feel.

<DocExample title="iOS-like" file="LookingIOS" />

### Desktop app look and feel

The example below is especially useful if you build an Electron app and you hide the default app frame.

<DocExample title="Desktop app-like" file="AppLike" />
