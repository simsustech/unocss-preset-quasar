---
layout: doc
---

# Preset Changes: Before/After

## Overview

This document shows the exact preset shortcut transformations needed to eliminate pseudo-element atoms.

## Pattern: Pseudo-Element Atom → Utility Class on Real Selector

### Generic Transformation

| Before (Atom)                                                                            | After (Utility Class)                                                                                                                  |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `[&:before]:(content-empty top-0 right-0 bottom-0 left-0 absolute pointer-events-none)`  | `.overlay { @apply absolute inset-0 pointer-events-none; }` + `<div class="overlay">`                                                  |
| `[&:after]:(content-empty h-2px bottom-0 left-0 right-0 bg-current transform scale-x-0)` | `.focus-underline { @apply absolute bottom-0 left-0 right-0 h-2px bg-current transform scale-x-0; }` + `<div class="focus-underline">` |

---

## QDate: Complete Before/After

### Before: `packages/preset/src/styles/md3/components/QDate.unocss.ts`

```ts
// Pattern A: Calendar item dashed border
;[
  /^q-date__calendar-item$/,
  componentClass(
    'q-date__calendar-item',
    `
    inline-flex items-center justify-center align-middle !w-[14.285%] !h-[12.5%] relative
    [&:after]:(content-empty absolute pointer-events-none top-px right-0 bottom-px left-0 border-dashed border-transparent border)
    [&_>_div]:(w-[30px] h-[30px] rounded-[50%])
    [&_button]:(w-[30px] h-[30px] rounded-[50%])
    [&_>_div]:(leading-[30px] text-center)
    [&_>_button]:(leading-[22px])
  `
  )
][
  // Pattern B: Range highlight
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
  // Pattern B: Range From (left half)
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
  // Pattern B: Range To (right half)
  (/^q-date__range-to$/,
  componentClass(
    'q-date__range-to',
    `
    [&:before]:(content-empty bg-current absolute top-px bottom-px left-0 right-0 opacity-30)
    [&:nth-child(7n-6):before]:(rounded-tl-none rounded-bl-none)
    [&:nth-child(7n):before]:(rounded-tr-none rounded-br-none)
    [&:before]:(right-2/4)
  `
  ))
][
  // Pattern C: Edit range borders
  (/^q-date__edit-range$/,
  componentClass(
    'q-date__edit-range',
    `
    [&:after]:(border-$light-primary dark:border-$dark-primary border-l-transparent border-r-transparent)
    [&:nth-child(7n-6):after]:(rounded-tl-none rounded-bl-none)
    [&:nth-child(7n):after]:(rounded-tr-none rounded-br-none)
  `
  ))
][
  (/^q-date__edit-range-from$/,
  componentClass(
    'q-date__edit-range-from',
    `
    [&:after]:(left-[4px] border-r-0 border-$light-primary dark:border-$dark-primary rounded-tl-[28px] rounded-bl-[28px])
    [&:after]:(right-[4px] border-l-transparent rounded-tr-[28px] rounded-br-[28px])
  `
  ))
][
  (/^q-date__edit-range-from-to$/,
  componentClass(
    'q-date__edit-range-from-to',
    `
    [&:after]:(right-[4px] border-l-transparent border-$light-primary dark:border-$dark-primary rounded-tr-[28px] rounded-br-[28px])
  `
  ))
]
```

### After: `packages/preset/src/styles/md3/components/QDate.unocss.ts`

