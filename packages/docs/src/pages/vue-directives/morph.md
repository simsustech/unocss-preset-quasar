---
title: Morph Directive
desc: Vue directive that morphs between DOM elements or even between the two states of the same DOM element.
keys: morph
examples: Morph
related:
  - /quasar-utils/morph-utils
---

"Morph" is a Quasar directive that provides the ability to morph DOM elements between two states.

Under the hood, it uses the Quasar [Morph function util](/quasar-utils/morph-utils).

<DocApi file="Morph" />

## Usage

Reading the [Morph function util](/quasar-utils/morph-utils) first will be best in your understanding of how this directive works.

This directive morphs one element in a group into another. The morphing is activated by changing the value (model) of the directive to match the name of the morphing element.

::: warning

- The "name" and "group" (as directive arg or through the value of the directive) are mandatory.
- If the value of the directive is in Object form, then "model" is also mandatory.
  :::

<DocExample title="Morph between multiple elements in a group" file="BasicGroup" />

<DocExample title="Morph a button into a card" file="Card" />
