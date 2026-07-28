---
layout: doc
---

# Phases

## Phase 1: Inventory & Replacement Mapping (Week 1)

Map every pseudo-element in Quasar SASS to replacement strategy:

| Component       | SASS File                              | `&:before` | `&:after` | Replacement Strategy                            |
| --------------- | -------------------------------------- | ---------- | --------- | ----------------------------------------------- |
| QField          | `field/QField.sass`                    | 6          | 6         | Real overlay divs + native `:focus-visible`     |
| QDate           | `date/QDate.sass`                      | 5          | 6         | Structural classes on calendar items            |
| QSlider         | `slider/QSlider.sass`                  | 5          | 5         | Native `<input type=range>`                     |
| QBtn            | `btn/QBtn.sass`                        | 4          | 4         | Real overlays + `isolation: isolate`            |
| QTree           | `tree/QTree.sass`                      | 3          | 3         | Real connector divs                             |
| QLayout         | `layout/QLayout.sass`                  | 2          | 3         | Native `<dialog>::backdrop`                     |
| QTimeline       | `timeline/QTimeline.sass`              | 3          | 3         | Real connector divs                             |
| QStepper        | `stepper/QStepper.sass`                | 3          | 2         | Real connector divs                             |
| QTable          | `table/QTable.sass`                    | 2          | 3         | Real overlay divs                               |
| QToggle         | `toggle/QToggle.sass`                  | 2          | 2         | Native `<input type=checkbox>` + `accent-color` |
| QTime           | `time/QTime.sass`                      | 2          | 2         | Structural classes                              |
| QLinearProgress | `linear-progress/QLinearProgress.sass` | 1          | 2         | Native `<progress>`                             |
| QUploader       | `uploader/QUploader.sass`              | 1          | 1         | Real overlay div                                |
| QSkeleton       | `skeleton/QSkeleton.sass`              | 1          | 1         | Real shimmer div                                |
| QChatMessage    | `chat/QChatMessage.sass`               | 1          | 2         | Real tail/status divs                           |
| QColor          | `color/QColor.sass`                    | 1          | 1         | Real overlay div                                |
| QEditor         | `editor/QEditor.sass`                  | 0          | 1         | Real divider                                    |
| QKnob           | `knob/QKnob.sass`                      | 1          | 0         | Native `<input type=range>` circular            |
| QBtnGroup       | `btn-group/QBtnGroup.sass`             | 0          | 1         | Real divider                                    |
| QRadio          | `radio/QRadio.sass`                    | 0          | 1         | Native `<input type=radio>` + `accent-color`    |
| QIcon           | `icon/QIcon.sass`                      | 0          | 1         | Real fallback span                              |
| QCheckbox       | `checkbox/QCheckbox.sass`              | 0          | 1         | Native `<input type=checkbox>` + `accent-color` |
| Visibility      | `core/visibility.sass`                 | 4          | 4         | Utility CSS (not component)                     |
| Normalize       | `core/normalize.sass`                  | 0          | 1         | Global reset                                    |

---

## Phase 2: Quasar Core Modifications (Weeks 2-4)

For each component:

1. **Add structural classes** to Vue render function
2. **Remove pseudo-elements** from component SASS
3. **Preserve transitions** on real elements

### Example: QDate.js modification

```js
// In getCalendar computed property:
res.forEach((day, index) => {
  let cls = 'q-date__calendar-item '
  // ... existing classes ...

  // NEW: Structural classes replacing pseudo-elements
  if (index % 7 === 0) cls += ' first-in-week'
  if (index % 7 === 6) cls += ' last-in-week'
  if (day.rangeFrom) cls += ' range-start'
  if (day.rangeTo) cls += ' range-end'
  if (day.inRange) cls += ' range-highlight'

  day.classes = cls
})
```

### Example: QToggle.js modification

```js
// Replace thumb ::before/::after with native input
return h('label', { class: 'q-toggle' }, [
  h('input', {
    type: 'checkbox',
    class: 'q-toggle__native'
    // ... props
  }),
  h('div', { class: 'q-toggle__thumb' }), // real element, no ::after
  h('div', { class: 'q-toggle__track' }) // real element
])
```

---

## Phase 3: Preset Refactoring (Weeks 3-4)

Replace all `[&:before]`/`[&:after]` atoms with utility classes on real selectors.

### Before (pseudo-element atoms)

```ts
'q-field__control': componentClass('q-field__control', `
  [&:before]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute border-rd-inherit)
  [&:after]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute)
`)
```

### After (real element utilities)

```ts
'q-field__control': componentClass('q-field__control', `
  relative
`),  // overlay handled by real .q-field__overlay element

'q-field__overlay': componentClass('q-field__overlay', `
  absolute inset-0 pointer-events-none rounded-inherit
  &.hover-surface: bg-black/5
  &.focus-underline: h-2px bottom-0 left-0 right-0 bg-current
