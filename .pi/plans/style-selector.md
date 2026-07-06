# Plan — Runtime Style Selector (MD2 / MD3 / Unstyled)

## Goal

Add a global style switcher in the playground (`quasar-testing-harness`) that lets the
user pick between `MaterialDesign2`, `MaterialDesign3`, and `Unstyled` at
runtime. The selection is persisted in the URL via `?style=md3` and shared
across navigation. All three styles' rules are bundled into a single
UnoCSS build; a body class selects which one is active.

## Architecture

### 1. Per-style body-class scope (preset)

Each style already has an empty `variants: Variant<QuasarTheme>[]` slot.
We use it.

**Approach: scope preflights/rules/shortcut-bodies via selector prefix.**

`QuasarStyle` is extended with an optional `bodyClass: string` field
(default `''`). The factory in `packages/preset/src/index.ts` wraps
`style.preflights`, `style.rules`, and `style.shortcuts` so every
emitted selector is prefixed with `body.<bodyClass> ` (or
`body[data-quasar-style="<slug>"] ` for attribute-based selection).

Implementation sketch:

```ts
function scopeStyle(style: QuasarStyle, bodyClass: string): QuasarStyle {
  if (!bodyClass) return style
  const guard = `body.${bodyClass} `
  const wrapSelector = (sel: string) => sel
    .split(',')
    .map(s => `${guard}${s.trim()}`)
    .join(', ')

  return {
    ...style,
    preflights: style.preflights.map(p => ({
      ...p,
      getCSS: (ctx) => wrapSelector(p.getCSS(ctx))
    })),
    rules: style.rules.map(([re, sel]) =>
      [re, wrapSelector(sel)] as Rule<QuasarTheme>
    ),
    shortcuts: style.shortcuts.map(s => {
      if (Array.isArray(s)) return s
      if (typeof s === 'function') return s
      // Static `[re, body]` shape — body is a class string. Convert to a
      // dynamic shortcut that returns the same body but the resolved
      // selector gets a body-class prefix. UnoCSS doesn't support a
      // selector prefix on shortcuts directly, so we do it via a
      // custom Variant entry that matches the resolved selector and
      // prefixes it with the guard.
      ...
    })
  }
}
```

For shortcuts specifically, UnoCSS exposes a `Variant` API that can
match and rewrite the resolved selector. We add a variant to the
preset's `variants` array that wraps every selector from a `md2` /
`md3` / `unstyled` shortcut with the appropriate `body.<bodyClass>`
prefix.

`Unstyled` exports empty arrays, so wrapping is a no-op for it.

Default `bodyClass` is empty → backward compatible.

### 2. Style values

```ts
MaterialDesign2.bodyClass = 'quasar-style-md2'
MaterialDesign3.bodyClass = 'quasar-style-md3'
Unstyled.bodyClass = 'quasar-style-unstyled'
```

Set these in each style's `index.ts` (md2/, md3/, unstyled/).

### 3. Body class management (playground)

New composable `packages/app/src/composables/useStyle.ts`:

- Reads `?style=md2|md3|unstyled` from URL (default `md3`).
- Sets `document.body.classList` to one of:
  - `quasar-style-md2` (and removes the other two)
  - `quasar-style-md3`
  - `quasar-style-unstyled`
- `setStyle(slug)` writes to the URL via `router.replace({ query: { style: slug } })`.
- Reactive `currentStyle` ref for the UI to bind to.

### 4. UI: StyleSelector dropdown in MainLayout

`packages/app/src/layouts/MainLayout.vue` gets a `q-header` + `q-toolbar`
(top bar) with a `q-btn-dropdown` showing the current style. Items:
MD3, MD2, Unstyled. Selecting one calls `setStyle`.

### 5. Tests

- Playwright: load `/`, verify `body.classList.contains('quasar-style-md3')`
  by default.
- Click the style dropdown, select "Material Design 2", verify URL
  contains `?style=md2` and `body.classList` updated.
- Reload with `?style=md2` directly, verify the class is set on mount.
- Existing 103 tests must still pass.

