# unocss-preset-quasar

## 0.6.4

### Patch Changes

- 86e6625: fix(preset): fit the dialog plugin to a phone, and cover Quasar 2.34's group and sentinel classes

  Two mobile defects, one of them the homepage announcement dialog.

  **The dialog plugin no longer overflows a phone.** Quasar's Dialog plugin
  renders `.q-dialog-plugin` at a fixed `width: 400px`. Stock Quasar leaves the
  dialog inner as a plain row flex — the runtime classes are
  `… fixed-full flex-center` (QDialog.js) — so the 400px card's default
  `flex-shrink: 1` pulls it inside a 375px viewport. The preset had given the
  inner `flex-direction: column`, which moves the main axis to the vertical and
  removes that horizontal shrink: measured at 375×667 the card sat at `x: -31`
  (spilling 31px off the left edge; 56px at 320px), so a `$q.dialog({ title,
message })` such as petboarding's urgent homepage announcement did not fit the
  screen. The inner is a row again, as stock renders it.

  **The button-group and infinite-scroll classes Quasar 2.34 applies now resolve.**
  2.34 moved the button group's corner collapse onto explicit
  `q-btn-group--horizontal` / `q-btn-group--vertical` classes (QBtnGroup applies
  one to every group) and split the infinite-scroll sentinel onto the edge it
  marks (`__sentinel--top/--bottom/--start/--end`). The preset only carried the
  2.31 selector shapes, so those runtime classes had no rule — the button-group
  page reported two unstyled classes against the DOM arbiter. Both shapes are now
  emitted: the 2.31 selectors stay for the recorded parity fixture, and the 2.34
  ones are added alongside (a vertical group previously had no corners at all).

  Also: `test/buttons-spec.test.ts`'s `block()` helper now finds a selector that
  UnoCSS folded into a comma-joined list with its `--horizontal` twin, and strips
  the `/* layer: … */` banner that otherwise became part of the selector text.

## 0.6.3

### Patch Changes

- 481dce1: fix(preset): keep QDate's day cell and year buttons square under the button floor

  A calendar day cell is a _date_, not an action button. Quasar's own
  `quasar.css` and the local reference bundle both size it `30x30` with a `50%`
  radius (a circle), and the year selector's buttons `60x30`. `width` and `height`
  lose to `min-width`/`min-height`, so the preset's button floor leaked into both
  boxes: `1ed9f77` raised `.q-btn` / `.q-btn--dense` `min-height` from the
  2em/2.572em of dist to `var(--q-control-height)` (48px), and md2's `.q-btn`
  carries `min-width: var(--q-btn-min-width)` (64px) for its spec's 64dp action
  buttons. The day cell therefore rendered `30x48` in md3 (a tall ellipse) and
  `64x48` in md2, and the year button `60x48` — reported as an oval today ring in
  petboarding.

  `date/rules.ts` now restates the square on the component's own rules — day cell
  `min-width`/`min-height: 30px`, year button `min-width: 60px; min-height: 30px` —
  so neither floor reaches a date selector. `30x30` is Quasar's and the reference's
  own value (kept where previous commits pinned it as "Quasar's own"), not a
  Material date-picker redline: the component reproduces Quasar's geometry, and the
  fix only restores what the 48dp raise broke.

  Guarded by `test/date-cell-shape.test.ts` and, in the consumer's configuration,
  `quasar-testing-harness/tests/date-cell-shape.spec.ts` (day cell and year button
  in md3, md2 and unstyled).

## 0.6.2

### Patch Changes

- 28053da: fix(theme): `setThemeColors` restates the semantic `--q-*` tokens so a runtime theme reaches components

  The token preflight states `--q-*` as literals, so `setThemeColors()` writing only
  the `--light-*` / `--dark-*` primitives left every component on the build-time
  palette: a runtime source color (the `themeColors` option, a runtime
  `setThemeColors(...)` call) never appeared, and the default scheme always won.

  `setThemeColors` now also emits the semantic tier into one injected stylesheet:
  the light roles on `:root` and the dark roles scoped to `body.body--dark` — an
  inline value on `document.body` cannot be conditional on the dark body class.
  The `--light-*` / `--dark-*` / scalar primitives are still written, unchanged.

## 0.6.1

### Patch Changes

- a271681: fix(preset): render QCheckbox's check, state layer and icon mode correctly

  Four defects in `components/checkbox/rules.ts`, found by screenshot and
  computed-style probes against `/q-checkbox` in the harness:

  - **The indeterminate dash painted over the check.** The AUD-024 fold dropped
    the reference's `transform: rotate(-280deg) scale(0)` down to `rotate`, so the
    dash stayed visible at its intrinsic 3.9×9.6px in the truthy _and_ the falsy
    state. `scale(0)` is restored as the hidden default; the `--indet` state yield
    cancels it with `transform: scale(1)`.
  - **The glyph box sat 2px up-left**, clipping the strokes into the border: the
    full-cover rule reset `top/left/width/height/border` but not the reference
    inset's own `margin: -2px`.
  - **The hover/focus state layer anchored on the control's top-left corner**
    instead of its centre: the hover yield re-declared the reference's
    `top/left/right/bottom: 0`, which combined with the base 40dp width and
    `translate: -50% -50%` threw the 48px circle off the inner. Hover now only
    scales the base layer, as `:focus`/`:focus-visible` already did.
  - **Icon mode (`checkedIcon`/`uncheckedIcon`) rendered a 24px glyph** inside the
    18px box, over the label: `.q-checkbox__icon`'s 0.5em lost to
    `.q-icon { font-size: var(--q-comp-icon) }`, emitted later at the same (0,1,0)
    specificity. The size now also ships component-scoped
    (`.q-checkbox .q-checkbox__icon`); the reference's single-class rule stays for
    the parity ratchet.

  Why a component icon needs the scoped selector, and why both yields exist, is
  recorded in ADR 0013.

  Guarded in the harness by `tests/rewrite-comprehensive.spec.ts` (indeterminate
  dash, glyph centring, hover centring, icon size, plus the screenshot baseline
  `q-checkbox-md3.png`) and by `tests/spec-conformance.spec.ts` (AUD-029).