`)
```

---

## Phase 4: Native HTML Swaps (Weeks 4-6)

| Component         | Native Replacement                       | Effort | Status   |
| ----------------- | ---------------------------------------- | ------ | -------- |
| QDialog           | `<dialog>`                               | High   | Pending  |
| QMenu             | `<menu>` + popover API                   | Medium | Pending  |
| QTooltip          | `popover` attribute                      | Medium | Pending  |
| QExpansionItem    | `<details>` + `<summary>`                | Low    | Pending  |
| QToggle           | `<input type=checkbox>` + `accent-color` | Low    | **Done** |
| QCheckbox         | `<input type=checkbox>` + `accent-color` | Low    | **Done** |
| QRadio            | `<input type=radio>` + `accent-color`    | Low    | **Done** |
| QSlider           | `<input type=range>`                     | Medium | Pending  |
| QKnob             | `<input type=range>` circular            | Medium | Pending  |
| QLinearProgress   | `<progress>`                             | Low    | **Done** |
| QCircularProgress | `<progress>` + conic-gradient            | Medium | Pending  |
| QSelect (plain)   | `<select>`                               | Low    | Pending  |

### Phase 4 Pattern (QLinearProgress PoC)

The first native swap replaces Quasar's custom div-based progress with a
native `<progress value={...} max={1}>` element. Browser-vendor pseudo-elements
(`::-webkit-progress-bar`, `::-webkit-progress-value`, `::-moz-progress-bar`,
`::-moz-progress-value`) style the parts since `appearance: none` strips the
native visual. These vendor pseudo-elements are browser styling hooks — they
are NOT application-authored pseudo-elements and cannot be removed.

```sass
// Browser-internal pseudo-elements for native <progress> parts.
// These are equivalent to CSS custom properties on the part elements and are
// the only mechanism to style native form-control parts until ::part() /
// Shadow DOM @part stylesheets are widely supported.
.q-linear-progress
  appearance: none
  &::-webkit-progress-bar
    background-color: rgba(0, 0, 0, .26)
  &::-webkit-progress-value
    background-color: currentColor
  &::-moz-progress-bar
    background: rgba(0, 0, 0, .26)
  &::-moz-progress-value
    background-color: currentColor
```

### Quasar SASS / Vue changes for the swap

- `QLinearProgress.js` — render `<progress>` instead of `<div role="progressbar">`
  with children. Keep all Quasar props (value, color, indeterminate, query,
  stripe, rounded, reverse, size, animationSpeed).
- `QLinearProgress.sass` — author styling on the host `.q-linear-progress`
  using browser-vendor pseudo-elements only. No application pseudo-elements.

### Indeterminate / query states

Native `<progress>` does not support indeterminate animation natively across
all browsers, but rendering without a `value` attribute triggers the browser's
own indeterminate animation. We rely on that for now and disable the
`transition` property in the `--motion` variant.

### Validation

- Playwright: 425 / 425 passing (no regressions vs Phase 3 baseline).
- The 11 pre-existing flaky strict-mode / bounding-box tests still retry-succeed.

### Roadmap for remaining swaps

- **Low effort (QToggle, QCheckbox, QRadio)** — ~~done in commit
  `ebf3ef7bd` (Quasar fork). Native `<input type=checkbox|radio>` rendered
  inside the host `<label>`. Host carries `accent-color: currentColor` so
  `text-${color}` classes drive the checked fill color. Indeterminate state
  uses native `:indeterminate` CSS state. Custom SVG visuals removed.
  Shared `useCheckbox()` composable simplified to drop `getInner()` and the
  `<div class=q-checkbox__inner>` wrapper.~~ (committed)
- **Low effort (QExpansionItem)** — replace `<div role=button>` with
  `<details>`/`<summary>` and wire `v-model:model-value` to the open state.
- **Medium effort (QSlider, QKnob)** — render `<input type=range>` with a
  label slot for the track and thumb visuals. Custom knob requires `conic-gradient`
  overlay; `accent-color` provides the value-fill color.
- **Medium effort (QTooltip, QMenu, QCircularProgress)** — popover API work
  is mostly browser feature-detection. `QCircularProgress` becomes a
  `<progress>` with `appearance: none` and a `conic-gradient` for the ring.
- **High effort (QDialog)** — render `<dialog>` and wire Quasar's `modelValue`
  to `dialog.show()` / `dialog.close()`. Significant work for the
  `useDialogPluginComponent` lifecycle.

---

## Phase 5: Testing & Validation (Week 6+)

Per component:

1. Build Quasar → copy to harness
2. Run Playwright tests → screenshot diff
3. Run computed-style regression tests
4. Verify byte-identical output
5. Commit when passing