## Files to change

### `unocss-preset-quasar`

- `packages/preset/src/styles/index.ts` — add `bodyClass?: string` to
  `QuasarStyle` interface.
- `packages/preset/src/styles/_helpers.ts` — add `wrapSelector` helper.
- `packages/preset/src/index.ts` — apply the body-class scope to the
  style's preflights, rules, shortcuts, and register a wrapping
  variant in `variants`.
- `packages/preset/src/styles/md2/index.ts` — set `bodyClass: 'quasar-style-md2'`.
- `packages/preset/src/styles/md3/index.ts` — set `bodyClass: 'quasar-style-md3'`.
- `packages/preset/src/styles/unstyled/index.ts` — set `bodyClass: 'quasar-style-unstyled'`.

### `quasar-testing-harness`

- `packages/app/src/composables/useStyle.ts` — new composable.
- `packages/app/src/layouts/MainLayout.vue` — add top bar + style dropdown.
- `packages/app/src/App.vue` — call `useStyle()` on mount so the body
  class is set early.
- `tests/style-selector.spec.ts` — new test file.

## Verification

1. `pnpm --filter unocss-preset-quasar build` succeeds.
2. `pnpm --filter @quasar-testing-harness/app dev` starts and serves the playground.
3. Default load: `<body>` has `quasar-style-md3`, MD3 visuals are
   applied.
4. Switch to MD2: visuals change (different paddings, colors, no
   pill-shape on default buttons), URL shows `?style=md2`.
5. Switch to Unstyled: components look raw / unstyled.
6. Reload any state — class is restored from URL.
7. Existing 103 Playwright tests pass.

## Risks

- **Selector rewriting can be subtle**: splitting on `,` for preflights
  covers 99% of cases but a preflight with a comma in a CSS function
  call (e.g. `cubic-bezier(0.1, 0.2)` inside a media query selector)
  would break. Mitigate by testing on the current MD2/MD3 preflights
  first; if any break, use a smarter selector splitter that respects
  parentheses.
- **Shortcuts via Variant**: UnoCSS variants are applied to classes
  that match `meta.prefix` etc.; we'll need to confirm that a
  custom variant can match an arbitrary shortcut class name. If not,
  fall back to wrapping the body of static shortcuts with a CSS
  rule that uses `:where()` and the body class — but that doesn't
  work either. The realistic fallback: emit all three styles
  unprefixed and add a single CSS preflight in the playground
  that uses `:not(body.quasar-style-md2) .q-btn { all: revert }`
  to disable the wrong style. This is the **real** safest
  implementation and the one I'll use if selector wrapping
  doesn't work cleanly.

## Decision

Going with the **safest** approach: emit all three styles unprefixed
(no preset changes), and in the playground add a CSS preflight that
reverts the wrong style's effect using `all: revert` in a selector
scoped by `body:not(.quasar-style-<slug>)`.

Wait — that still doesn't work because `all: revert` reverts to user
agent styles, not to the other Quasar style.

**OK truly final approach**: Use UnoCSS **variant** to scope each
style's emitted rules. Define a variant in each style's
`variants: []` slot that prefixes the resolved selector with
`body.quasar-style-<slug>`. This is exactly what variants are for
in UnoCSS.

If that doesn't work for shortcuts (UnoCSS variants apply to
classes, but the resolved CSS rules for shortcut classes don't
inherit the variant), the fallback is to not scope at the
selector level and instead scope the entire preset's CSS output
by emitting a `revert-layer` for the inactive layers. Layers work
in modern browsers.

**Implementation will go with the layers approach** since it's the
most robust and works regardless of how UnoCSS resolves
shortcuts. Each style's rules are emitted into a named layer
(`quasar-md2`, `quasar-md3`, `quasar-unstyled`). The playground's
global stylesheet adds:

```css
@layer quasar-md2, quasar-md3, quasar-unstyled;
```

The active style's layer is "lifted" by appending its selector
group to a higher-priority layer via `@layer quasar-md3 { ... }`.
This is a CSS-only solution.
