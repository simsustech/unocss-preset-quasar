---
layout: doc
---

# PoC: QDate Pseudo-Element Elimination

## Overview

QDate uses **3 distinct pseudo-element patterns** across all calendar views. This PoC demonstrates complete elimination via structural classes.

## Pattern Inventory (from Findings F6)

| Pattern | Selector                                                                                              | Purpose                                   | Current Implementation                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **A**   | `.q-date__calendar-item::after`                                                                       | Dashed border on each day cell            | `content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border` |
| **B**   | `.q-date__range::before`, `.q-date__range-from::before`, `.q-date__range-to::before`                  | Range highlight bg + week corner rounding | `content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30` + nth-child corner rounding           |
| **C**   | `.q-date__edit-range::after`, `.q-date__edit-range-from::after`, `.q-date__edit-range-from-to::after` | Primary border on range edges             | `border-primary border-l-transparent border-r-transparent` + nth-child corner rounding                               |

---

## Vue Render Function Modification

### Before (Quasar Core - `ui/src/components/date/QDate.js`)

```js
// In getCalendar computed property (~line 753):
res.forEach((day) => {
  let cls = 'q-date__calendar-item '
  if (day.fill) cls += 'q-date__calendar-item--fill'
  else {
    cls += `q-date__calendar-item--${day.in ? 'in' : 'out'}`
    if (day.range !== void 0)
      cls += ` q-date__range${day.rangeTo ? '-to' : day.rangeFrom ? '-from' : ''}`
    if (day.editRange)
      cls += ` q-date__edit-range${day.editRangeFrom ? '-from' : ''}${day.editRangeTo ? '-to' : ''}`
    if (day.range !== void 0 || day.editRange) cls += ` text-${day.color}`
  }
  day.classes = cls
})
```

### After (Structural Classes Added)

```js
res.forEach((day, index) => {
  let cls = 'q-date__calendar-item '
  if (day.fill) {
    cls += 'q-date__calendar-item--fill'
  } else {
    cls += `q-date__calendar-item--${day.in ? 'in' : 'out'}`
    if (day.range !== void 0)
      cls += ` q-date__range${day.rangeTo ? '-to' : day.rangeFrom ? '-from' : ''}`
    if (day.editRange)
      cls += ` q-date__edit-range${day.editRangeFrom ? '-from' : ''}${day.editRangeTo ? '-to' : ''}`
    if (day.range !== void 0 || day.editRange) cls += ` text-${day.color}`

    // NEW: Structural classes replacing pseudo-elements
    if (index % 7 === 0) cls += ' first-in-week'
    if (index % 7 === 6) cls += ' last-in-week'
    if (day.rangeFrom) cls += ' range-start'
    if (day.rangeTo) cls += ' range-end'
    if (day.inRange) cls += ' range-highlight'
  }
  day.classes = cls
})
```

### Structural Class Definitions

| Class             | Purpose                                | Applied When                 |
| ----------------- | -------------------------------------- | ---------------------------- |
| `first-in-week`   | Round top-left/bottom-left corners     | `index % 7 === 0` (Sunday)   |
| `last-in-week`    | Round top-right/bottom-right corners   | `index % 7 === 6` (Saturday) |
| `range-start`     | Left border for range                  | `day.rangeFrom === true`     |
| `range-end`       | Right border for range                 | `day.rangeTo === true`       |
| `range-highlight` | Background highlight for in-range days | `day.inRange === true`       |

---

## SASS Removal (Quasar Core)

### Before (`ui/src/components/date/QDate.sass`)

```sass
.q-date__calendar-item
  // Pattern A: Dashed border via ::after
  [&:after]:(content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border)

.q-date__range
  // Pattern B: Range highlight via ::before
  [&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30)
  [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none)
  [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)

.q-date__range-from
  [&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30)
  [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none)
  [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)
  [&:before]:(left-2/4)

.q-date__range-to
  [&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30)
  [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none)
  [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)
  [&:before]:(right-2/4)

.q-date__edit-range
  // Pattern C: Edit range borders via ::after
  [&:after]:(border-primary border-l-transparent border-r-transparent)
  [&:nth-child(7n-6):after]:(rounded-tl-none rounded-bl-none)
  [&:nth-child(7n):after]:(rounded-tr-none rounded-br-none)
```

### After (All pseudo-elements removed)

```sass
.q-date__calendar-item
  // Pattern A: Real border on element
  border: 1px dashed transparent

.q-date__range, .q-date__range-from, .q-date__range-to
  // Pattern B: Real background on element
  &.range-highlight
    background: var(--q-primary)
    opacity: 0.3
  &.first-in-week
    border-top-left-radius: 0
    border-bottom-left-radius: 0
  &.last-in-week
    border-top-right-radius: 0
    border-bottom-right-radius: 0

.q-date__range-from
  &.range-start
    // left half highlight
    background-position: left center

.q-date__range-to
  &.range-end
    // right half highlight
    background-position: right center

.q-date__edit-range
  // Pattern C: Real borders on element
  border-left: 2px solid var(--q-primary)
  border-right: 2px solid var(--q-primary)
  &.first-in-week
    border-top-left-radius: 0
    border-bottom-left-radius: 0
  &.last-in-week
    border-top-right-radius: 0
    border-bottom-right-radius: 0
```

---

## Preset Shortcut Changes

### Before (`packages/preset/src/styles/md3/components/QDate.unocss.ts`)

