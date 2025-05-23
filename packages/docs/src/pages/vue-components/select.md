---
title: Select
desc: The QSelect Vue component has two types of selection - single or multiple. This component opens up a menu for the selection list and action. A filter can also be used for longer lists.
keys: QSelect
examples: QSelect
---

The QSelect component has two types of selection: single or multiple. This component opens up a menu for the selection list and action. A filter can also be used for longer lists.

In case you are looking for a dropdown "button" instead of "input" use [Button Dropdown](/vue-components/button-dropdown) instead.

<DocApi file="QSelect" />

## Design

### Overview

::: warning
For your QSelect you can use only one of the main designs (`filled`, `outlined`, `standout`, `borderless`). You cannot use multiple as they are self-exclusive.
:::

<DocExample title="Design Overview" file="DesignOverview" />

### Decorators

<DocExample title="Decorators" file="Decorators" />

### Coloring

<DocExample title="Coloring" file="Coloring" />

### Clearable

As a helper, you can use `clearable` prop so user can reset model to `null` through an appended icon. The second QSelect in the example below is the equivalent of using `clearable`.

<DocExample title="Clearable" file="Clearable" />

### Disable and readonly

<DocExample title="Disable and readonly" file="DisableReadonly" />

### Slots with QBtn type "submit"

::: warning
When placing a QBtn with type "submit" in one of the "before", "after", "prepend", or "append" slots of a QField, QInput or QSelect, you should also add a `@click` listener on the QBtn in question. This listener should call the method that submits your form. All "click" events in such slots are not propagated to their parent elements.
:::

### Menu transitions

::: warning
Please note that transitions do not work when using `options-cover` prop.
:::

In the example below there's a few transitions showcased. For a full list of transitions available, go to [Transitions](/options/transitions).

<DocExample title="Menu transitions" file="MenuTransitions" />

### Options list display mode

By default QSelect shows the list of options as a menu on desktop and as a dialog on mobiles. You can force one behavior by using the `behavior` property.

::: warning
Please note that on iOS menu behavior might generate problems, especially when used in combination with `use-input` prop. You can use a conditional `behavior` prop like `:behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"` to use dialog mode only on iOS.
:::

<DocExample title="Show options in menu" file="BehaviorMenu" />

<DocExample title="Show options in dialog" file="BehaviorDialog" />

## The model

::: danger
The model for single selection can be anything (String, Object, ...) while the model for multiple selection must be an Array.
:::

<DocExample title="Single vs multiple selection" file="ModelSingleMultiple" />

<DocExample title="Multiple selection, counter and max-values" file="ModelMultipleCounter" />

The model content can be influenced by `emit-value` prop as you'll learn in "The options" section below.

## The options

### Options type

<DocExample title="String options" file="OptionString" />

<DocExample title="Object options" file="OptionObject" />

### Affecting model

When `emit-value` is used, the model becomes the determined `value` from the specified selected option. Default is to emit the whole option. It makes sense to use it only when the options are of Object form.

<DocExample title="Emit-value" file="OptionEmitValue" />

When `map-options` is used, the model can contain only the `value`, and it will be mapped against the options to determine its label. There is a performance penalty involved, so use it only if absolutely necessary. It's not needed, for example, if the model contains the whole Object (so contains the label prop).

<DocExample title="Map options" file="OptionMapOptions" />

### Custom prop names

By default, QSelect looks at `label`, `value`, `disable` and `sanitize` props of each option from the options array Objects. But you can override those:

::: warning
If you use functions for custom props always check if the option is null. These functions are used both for options in the list and for the selected options.
:::

<DocExample title="Custom label, value and disable props" file="OptionCustomProps" />

### Customizing menu options

::: warning
The list of options is rendered using virtual scroll, so if you render more than one element for an option you must set a `q-virtual-scroll--with-prev` class on all elements except the first one.
:::

<DocExample title="Options slot" file="OptionSlot" />

