# Fix: UnoCSS BEM Class-Name Mangling in `unocss-preset-quasar`

## Problem

When `unocss-preset-quasar` generates CSS, BEM class-name modifiers (e.g. `--flat`, `--mini`, `--highlighted`) inside bracket-variant selectors like `[&_.q-btn--flat]` get mangled into invalid CSS.

**Example of invalid output:**

```css
.q-btnvar(--flat)              /* should be .q-btn--flat */
.q-fieldvar(--highlighted)     /* should be .q-field--highlighted */
.q-fieldvar(--dark.q-field--highlighted .q-field)__input  /* should be .q-field--dark.q-field--highlighted .q-field__input */
.q-drawervar(var(--mini)-animate)  /* nested! should be .q-drawer--mini-animate */
```

This causes lightningcss to fail with:

```
SyntaxError: [lightningcss minify] Expected identifier in class selector, got Function("q-btnvar")
```

## Root Cause

UnoCSS's `preset-wind4` variant `variantVariables` (in `variants/misc.ts`) passes bracket selector content through `h.bracket()`, which calls `bracketWithType()` in `handlers.ts`. That function uses the regex `cssVarsRE`:

```js
;/(?<!var\()--([\w.-]+)(\([^)]+\)|,[#.\s\w]+)?/g
```

This regex is designed to find CSS variable references in bracket _values_, but it also matches BEM double-dash modifiers in bracket _selectors_.

### The Double-Match Bug

When a bracket selector contains multiple `--xxx` patterns separated by `)` (e.g., inside `:not(...)`), cssVarsRE produces two matches. The second match's substring (`--mini`) is then found INSIDE the first match's replacement (`var(--mini-animate)`), because `String.replace()` in a loop finds the FIRST occurrence. This produces nested `var(var(--mini)-animate)`:

```
Base:      &:not(.q-drawer--mini-animate)_.q-drawer--mini
Match 1:   --mini-animate
After 1:   &:not(.q-drawervar(--mini-animate))_.q-drawer--mini
Match 2:   --mini  (replaces first occurrence: inside var(...)!)
After 2:   &:not(.q-drawervar(var(--mini)-animate))_.q-drawer--mini
```

## Fix

Added a `fixBemVarMangling` postprocessor to the preset's `index.ts` with a two-pass, loop-based approach:

```ts
const fixBemVarMangling: Postprocessor = (util: UtilObject) => {
  if (util.selector) {
    let prev: string
    do {
      prev = util.selector
      // Pass 1: flatten nested var(var(--xxx)-rest) → var(--xxx-rest)
      util.selector = util.selector.replace(
        /(\w)var\(var\((--[^)]+)\)/g,
        '$1var($2'
      )
      // Pass 2: strip remaining var(--xxx) → --xxx
      util.selector = util.selector.replace(/(\w)var\((--[^)]+)\)/g, '$1$2')
    } while (util.selector !== prev)
  }
  return util
}
```

**Pass 1** handles the nested `var(var(--xxx)` case produced by UnoCSS's double-match bug. It strips the inner `var()` wrapper, converting `var(var(--xxx)-rest)` to `var(--xxx-rest)`.

**Pass 2** strips the remaining `var()` wrapper, converting `var(--xxx-rest)` to `--xxx-rest`.

The loop repeats until no more changes are found, handling arbitrary levels of nesting.

**Why `[^)]+` (match anything except `)`):** The `cssVarsRE` optional group `(,[#.\s\w]+)?` can match across whitespace and dots. A selector like `.q-field--dark.q-field--highlighted .q-field__input` gets mangled to `q-fieldvar(--dark.q-field--highlighted .q-field__input)`, which `[\w.-]+` cannot span (it stops at whitespace). Using `[^)]+` matches everything up to the closing paren.

**Why this is safe:** Legitimate `var(--xxx)` references in CSS property values are not preceded by a word character, so they are left alone.

## Files Changed

- `unocss-preset-quasar/packages/preset/src/index.ts`
  - Added import: `Postprocessor, UtilObject` from `@unocss/core`
  - Added `fixBemVarMangling` function with two-pass nested `var()` fix
  - Wired into `postprocess` array (appended after body-class scoping)

## Verification

- Build succeeds without lightningcss errors (both client and SSR)
- Zero `*var(--xxx)` patterns remaining in generated CSS selectors
- Zero `q-drawervar`, `q-fieldvar`, `q-btnvar` patterns in CSS output
