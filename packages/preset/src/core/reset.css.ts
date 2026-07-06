import type { Preflight } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

export const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `@layer reset {
/*
  1. Prevent padding and border from affecting element width.
  2. Remove default margins and padding.
*/
*,
::after,
::before,
::backdrop {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/*
  1. Consistent line-height across browsers.
  2. Prevent font size adjustments after orientation changes.
  3. Readable tab size.
  4. Default sans-serif font.
  5. Disable tap highlights on iOS.
*/
html,
:host {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji');
  font-feature-settings: var(--default-font-featureSettings, normal);
  font-variation-settings: var(--default-font-variationSettings, normal);
  -webkit-tap-highlight-color: transparent;
}

/*
  1. Correct line height in all browsers.
  2. Add the correct height in Firefox.
  3. Correct the inheritance of border color in Firefox.
*/
hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

/*
  Remove the default font size and weight for headings.
*/
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
  Reset links to optimize for opt-in styling instead of opt-out.
*/
a {
  color: inherit;
  text-decoration: inherit;
}

/*
  Add the correct font weight in Edge and Safari.
*/
b, strong {
  font-weight: bolder;
}

/*
  1. Use monospace font for code elements.
  2. Correct the odd em font sizing in all browsers.
*/
code, kbd, samp, pre {
  font-family: var(--default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace);
  font-size: 1em;
}

small {
  font-size: 80%;
}

/*
  Prevent sub and sup from affecting line-height.
*/
sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub { bottom: -0.25em; }
sup { top: -0.5em; }

/*
  1. Remove text indentation from table contents.
  2. Correct table border color in Chrome, Edge, and Safari.
*/
table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

/*
  1. Change the font styles in all browsers.
  2. Remove the margin in Firefox and Safari.
  3. Remove default padding in Chrome.
*/
button, input, optgroup, select, textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

/*
  Remove the inheritance of text transform in Edge, Firefox, and IE.
*/
button, select {
  text-transform: none;
}

/*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Remove default button styles.
*/
button, input:where([type='button'], [type='reset'], [type='submit']) {
  -webkit-appearance: button;
}

/* Use modern Firefox focus styles. */
:-moz-focusring {
  outline: auto;
}

/*
  Remove the additional :invalid styles in Firefox.
*/
:-moz-ui-invalid {
  box-shadow: none;
}

/*
  Add the correct vertical alignment in Chrome and Firefox.
*/
progress {
  vertical-align: baseline;
}

/*
  Correct the cursor style of increment and decrement buttons in Safari.
*/
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
*/
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

/* Remove the inner padding in Chrome and Safari on macOS. */
::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
  1. Correct the inability to style upload buttons in iOS and Safari.
  2. Change font properties to inherit in Safari.
*/
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

/*
  Add the correct display in Chrome and Safari.
*/
summary {
  display: list-item;
}

/*
  Make replaced elements display: block by default.
*/
img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

/*
  Constrain images and videos to the parent width.
*/
img, video {
  max-width: 100%;
  height: auto;
}

/*
  Quasar-specific root styles.
*/
html, body, #q-app {
  width: 100%;
  direction: ltr;
}

body {
  min-width: 100px;
  min-height: 100%;
}
}
`
  }
] as Preflight<QuasarTheme>[]