Here is another example where we add a QToggle to each option. The possibilities are endless.

<DocExample title="Object options" file="OptionQToggle" />

By default, when there are no options, the menu won't appear. But you can customize this scenario and specify what the menu should display.

<DocExample title="No options slot" file="OptionNoneSlot" />

### Lazy loading

The following example shows a glimpse of how you can play with lazy loading the options. This means, along with many other things, that `options` prop is not required on first render.

<DocExample title="Lazy load options" file="OptionLazyLoad" />

You can dynamically load new options when scroll reaches the end:

<DocExample title="Dynamic loading options" file="OptionsDynamic" />

### Cover mode

<DocExample title="Menu covering component" file="OptionCover" />

### Disable TAB selection

<DocExample title="Disable Tab Selection" file="DisableTabSelection" />

## The display value

<DocExample title="Custom display value" file="DisplayCustomValue" />

<DocExample title="Chips as display value" file="DisplayChips" />

<DocExample title="Selected-item slot" file="DisplaySelectedItemSlot" />

## Filtering and autocomplete

### Native attributes with "use-input"

All the attributes set on QSelect that are not in the list of props in the API will be passed to the native input field used (please check `use-input` prop description first to understand what it does) for filtering / autocomplete / adding new value. Some examples: autocomplete, placeholder.

