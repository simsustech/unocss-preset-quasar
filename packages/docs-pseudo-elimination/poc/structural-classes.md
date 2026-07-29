---
layout: doc
---

# Structural Classes Pattern

## Definition

**Structural classes** = CSS classes added by the Vue render function that encode positional, state, or relational information that was previously expressed via pseudo-elements (`::before`, `::after`) or nth-child selectors.

Instead of:

```css
.item:nth-child(7n-6)::before {
  border-radius: 0 0 0 0;
}
.item::after {
  border-left: 2px solid primary;
}
```

The Vue component emits:

```html
<button class="item first-in-week range-start">15</button>
```

And CSS uses:

```css
.item.first-in-week {
  border-top-left-radius: 0;
}
.item.range-start {
  border-left: 2px solid var(--q-primary);
}
```

---

## QDate Structural Classes

| Class             | Encodes                      | Replaces                                          |
| ----------------- | ---------------------------- | ------------------------------------------------- |
| `first-in-week`   | `index % 7 === 0` (Sunday)   | `nth-child(7n-6)::before/::after` corner rounding |
| `last-in-week`    | `index % 7 === 6` (Saturday) | `nth-child(7n)::before/::after` corner rounding   |
| `range-start`     | `day.rangeFrom === true`     | `q-date__range-from::before` left positioning     |
| `range-end`       | `day.rangeTo === true`       | `q-date__range-to::before` right positioning      |
| `range-highlight` | `day.inRange === true`       | `q-date__range::before` background fill           |

---

## QField Structural Classes

| Class             | Encodes                 | Replaces                                                       |
| ----------------- | ----------------------- | -------------------------------------------------------------- |
| `hover-surface`   | Mouse hover on control  | `.q-field__control::before` (hover bg + border-radius inherit) |
| `focus-underline` | Focus-within on control | `.q-field__control::after` (scaleX transform underline)        |
| `filled`          | `filled` prop           | `.q-field--filled > .q-field__control::before`                 |
| `outlined`        | `outlined` prop         | `.q-field--outlined > .q-field__control::before/::after`       |

### Vue Render Modification (QField)

```js
// In QField.vue render function or useField composable:
const controlClasses = computed(() => [
  'q-field__control relative',
  props.filled && 'filled',
  props.outlined && 'outlined',
  // NEW: expose pseudo-element states as real classes
  'has-hover-surface',
  'has-focus-underline'
])
```

### SASS Replacement

```sass
// Before: pseudo-elements
.q-field__control
  &:before
    content: ''
    position: absolute
    top: 0 right: 0 bottom: 0 left: 0
    pointer-events: none
    border-radius: inherit
    background: rgba(0,0,0,.05)
    opacity: 0
    transition: opacity $field-transition

  &:hover:before
    opacity: 1

  &:after
    height: 2px
    transform: scale3d(0, 1, 1)
    background: currentColor
    transition: transform $field-transition

  &.q-field--highlighted:after
    transform: scale3d(1, 1, 1)

// After: real elements + structural classes
.q-field__control
  position: relative
  // hover surface = real element
  & .q-field__hover-surface
    @extend %absolute-full
    pointer-events: none
    border-radius: inherit
    background: rgba(0,0,0,.05)
    opacity: 0
    transition: opacity $field-transition

  &:hover .q-field__hover-surface
    opacity: 1

  // focus underline = real element
  & .q-field__focus-underline
    @extend %absolute-bottom
    height: 2px
    transform: scaleX(0)
    background: currentColor
    transition: transform $field-transition

  &.q-field--highlighted .q-field__focus-underline
    transform: scaleX(1)
```

---

## QTree Structural Classes

| Class            | Encodes                         | Replaces                              |
| ---------------- | ------------------------------- | ------------------------------------- |
| `tree-connector` | Always present on node          | `::before` vertical line              |
| `first-child`    | `index === 0` in parent         | `nth-child(1)::before` top adjustment |
| `last-child`     | `index === children.length - 1` | `last-child::after` hide              |

```js
// In QTree render:
nodes.forEach((node, index, arr) => ({
  classes: [
    'q-tree__node',
    'has-connector', // always
    index === 0 && 'first-child',
    index === arr.length - 1 && 'last-child'
  ]
}))
```

### SASS

```sass
// Before
.q-tree__node
  &:before
    content: ''
    position: absolute
    top: -3px bottom: 0 width: 2px left: -13px
    border-left: currentColor
  &:last-child:after
    display: none

// After
.q-tree__node
  .q-tree__connector
    @extend %absolute-left-13
    width: 2px
    background: currentColor
    top: -3px
    bottom: 0
  &.first-child .q-tree__connector
    top: 0
  &.last-child .q-tree__connector
    bottom: -3px
```

---

## Benefits

| Benefit                 | Explanation                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| **No pseudo-elements**  | All styling on real elements; DevTools shows actual DOM                    |
| **Preset-only styling** | Zero pseudo-element atoms in preset; only utility classes                  |
| **Native HTML ready**   | When swapping to `<dialog>`/`<input>`, structural classes work identically |
| **Easier debugging**    | Inspect element → see all classes → trace to CSS                           |
| **SSR friendly**        | No pseudo-element hydration mismatches                                     |
| **Print styles**        | Pseudo-elements often omitted in print; real elements print                |

---

## Migration Pattern

For each component with pseudo-elements:

1. **Inventory** pseudo-elements in SASS
2. **Map** each to structural class(es) + native CSS property
3. **Modify** Vue render function to emit classes
4. **Replace** SASS pseudo-element rules with class-based rules
5. **Update** preset shortcuts from `[&:before]` atoms to class utilities
6. **Test** visual + computed-style regression