- e6cb045: fix(preset): let the overlay drawer win the stack against both marginals

  `.q-drawer--on-top` moves from `z-index: 1500` to **3000** and
  `.q-drawer__backdrop` from `1499` to **2999** (`!important` kept) — the values
  `quasar.css` already uses, below the dialog tier (6000).

  The drawer's box spans the full viewport height (`Md3Layout` lays its shell out
  as `view="lHh Lpr lFf"`, so Quasar skips the `top` offset it gives a drawer
  outside the header row), so at 1500 both marginals painted over it: the app bar
  covered the drawer's own close button and the fixed bottom nav covered its last
  nav item — neither visible to the pointer nor tappable on a phone.

  What is deliberately _not_ taken from the reference bundle is its 7000, which
  sits above `.q-dialog`; that is the half consumers had to patch out.

  Recorded in ADR 0007 (amended) and guarded by
  `drawer-backdrop.test.ts` ("outranks the app bar and the bottom nav, and stays
  under dialogs") plus `tests/md3-layout.spec.ts` in the harness.

- 143a2ee: fix(preset): stop hiding placeholders unconditionally, emit the q-placeholder restore

  `field/rules.ts` emitted `.q-field__native::placeholder` and
  `.q-field__input::placeholder { color: transparent }` with no condition — both
  `.q-field--labeled:not(.q-field--float)`. Probed on the harness fixture on
  2026-10-05: a `DateInput` segment input and a stock `q-input`'s native both
  computed `rgba(0, 0, 0, 0)` for `::placeholder` — the two extras matched them
  unconditionally (petboarding's `PetForm` is where it was first reported).

  The restore that was meant to balance them, `.q-placeholder::placeholder {
color: inherit; opacity: 0.7 }`, sat in `core/helpers/rules.ts` behind a
  `/^q-placeholder::placeholder$/` matcher that can never fire — no extractor
  output or safelist entry produces a literal `::` candidate (the same defect
  family as `dead-matchers.test.ts`, which scans bare regex literals and misses
  matchers wrapped in `rule(…)`).

  Both unconditional extras are deleted and the restore is re-emitted from the
  `q-field` rule family via `symbols.selector`, keyed on the producible base.
  Recorded in ADR 0010; guarded by
  `quasar-testing-harness/tests/date-input-placeholder.spec.ts`.

- e328394: fix(preset): drop the invented `display: flex` from `.q-card`

  Stock Quasar 2.34 states no `display` for `.q-card`
  (`quasar/dist/quasar.css`, `.q-card` block) and neither does the reference
  bundle. The flex made every `q-card__section` a flex item, whose used size is
  definite — so descendants' percentage heights resolved instead of deferring to
  content height. petboarding's PetChip carries an inline `height: 100%` (so long
  names wrap) and filled its container instead of sizing to its content: the
  "PetChips expand to full height" regression on the KennelLayout page.

  `.q-card--horizontal` and `.q-card__actions` keep their flex declarations —
  only the base rule's `display`/`flex-direction` were removed.

  Recorded in ADR 0014; guarded by `tests/q-card-percentage-height.spec.ts` in
  quasar-testing-harness (md3/md2/unstyled) and the chip-height assertion in
  petboarding's `kennelLayout` e2e.

- d9d78ae: QSelect's text input no longer reserves the dropdown arrow's clearance twice.

  `select/rules.ts` emitted `padding-right: 48px` on `.q-select .q-field__native`
  **and** on `.q-select .q-field__input`. The input sits inside the native's
  content box, so the two stacked: 96px of dead space on the right of the input.
  Measured on a phone-sized viewport (320px, value selected), the field box was
  200px → native 138px → input 90px → **42px of usable text area**, so typing
  scrolled after about two characters. At 375px the text area was 87–123px.

  Both paddings are gone. The arrow also went back into upstream's in-flow append
  row (`.q-select__dropdown-icon` no longer carries `position: absolute;
right: 12px; top: 50%; translate: 0 -50%`), which is what had forced the flow to
  reserve the arrow's space by hand — `quasar@2.34.0` ships neither the paddings
  nor the positioning, and the control's own `padding: 0 12px` already holds the
  arrow 12px off the control's right edge. The input keeps upstream's
  `min-width: 50px !important` and `cursor: text`; the icon keeps the reference's
  `cursor: pointer !important` + `transition: transform 0.28s`. Typing now spans
  the native's whole content box instead of a 42px slot.

  The parity ratchet records the divergence from the reference bundle (which does
  carry both paddings) as select `target: 2`; guarded by `select-text-area.test.ts`
  (no `padding-right` on either selector, upstream's declarations still emitted)
  and the rewritten `select-dropdown-icon.test.ts` (no positioning, cursor and
  transition preserved, `rotate-180` still reaches the icon). Recorded in ADR 0012,
  which also supersedes ADR 0009's select instance.

  Supersedes the pending `.changeset/select-dropdown-icon-position.md`, which
  documented the arrow-centering behaviour this change removes; that behaviour
  never shipped in a release, so the file is deleted rather than left to contradict
  these notes.

- 540d6dd: fix(preset): give the standard field the underline container's corners

  The base `.q-field__control` carried `border-radius: var(--q-radius-sm)`, while
  `.q-field--standard .q-field__control` overrides only its two top corners — with
  the reference's `inherit`. The variant classes are mutually exclusive
  (`use-field.js`), so no other variant ever read the base value: only `standard`
  did, and only through the two corners it leaves unset. A default field therefore
  rendered `border-top-left-radius: 0px` with `border-bottom-left-radius: 8px`
  under md3 — "bottom rounded, top square" (petboarding, md3, the login form).

  Material's underline container is top-only extra-small with a flat bottom edge:
  Flutter's `UnderlineInputBorder` documents "the top left and right corners have a
  circular radius of 4.0" and zero bottom radii, and md3's text-field bottom edge
  is `md.sys.shape.corner.none`. So the base radius is deleted, and
  `.q-field__inner` — the control's _direct parent_, and the element the
  reference-pinned `inherit` actually reads — now carries the top radii as
  `var(--q-corner-extra-small)` (md3 4px, md2 4px, unstyled 0). Recorded in
  ADR 0011.

  Two further deviations the same probe turned up:

  - md2's shape scale stated `cornerExtraSmall: '3px'` where its own spec (filled
    `4px 4px 0px 0px`, outlined `4`) and `quasar.css` both say 4px — every md2
    outlined and standout field drew 3px corners. Fixed at the token, which both
    emitted families read (`--q-corner-*` and `--shape-corner-*`); `radiusXs`
    keeps its own 3px as the skeleton/checkbox alias.
  - the `.q-field--rounded` **root** rule was inert — `inherit` reads the direct
    parent (`.q-field__inner`), never the root, so no control could ever resolve
    it — and is removed. The variants that read the prop keep rounding the control
    themselves.

  Guarded by `field-corner-shape.test.ts` and, in the consumer's configuration,
  `quasar-testing-harness/tests/field-corners.spec.ts` (standard, filled, standout
  and standard+rounded in md3; standard and outlined in md2).

- 3af72d1: fix(preset): pad the standard and outlined field controls 12px in every style

  `components/field/rules.ts` derived the control's inline padding from the general
  spacing scale (`var(--q-space-md)`), which is 12px in md3 but 8px in md2 — so a
  standard or outlined field lost 4px of inline padding in md2, pulling a trailing
  marginal (the q-select dropdown arrow) 8px from the edge instead of 12px.

  The reference is 12px in every style: its `quasar-style-md2` block carries no
  field rule, so md2 inherits the base
  `.q-field--standard .q-field__control { padding-inline: 12px }` and
  `.q-field--outlined .q-field__control { padding-inline: 12px }`. The field's own
  token `--q-field-padding-x` is 12px in md2 and md3 (0 unstyled); both variants now
  use it. Filled keeps `--q-space-lg` (16px), which already matches the reference's
  `.q-field--filled > .q-field__inner > .q-field__control { padding-inline: 16px }`.

## 0.6.0

### Minor Changes

- f8da605: one rule per base; safelist derived, plugin classes opt in

  Every component is now one rule keyed by its BEM base (`/^q-fab$/`), with each
  element and modifier yielded inside through `[symbols.selector]` — 419 per-class
  matchers folded to one regex per base. Bodies moved verbatim, so the emitted CSS
  did not change: tsc clean, 194 tests, the parity gate holds (present 2214,
  missing 227, absent 42, mismatch 16) and the harness's DOM class-coverage stays
  at its 84 baseline on md3 and md2.

  The safelist is derived rather than hand-written (`scripts/compose-safelist.mjs`):
  an entry is dropped when the extractors supply it, when no arbiter knows it, and
  when it is a BEM member no rule can fire on — its styling flows from the base.
  What remains splits into a base list plus `pluginSafelistMap`, and a plugin's
  classes join only when the app declares them:

      QuasarPreset({ plugins: ['Dialog', 'Notify'] })

  Apps that drive Quasar only through `$q.dialog()`, `$q.notify()` or `$q.loading()`
  must declare those plugins or those classes are not safelisted; tag-only usage is
  unaffected, since the component extractor supplies the vocabulary from markup.

- b2f88de: One overlay layering scale, and the overlay drawer moves under the app bar
  (ADR 0007).

  The preset owned every layer as unrelated numbers, and the reference's own
  `.q-drawer--on-top: 7000` / `.q-drawer__backdrop: 6999` put an open mobile drawer
  above `.q-header` (2000) and above `.q-dialog` / `.q-menu` (6000). A consumer
  (petboarding) had to patch that out — and could not stop at one patch: raising
  the header to `7100` then covered dialogs, so dialogs went to `7200`. Two
  `!important` bumps, each forcing the next, recorded only in one app's `<style>`
  block.

  | selector              | was  | now      |
  | --------------------- | ---- | -------- |
  | `.q-drawer--on-top`   | 7000 | **1500** |
  | `.q-drawer__backdrop` | 6999 | **1499** |
  | `.q-page-sticky`      | 7000 | **1400** |

  Everything else stays: in-flow `.q-drawer` 1000, marginals 2000 (opener 2001),
  menus and dialogs 6000, `z-top` 7000, tooltip 9000, notify/loading 9499/9500,
  ajax bar and `.z-max` 9998. The contract, in edges: overlay drawer < marginals <
  menus/dialogs, overlay drawer > floating content, so an open drawer can no longer
  cover the app bar or a dialog, and a modal drawer still blocks a floating action
  button. `.q-page-sticky` at 7000 was above dialogs — and the reference carries no
  z-index for that selector at all.

  `docs/adr/0007-overlay-layering-scale.md` states the scale and why the
  alternative (raising the header, as consumers did) was rejected.

  Parity: the gate is declaration-level for finished modules, so `drawer` leaves
  `target: 0` and records two declared divergences
  (`.q-drawer--on-top|z-index`, `.q-drawer__backdrop|z-index`) in
  `parity-baseline.json`. The ratchet still fails on any _new_ drawer gap; only
  the "gap-free" assertion for that module is dropped, because the ordering is now
  a decision rather than a port.

- b5ef78b: close the rule audit: the classes Quasar ships that this sheet never styled

  A by-hand audit of all 101 rule modules against `quasar/dist/quasar.css` (the
  arbiter), the vendored reference bundle (regression cross-check) and Quasar's
  documented API, then the fixes it produced.

  **Added — classes and regions that had no rule at all:** the `q-document--*`
  scroll-lock family the 2.31 runtime actually sets; the ripple directive's
  `q-ripple*`; the ajax-bar; the bottom-sheet members; the `q-drawer`,
  `q-tabs__arrows--inside` and `q-slider--enabled` gaps; the platform
  `*-only`/`*-hide` pairs (8 bodies); the pointer helpers `all-pointer-events` and
  `no-pointer-events--children`; the whole animation-helper grammar
  (`.animated.infinite|hinge|faster|fast|slow|slower|repeat-1..3|delay-1..5s`,
  `dimmed`, `light-dimmed`, `q-animate--fade|--scale`, `rotate-45…315`); the helper
  residue (`hide-scrollbar`, `scroll--mobile`, `z-fab`, `inset-shadow(-down)`,
  `q-morph--internal`, `img.responsive`, `bg-brown`, `q-safe-area-padding`, the
  table empty state, the field message animation, the direction-less flip pair);
  the grid grammar's missing half (`col-xs-*`, bare `col-<bp>`, all offsets); 19
  `@keyframes` the sheet referenced but never defined.

  **Fixed — conflicts where a later yield silently won:** the badge is one merged
  yield now (font-size 12px per dist, per-style corner, 16px box), the
  linear-progress track keeps its token, the checkbox icon keeps 0.5em, the field
  focus shadow reaches 0.5, the stepper gains its vertical axis, six dead matchers
  that could never match a candidate are repaired, and the v1 `chat` module is
  gone (dist styles no `q-chat*`; `message` covers the real family).

  **0.x consumer impact.** New classes are emitted where Quasar's own stylesheet
  had them and this preset had nothing, so an existing app gains styling it had
  been missing — a drawer, a stepper's vertical rail, an animation helper, a
  scrolled table header — and no previously-styled class loses its declarations.
  The three cases where UnoCSS's token pipeline cannot route a class
  (`all-pointer-events`, `light-dimmed`, and the reduce-motion `.animated`
  override) ship through the preset's static CSS channel, so they are present
  whether or not the class is scanned. `bg-brown`/`text-brown` and the animation
  helpers are emitted by this preset instead of wind4, which changes nothing for
  consumers unless they had re-declared them; the delegation rule and its
  measurements are in `docs/adr/0002`.

- fda53cb: Ship the bare Quasar colours, and fix the package's dependency shape.

  **Palette.** `brown`, `grey`, `separator` and `dark-separator` are real palette
  entries now. They were commented out, and neither engine supplies them — wind4 has no
  `brown` in any form and spells its own palette `gray`, not `grey` — so `bg-brown`,
  `text-grey`, `bg-separator` … were unstyled while safelisted. The eight hand-written
  rules that stood in for them are gone; the palette provides them on demand.

  **Packaging.** `@unocss/core` is a peer dependency (it was a dependency, which gave
  consumers a second core instance and made `QuasarPreset`'s type incompatible with
  `Preset<any>` in their config). The source imports the concrete `@unocss/*` packages
  instead of the `unocss` meta-package, which also pinned exact versions, and
  `@unocss/preset-icons` plus the two transformers — all imported by `src/` — are
  dependencies rather than devDependencies.

  Consumers who want wind4's vocabulary compose it themselves; see
  `remove-wind4-dependency.md` for why the preset no longer nests it and what
  `quasarWind4Options` preserves.

- 4d64224: feat(preset): nest `@unocss/preset-mini` instead of `@unocss/preset-wind4`

  The preset shipped wind4 as its nested engine. wind4 registers its `--un-*`
  custom properties _on demand_ through `@property`, so a Quasar-only app (no
  wind4 utility in the content) referenced declarations nobody had defined: the
  `q-dialog` shadow chain `var(--un-inset-shadow), var(--un-inset-ring-shadow), …`
  was invalid and silently rendered nothing. It also marked every one of those
  properties `inherits: false`, which a consumer's engine cannot undo. On top of
  that its base reset clobbers Quasar's controls, and its bare `col-N` grid rule
  (`.col-6 { grid-column: 6 }`) shadows Quasar's flexbox `.col-6`.

  `preset-mini` has none of those problems: it states its defaults eagerly in one
  `*, ::before, ::after` block, ships no reset, and defines no bare `col-N`. The
  palette still reaches the engine through our `extendTheme`, so every
  `bg-*`/`text-*` class resolves to Quasar's value — verified for all 546 palette
  classes against the wind4 build (the only divergence, the two bare
  `light-blue` names, is now emitted by the preset itself).

  What this changes for consumers:

  - **Tailwind-ish utilities are no longer free.** The engine stays nested, so
    `flex`, `p-4`, `grid`, `gap-*` and friends still work, but their values come
    from mini's vocabulary. An app that wants wind4's value forms or its
    colour-mix output adds wind4 itself, with the exported options:

        import { QuasarPreset, quasarWind4Options } from 'unocss-preset-quasar'

        presets: [presetWind4(quasarWind4Options), QuasarPreset()]

    Passing the fragment preserves the behaviour the preset used to set up for
    you — no base reset (which otherwise clobbers Quasar's buttons) and the
    `dark:` variant mapped to Quasar's own `.body--dark` / `.body--light`.
    Without it, `dark:` utilities hang off Tailwind's `.dark` class, which Quasar
    never sets, so they never match.

  - **Order decides shared utilities.** With two engines present, the last preset
    wins for names both define (`bg-light-blue` in particular). Keep
    `QuasarPreset()` where it is in the array; Quasar-owned class names (`row`,
    `col-6`, `q-btn`, …) win in either order because the preset carries
    `enforce: 'post'`.

  - **Defaults we own moved into `--q-*`.** Declarations that referenced
    engine-internal names now read `var(--un-<name>, var(--q-<name>))` with our
    own default, and the opacity quartet reads `--q-<bg|text|border|outline>-opacity`
    outright — mini sets `--un-bg-opacity` to the _number_ `1` and registers no
    `@property`, so an engine-first read would invalidate our
    `color-mix(… var(--un-bg-opacity) …)` on any element carrying a mini colour
    utility. `--q-*` defaults are stated in the preset's `:root` block.

  - The `all-pointer-events` preflight workaround added in 0.5.5 stays: consumers
    who add wind4 still need their `all-` utility scoped the way wind4 writes it.

  `@unocss/preset-mini` moves from `devDependencies` to `dependencies`;
  `@unocss/preset-wind4` moves the other way, since it is now only used by the
  test suite's reference comparison.

- 3b316b5: feat(preset): tree-shaken style entries and style-owned rules

  Style configuration is now explicit and tree-shaken:

  - `QuasarPreset()` throws when neither `styles` nor `style` is passed
  - only listed entries ship (tokens + rules)
  - `QuasarStyleEntry` gains `rules` for declarations tokens cannot express
  - unstyled resets moved out of component rules into the style itself
  - fix: QMarkdown token colours in md3 (grouped stub selectors were only partly scoped)

### Patch Changes

- 1ed9f77: Stop `.q-btn-group > .q-btn-item` from overriding its buttons' colour.

  The rule carried `color: color-mix(in oklab, var(--light-on-surface) …)`, which
  the reference does not have — Quasar's own rule is
  `.q-btn-group > .q-btn-item { border-radius: inherit; align-self: stretch }` and
  sets no colour at all.

  That hardcoded surface colour only made sense while the base `.q-btn` painted no
  fill. The MD3 and MD2 style entries fill it (`btnBg: var(--q-primary)` with
  `btnColor: var(--q-on-primary)`), and this rule won on specificity — two classes
  against `.q-btn`'s one — so grouped buttons rendered the primary fill with dark
  on-surface text. Removing the declaration lets each button keep its own paired
  tokens: `--q-btn-color` when filled, `inherit` in the unstyled entry, which is the
  reference's behaviour.

  The `align-self: stretch` in the same rule is kept; it is the reference's.

- 1ed9f77: Give `q-btn-group` the MD3 segmented-control treatment.

  Every `.q-btn` is filled with `--q-btn-bg`, so grouped segments inherited the
  primary fill: the Day/Week toggle painted the _unselected_ segment
  `rgb(0,95,175)` while the selected one carried its own treatment — the two
  halves of the control looked inverted. The group scope now resets the fill to
  the reference's no-fill (`background-color: transparent; color: inherit` on
  `.q-btn-group > .q-btn` — Quasar's reference groups carry no fill), the
  selected segment is painted on `secondary-container` (light/dark pair, keyed
  off `aria-pressed`, which is how `q-btn-toggle` marks selection), and the
  outer edges take the group's pill radius via `border-radius: inherit` — the
  reference's own mechanism — while inner corners stay square.

  The `.q-btn-item.bg-primary` special-cases are untouched and keep winning
  through their `!important` at higher specificity, so explicitly marked
  buttons still render filled. Unstyled stays flat: the inherited radius
  resolves to its zeroed corner tokens.

- b2f88de: Let the calendar month body scroll horizontally instead of clipping.

  `.q-calendar-month__body` is ported verbatim from
  `@quasar/quasar-ui-qcalendar/dist/QCalendarMonth.css`, `overflow: hidden`
  included. The vertical clip is the library's contract and is kept; the shorthand
  also swallowed the horizontal overflow, so a month grid wider than its container
  — a narrow viewport, or a fixed-width panel — had its later columns clipped with
  no way to reach them. `overflow-x: auto` restores that.

  A deliberate divergence from the ported stylesheet, recorded here rather than
  applied silently. The workaround it replaces appeared twice downstream, as
  byte-identical overrides.

- 3b45bbb: The checkbox is an 18dp box with a 2dp corner, and its check is on-primary.

  Rendered in the app (the payments page's bank-link dialog holds the only
  QCheckbox, so Quasar's markup was injected into a running page and shot at 4×),
  the checkbox drew a 36px **circle** containing a tiny framed square, and when
  checked it drew a **dark square** on the primary fill instead of a check.

  Three causes in `components/checkbox/rules.ts`:

  - `__inner` carried `font-size: 36px` with `border-radius: 50%`, so the `1em`
    box was a 36px circle — the radio's shape at double MD3's icon size. It is now
    `18px` with a `2px` corner.
  - `__inner--truthy .q-checkbox__bg { background-color: currentColor }` filled the
    glyph box with `on-surface-variant`, because the truthy state changes only the
    border and background, never `color`. The check path now states
    `stroke: var(--q-on-primary)` for both the truthy and indeterminate states,
    over the primary fill.
  - Quasar's dist insets `__bg` to the middle 50% with its own 2px border — the
    tiny framed square. The glyph box now fills the 18dp square.

  The 40dp MD3 state layer is stated explicitly instead of inheriting the box's
  footprint.

  `duplicate-yield-folds.test.ts` pins `.q-checkbox__inner` to the reference's
  values, so this is recorded there as the preset's first **documented MD3
  deviation** (`MD3_DEVIATIONS`, with the value and the reason) rather than by
  editing the reference fixture or dropping the site's coverage. The `q-radio`
  entry stays pinned to dist — untouched here.

  Covered by the new `test/checkbox-shape.test.ts`.

- 1ed9f77: Raise control heights to 48dp through a dedicated `--q-control-height` token.

  The audit probed 375px and found `48x40`, `64x40`, `72x40`, `56x40` buttons and
  ~250 sub-48 controls: `.q-btn` took its height from `btnMinHeight: 2.857em`
  (40px at the 14px md3 button font), `.q-field__control` from the shared
  `--q-comp-md` (40px), round buttons from `3em` (42px) and the dense variants
  from `2em`/`2.4em` (30/33.6px — the header's Menu button among them).

  Every control _height_ declaration now reads `var(--q-control-height)`
  (`48px` for MD3 and MD2, `auto` for Unstyled). The shared component scale does
  **not** move: `--q-comp-md` is also `font-size` for banners, list items and
  radios, and raising it would jump body text to 48px. Width declarations
  (`min-width` on round/dense-round) keep their reference values — this is a
  height-only change.

- 3b45bbb: A dialog paints one surface — its card — and dims the page behind it.

  Two rules in `components/dialog` were painting on _full-viewport_ elements, and
  both showed up as "a giant white backdrop behind the dialog" on the add-payment
  dialog:

  - `.q-dialog__backdrop` derived its colour from `--q-dark` with a comment
    asserting that token stays dark in both schemes. It is the MD3 _surface_ role
    (light `#fcfcff`; `theme/colors.ts` derives `dark` from `light.surface`), so in
    the light scheme the scrim was a 32 % white veil instead of a dim. It now uses
    the reference's own scheme-independent `rgba(0, 0, 0, 0.4)`.

  - `.q-dialog__inner` is rendered by Quasar as `… standard fixed-full flex-center`
    (QDialog.js) — inset 0, the whole viewport — where stock Quasar gives it no
    background. Giving it `var(--q-surface)` and `box-shadow` (clamped by this
    file's own `max-width: 90vw` / `max-height: 90vh`) painted a visible white
    90vw × 90vh rounded panel behind every dialog. Measured: inner `1296×810` at
    `(0,0)` with `rgb(252, 252, 255)` while the real card was `400×418`. The inner
    is transparent again, and the MD3 ambient shadow (`level_3`) moved onto the card
    that carries the `surface-container-high` background — the surface it belongs to.

  Layering is untouched: the backdrop keeps `pointer-events: all !important` and
  `z-index: -1`, and the inner keeps its `max-*` and centring. Covered by
  `test/dialog-backdrop.test.ts`.

- b081636: Restore the `!important` on the drawer backdrop's z-index.

  The reference states `.q-drawer__backdrop { z-index: 2999 !important }`, with the
  flag doing real work: Quasar renders that element as
  `<div class="fullscreen q-drawer__backdrop">`, `.fullscreen` carries
  `z-index: 6000`, and both selectors are a single class — so without the flag the
  later `.fullscreen` won on source order and the backdrop landed at 6000, above the
  app bar's 2000. With the drawer open at mobile width the backdrop covered the
  whole viewport and swallowed every click on the header's controls, which is the
  `layout-polish` "header controls are hittable at 375px" guard and the
  `nav-drift` drawer-item click.

  The scale itself is unchanged: this preset keeps ADR 0007's 1499, one step below
  the overlay drawer. The parity gate strips `!important` before comparing, so it
  could not see the missing flag. `test/drawer-backdrop.test.ts` now pins it.

- 02320b6: Pair the navigation drawer's selected item text with its container.

  `.q-drawer__content .q-list > .q-router-link--active` painted a
  `secondary-container` background with `--q-primary` text. md3 wants
  `on-secondary-container` on both — the pairing the preset's own
  `specs/reference/normalized/md3-lists.json` records as
  `label/selected_text_color_token`.

  The correct token already existed (`--q-item-active-color`) but was only
  bound to `.q-item--active`, a class `to=` links never receive; router
  links take `q-router-link--active` instead. Applied in both light and
  dark rules.

- 3a125f7: Let the md3 FAB radius win over `q-btn--rounded`.

  Quasar's `QBtn` adds `q-btn--rounded` to every fab (`rounded || fab ||
fabMini`), and `.q-btn--rounded` resolves to `var(--q-btn-rounded-radius)`
  = `--q-radius-xl` = 28px, emitted after `.q-btn--fab`. A 56px fab
  therefore computed to a full circle instead of md3's 16px.

  Applied as `!important` on `--fab` and `--fab-mini`, restoring the intent
  main carried as `!rounded-$q-fab-radius` (`07306d6`) after the rewrite
  deleted the shortcut file it lived in.

- b2f88de: Hide `__before` while it is empty, like `__after` and `__append` already are.

  `.q-field__before` carries `padding-right: 12px` in Quasar's own sheet, and the
  reference's `min-width: 56px` rides on the same selector, so a field with an
  empty `#before` slot reserved a gutter in front of its control — while
  `__after:empty` and `__append:empty` collapsed. The slot now collapses too.

  Consumers that relied on the reserved gutter for a slot they deliberately keep
  empty (a fixed-width lead-in) see a tighter field. That is the point of the
  change: the alternative is every consumer repeating
  `:deep(.q-field__before:empty) { display: none }`, which is what this replaces.

- b2f88de: Lay the field root out as a row, so `__before`/`__after` sit beside the inner.

  `.q-field` (and `.q-select`, which is the same element) was emitted with
  `flex-direction: column`. Quasar's own sheet sets no flex-direction on the root
  at all — the root carries `row no-wrap items-start`, and its children are
  `__before`, `__inner`, `__after`: siblings. With `column` every marginal stacked
  above `__inner`, so a field with a `#before` slot grew a second row: on
  petboarding's `/employee/labels/pets` the search field measured 112px tall with
  its control's centre 28px below the print button's, and the toolbar grew with
  it. Declaring `row` matches what `.row` already resolves to; no other field
  changes, because without a marginal the single child lays out the same either
  way (measured across 19 petboarding routes: only the labels field was affected).

- 3b45bbb: `.flex.inline` reaches the sheet, so a `flex inline` consumer stays inline-flex.

  Quasar pairs each flex utility with a two-class companion
  (`ui/src/css/core/flex.sass`): `.row,.column,.flex { display: flex }` plus
  `.row.inline,.column.inline,.flex.inline { display: inline-flex }`. The preset's
  own `^flex$` rule yields that companion exactly as `^row$`/`^column$` do — but
  it never _runs_, so the companion never reached the sheet at all (not a cascade
  loss: `.flex.inline` was absent from the built CSS). UnoCSS takes the first rule
  that matches a token, and the engine's own `flex` utility claims `flex` before
  the preset's rules are consulted. `.row`/`.column` have no engine counterpart,
  which is why only `flex` was missing.

  QBadge ships `class="q-badge flex inline …"`, so this is user-visible:

  - `/admin/invoices` at 1440: the "Overdue" badge measured **287×16** — stretched
    to its 285px block parent (`div.col-3`) instead of hugging its ~56px label.
  - the same badge at 375: **40×16** with `scrollWidth 42 > clientWidth 40`, so
    the label clipped to `Overdu`.

  The companion is now stated as a transcribed reference default, alongside the
  breakpoints. No rule of the preset's can win the matcher race, but it does not
  need to: the two-class selector's 0,2,0 outranks `.flex`'s 0,1,0 wherever both
  apply, so source position is irrelevant. Measured after the change: both
  viewports render `display: inline-flex`, **56×16**, no clip, label intact.

  Covered by the extended `test/grid.test.ts`, which loads `presetWind4` _and_ the
  preset to reproduce the matcher conflict, and asserts the companion is emitted
  with `display: inline-flex` while `.flex` alone still grows and
  `.row.inline`/`.column.inline` keep working.

- 1438c55: Fix the responsive grid and the palette-colour cascade.

  `col-<bp>` / `col-<bp>-N` were emitted with no media query. Quasar puts them
  inside `@media (min-width: <bp>)`, and that wrapper is load-bearing: without an
  at-rule frame between them, `.col-sm` and `.col-12` are equal specificity and the
  base span wins by source order — so a `col-12 col-sm` cell stayed full width at
  every viewport and a legend rendered as a vertical stack. A rule body cannot
  carry an at-rule (a nested `@media` key stringifies to `[object Object]`), so the
  wrapper now comes from a variant whose `match` returns `{ matcher, parent }`.
  `xs` is the base breakpoint and stays unwrapped.

  Rule bands are now explicit UnoCSS layers — `quasar.grid`, `quasar.components`,
  `quasar.app`, `quasar.styles`, all ahead of `default`. Array order could not
  reach utilities the consumer's engine generates: Quasar's palette colours
  (`bg-pink`, `bg-yellow-2`) come from `extendTheme`, not from a rule here, so they
  landed before the component rules and
  `.q-badge{background-color:var(--q-primary)}` beat them on equal specificity —
  every badge rendered primary regardless of its `color` prop. The relative order
  is unchanged and still asserted: grid/container utilities stay ahead of the
  components, so component layout keeps winning on equal specificity.

  `mergeDuplicateRules` now carries a rule's meta through when it rebuilds a merged
  group. The meta is where `layer` lives, and it was being dropped for every
  duplicated regex, which would have silently returned those rules to `default`.

- 560cdcd: md2: the pill releases the button floor — its width was never the spec's to state

  The md2 spec states `min_width_px: 64` on the variants it names — contained,
  outlined, text — beside `padding_left_right_px`, as a floor under "the size of the
  text label with 16dp padding". MD2 knows no pill at all (`border_radius_px: 4`), so
  a pill's width is spec-silent, and the authority chain hands that to dist, which
  declares no `min-width` anywhere in the `.q-btn` family. Quasar v1.22.10 — the
  md2-era build — has none either.

  `.q-btn--rounded` now states `min-width: auto`. In md3 and unstyled that is a
  no-op (their base token is already `auto`), which is the md3-does-not-move proof;
  in md2 it releases the 64px clamp. Scoped to `--rounded` and never `--rectangle`,
  because QBtn's class assembly is `round ? 'round' : 'rectangle' + ...` — every
  non-round button carries `q-btn--rectangle`, i.e. that class IS the spec's own
  text/outlined/contained, and it keeps the floor.

  The element that asked for this is the occupancy day cell: `q-btn--outline
q-btn--rectangle q-btn--rounded`, measured at 64x48 (a stadium — an action-button
  width against the 48dp floor's height). It is a calendar date, and MD2 sizes dates
  in the date-picker section: date bounding box 40x40dp, selected date 36x36dp,
  4dp apart (m2.material.io/components/date-pickers), with a 32x32dp minimum touch
  target. Live after: 35 day cells at 48x48 and 40x48, content-sized like dist and
  md3, the 40-wide cells on the spec's own 40dp box.

  Fabs carry `q-btn--rounded` too, and that rule emits after `--fab`, so the fab
  rules re-assert `min-width: var(--q-fab-size|-mini-size) !important` — the same
  treatment the file already gives their radius. Verified in a real engine over the
  generated md2 CSS (pill 0px, plain 64px, round 64px, fab 56px, mini 40px) and live
  in the app (the rail's `<q-btn fab>` measures 56x56 with min-width 56px).

- d4dcbbb: md2: a metric token for the labeled push-down, and round buttons that are round

  Two values disagreed with `quasar.css` for the same underlying reason — neither was
  stated as the absolute length the arbiter states. md2's compressed spacing scale exposed the
  first; a font-relative `3em` paired with an absolute height exposed the second.

  **Labeled fields (AUD-MD2-001).** The push-down that clears a floated label was
  `padding-top: var(--q-space-xl)`: 24px in md3, 16px in md2. Every floated field in
  md2 therefore rendered its value underneath its label — measured live at −9.2px of
  text overlap on the pet edit dialog, 10 of 10 floated fields. It now reads
  `--q-field-labeled-padding-top`, a _metric_ token: 28px in md2, 24px in md3. 28px
  because the invariant decides it (a label and its value must not intersect):
  dist's own 24px still intersects by up to 1.2px at this geometry, 28px clears by
  +1.8px. Both paths take the metric — the labeled native and the
  auto-height/select control container.

  **Round buttons (AUD-MD2-002).** `.q-btn--round` paired `min-width: 3em`
  (font-relative, so 19/24/30/34/42px across contexts) with `min-height:
var(--q-control-height)` (48px), making every round button an ellipse: 178
  instances over both viewports, 54 of 56 on the admin routes alone. Both sides now
  come from one metric per style — md2 takes the md2 spec's button `min_width_px`
  (64) as its width _and_ height, md3 keeps `3em`/`auto` so its own audited
  rendering does not move. `min-height` still reads the 48dp floor token, so the
  square only ever raises it; dense round keeps dist's own tighter width (2.4em on
  md3). After: 0 of 56 non-square, every round button 64x64, `--fab` untouched at
  56x56.

  The md3 sheet's _resolved_ values are unchanged from before these commits apart
  from an explicit `height: auto` — the property's initial value, declared so md2 can
  put a square side there.

- 66d2b4a: Follow the md3 state-layer opacities for hover, focus and press.

  The reference bundle hardcodes `0.15` for all three, which on a nav rail
  or list row reads as a smudge rather than a state change. md3 specifies
  hover +8%, focus +10%, press +10%, tinted with the content colour
  (`m3.material.io/foundations/interaction/states/state-layers`).

  There was no press rule at all, so clicking was indistinguishable from
  hovering. The new press selector carries both `:hover` and `:active` on
  purpose: its declarations match the focus rules, so UnoCSS folds it into
  that group, and that group is emitted _before_ `:hover` — at equal
  specificity, hover would have won on source order alone.

  `focusable`, `hoverable` and `manual-focusable` consequently move off
  `target: 0` in the parity ratchet. They now diverge from the vendored
  Quasar reference deliberately, and the divergence is recorded in the
  baseline rather than hidden — same treatment `item/rules.ts` already
  applies where md3 and the reference disagree.

- f16a945: QParallax renders again: the media child gets the block the reference states.

  `components/parallax/rules.ts` yielded a third child, `q-parallax__image`, with a
  comment where the declarations should be. Quasar never renders that class — the
  markup is `.q-parallax__media > img|video` — so the block came out empty, was
  dropped, and the image kept the UA's `position: static`.

  That is fatal for this component rather than merely off-spec: QParallax drives the
  image from script, writing `transform: translate3d(-50%, <y>px, 0)` on load. The
  reference pairs that transform with

  ```css
  .q-parallax__media > img,
  .q-parallax__media > video {
    position: absolute;
    left: 50%;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    will-change: transform;
    display: none;
  }
  ```

  Without it the translate moved an in-flow 1024×845 image 425px below the top of a
  200px `overflow: hidden` box, and the component came out an empty white panel in all
  three styles — the flattest capture of the 219-dump visual pass, with **0** non-white
  pixels. The CDN image loaded fine all along; nothing was wrong but the rule.

  The rule now states that block (`display: none` is the reference's own — the
  component flips the image to `initial` when it is ready, which a live probe reads
  back as `display: block`). Measured after the change: `position: absolute`,
  `left: 200px` (50% of the 400px box), `bottom: 0`, natural 1024×845 spanning
  -220…625 against the 200px box — bottom-aligned and covering — with 79,593 non-white
  pixels where there were none.

  Covered by the new `test/parallax.test.ts`, which also pins that
  `q-parallax__image` is never targeted again.

- 2608ebd: Selected rating stars are opaque again: `.q-rating__icon--active` keeps its
  `opacity: 1`.

  The rule was already right. The generator yields `.q-rating__icon { opacity: 40% }`
  and then `.q-rating__icon--active { opacity: 100% }`, in the order
  `quasar.css` states them. What the sheet did with that order was not.

  UnoCSS's `mergeSelectors` groups selectors that share a declaration body and re-homes
  the group to the alphabetically first of them, and ten components yield
  `opacity: 100%`. `.q-carousel .q-carousel__thumbnail:hover` sorts before
  `.q-rating__icon`, so the group carrying `.q-rating__icon--active` was parked 91 kB
  earlier in the built sheet — above the base rule it has to override. Both selectors
  are 0,1,0, so source order decided it, and the base won:

  ```text
  128947  .q-carousel…,.q-rating__icon--active,… { opacity:100% }
  220471  .q-rating__icon { color:currentColor; opacity:40%; … }
  ```

  Measured on `/q-rating?style=md3` before the change: every star computed
  `opacity: 0.4`, the four selected ones painted `rgb(252, 219, 167)` instead of
  `#f9a825` — 0 strongly-orange pixels against 420 pale ones, which is what the 219-dump
  pass saw as washed-out stars. After: the four compute `1` with `rgb(249, 168, 37)`
  (380 orange pixels), the unselected one stays at `0.4` as the reference has it, and
  `.q-rating--no-dimming .q-rating__icon` still wins — on specificity (0,2,0) rather
  than on where the sheet happens to place it.

  The `/^q-rating$/` entry now carries `{ noMerge: true }`, which keeps this component's
  selectors out of the merge and lets reference order stand. Covered by
  `test/cascade-order.test.ts`, which generates `q-rating q-carousel` on purpose: against
  `q-rating` alone there is nothing to merge with, and the inversion cannot reproduce.

- 1ed9f77: Restore Quasar's screen breakpoints and move the component size scale off
  Quasar's reserved names.

  `--q-size-{xs,sm,md,lg,xl}` belongs to Quasar — `ui/src/css/core/size.sass`
  defines it as `0 / 600px / 1024px / 1440px / 1920px`, and the Screen plugin
  parses those declarations out of the stylesheet to build `$q.screen`. This
  preset replaces `quasar.css` for consumers who build with `disableSass: true`,
  but it emitted none of them: the component size scale squatted on the same
  names (`--q-size-sm: 24px`, `--q-size-md: 40px`, `--q-size-lg: 56px`, no
  `xs`/`xl`). `parseInt('24')` then made every viewport report as `xl`, so
  `$q.screen.gt.sm` was true on a 390px phone — drawers opened over the whole
  page, the scrim covered the content, and the sticky FAB was unclickable.

  The five breakpoint literals are now stated at `:root` (the same mechanism as
  the shape roles), and the component scale has been renamed to
  `--q-comp-icon/-sm/-md/-lg`. The Unstyled entry keeps its `--q-comp-*: 0`, and
  the dark blocks carry no `--q-size-*`. Consumers reading `--q-size-sm` for the
  _component_ value must switch to `--q-comp-sm`; consumers reading the
  _breakpoint_ name now get Quasar's value, which is the point.

- e90facf: round buttons are round in md3 and unstyled: both sides read the 48dp floor

  dist pairs `.q-btn--round`'s `min-width: 3em` with `min-height: 3em` — both
  font-relative, scaling together into a circle. Our deliberate 48dp touch floor
  pins the height to an absolute instead, so the font-relative width drifted away
  from it in every context: measured md2-before-fix, 19/24/30/34/42 wide against
  48 tall; and md3 is no better off the floor — its button font is 14px, so 3em =
  42 against 48 (an oval at default typography), while dense round was 2.4em
  against 48 (an oval at every size).

  `--q-btn-round-min-width` and `--q-btn-round-dense-min-width` now read
  `var(--q-control-height)` in md3 and unstyled: one source for both sides of the
  box, so the diameter _is_ the touch floor and cannot drift apart from it again.
  md2 keeps its spec's 64px (unchanged, still 64x64). Unstyled has no floor by
  design (`controlHeight: auto`) — taking the same source still keeps its box
  symmetric. Verified per style in a real engine at 14/16/18/24px fonts (24/24:
  md3 48x48, md2 64x64, unstyled square); the sweep's shape divergences went 1 → 0.

- 3b45bbb: Status colours resolve per scheme, so they clear 4.5:1 wherever Quasar uses them.

  Quasar reads one token per status for two roles — `.text-positive` (text, e.g.
  the money columns) _and_ `.bg-negative` / `color="negative"` (a fill under a
  white glyph or label) — and `theme/colors.ts` harmonized a single hex per
  status for both schemes. Those brand hexes are mid-tone, so they clear 4.5:1
  against neither a white nor a near-black surface:

  - `text-positive` measured **2.33:1** on the light surface and **2.22:1** on the
    zebra row.
  - `text-negative` measured **2.68:1** on the dark surface and **2.56:1** on the
    zebra row.

  `renderQuasarDarkBlock` stated the reason it left them alone — "identical in
  both schemes, like quasar.css constants" — but the dark palette is not the
  light one, and the status fills are not constants.

  Each status is now derived from a tonal palette built on the _harmonized_ brand
  hue and pinned to an MD3 tone per scheme (`STATUS_TONE` in `theme/colors.ts`),
  never to a hand-picked hex: light takes MD3's own light-error rung (40) → 6.3:1
  as text and 6.5:1 for white on the fill; dark takes 60, one rung below MD3's
  dark error (80), because at 80 the fill drops to 2.1:1 under a white glyph
  (below 1.4.11's 3:1) while 60 keeps the text ≥4.5:1 (5.2:1) and the glyph ≥3:1
  (3.2:1). Light `--q-negative`, which already passed, keeps its rung.

  `info`/`warning` stay shared on purpose: nothing in the app renders them, so no
  contrast measurement covers them.

  Covered by `test/status-colors.test.ts`, which asserts both the derivation (the
  two schemes differ; every text pairing clears 4.5:1 on its own surface and on
  the table row; a white glyph stays ≥3:1 on each fill) and the emission (`:root`
  and `body.body--dark` both declare `--q-positive`/`--q-negative`, with different
  values — the block that previously omitted them entirely).

- 3b45bbb: An active tab's label takes the palette colour in the light scheme too.

  The preset already stated the colour — `.q-tab--active { color: var(--q-primary) }`,
  merged into one block with its `.body--dark` twin — but it never won the cascade.
  Plain `.q-tab--active` is 0,1,0, exactly like the base `.q-tab { color: inherit }`
  (dist's value) that the sheet emits _later_, so the inherited page colour won and
  the label computed `rgb(0, 0, 0)` on a transparent background. In dark it worked,
  because `.body--dark .q-tab--active` carries an extra class and outranks the base.

  Measured on `/admin/payments` before the change: the active rail item's label
  `rgb(0, 0, 0)` with `--q-primary: #00658f`, so the only selected affordance was the
  indicator pill (56×32, radius 16px, `oklab(0.9126 -0.0133 -0.0267)`, opacity 1).
  After: `rgb(0, 101, 143)` — the palette value — with the pill byte-identical.

  The rule now carries both classes (`.q-tab.q-tab--active`, 0,2,0), so it wins
  wherever the sheet places it — the same two-class idiom as the reference's
  `.flex.inline` companion. The pill is untouched and stays as the deliberate MD3
  deviation from Quasar's 3 dp tab indicator.

  Covered by the new `test/tab-active.test.ts`, which asserts the two-class selector
  states `var(--q-primary)`, that the inactive tab still inherits (dist's value), and
  that the pill keeps its geometry and its `--q-secondary-container` fill — including
  its `.body--dark` override.

- 5bec234: fix(preset): restore the public `unocss-preset-quasar/theme` entry point

  The rewrite dropped the `./theme` export, but `QuasarTheme`, `defaultTheme`,
  `generateTheme` and `setThemeColors` are published API: `@modular-api/fastify-oidc`
  types its `themeColors` option as `QuasarTheme['colors']`,
  `@modular-api/oidc-interactions` calls `setThemeColors()`, and the `--light-*` /
  `--dark-*` / `--*` custom properties it writes are read by consumer CSS. Apps
  importing the subpath failed at start with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

  The subpath is exported again (`src/theme/quasar-theme.ts`), and `generateTheme`
  derives its Material values from `generateColorTokens` — the same generator behind
  the preset's `--q-*` preflight — so an injected theme matches the emitted CSS.

- e467140: chore: update dependencies

## 0.5.5

### Patch Changes

- 7966f51: fix: emit `.all-pointer-events` as a preflight so QDialog menus stay clickable

  `all-pointer-events` was defined as a static rule, but `@unocss/preset-wind4`'s
  `all` scope variant (`scopeMatcher("all", " ")`) consumes the `all-` prefix of
  `all-pointer-events`, so the rule never matched (`parseToken` returned null)
  and the class CSS was never generated. Quasar's QDialog internal menu portal
  relies on `.all-pointer-events { pointer-events: all !important }`; without it,
  dropdown options rendered inside dialogs were unclickable (a `q-field__bottom`
  element intercepted pointer events).

  Move the class into the preset's preflights (which bypass token matching) and
  keep it in the safelist.

## 0.5.4

### Patch Changes

- bd160dd: Fix `q-tab__indicator` to span the parent QTab width

  - **md3**: the tab indicator is now a full-width, bottom-anchored pill whose
    height is 40% of the tab height (radius `--q-radius-full`, background
    `--light-secondary-container`). Previously it was a fixed 56×32px pill that
    only covered ~60% of the tab and rendered left-aligned because
    `left-[calc(50%-28px)]` is invalid CSS (missing spaces around `-`).
  - **md2 / unstyled**: the indicator matches Quasar's own design — a 2px
    full-width bottom bar with `background: currentColor`.
  - Per-style values are expressed through the `--q-tab-indicator-*` tokens, so
    the shared shortcut stays style-agnostic.

## 0.5.3

### Patch Changes

- 2fd1af4: Restore `MaterialDesign2` / `MaterialDesign3` / `Unstyled` as the canonical style-entry exports

  - The style entries exported from `unocss-preset-quasar/styles` are named
    `MaterialDesign2`, `MaterialDesign3`, and `Unstyled` again (as in 0.4.x),
    matching the module path (`styles/`).
  - The 0.5.x names — `Md2StyleEntry` / `Md3StyleEntry` / `UnstyledStyleEntry` —
    are kept as deprecated aliases, so configs written against 0.5.0–0.5.2 keep
    working unchanged.
  - This restores the `MaterialDesign*` / `Unstyled` exports that 0.5.2 removed,
    which broke `import { MaterialDesign3 } from 'unocss-preset-quasar/styles'`
    for existing consumers at module-load time.

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
