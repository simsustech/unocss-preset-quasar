# unocss-preset-quasar

## 0.5.2

### Patch Changes

- 696c8af: refactor: derive runtime tokens from the StyleSpecs — single source of truth

  - The per-style runtime token values (`--q-*`) are no longer hand-maintained
    in `core/_tokens.ts`; they are derived from the StyleSpecs
    (`spec/md3.spec.ts`, `spec/md2.spec.ts`, `spec/unstyled.spec.ts`) via
    `core/_tokenDerive.ts`. Edit a spec to change a style.
  - Removed the deprecated `MaterialDesign2` / `MaterialDesign3` / `Unstyled`
    style-entry aliases, the unused `mergeTokens()` export, and the dead
    `DesignTokens.dark` block. `style` remains a supported shorthand for
    `styles: [style]`.
  - Corrected MD2 hover-state opacity from 0.08 to 0.04 to match the MD2
    specification (the old value was a copy of MD3's).
  - Added a drift-guard test (`test/token-derive.test.ts`) that fails if a
    spec edit silently changes an emitted `--q-*` value.

## 0.5.1

### Patch Changes

- fix: `text-overline` no longer applies `text-transform: uppercase`

## 0.5.0

### Minor Changes

- bdcc114: **Breaking: single shared component tree driven by CSS-variable tokens; runtime style switching.**

  - Remove per-style component trees (`md3/`, `md2/`, `unstyled/`). A style is now only a token
    stylespec: `{ name, tokens }` (see `QuasarStyleEntry`). One shared `styles/shared/` tree is
    the base for all styles; `md3`/`md2`/`unstyled` are pure token entries.
  - Drop `tokens`/`scoped` preset options and `bodyClass` scoping. The preset option is now
    `styles?: QuasarStyleEntry[]`; tokens live under `theme.quasar.tokens`.
  - Add `setStyle(name)` / `getActiveStyle()` exports from `unocss-preset-quasar/styles` for
    runtime CSS-variable swapping (body-class switch). Dark mode still uses the `--light-*` →
    `--dark-*` token swap via `body--dark`.
  - Component tokens (e.g. `btnRadius`, `btnBg`, `btnTextTransform`) are emitted per style block;
    md2 vs md3 vs unstyled differences are expressed as token values, not duplicate trees.
  - Elevation utilities now also accept Quasar's native `q-elevation-N` class names (in addition
    to `elevation-N`), and `text-overline` emits `text-transform: uppercase` like Quasar's own
    typography helper.

### Patch Changes

- 0f8fb72: **Default style applies out of the box — no `body.quasar-style-*` class required.**

  The first style entry is now also emitted unscoped on `:root` (with `body.body--dark`
  dark overrides), so the default style applies with zero config and no JS —
  `var(--q-*)` tokens resolve without any body class.

  - Every entry — including the default — keeps its scoped `body.quasar-style-{name}`
    block, so `setStyle()` runtime switching still works and scoped selectors
    outrank the `:root` default in the cascade.
  - Color palette tokens (`--light-*`, `--dark-*`) were already unscoped; this makes
    shape/size/component tokens behave the same way.

## 0.5.0

### Minor Changes

- 6c46a60: feat(spec): introduce StyleSpec as single source of truth

  - Add `StyleSpec` schema with token, component, accessibility, and layout sections
  - Add `md3`, `md2`, and `unstyled` spec modules under `src/spec/`
  - Add spec registry with `getStyleSpec()` and `listStyles()`
  - Add `bindSpec()` interpolation helper for spec-driven component templates
  - Migrate components to spec-driven templates where templates differ only in literals
  - Delete `material_design_2_machine_spec.json` and `material_design_3_machine_spec.json` (superseded)
  - Add `docs/CONVERSION.md` documenting the migration rationale
  - Add `"./spec"` subpath export for the spec module

### Patch Changes

- ba08a4e: fix: remove text-center from q-item__section

## 0.4.1

### Patch Changes

- 4adc694: fix: QField root element now has w-full for full-width layout

  - QField: add `w-full` to `.q-field` shortcut so QField-based components (QSelect, QInput, etc.) fill their container width