More information: [native input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

<DocExample title="Filtering options" file="InputFilterOptions" />

<DocExample title="Basic filtering" file="BasicFiltering" />

<DocExample title="Filtering on more than 2 chars" file="InputFilterMin" />

<DocExample title="Text autocomplete" file="TextAutocomplete" />

<DocExample title="Lazy filtering" file="InputFilterLazy" />

<DocExample title="Selecting option after filtering" file="InputFilterAfter" />

## Create new values

::: tip
The following are just a few examples to get you started into making your own QSelect behavior. This is not exhaustive list of possibilities that QSelect offers.

It makes sense to use this feature along with `use-input` prop.
:::

In order to enable the creation of new values, you need to **either specify** the `new-value-mode` prop **and/or** listen for `@new-value` event. If you use both, then the purpose of listening to `@new-value` would be only to override the `new-value-mode` in your custom scenarios.

### The new-value-mode prop

The `new-value-mode` prop value specifies how the value should be added: `add` (adds a value, even if duplicate), `add-unique` (add only if NOT duplicate) or `toggle` (adds value if it's not already in model, otherwise it removes it).

By using this prop you don't need to also listen for `@new-value` event, unless you have some specific scenarios for which you want to override the behavior.

<DocExample title="New value mode" file="CreateNewValueMode" />

### The @new-value event

The `@new-value` event is emitted with the value to be added and a `done` callback. The `done` callback has two **optional** parameters:

- the value to be added
- the behavior (same values of `new-value-mode` prop, and when it is specified it overrides that prop -- if it is used) -- default behavior (if not using `new-value-mode`) is to add the value even if it would be a duplicate

Calling `done()` with no parameters simply empties the input box value, without tampering with the model in any way.

<DocExample title="Listening on @new-value" file="CreateListener" />

<DocExample title="Adding only unique values" file="CreateListenerUnique" />

### Using menu and filtering

Filtering and adding the new values to menu:

<DocExample title="Filtering and adding to menu" file="FilteringAddsToMenu" />

Filters new values (in the example below the value to be added requires at least 3 characters to pass), and does not add to menu:

<DocExample title="Filtering without adding to menu" file="FilteringNoAddToMenu" />

Generating multiple values from input:

<DocExample title="Generating multiple values" file="FilteringAddMultiple" />

## Sanitization

**By default, all options (included selected ones) are sanitized**. This means that displaying them in HTML format is disabled. However, if you require HTML on your options and you trust their content, then there are a few ways to do this.

You can force the HTML form of the menu options by:

- setting `html` key of the trusted option to `true` (for specific trusted options)
- or by setting `options-html` prop of QSelect (for all options)

The displayed value of QSelect is displayed as HTML if:

- the `display-value-html` prop of QSelect is set
- or you are not using `display-value` and
  - the `options-html` prop of QSelect is set
  - any selected option has `html` key set to `true`

::: warning
If you use `selected` or `selected-item` slots, then you are responsible for sanitization of the display value. The `display-value-html` prop will not apply.
:::

<DocExample title="Options in HTML form" file="HtmlOptions" />

<DocExample title="Display value in HTML form" file="HtmlDisplayValue" />

## Render performance

The render performance is NOT affected much by the number of options, unless `map-options` is used on a large set.
Notice the infinite scroll in place which renders additional options as the user scrolls through the list.

::: tip

- (Composition API) To get the best performance while using lots of options, do not wrap the array that you are passing in the `options` prop with ref()/computed()/reactive()/etc. This allows Vue to skip making the list "responsive" to changes.
- (Options API) To get the best performance while using lots of options, freeze the array that you are passing in the `options` prop using `Object.freeze(items)`. This allows Vue to skip making the list "responsive" to changes.
  :::

<DocExample title="100k options" file="RenderPerf" />

## Keyboard navigation

When QSelect is focused:

- pressing <kbd>ENTER</kbd>, <kbd>ARROW DOWN</kbd> (or <kbd>SPACE</kbd> if `use-input` is not set) will open the list of options
- if `use-chips` is set:
  - pressing <kbd>SHIFT</kbd> + <kbd>TAB</kbd> will navigate backwards through the QChips (if a QChip is selected <kbd>TAB</kbd> will navigate forward through the QChips)
  - pressing <kbd>ENTER</kbd> when a QChip is selected will remove that option from the selection
  - pressing <kbd>BACKSPACE</kbd> will remove the last option from the selection (when `use-input` is set the input should be empty)
- pressing <kbd>BACKSPACE</kbd> when `clearable` is set then:
  - it clears the model (with `null` value) for single selection
  - it removes the last added value for multiple selection
- pressing <kbd>TAB</kbd> (or <kbd>SHIFT</kbd> + <kbd>TAB</kbd> if `use-chips` is not set or the first QChip is selected) will navigate to the next or previous focusable element on page
- typing text (<kbd>0</kbd> - <kbd>9</kbd> or <kbd>A</kbd> - <kbd>Z</kbd>) if `use-input` is not set will:
  - create a search buffer (will be reset when a new key is not typed for 1.5 seconds) that will be used to search in the options labels
  - select the next option starting with that letter (after the current focused one) if the first key in buffer is typed multiple times
  - select the next option (starting with the current focused one) that matches the typed text (the match is fuzzy - the option label should start with the first letter and contain all the letters)

When the list of options is opened:

- pressing <kbd>ARROW UP</kbd> or <kbd>ARROW DOWN</kbd> will navigate up or down in the list of options
- pressing <kbd>PAGE UP</kbd> or <kbd>PAGE DOWN</kbd> will navigate one page up or down in the list of options
- pressing <kbd>HOME</kbd> or <kbd>END</kbd> will navigate to the start or end of the list of options (only if you are not using `use-input`, or the input is empty)
- when navigating using arrow keys, navigation will wrap when reaching the start or end of the list
- pressing <kbd>ENTER</kbd> (or <kbd>SPACE</kbd> when `use-input` is not set, or <kbd>TAB</kbd> when `multiple` and `disable-tab-selection` are not set) when an option is selected in the list will:
  - select the option and close the list of options if `multiple` and `disable-tab-selection` are not set
  - toggle the option if `multiple` is set

## Native form submit

When dealing with a native form which has an `action` and a `method` (eg. when using Quasar with ASP.NET controllers), you need to specify the `name` property on QSelect, otherwise formData will not contain it (if it should) - all value are converted to string (native behaviour, so do not use Object values):

<DocExample title="Native form" file="NativeForm" />
