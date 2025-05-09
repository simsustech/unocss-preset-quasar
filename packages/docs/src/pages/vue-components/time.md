---
title: QTime
desc: The QTime component provides a method to input time.
keys: QTime
examples: QTime
related:
  - /vue-components/date
  - /quasar-utils/date-utils
  - /vue-components/field
---

The QTime component provides a method to input time.

::: tip
For handling date and/or time, also check out [Quasar Date Utils](/quasar-utils/date-utils).
:::

<DocApi file="QTime" />

## Usage

Notice that the model is a String only.

### Basic

<DocExample title="Basic" file="Basic" overflow />

<DocExample title="Landscape" file="Landscape" overflow />

::: tip
For landscape mode, you can use it along with `$q.screen` to make QTime responsive. Example: `:landscape="$q.screen.gt.xs"`. More info: [Quasar Screen Plugin](/options/screen-plugin).
:::

### Functionality

The 24 hour format is applied depending on the [Quasar Language Pack](/options/quasar-language-packs) that you've set, but you can also force it, like in the example below.

<DocExample title="24h format" file="Format24h" overflow />

Clicking on the "Now" button sets time to current user time:

<DocExample title="Now button" file="NowBtn" overflow />

<DocExample title="Disable and readonly" file="DisableReadonly" overflow />

### Model mask

The default model mask is `HH:mm` (or `HH:mm:ss` when using `with-seconds` prop), however you can use custom masks too.

The `mask` prop tokens can be found at [Quasar Utils > Date utils](/quasar-utils/date-utils#format-for-display).

::: warning Note on SSR
Using `x` or `X` (timestamps) in the mask may cause hydration errors on the client, because decoding the model String must be done with `new Date()` which takes into account the local timezone. As a result, if the server is in a different timezone than the client, then the rendered output of the server will differ than the one on the client so hydration will fail.
:::

::: danger Note on persian calendar
When using the persian calendar, the mask for QTime is forced to `HH:mm` or `HH:mm:ss` (if `with-seconds` is specified).
:::

<DocExample title="Simple mask" file="MaskSimple" overflow />

If you want to insert strings (including `[` and `]` characters) into your mask, make sure you escape them by surrounding them with `[` and `]`, otherwise the characters might be interpreted as format tokens.

<DocExample title="Mask with escaped characters" file="MaskEscape" overflow />

Using the mask to connect a [QDate](/vue-components/date) and QTime to the same model:

<DocExample title="QDate and QTime on same model" file="MaskDateTime" overflow />

### Custom ad-hoc locale

If, for some reason, you need to use a custom ad-hoc locale rather than the current Quasar Language Pack that has been set, you can use the `locale` prop:

<DocExample title="Custom ad-hoc locale" file="CustomLocale" overflow />

### Coloring

<DocExample title="Coloring" file="Color" overflow />

<DocExample title="Force dark mode" file="Dark" overflow />

### Limiting options

- You can use the `hour-options`, `minute-options` and `second-options` props to limit user selection to certain times.
- Alternatively, for a more in-depth way of limiting options, you can also supply a function (second example below) to `options-fn` prop.

<DocExample title="Options" file="Options" overflow />

### With QInput

<DocExample title="Input" file="Input" overflow />

Connecting a QDate and QTime with same model on a QInput:

<DocExample title="QDate and QTime with QInput" file="InputFull" overflow />

The following are **helpers** for QInput `mask` and `rules` props. You can use these for convenience or write the string specifying your [custom needs](/vue-components/input#mask).

- Property `mask` helpers: [full list](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6).
- Property `rules` helpers: [full list](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns/patterns.js).

Examples: "date", "time", "fulltime".

More info: [QInput](/vue-components/input).

### With additional buttons

You can use the default slot for adding buttons:

<DocExample title="With additional buttons" file="AdditionalButtons" overflow />

### Native form submit

When dealing with a native form which has an `action` and a `method` (eg. when using Quasar with ASP.NET controllers), you need to specify the `name` property on QTime, otherwise formData will not contain it (if it should):

<DocExample title="Native form" file="NativeForm" />
