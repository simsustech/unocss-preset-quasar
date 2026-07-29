---
layout: doc
---

# Strategy

## Core Principle

Every `::before`/`::after` in Quasar SASS is replaced by:

1. **Real DOM element** — rendered by Vue component, styled via preset utilities
2. **Native CSS property** — `border`, `background`, `box-shadow`, `outline`, `accent-color` on the element itself
3. **Native HTML element** — `<dialog>`, `<details>`, `<input>`, `<progress>`, `<select>` replace custom implementations

**No pseudo-element helpers. No `[&:before]` atoms in preset.** Preset emits only utility classes on real selectors.

---

## Implementation Pattern

### Quasar Vue Component (QDate example)

```js
render() {
  return days.map((day, index) => h('button', {
    class: [
      'q-date__calendar-item',
      index % 7 === 0 && 'first-in-week',    // corner rounding
      index % 7 === 6 && 'last-in-week',
      day.rangeFrom && 'range-start',        // left border
      day.rangeTo && 'range-end',            // right border
      day.inRange && 'range-highlight',      // background
    ]
  }, day))
}
```

### Preset Shortcut (QDate.unocss.ts)

```ts
'q-date__calendar-item': componentClass('q-date__calendar-item', `
  border: 1px dashed transparent
  &.first-in-week: rounded-tl-none rounded-bl-none
  &.last-in-week: rounded-tr-none rounded-br-none
  &.range-start: border-l-2 border-$light-primary dark:border-$dark-primary
  &.range-end: border-r-2 border-$light-primary dark:border-$dark-primary
  &.range-highlight: bg-$light-primary/30 dark:bg-$dark-primary/30
`)
```

---

## Risk Vector

**Breaking animation parity** — Quasar uses `<transition-group>` for show/hide.

**Mitigation:** Preserve transition classes on real elements. Use CSS transitions on native properties (`opacity`, `transform`, `background-color`) instead of pseudo-element transforms.

---

## Execution Steps

1. **Inventory** — map every `&:before`/`&:after` in Quasar SASS to replacement strategy
2. **Quasar core** — modify Vue render functions to emit structural classes; remove pseudo-elements from SASS
3. **Preset** — replace `[&:before]`/`[&:after]` atoms with utility classes on real selectors
4. **Build & link** — `pnpm --filter quasar build` + copy dist to harness
5. **Test** — Playwright visual + computed-style regression
6. **Adopt** — per-component commit when byte-identical
