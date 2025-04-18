---
title: File Picker
desc: The QFile Vue component is used as a file picker.
keys: QFile
examples: QFile
related:
  - /vue-components/uploader
  - /vue-components/input
---

QFile is a component which handles the user interaction for picking file(s).

::: tip
If you also want a component to handle the upload for you, please consider using [QUploader](/vue-components/uploader) instead.
:::

<DocApi file="QFile" />

## Design

::: warning
For your QFile you can use only one of the main designs (`filled`, `outlined`, `standout`, `borderless`). You cannot use multiple as they are self-exclusive.
:::

<DocExample title="Design Overview" file="DesignOverview" />

### Decorators

<DocExample title="Decorators" file="Decorators" />

### Coloring

<DocExample title="Coloring" file="Coloring" />

### Clearable

As a helper, you can use `clearable` prop so user can reset model to `null` through an appended icon. The second QFile in the example below is the equivalent of using `clearable`.

<DocExample title="Clearable" file="Clearable" />

### Disable and readonly

<DocExample title="Disable and readonly" file="DisableReadonly" />

## Usage

::: warning
Under the hood, QFile uses a native input. Due to browser security policy, it is not allowed to programmatically fill such an input with a value. As a result, even if you set v-model from the beginning to a value, the component will show those file(s) but the input tag itself won't be filled in with that value. A user interaction (click/tap/<kbd>ENTER</kbd> key/<kbd>SPACE</kbd> key) is absolutely required in order for the native input to contain them. It's best to always have the initial value of model set to `null` or `undefined/void 0`.
:::

### Basic

<DocExample title="Single file" file="BasicSingle" />

<DocExample title="Multiple files" file="BasicMultiple" />

### Appending files

By default, QFile replaces the model each time the user selects any files through the popup. However, when you are accepting multiple files (`multiple` prop) you can change this behavior and append the new selection to the model rather than replacing its old value.

Below you can pick files multiple times and QFile will keep on appending them to the model:

<DocExample title="Appending files" file="AppendingFiles" />

### Counters

<DocExample title="Basic counter" file="CounterBasic" />

<DocExample title="Counter label" file="CounterLabel" />

### Using chips

<DocExample title="With chips" file="WithChips" />

### Using file slot

The example below highlights how you can customize the display of each file and even incorporate a possible upload progress indicator:

<DocExample title="With progress indicator" file="WithProgress" />

### Restricting files

<DocExample title="Basic restrictions" file="RestrictionBasic" />

You can even combine the restrictions above.

::: tip
In the example above, we're using `accept` property. Its value must be a comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element. [More info](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers).
:::

::: warning
Recommended format for the `accept` property is `<mediatype>/<extension>`. Examples: "image/png", "image/png". QFile uses an `<input type="file">` under the hood and it relies entirely on the host browser to trigger the file picker. If the `accept` property (that gets applied to the input) is not correct, no file picker will appear on screen or it will appear but it will accept all file types.
:::

You can also apply custom filters (which are executed after user picks files):

<DocExample title="Filter" file="RestrictionFilter" />

### Native form submit

When dealing with a native form which has an `action` and a `method` (eg. when using Quasar with ASP.NET controllers), you need to specify the `name` property on QFile, otherwise formData will not contain it (if it should):

<DocExample title="Native form" file="NativeForm" />
