---
title: Input
desc: The QInput Vue component is used to capture text input from the user.
keys: QInput
examples: QInput
---

The QInput component is used to capture text input from the user. It uses `v-model`, similar to a regular input. It has support for errors and validation, and comes in a variety of styles, colors, and types.

<DocApi file="QInput" />

## Design

::: warning
For your QInput you can use only one of the main designs (`filled`, `outlined`, `standout`, `borderless`). You cannot use multiple as they are self-exclusive.
:::

<DocExample title="Design Overview" file="DesignOverview" />

### Coloring

<DocExample title="Coloring" file="Coloring" />

### Standard

<DocExample title="Standard" file="DesignStandard" />

### Filled

<DocExample title="Filled" file="DesignFilled" />

### Outlined

<DocExample title="Outlined" file="DesignOutlined" />

### Standout

<DocExample title="Standout" file="DesignStandout" />

One of the most appropriate use cases for Standout design is in a QToolbar:

<DocExample title="Standout in QToolbar" file="StandoutToolbar" />

### Borderless

The `borderless` design allows you to seamlessly integrate your QInput into other components without QInput drawing a border around itself or changing its background color:

<DocExample title="Borderless" file="Borderless" />

### Rounded design

The `rounded` prop only works along with Filled, Outlined and Standout designs, as showcased in the example below:

<DocExample title="Rounded" file="Rounded" />

### Square borders

The `square` prop only makes sense along with Filled, Outlined and Standout designs, as showcased in the example below:

<DocExample title="Square borders" file="SquareBorders" />

### Force dark mode

<DocExample title="Force dark mode" file="Dark" />

## Basic features

### Native attributes

All the attributes set on `QInput` that are not in the list of `props` in the **API** will be passed to the native field (`input` or `textarea`). Some examples: autocomplete, placeholder.

Please check these resources for more information about native attributes (for input check also the specific attributes for each type):

