---
title: Stepper
desc: The QStepper Vue component conveys progress through a sequence of numbered steps. It may also be used for navigation. It's usually useful when the user has to follow steps to complete a process, like in a wizard.
keys: QStepper,QStep,QStepperNavigation
examples: QStepper
related:
  - /options/transitions
---

Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation.
They're usually useful when the user has to follow steps to complete a process, like in a [wizard](<https://en.wikipedia.org/wiki/Wizard_(software)>).

<DocApi file="QStepper" />

<DocApi file="QStep" />

<DocApi file="QStepperNavigation" />

The `QStepperNavigation` component allows you to place buttons within `QStepper` or `QStep` to
navigate through the steps. It is up to you to add whatever buttons you require.

::: tip
To use global navigation, you must add it to the `QStepper` "navigation" slot.
:::

## Usage

::: tip
If the QStep content also has images and you want to use swipe actions to navigate, you might want to add `draggable="false"` to them, otherwise the native browser behavior might interfere in a negative way.
:::

::: danger Keep Alive

- Please take notice of the Boolean `keep-alive` prop for QStepper, if you need this behavior. Do NOT use Vue's native `<keep-alive>` component over QStep.
- Should you need the `keep-alive-include` or `keep-alive-exclude` props then the QStep `name`s must be valid Vue component names (no spaces allowed, don't start with a number etc).
  :::

### Horizontal

<DocExample title="Horizontal" file="TypeHorizontal" />

### Vertical

<DocExample title="Vertical" file="TypeVertical" />

### Header navigation

<DocExample title="Non-linear header navigation" file="NonLinearNavigation" />

<DocExample title="Linear header navigation" file="LinearNavigation" />

### Header options

<DocExample title="Signaling step error" file="StepError" />

<DocExample title="Alternative labels" file="AlternativeLabels" />

::: tip
You can also connect `contracted` prop to `$q.screen` to create a responsive behavior, like `:contracted="$q.screen.lt.md"`.
More info: [Quasar Screen Plugin](/options/screen-plugin).
:::

<DocExample title="Contracted" file="Contracted" />

### Style

Play with coloring using the `*-icon` and `*-color` props (on QStepper or override on specific QStep).

<DocExample title="Coloring" file="Coloring" />

You can also use `prefix` prop (max 2 characters) instead of an icon for each step's header. This will be displayed if the step is not currently being edited and it isn't marked with error or as "done".

<DocExample title="Step prefix" file="Prefix" />

<DocExample title="Force dark mode" file="Dark" />

You can use the `header-class` prop to apply any CSS class(es) to the header. In the example below, we are applying bolded text:

<DocExample title="Header Class" file="HeaderClass" />

### Message slot

<DocExample title="Message slot with fixed height steps" file="MessageSlot" />
