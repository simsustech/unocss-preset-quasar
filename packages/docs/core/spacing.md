# Spacing

The preset provides Quasar-compatible margin and padding shortcut classes.

## Margin

```html
<div class="q-ma-none">No margin</div>
<div class="q-ma-xs">Extra small margin (4px)</div>
<div class="q-ma-sm">Small margin (8px)</div>
<div class="q-ma-md">Medium margin (16px)</div>
<div class="q-ma-lg">Large margin (24px)</div>
<div class="q-ma-xl">Extra large margin (48px)</div>
```

Directional margins:

```html
<div class="q-mt-md">Margin top medium</div>
<div class="q-mb-md">Margin bottom medium</div>
<div class="q-ml-md">Margin left medium</div>
<div class="q-mr-md">Margin right medium</div>
<div class="q-mx-md">Margin horizontal medium</div>
<div class="q-my-md">Margin vertical medium</div>
```

## Padding

```html
<div class="q-pa-none">No padding</div>
<div class="q-pa-xs">Extra small padding (4px)</div>
<div class="q-pa-sm">Small padding (8px)</div>
<div class="q-pa-md">Medium padding (16px)</div>
<div class="q-pa-lg">Large padding (24px)</div>
<div class="q-pa-xl">Extra large padding (48px)</div>
```

Directional padding:

```html
<div class="q-pt-md">Padding top medium</div>
<div class="q-pb-md">Padding bottom medium</div>
<div class="q-pl-md">Padding left medium</div>
<div class="q-pr-md">Padding right medium</div>
<div class="q-px-md">Padding horizontal medium</div>
<div class="q-py-md">Padding vertical medium</div>
```

## Spacing Scale

| Size   | Value |
| ------ | ----- |
| `none` | 0     |
| `xs`   | 4px   |
| `sm`   | 8px   |
| `md`   | 16px  |
| `lg`   | 24px  |
| `xl`   | 48px  |

## UnoCSS Fallback

All standard UnoCSS spacing utilities work as well:

```html
<div class="m-4 p-2">Tailwind-style</div>
<div class="mt-8 mb-2 mx-auto">Directional</div>
<div class="p-[12px] m-[6px]">Arbitrary values</div>
```
