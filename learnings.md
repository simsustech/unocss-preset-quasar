# QToggle Dense Style Debugging - CSS Analysis

## Browser-computed CSS (Playwright inspection of `q-toggle?style=md3&dense=true`)

### `.q-toggle__inner`

```css
.q-toggle__inner {
  padding-left: 0.325em;
  padding-right: 0.325em;
}
```

**Missing:** `font-size: 40px` — the `text-[40px]` from the shortcut fallback is not generating.

### `.q-toggle__track`

```css
.q-toggle__track {
  height: 1em;
  width: 1.6125em;
  background-color: var(--light-surface-container);
  outline-width: 2px;
  outline-color: var(--light-outline);
  outline-style: solid;
  border-radius: 9999px;
}
```

### `.q-toggle__thumb`

```css
.q-toggle__thumb {
  transition: left 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  top: 0.125em;
  left: 0.5125em;
  z-index: 0;
  width: 0.75em;
  height: 0.75em;
  user-select: none;
}
```

### `.q-toggle__inner--truthy .q-toggle__thumb`

```css
.q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.95em;
  top: 0.0625em;
  width: 0.875em;
  height: 0.875em;
  color: var(--light-on-primary-container);
}
```

### QToggle dense overrides (Quasar base CSS)

```css
.q-toggle--dense .q-toggle__inner {
  width: 0.8em;
  min-width: 0.8em;
  height: 0.5em;
  padding: 0.07625em 0px;
}
.q-toggle--dense .q-toggle__thumb {
  top: 0px;
  left: 0px;
}
.q-toggle--dense .q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.3em;
}
```

## Root cause chain

1. `.q-toggle__inner` computed `fontSize` = **14px** (inherited, no 40px override)
2. Because font-size is 14px, `0.5em` = 7px (inner height is tiny, not 20px at 40px)
3. Track is `h-[1em]` = 14px — matching the wrong font-size
4. Thumb at 14px font-size is way too small and positioned wrong

## What should happen

- `.q-toggle__inner` needs `font-size: 40px` so all em units resolve correctly
- At 40px: inner `0.5em` = 20px, track `1em` = 40px, thumb `0.75em` = 30px
- Dense thumb positions: top 0, left 0 (base), truthy left 0.3em = 12px

## Theories for missing font-size

1. `text-[40px]` in the shortcut might not be generating due to UnoCSS arbitrary value handling
2. Theme override for `q-toggle__inner` might blank out the fallback
3. The `mdComponent` regex match might not include `text-[40px]` in the right layer

## Files to check

- `/home/stefan/Projects/unocss-preset-quasar/packages/preset/src/` — MD3 shortcuts and theme
- `/home/stefan/Projects/quasar-dev/packages/app/vitrify.config.*` — theme overrides
- Quasar base CSS for `.q-toggle__inner` default font-size