- [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

### Clearable

As a helper, you can use `clearable` prop so user can reset model to `null` through an appended icon. The second QInput in the example below is the equivalent of using `clearable`.

::: warning
Won't work with `v-model` managed input modifiers such as `.trim` because in that case Vue doesn't handle `null` values.
:::

<DocExample title="Clearable" file="Clearable" />

### Input types

The following QInputs make use of the `type` prop in order to render native equivalent `<input type="...">` inside of them.

::: warning
Support and behavior is the subject entirely of the browser rendering the page and not Quasar's core code.
:::

<DocExample title="Input types" file="InputTypes" />

::: tip
Some input types (like `date` or `time`) always render some controls, so you if you're using a `label` then you might want to set it along with `stack-label`, otherwise the label will overlap native browser controls.
:::

#### Input of number type

You'll be using `v-model.number` (notice the `number` modifier) along with `type="number"` prop:

<DocExample title="Input of number type" file="InputTypeNumber" />

#### Input of file type

::: tip ALTERNATIVES
**Instead of using a QInput with `type="file"`, you might want to use [QFile](/vue-components/file) picker instead or even [QUploader](/vue-components/uploader)**. However, should you wish to use QInput, please read the warning below.
:::

::: warning
Do NOT use a `v-model` when QInput is of `type="file"`. Browser security policy does not allow a value to be set to such an input. As a result, you can only read it (attach an `@update:model-value` event), but not write it.
:::

<DocExample title="Input of file type" file="InputTypeFile" />

### Textarea

<DocExample title="Textarea" file="Textarea" />

When you need QInput to grow along with its content, then use the `autogrow` prop like in the example below:

<DocExample title="Autogrow" file="Autogrow" />

### Prefix and suffix

<DocExample title="Prefix and suffix" file="PrefixSuffix" />

### Custom Label

Using the `label` slot you can customize the aspect of the label or add special features as `QTooltip`.

::: tip
Do not forget to set the `label-slot` property.

If you want to interact with the content of the label (QTooltip) add the `all-pointer-events` class on the element in the slot.
:::

<DocExample title="Custom label" file="CustomLabel" />

### Shadow text

<DocExample title="Shadow text" file="ShadowText" />

### Slots with QBtn type "submit"

::: warning
When placing a QBtn with type "submit" in one of the "before", "after", "prepend", or "append" slots of a QField, QInput or QSelect, you should also add a `@click` listener on the QBtn in question. This listener should call the method that submits your form. All "click" events in such slots are not propagated to their parent elements.
:::

### Debouncing model

The role of debouncing is for times when you watch the model and do expensive operations on it. So you want to first let user type out before triggering the model update, rather than updating the model on each keystroke.

<DocExample title="Debounce model" file="Debouncing" />

### Loading state

<DocExample title="Loading state" file="LoadingState" />

## Mask

You can force/help the user to input a specific format with help from `mask` prop.

::: warning
Mask is only available if the `type` is one of 'text' (default), 'search', 'url', 'tel', or 'password'.
:::

Below are mask tokens:

| Token | Description                                        |
| ----- | -------------------------------------------------- |
| `#`   | Numeric                                            |
| `S`   | Letter, a to z, case insensitive                   |
| `N`   | Alphanumeric, case insensitive for letters         |
| `A`   | Letter, transformed to uppercase                   |
| `a`   | Letter, transformed to lowercase                   |
| `X`   | Alphanumeric, transformed to uppercase for letters |
| `x`   | Alphanumeric, transformed to lowercase for letters |

There are **helpers** for QInput `mask` prop: [full list](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6). You can use these for convenience (examples: "phone", "card") or write the string specifying your custom needs.

<DocExample title="Basic" file="MaskBasic" />

<DocExample title="Filling the mask" file="MaskFill" />

The `unmasked-value` is useful if for example you want to force the user type a certain format, but you want the model to contain the raw value:

<DocExample title="Unmasked model" file="MaskUnmaskedModel" />

The `reverse-fill-mask` is useful if you want to force the user to fill the mask from the end and allow non-fixed length of input:

<DocExample title="Filling the mask in reverse" file="MaskFillReverse" />

### Using third party mask processors

You can easily use any third party mask processor by doing a few small adjustments to your QInput.

Starting from a QInput like this:

```html
<q-input
  filled
  v-model="price"
  label="Price with 2 decimals"
  mask="#.##"
  fill-mask="#"
  reverse-fill-mask
  hint="Mask: #.00"
  input-class="text-right"
/>
```

You can use v-money directive:

```html
<q-field
  filled
  v-model="price"
  label="Price with v-money directive"
  hint="Mask: $ #,###.00 #"
>
  <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
    <input
      :id="id"
      class="q-field__input text-right"
      :value="modelValue"
      @change="e => emitValue(e.target.value)"
      v-money="moneyFormatForDirective"
      v-show="floatingLabel"
    />
  </template>
</q-field>
```

```javascript
moneyFormatForDirective: {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  masked: false /* doesn't work with directive */
}
```

Or you can use money component:

```html
<q-field
  filled
  v-model="price"
  label="Price with v-money component"
  hint="Mask: $ #,###.00 #"
>
  <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
    <money
      :id="id"
      class="q-field__input text-right"
      :model-value="modelValue"
      @update:model-value="emitValue"
      v-bind="moneyFormatForComponent"
      v-show="floatingLabel"
    />
  </template>
</q-field>
```

```javascript
moneyFormatForComponent: {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  masked: true
}
```

## Validation

### Internal validation

You can validate QInput components with `:rules` prop. Specify array of embedded rules or your own validators. Your custom validator will be a function which returns `true` if validator succeeds or `String` with error message if it doesn't succeed.

::: tip
By default, for perf reasons, a change in the rules does not trigger a new validation until the model changes. In order to trigger the validation when rules change too, then use `reactive-rules` Boolean prop. The downside is a performance penalty (so use it when you really need this only!) and it can be slightly mitigated by using a computed prop as value for the rules (and not specify them inline in the vue template).
:::

This is so you can write convenient rules of shape like:

```js
;(value) => condition || errorMessage
```

For example:

```js
;(value) => value.includes('Hello') || 'Field must contain word Hello'
```

You can reset the validation by calling `resetValidation()` method on the QInput.

There are **helpers** for QInput `rules` prop: [full list](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns/patterns.js). You can use these for convenience (examples: "date", "time", "hexColor", "rgbOrRgbaColor", "anyColor") or write the string specifying your custom needs.

<DocExample title="Basic" file="ValidationRequired" />

<DocExample title="Maximum length" file="ValidationMaxLength" />

If you set `lazy-rules`, validation starts after first blur. If `lazy-rules` is set to `ondemand` String, then validation will be triggered only when component's validate() method is manually called or when the wrapper QForm submits itself.

<DocExample title="Lazy rules" file="ValidationLazy" />

<DocExample title="Form validation" file="ValidationForm" />

#### Async rules

Rules can be async too, by using async/await or by directly returning a Promise.

::: tip
Consider coupling async rules with `debounce` prop to avoid calling the async rules immediately on each keystroke, which might be detrimental to performance.
:::

<DocExample title="Async rules" file="ValidationAsync" />

### External validation

You can also use external validation and only pass `error` and `error-message` (enable `bottom-slots` to display this error message).

::: tip
Depending on your needs, you might connect [Vuelidate](https://vuelidate-next.netlify.app/) (our recommended approach) or some other validation library to QInput.
:::

<DocExample title="External" file="ValidationExternal" />

You can also customize the slot for error message:

<DocExample title="Slot for error message" file="ValidationSlots" />

## Native form submit

When dealing with a native form which has an `action` and a `method` (eg. when using Quasar with ASP.NET controllers), you need to specify the `name` property on QInput, otherwise formData will not contain it (if it should):

<DocExample title="Native form" file="NativeForm" />
