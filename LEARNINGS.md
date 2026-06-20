# Learnings — unocss-preset-quasar + quasar-dev

A running log of non-obvious gotchas discovered while working on this stack.

## Vite + workspace packages + Quasar

### rolldown subpath-export named-import bug (vitrify)

vitrify compiles `vitrify.config.ts` with rolldown's `transform()` to JS, then
dynamically imports the result. rolldown **strips named imports from subpath
exports** of workspace packages (e.g. `import { foo } from 'pkg/sub'`), but
**preserves namespace imports** (`import * as foo from 'pkg/sub'`).

**Fix:** use the namespace form when importing from workspace subpath exports:

```ts
// ❌ stripped by rolldown
import { quasarPresetAliases } from 'unocss-preset-quasar/vite-aliases'

// ✅ survives
import * as QuasarPresetAliases from 'unocss-preset-quasar/vite-aliases'
// then: QuasarPresetAliases.quasarPresetAliases()
```

### Playwright 1.61.0 + Node 22.15–22.16 sync-loader bug

Throws `TypeError: context.conditions?.includes is not a function` on any
relative import from a spec file. Cause: Node passes `context.conditions` as
a `Set` in those versions, and Playwright 1.61 calls `.includes` on it (which
doesn't exist on Set). Fixed upstream (microsoft/playwright#41319) but not
yet on npm as of this writing.

**Workaround:** inline the visual helper functions (`shotPath`, `shot`,
`dumpDiagnostics`) directly into each spec file instead of importing from a
shared `tests/_helpers/` module.

## UnoCSS shortcut grammar

### `[&--xxx]` is not a valid selector

UnoCSS parses `[&--foo]` as a sibling combinator (`&` = self, then `--foo` as
a class) — produces an invalid CSS selector and is reported as "unmatched
utility". The intent is usually "match self when it also has class `.x--foo`",
which is `&.x--foo`. But inside a `mdComponent('q-foo--bar', ...)` helper
call, the selector is already scoped to `.q-foo--bar`, so the `[&--xxx]`
prefix is just dead weight. Strip it.

### `border-left-current` is not a utility

UnoCSS doesn't auto-generate `border-left-current`. The valid form is
`border-l-current` (short form) or `border-l-[currentColor]` (arbitrary
value). Same for `border-right-current` and `border-bottom-current`.

### `&__` is BEM, not a child combinator

UnoCSS `&__foo` produces `.x .x__foo` (BEM element). For a child combinator
use `&_.foo` (descendant) or `&>_.foo` (direct child).

### Quoted arbitrary values inside groups

Inside a parenthesized group like `(&:before):(shadow-md shadow-gray/14)`, an
arbitrary value with brackets and commas needs to be a single token with no
internal commas unless the value itself has them. e.g. `shadow-[0_1px_5px_rgba(0,0,0,0.2)]`
is fine (commas inside the value). But `[border-$light-primary` is broken —
the `[` opens an arbitrary value with no closing `]` and the parser swallows
the next token. Use `[border-color:$light-primary]`.

## Quasar component prop quirks

### Array-typed props that get coerced to `''`

Several Quasar components have `type: Array` props with no default. The
auto-generated playground schema defaults to `''` (empty string), then the
`boundProps` coercion converts `''` to `undefined`, which Quasar's render
code does `Object.keys(undefined)` on — throws
`TypeError: Cannot convert undefined or null to object`.

Affected props and the **required** defaults:

| Component    | Prop             | Quasar type                   | Default value                                                                                  |
| ------------ | ---------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| QSlider      | `markers`        | Boolean/Number                | `false`                                                                                        |
| QSlider      | `markerLabels`   | Boolean/Array/Object/Function | `false`                                                                                        |
| QRange       | `markers`        | Boolean/Number                | `false`                                                                                        |
| QRange       | `markerLabels`   | Boolean/Array/Object/Function | `false`                                                                                        |
| QOptionGroup | `options`        | Array (required)              | `[]`                                                                                           |
| QBtnToggle   | `options`        | Array (required)              | `[]`                                                                                           |
| QTree        | `nodes`          | Array                         | `[]`                                                                                           |
| QTree        | `ticked`         | Array                         | `[]`                                                                                           |
| QTree        | `expanded`       | Array                         | `[]`                                                                                           |
| QTree        | `selected`       | Array                         | `[]`                                                                                           |
| QTable       | `rows`           | Array                         | `[]`                                                                                           |
| QTable       | `columns`        | Array                         | `[]`                                                                                           |
| QTable       | `visibleColumns` | Array                         | `[]`                                                                                           |
| QEditor      | `definitions`    | Object/Array                  | `[]`                                                                                           |
| QEditor      | `fonts`          | Array                         | `[]`                                                                                           |
| QEditor      | `toolbar`        | Array                         | `[['left','center','right','justify'],['bold','italic','underline','strike'],['undo','redo']]` |
| QPageSticky  | `offset`         | Array                         | `[0, 0]`                                                                                       |

The auto-generated schema must keep the `defaults` block and the `schema`
array in sync — the `defaults` block is what `useQueryProps` actually uses to
initialize the reactive prop bag. The schema array is only used for the
control panel UI. Fixing only the schema silently leaves the prop empty.

### QSlider / QRange `markerLabels` empty string

`Object.keys('')` returns `['0']` (string indices), not `[]`. So an empty
string doesn't throw by itself — but the page coerce step turns `''` into
`undefined`, which DOES throw inside Quasar's `getMarkerList`. Same root
cause: don't use `''` as a sentinel for "no value" on a typed prop.

## `setDefaultProps` for spec compliance

`setDefaultPropsMd3` mutates Quasar's runtime defaults (e.g. `QBtn.props.rounded.default = true`).
For the **MD2 visual baseline to match the MD2 spec** (rectangular buttons,
outlined inputs, default chip shape), `setDefaultPropsMd2` must do the
_opposite_: force `rounded: false`, `filled: false`, `square: false`,
`noCaps: false` (uppercase is the MD2 default). Currently it's a no-op,
which means the visual baseline falls back to Quasar's library defaults
(which happen to be MD2, but may diverge in future versions).

A per-style `setDefaultProps` is the right way to guarantee spec compliance
without each page having to override every prop.

## Visual baseline structure

Per-style screenshot organization:

```
tests/screenshots/
  md2/<component>/<component>__<label>.png
  md3/<component>/<component>__<label>.png
  unstyled/<component>/<component>__<label>.png
```

with a matching `<component>__<label>.json` sidecar containing computed
styles + CSS variables + first interactive element. The JSON sidecar makes
a failing test triagable from the artifact alone.

The `all-components.spec.ts` test iterates every component in every style,
takes a `__default` baseline, and asserts no console errors. 75 components
× 3 styles = 225 tests, ~4 min run time.

`NotImplementedPage` (used when a route's page file is missing) renders a
placeholder with a control panel + a `data-testid="component-preview"`
region so the visual baseline test can pick it up. Routes with no
component page (QChat, QSpace as of this writing) fall through to that
placeholder.

## UnoCSS postprocess hook for body-class scoping

When multiple QuasarPreset instances register into the same UnoCSS
generator (e.g. playground bundling MD2 + MD3 + Unstyled together), each
one's shortcuts collide on the same `.q-xxx` selector — first-wins
silently shadows the rest. UnoCSS's `outputToCssLayers` doesn't help here
because CSS cascade layers can't be activated per-element; they're global.

**Fix:** attach a `postprocess` hook per preset that wraps each emitted
util's selector with the preset's body-class guard. The hook lives in
`scopeStyle()` so any preset built with `bodyClass: 'quasar-style-xxx'`
gets it automatically.

Key details:

- **`postprocess` is a per-util hook** in `@unocss/core`. Signature:
  `(util: UtilObject) => UtilObject | void | Array<...>`. It receives
  the util with `selector`, `entries`, `layer`, `parent`. Return a new
  `UtilObject` with the modified selector.
- **Skip preflights** (`util.layer === 'preflights'`) — they're already
  scoped by `wrapPreWithBodyClass`.
- **Skip pseudo-only selectors** (`^\s*(::?[a-z-]+|\*)\s*$`) — they have
  no class root to scope against. Wrapping them produces invalid CSS.
- **Skip `:root` selectors** — theme tokens stay global by design.
- **Skip selectors containing `@`** — at-rules / layer directives
  shouldn't be wrapped at the selector level.
- **Idempotency:** when three presets' postprocessors run on the same
  util, the FIRST one wraps the selector, and subsequent postprocessors
  must skip. Detect "already wrapped" with a regex like
  `/\bbody\.quasar-style-[a-z0-9-]+\s/` — any prefix from the namespace
  is treated as "another preset already handled this".
- **Multiple presets' `postprocess` arrays merge**: UnoCSS's
  `resolveConfig` does `sources.flatMap((p) => toArray(p.postprocess || []))`,
  so all three QuasarPresets' postprocessors are concatenated. Each one
  closes over its own `bodyClass`, so the three run independently.

## Prop schema auto-generation gotcha

The playground's prop schemas are auto-generated from Quasar's docs JSON
by `@quasar-dev/tools`. The generated file has TWO parallel structures:

1. **Defaults block** — `export const qXxxDefaults = { ... }` — used by
   `useQueryProps` to initialize the reactive prop bag.
2. **Schema array** — `export const qXxxSchema: PropSchema[]` — used by
   the control panel UI to render inputs.

**They can drift out of sync.** When a developer fixes the defaults
block to add `[]` for an Array prop, the schema array still has
`default: ''` (the auto-generator's default for missing values). The
runtime works because the defaults block is authoritative, but the
control panel input shows the wrong default value.

A scripted audit (`/tmp/audit-props.py`-style) cross-referencing the
schemas against Quasar's actual prop types (`node_modules/quasar/src/components/QXxx.json`)
catches the drift. Most cases are cosmetic; the only runtime-critical
ones are when the defaults block itself still has `''` for a typed
(Array/Object/Function) prop.

The audit found 32 suspicious `default: ''` cases in 75 prop files.
After categorizing by Quasar type:

- **Truly broken (fixed by `boundProps` `''`→`undefined` coerce)**:
  all `Array`/`Object`/`Function` defaults survive because the page
  template wraps the props object in a `boundProps = computed(...)` that
  turns `''` into `undefined` before handing them to Quasar. So Quasar
  sees the proper empty value or its library default.
- **Cosmetic (schema array still wrong)**: the auto-generated schema
  shows `default: ''` in the control panel UI even when the runtime
  defaults block has `[]`. Worth fixing in a regeneration pass.
- **Benign**: Boolean/null unions, Number/String unions, and global
  flags like `dark` accept `''` as "not set" — no fix needed.