- 3c3878c: fix: add missing base `.q-item` and `.q-item__section` flex layout rules

  The preset only emitted `q-item__section--side`, `--main`, `--avatar`, etc.
  modifiers but never the base structural rules that make a Quasar item lay
  out as a horizontal flex row. As a result every section stacked as a
  block-level element, so the side section (rating / action buttons) rendered
  on top of the main content and caption rows could not stretch to full width
  — most visible on narrow screens (e.g. PetItem in a narrow card column).

  - `.q-item` now gets `display:flex; flex-wrap:nowrap`
  - new base `.q-item__section` rule adds `display:flex; flex-direction:column;
flex-wrap:nowrap; align-items:stretch`

  Applied to md3, md2 and unstyled styles.

## 0.4.0

### Minor Changes

- af2c185: fix: QField dark mode, QTooltip position, QCarousel styling, QDate calendar

  - QField: dark mode input text uses #fff, labels use on-surface-variant per MD3 spec
  - QTooltip: add position:fixed in MD3/MD2 preflights to fix hover not showing
  - QCarousel: slide explicit h-[400px], no-repeat background, remove default padding
  - QDate: fix calendar overlapping header and missing width in md3
  - Replace hardcoded dark:text-* utilities with token-based colors throughout
  - Restore qe tagged templates for BEM __ in brackets

## 0.3.8

### Patch Changes

- 814c7bd: fix: replace UnoCSS shorthand translate utilities with explicit [transform:...] arbitrary values to prevent specificity conflicts when other transform properties (scale, origin) are present

  fix: remove opacity-0 from q-img\_\_image base class and use !important on q-img\_\_image--loaded to ensure loaded images display correctly

  fix: remove overflow:hidden from html,body in QLayout preflights to restore page scrollability

  fix: add unstyled QDrawer background color tokens

- 6f6cc78: wind4 compatibility upgrade

  - Replace beasties normalize with modern reset in @layer 0-reset
  - Disable wind4 base reset (`preflights: { reset: false }`)
  - Fix `border-[Npx]` → `[border-width:Npx]` across 38 occurrences
  - Remove `q-btn--rectangle` shortcut from MD3 (rounded by default)
  - Increase QBtn standard specificity via `.q-btn--standard.q-btn--rectangle`
  - Fix checkbox `stroke-dashoffset` and `stroke-width` for wind4
  - Fix `q-dark` shortcut CSS variable references
  - QField: control-container flex-grow, standard padding, append icon color
  - QIcon: `text-inherit` for parent color override
  - QTab indicator: centered pill with `secondary-container` bg
  - QBtn flat/outline: add `rounded-[28px]`
  - Layer config: `0-reset`, `1-modifier`, `2-base`, `3-components`, `4-state`

## 0.3.7

### Patch Changes

- 4782adf: Fix BEM class-name mangling in bracket-variant selectors

  UnoCSS preset-wind4's cssVarsRE incorrectly converts BEM double-dash modifiers
  (e.g. `--flat`, `--mini`, `--highlighted`) inside bracket-variant selectors to
  `var()` references, producing invalid CSS class selectors like
  `.q-btnvar(--flat)` instead of `.q-btn--flat`.

  Added a `fixBemVarMangling` postprocessor that undoes this mangling with a
  two-pass regex loop, handling nested `var(var(--xxx))` cases and
  multi-modifier selectors spanning whitespace/dots.

  Fixes lightningcss build failures when using preset-wind4 with BEM class names.

## 0.3.6

### Patch Changes

- 1cae035: fix: add type assertions for sub-presets to resolve UnoCSS 66.7.4 strict generic variance; upgrade @unocss/preset-wind3 to @unocss/preset-wind4
- 24cc16b: fix: add html,body height:100% overflow:hidden to QLayout preflights to eliminate unwanted scrollbar

## 0.3.5

### Patch Changes

- 1d5dd58: chore: changeset

## 0.3.4

### Patch Changes

- a35f7e2: fix(preset): fix q-btn rounded

## 0.3.3

### Patch Changes