```ts
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
  // Pattern B: Range From (left half)
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
  // Pattern B: Range To (right half)
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
    border-r-transparent border-l-transparent
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

## QField: Complete Before/After

### Before

```ts
;[
  /^q-field__control$/,
  componentClass(
    'q-field__control',
    `
    flex flex-row w-full h-[56px] max-w-full outline-none
    text-$light-primary dark:text-$dark-primary
    [&:before]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute border-rd-inherit)
    [&:after]:(content-empty top-[0] right-[0] bottom-[0] left-[0] pointer-events-none absolute)
  `
  )
][
  // Filled variant
  (/^q-field--filled$/,
  componentClass(
    'q-field--filled',
    `
    [&_>_.q-field__inner_>_.q-field__control]:(bg-$light-surface-container-highest text-$light-on-surface-variant dark:bg-$dark-surface-container-highest dark:text-$dark-on-surface-variant px-[16px] py-[0] bg-black/5 rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[0px] rounded-br-[0px])
    [&_.q-field__control:before]:(bg-black/5 [border-bottom:1px_solid_rgba(0,_0,_0,_0.42)] opacity-0 [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background_0.36s_cubic-bezier(0.4,_0,_0.2,_1)])
    [&_.q-field__control:hover:before]:(opacity-100)
    [&_.q-field__control:after]:(h-[2px] top-auto origin-[center_bottom] [transform:scale3d(0,_1,_1)] bg-current [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)])
    [&_>_*_>_.q-field--highlighted_.q-field__control:before]:(opacity-100 bg-black/12)
    [&_>_*_>_.q-field--highlighted_.q-field__control:after]:([transform:scale3d(1,_1,_1)])
    [&.q-field--readonly_.q-field__control:before]:(opacity-100 bg-transparent [border-bottom-style:dashed])
  `
  ))
]
```

### After

```ts
// Base control: structural classes for overlays
;[
  /^q-field__control$/,
  componentClass(
    'q-field__control',
    `
    relative flex flex-row w-full h-[56px] max-w-full outline-none
    text-$light-primary dark:text-$dark-primary
    [&_.q-field__hover-surface]:(absolute inset-0 pointer-events-none rounded-inherit)
    [&_.q-field__focus-underline]:(absolute bottom-0 left-0 right-0 h-[2px] origin-center-bottom bg-current transform scale-x-0 transition-transform-36)
  `
  )
][
  // Filled variant
  (/^q-field--filled$/,
  componentClass(
    'q-field--filled',
    `
    [&_>_.q-field__inner_>_.q-field__control]:(
      bg-$light-surface-container-highest text-$light-on-surface-variant
      dark:bg-$dark-surface-container-highest dark:text-$dark-on-surface-variant
      px-[16px] py-[0] bg-black/5 rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[0px] rounded-br-[0px]
    )
    [&_.q-field__control_.q-field__hover-surface]:(
      bg-black/5 [border-bottom:1px_solid_rgba(0,_0,_0,_0.42)] opacity-0
      [transition:opacity_0.36s_cubic-bezier(0.4,_0,_0.2,_1),_background_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]
    )
    [&_.q-field__control:hover_.q-field__hover-surface]:(opacity-100)
    [&_.q-field__control_.q-field__focus-underline]:(
      h-[2px] top-auto origin-[center_bottom]
      [transform:scale3d(0,_1,_1)] bg-current
      [transition:transform_0.36s_cubic-bezier(0.4,_0,_0.2,_1)]
    )
    [&_>_*_>_.q-field--highlighted_.q-field__control_.q-field__hover-surface]:(
      opacity-100 bg-black/12
    )
    [&_>_*_>_.q-field--highlighted_.q-field__control_.q-field__focus-underline]:(
      [transform:scale3d(1,_1,_1)]
    )
    [&.q-field--readonly_.q-field__control_.q-field__hover-surface]:(
      opacity-100 bg-transparent [border-bottom-style:dashed]
    )
  `
  ))
]
```

### New Real Elements in QField Template

```vue
<!-- In QField.vue or useField composable -->
<template>
  <div class="q-field__control">
    <div class="q-field__hover-surface" aria-hidden="true" />
    <div class="q-field__focus-underline" aria-hidden="true" />
    <!-- ... existing content ... -->
  </div>
</template>
```

---

## QBtn: Pattern Mapping

| Variant         | Before (Pseudo)                                                           | After (Real)                                           |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ |
| Main            | `[&:before]:(content-empty block absolute inset-0 border-radius-inherit)` | `<div class="q-btn__shadow" />` with `box-shadow`      |
| Standard        | `[&:before]:(border-radius-inherit shadow-md)`                            | `.q-btn__shadow { box-shadow: var(--q-elevation-2); }` |
| Outline         | `[&:before]:(border-1 border-solid border-outline)`                       | `border: 1px solid var(--q-outline)` on element        |
| Push            | `[&:before]:(border-b-3 border-black/15)`                                 | `border-bottom: 3px solid rgba(0,0,0,.15)` on element  |
| Flat/Unelevated | `[&:before]:(box-shadow-none)`                                            | No shadow utility                                      |

---

## QToggle/QCheckbox/QRadio: Native Swap

### Before (Pseudo)

```ts
// QToggle
;[
  /^q-toggle__thumb$/,
  componentClass(
    'q-toggle__thumb',
    `
    [&:after]:(content-[''] absolute inset-0 rounded-[50%] bg-[#fff] shadow-md)
    [&:before]:(content-[''] absolute inset-0 rounded-[50%] bg-current opacity-12 transform scale-0 transition-transform-22)
    [&.q-toggle__inner--truthy:after]:(bg-current)
  `
  )
]
```

### After (Native)

```ts
// Native input + accent-color
;[
  /^q-toggle$/,
  componentClass(
    'q-toggle',
    `
    appearance-none
    accent-$light-primary dark:accent-$dark-primary
    // thumb/track styling via real elements
    [&_.q-toggle__track]:(h-[.35em] rounded-[.175em] opacity-38 bg-current)
    [&_.q-toggle__thumb]:(relative top-[.25em] left-[.25em] w-[.5em] h-[.5em] rounded-[50%] transition-left-22)
    [&_.q-toggle__inner--truthy]:(text-$light-primary dark:text-$dark-primary)
  `
  )
]
```

---

## Migration Checklist per Component

For each component in the 23-file inventory:

- [ ] Inventory pseudo-elements in SASS
- [ ] Add structural classes to Vue render function
- [ ] Remove pseudo-element rules from SASS
- [ ] Add real elements to template (if needed)
- [ ] Update preset shortcuts: `[&:before]` → class utilities
- [ ] Remove pseudo-element helpers from `_pseudo-overlays.ts` (if unused)
- [ ] Run visual tests: `pnpm playwright test tests/components/Q<Name>.spec.ts`
- [ ] Run computed-style regression
- [ ] Verify no pseudo-elements in compiled CSS: `grep -r "::before\|::after" dist/`
