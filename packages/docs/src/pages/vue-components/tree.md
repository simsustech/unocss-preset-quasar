---
title: Tree
desc: The QTree is a highly configurable Vue component which displays hierarchical data, such as a table of contents in a tree structure.
keys: QTree
examples: QTree
---

Quasar Tree represents a highly configurable component that displays hierarchical data, such as a table of contents in a tree structure.

<DocApi file="QTree" />

## Usage

### Basic

<DocExample title="Basic" file="Basic" />

### No connector lines

<DocExample title="No connectors" file="NoConnectors" />

### Dense <q-badge label="v2.2.4+" />

<DocExample title="Dense" file="DenseTree" />

### Force dark mode

<DocExample title="Force dark mode" file="Dark" />

### Perf considerations <q-badge label="v2.9.2+" />

When using relatively large data, for performance we recommend using the `no-transition` Boolean prop which will account for a significant runtime speed improvement.

```html
<q-tree no-transition ...
```

### Integrated example

<DocExample title="With QSplitter and QTabPanels" file="Splitter" />

More info: [QSplitter](/vue-components/splitter), [QTabPanels](/vue-components/tab-panels).

### Customize content

Notice (in the example below) the default header and body slot customization.

<DocExample title="Default header and body slots" file="SlotsDefault" />

Notice (in the example below) the custom header and body slots.

<DocExample title="Customizing nodes" file="SlotsCustomized" />

::: warning
Clicking or pressing `SPACE` or `ENTER` on the custom header selects the tree item (and the custom header is blurred).

If you don't want this to happen just wrap the content of the custom header in a `<div @click.stop @keypress.stop>` (or add the listeners to the respective component/element that is emitting them).
:::

### Accordion, filtering and selectable

In the example below, sibling nodes get contracted when one gets expanded.

<DocExample title="Accordion mode" file="Accordion" />

<DocExample title="Filtering nodes" file="FilterDefault" />

<DocExample title="Selectable nodes" file="Selectable" />

### Lazy loading

<DocExample title="Lazy loading nodes" file="LazyLoad" />

### Selection vs ticking, expansion

- Selection (through QTree `selected` prop) refers to the currently selected node (gets highlighted with different background).
- Ticking (through QTree `ticked` prop) refers to the checkbox associated with each node.
- Expansion (through QTree `expanded` prop) refers to the nodes that are expanded.

All properties above require to be dynamically bound using `v-model:<prop_name>` directive in order for them to work correctly (example: `v-model:expanded`).

<DocExample title="Syncing node properties" file="Sync" />

### Tick strategy

There are three ticking strategy: 'leaf', 'leaf-filtered', 'strict' with an additional (and default) 'none' which disables ticking.

| Strategy      | Description                                                                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| leaf          | Ticked nodes are only the leaves. Ticking a node influences the parent's ticked state too (parent becomes partially ticked or ticked), as well as its children (all tickable children become ticked). |
| leaf-filtered | Same concept as `leaf`, only that this strategy applies only to filtered nodes (the nodes that remain visible after filtering).                                                                       |
| strict        | Ticked nodes are independent of parent or children tick state.                                                                                                                                        |

You can apply a global tick strategy for a QTree and locally change the ticking strategy for a certain node by specifying the `tickStrategy` in the `nodes` model.

<DocExample title="Tick strategy" file="TickStrategy" />

### Custom filter method

You can customize the filtering method by specifying the `filter-method` prop. The method below filters by input if it also has '(\*)':

<DocExample title="Custom filter" file="FilterCustom" />

### Nodes model structure

The following describes a node's properties that are taken into account by QTree's v-model.

| Node Property | Type           | Behavior when not present                       | Description                                                                                                                 |
| ------------- | -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| \<nodeKey\>   | String, Number | An error is generated                           | Node's key. The key is picked from the key specified in `nodeKey` property.                                                 |
| label         | String         | The item has no label                           | Node's label. When `labelKey` prop is set the label is picked from that key.                                                |
| icon          | String         | The default icon is used                        | Node's icon.                                                                                                                |
| iconColor     | String         | The inherited color is used                     | Node's icon color. One from Quasar Color Palette.                                                                           |
| img           | String         | No image is displayed                           | Node's image. Use /public folder. Example: 'mountains.png'                                                                  |
| avatar        | String         | No avatar is displayed                          | Node's avatar. Use /public folder. Example: 'boy-avatar.png'                                                                |
| children      | Array          | This node has no sub-nodes                      | Array of nodes as children.                                                                                                 |
| disabled      | Boolean        | The node is enabled                             | Is node disabled?                                                                                                           |
| expandable    | Boolean        | The node is expandable                          | Is node expandable?                                                                                                         |
| selectable    | Boolean        | The node is selectable                          | Is node selectable?                                                                                                         |
| handler       | Function       | No extra function is called                     | Custom function that should be called on click on node. Receives `node` as parameter.                                       |
| tickable      | Boolean        | The node is tickable according to tick strategy | When using a tick strategy, each node shows a checkbox. Should a node's checkbox be disabled?                               |
| noTick        | Boolean        | Node displays a checkbox                        | When using a tick strategy, should node display a checkbox?                                                                 |
| tickStrategy  | String         | Tick strategy 'none' is used                    | Override global tick strategy for this node only. One of 'leaf', 'leaf-filtered', 'strict', 'none'.                         |
| lazy          | Boolean        | Children are not lazy loaded                    | Should children be lazy loaded? In this case also don't specify 'children' prop.                                            |
| header        | String         | Slot 'default-header' is used                   | Node header scoped slot name, without the required 'header-' prefix. Example: 'story' refers to 'header-story' scoped slot. |
| body          | String         | Slot 'default-body' is used                     | Node body scoped slot name, without the required 'body-' prefix. Example: 'story' refers to 'body-story' scoped slot.       |