```ts
// Pattern A
;[
  /^q-date__calendar-item$/,
  componentClass(
    'q-date__calendar-item',
    `
    inline-flex items-center justify-center align-middle !w-[14.285%] !h-[12.5%] relative
    [&:after]:(content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border)
    [&_>_div]:(w-[30px] h-[30px] rounded-[50%])
    ...
  `
  )
][
  // Pattern B - Range
  (/^q-date__range$/,
  componentClass(
    'q-date__range',
    `
    [&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30)
    [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none)
    [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)
  `
  ))
][
  // Pattern B - Range From
  (/^q-date__range-from$/,
  componentClass(
    'q-date__range-from',
    `
    [&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30)
    [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none)
    [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)
    [&:before]:(left-2/4)
  `
  ))
][
  // Pattern C - Edit Range
  (/^q-date__edit-range$/,
  componentClass(
    'q-date__edit-range',
    `
    [&:after]:(border-$light-primary dark:border-$dark-primary border-l-transparent border-r-transparent)
    [&:nth-child(7n-6):after]:(rounded-tl-none rounded-bl-none)
    [&:nth-child(7n):after]:(rounded-tr-none rounded-br-none)
  `
  ))
]
```

### After (Utility Classes on Real Selectors)

```ts
import {
  pseudoOverlayDateCellBorder,
  pseudoOverlayDateRange,
  pseudoOverlayDateRangeCorners,
  pseudoOverlayDateEditRange
} from '../../_pseudo-overlays.js'

// Pattern A: Real border on element
;[
  /^q-date__calendar-item$/,
  componentClass(
    'q-date__calendar-item',
    `
    inline-flex items-center justify-center align-middle !w-[14.285%] !h-[12.5%] relative
    border border-dashed border-transparent
    [&_>_div]:(w-[30px] h-[30px] rounded-[50%])
    [&_button]:(w-[30px] h-[30px] rounded-[50%])
    [&_>_div]:(leading-[30px] text-center)
    [&_>_button]:(leading-[22px])
  `
  )
][
  // Pattern B: Range highlight via structural classes
  (/^q-date__range$/,
  componentClass(
    'q-date__range',
    `
    &.range-highlight: bg-$light-primary/30 dark:bg-$dark-primary/30
    &.first-in-week: rounded-tl-none rounded-bl-none
    &.last-in-week: rounded-tr-none rounded-br-none
  `
  ))
][
  // Pattern B - Range From (left half)
  (/^q-date__range-from$/,
  componentClass(
    'q-date__range-from',
    `
    &.range-highlight: bg-$light-primary/30 dark:bg-$dark-primary/30
    &.first-in-week: rounded-tl-none rounded-bl-none
    &.last-in-week: rounded-tr-none rounded-br-none
    &.range-start: bg-gradient-to-r from-$light-primary/30 via-$light-primary/30 to-transparent
  `
  ))
][
  // Pattern B - Range To (right half)
  (/^q-date__range-to$/,
  componentClass(
    'q-date__range-to',
    `
    &.range-highlight: bg-$light-primary/30 dark:bg-$dark-primary/30
    &.first-in-week: rounded-tl-none rounded-bl-none
    &.last-in-week: rounded-tr-none rounded-br-none
    &.range-end: bg-gradient-to-l from-$light-primary/30 via-$light-primary/30 to-transparent
  `
  ))
][
  // Pattern C: Edit range borders via structural classes
  (/^q-date__edit-range$/,
  componentClass(
    'q-date__edit-range',
    `
    &.first-in-week: rounded-tl-none rounded-bl-none
    &.last-in-week: rounded-tr-none rounded-br-none
    border-l-2 border-r-2 border-$light-primary dark:border-$dark-primary
    border-l-transparent border-r-transparent
  `
  ))
][
  (/^q-date__edit-range-from$/,
  componentClass(
    'q-date__edit-range-from',
    `
    &.first-in-week: rounded-tl-none rounded-bl-none
    &.last-in-week: rounded-tr-none rounded-br-none
    border-l-2 border-$light-primary dark:border-$dark-primary
    border-r-transparent
    border-l-transparent
  `
  ))
][
  (/^q-date__edit-range-from-to$/,
  componentClass(
    'q-date__edit-range-from-to',
    `
    &.first-in-week: rounded-tl-none rounded-bl-none
    &.last-in-week: rounded-tr-none rounded-br-none
    border-r-2 border-$light-primary dark:border-$dark-primary
    border-l-transparent
  `
  ))
]
```

---

## New Pseudo-Overlay Helpers (Optional - can inline instead)

Add to `_pseudo-overlays.ts` if you prefer reusable helpers:

```ts
export const pseudoOverlayDateCellBorder = () =>
  `border border-dashed border-transparent`

export const pseudoOverlayDateRange = () =>
  `bg-$light-primary/30 dark:bg-$dark-primary/30`

export const pseudoOverlayDateRangeCorners = () =>
  `&.first-in-week: rounded-tl-none rounded-bl-none
   &.last-in-week: rounded-tr-none rounded-br-none`

export const pseudoOverlayDateEditRange = () =>
  `border-l-2 border-r-2 border-$light-primary dark:border-$dark-primary
   border-l-transparent border-r-transparent
   &.first-in-week: rounded-tl-none rounded-bl-none
   &.last-in-week: rounded-tr-none rounded-br-none`
```

---

## Validation Checklist

- [ ] QDate visual tests pass across md3/md2/unstyled (5 variants × 3 styles = 15 screenshots)
- [ ] Computed-style regression: `border`, `background`, `border-radius` match baseline
- [ ] Range selection works: start/end/corner rounding correct
- [ ] Edit range works: from/to/both borders render correctly
- [ ] Dark mode variants match
- [ ] No pseudo-elements in compiled CSS for QDate
