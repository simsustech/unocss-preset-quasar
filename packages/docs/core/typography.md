# Typography

The preset includes a complete Material Design typography scale. All text utilities are responsive and respect the theme's font family.

## Font Family

The default font is **Roboto** (loaded via Bunny CDN). The body preflight sets:

```css
body {
  font-family:
    'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
```

Override via `presetWebFonts`:

```ts
QuasarPreset({
  presetWebFonts: {
    provider: 'google',
    fonts: {
      roboto: 'Roboto:300,400,500,700'
    }
  }
})
```

## Heading Scale

```html
<h1>Default heading 1</h1>
<span class="text-h1">Heading 1 style</span>
<span class="text-h2">Heading 2 style</span>
<span class="text-h3">Heading 3 style</span>
<span class="text-h4">Heading 4 style</span>
<span class="text-h5">Heading 5 style</span>
<span class="text-h6">Heading 6 style</span>
```

| Class     | Size     | Weight       | Line Height | Letter Spacing |
| --------- | -------- | ------------ | ----------- | -------------- |
| `text-h1` | 6rem     | 300 (light)  | 6rem        | -0.01562em     |
| `text-h2` | 3.75rem  | 300 (light)  | 3.75rem     | -0.00833em     |
| `text-h3` | 3rem     | 400 (normal) | 3.125rem    | normal         |
| `text-h4` | 2.125rem | 400 (normal) | 2.5rem      | 0.00735em      |
| `text-h5` | 1.5rem   | 400 (normal) | 2rem        | normal         |
| `text-h6` | 1.25rem  | 500 (medium) | 2rem        | 0.0125em       |

## Body & Label Scale

```html
<span class="text-subtitle1">Subtitle 1</span>
<span class="text-subtitle2">Subtitle 2</span>
<span class="text-body1">Body 1</span>
<span class="text-body2">Body 2</span>
<span class="text-overline">OVERLINE</span>
<span class="text-caption">Caption text</span>
```

| Class            | Size     | Weight | Line Height | Letter Spacing |
| ---------------- | -------- | ------ | ----------- | -------------- |
| `text-subtitle1` | 1rem     | 400    | 1.75rem     | 0.00937em      |
| `text-subtitle2` | 0.875rem | 500    | 1.375rem    | 0.00714em      |
| `text-body1`     | 1rem     | 400    | 1.5rem      | 0.03125em      |
| `text-body2`     | 0.875rem | 400    | 1.25rem     | 0.01786em      |
| `text-overline`  | 0.75rem  | 500    | 2rem        | 0.16667em      |
| `text-caption`   | 0.75rem  | 400    | 1.25rem     | 0.03333em      |

## Text Modifiers

```html
<span class="text-uppercase">uppercase</span>
<span class="text-lowercase">lowercase</span>
<span class="text-capitalize">capitalize</span>
<span class="text-center">centered text</span>
<span class="text-left">left aligned</span>
<span class="text-right">right aligned</span>
<span class="text-justify">justified</span>
<span class="text-italic">italic</span>
<span class="text-bold">bold</span>
<span class="text-no-wrap">no wrap</span>
<span class="text-strike">strikethrough</span>
```

## Font Weights

```html
<span class="text-weight-thin">Thin (100)</span>
<span class="text-weight-light">Light (300)</span>
<span class="text-weight-regular">Regular (400)</span>
<span class="text-weight-medium">Medium (500)</span>
<span class="text-weight-bold">Bold (700)</span>
<span class="text-weight-bolder">Bolder (900)</span>
```

## HTML Elements

The preflight styles HTML heading elements (`h1` through `h6`) with the matching MD3 styles. `<p>` gets 16px bottom margin, `<small>` is 80% size, and `<big>` is 170%.

## UnoCSS Fallback

All standard UnoCSS/Wind typography utilities work as well:

```html
<span class="text-sm font-bold leading-tight tracking-wide"
  >Wind utilities</span
>
<span class="text-[14px] font-[500]">Arbitrary values</span>
```