- 847f4dc: fix(preset): update safelist

## 0.3.2

### Patch Changes

- 60f7e3b: fix: fix theme export

## 0.3.1

### Patch Changes

- d383b41: fix: lightning css and qbtn fixes

## 0.3.0

### Minor Changes

- 6642723: refactor: ai refactor, fixes and features

## 0.2.17

### Patch Changes

- df19b5b: fix(preset): replace @material/material-color-utilities with @poupe/material-color-utilities

## 0.2.16

### Patch Changes

- d692913: fix(preset): set correct rootDir in tsconfig

## 0.2.15

### Patch Changes

- 7984915: chore: update dependencies and fix type errors

## 0.2.14

### Patch Changes

- 3320433: fix(preset): use extendTheme to prevent overwriting default colors

## 0.2.13

### Patch Changes

- 49c3182: fix(preset): fix invalid CSS in QBreadcrumbs

## 0.2.12

### Patch Changes

- 00a9829: feat(preset): update Wind3 preset to Wind4
- 718e9f2: fix(preset): fix QTimeline icon
- 896eba0: fix(preset): do not apply highlighted background to children of QField

## 0.2.11

### Patch Changes

- 1d7b9e1: fix(preset): fix nested filled QField background color

## 0.2.10

### Patch Changes

- e5686cb: fix(preset): remove w-full from QDrawer

## 0.2.9

### Patch Changes

- be02e69: feat(preset): increase q-dialog\_\_title line height

## 0.2.8

### Patch Changes

- 2d45dd1: feat: only round end borders of QDrawer in mobile mode
- f351524: fix(preset): fix QTab QFocusHelper dimensions
- de307d6: fix(preset): fix QTable safelist

## 0.2.7

### Patch Changes

- 09411ee: fix(preset): fix QDialog title line height

## 0.2.6

### Patch Changes

- 34f191b: fix(preset): fix QDialog corner shape
- 05809e7: fix(preset): fix QField\_\_append icon
- 5ab7ebe: fix(preset): fix QEditor background color
- 9d48806: fix(preset): fix QField

## 0.2.5

### Patch Changes

- 10a16b5: fix(preset): fix md3 QDrawer mini border

## 0.2.4

### Patch Changes

- d43c6f4: fix(preset): fix QItem avatar min-width

## 0.2.3

### Patch Changes

- 5a07bb1: fix(preset): fix QDialog radio safelist
- bb33cd2: fix(preset): remove height from q-field\_\_marginal
- 36513ba: fix(preset): fix flex col width
- a721809: fix(preset): fix q-panel
- 1972766: fix(preset): fix QPagination

## 0.2.2

### Patch Changes

- 7861c8a: fix(preset): fix QItem side max width

## 0.2.1

### Patch Changes

- 1d659c4: feat(preset): add shape corner theme variables
- 45b3b7c: chore: update dependencies

## 0.2.0

### Minor Changes

- 53b57fe: feat(preset): make theme colors CSS variables

## 0.1.6

### Patch Changes

- 4ea419f: feat(preset): add transformerDirectives
- 50f92fb: fix(preset): fix QTabs
- 5977622: fix(preset): fix QScrollarea
- 3e3ec4a: fix(preset): various fixes

## 0.1.5

### Patch Changes

- 3aeca1a: fix(preset): set body width in preflight
- 3895f00: fix(preset): add theme color matcher
- 7c074d7: fix(preset): add color safelist
- a7a4f10: fix(preset): various fixes

## 0.1.4

### Patch Changes

- fbaf4b4: fix(preset): fix QBanner and QIcon
- dfa060b: fix(preset): fix QToggle

## 0.1.3

### Patch Changes

- cad1e75: feat(preset): make style an required argument, imported from unocss-preset-quasar/styles

## 0.1.2

### Patch Changes

- 5d2c3ca: fix(preset): fix QSkeleton and QTree

## 0.1.1

### Patch Changes

- a2b6fa3: fix(preset): fix QRouteTab and QToggle

## 0.1.0

### Minor Changes

- c740e59: feat: unocss-preset-quasar
