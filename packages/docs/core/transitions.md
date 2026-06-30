# Transitions

The preset provides CSS transition classes for Quasar's built-in transition system. These map to Quasar's `transition-show` / `transition-hide` component props.

## Transition CSS Variables

Two CSS custom properties control all transitions:

```css
:root {
  --q-transition-duration: .3s;
  --q-transition-easing: cubic-bezier(0.215, 0.61, 0.355, 1);
}
```

These can be overridden:

```css
:root {
  --q-transition-duration: 0.5s;
  --q-transition-easing: ease-in-out;
}
```

## Available Transitions

Each transition comprises up to 6 classes: `enter-from`, `enter-active`, `enter-to`, `leave-from`, `leave-active`, `leave-to`. The preset provides shortcuts for all of them.

### Slide Transitions

```html
<q-dialog transition-show="slide-up" transition-hide="slide-down">
```

| Transition | Direction | Properties |
|------------|-----------|------------|
| `slide-right` | Horizontal | `transform: translate3d(...)` |
| `slide-left` | Horizontal | `transform: translate3d(...)` |
| `slide-up` | Vertical | `transform: translate3d(...)` |
| `slide-down` | Vertical | `transform: translate3d(...)` |

### Jump Transitions

```html
<q-menu transition-show="jump-down" transition-hide="jump-up">
```

| Transition | Direction | Properties |
|------------|-----------|------------|
| `jump-right` | Horizontal + opacity | `transform` + `opacity` |
| `jump-left` | Horizontal + opacity | `transform` + `opacity` |
| `jump-up` | Vertical + opacity | `transform` + `opacity` |
| `jump-down` | Vertical + opacity | `transform` + `opacity` |

### Fade Transition

```html
<q-dialog transition-show="fade" transition-hide="fade">
```

Simple opacity transition. `enter-from` and `leave-to` set `opacity: 0`.

### Scale Transition

```html
<q-dialog transition-show="scale" transition-hide="scale">
```

Combines opacity and scale3d. `enter-from` starts at `scale3d(0,0,1)` with `opacity: 0`.

### Rotate Transition

```html
<q-dialog transition-show="rotate" transition-hide="rotate">
```

Combines opacity, scale3d, and rotate3d with `preserve-3d` transform style.

### Flip Transitions

```html
<q-carousel transition-show="flip-right" transition-hide="flip-left">
```

| Transition | Axis |
|------------|------|
| `flip-right` | Y-axis rotate |
| `flip-left` | Y-axis rotate (opposite) |
| `flip-up` | X-axis rotate |
| `flip-down` | X-axis rotate (opposite) |

Flip transitions use `perspective(400px)` and `backface-visibility: hidden`.

## Transition Classes Format

Each transition generates classes with this pattern:

```
q-transition--{name}-enter-active
q-transition--{name}-enter-from
q-transition--{name}-enter-to
q-transition--{name}-leave-active
q-transition--{name}-leave-from
q-transition--{name}-leave-to
```

For example, `slide-up` generates:
- `q-transition--slide-up-enter-active`
- `q-transition--slide-up-enter-from`
- `q-transition--slide-up-leave-active`
- `q-transition--slide-up-leave-to`

## Using Transitions

These classes are applied automatically by Quasar components when you set `transition-show` / `transition-hide` props. You don't need to add them manually:

```html
<!-- Quasar handles class toggling automatically -->
<q-dialog transition-show="scale" transition-hide="fade">
  Dialog content
</q-dialog>

<q-menu transition-show="jump-down" transition-hide="jump-up">
  Menu content
</q-menu>
```

## Transition Detection

The preset's extractor automatically detects transition props in your templates and safelists the corresponding classes:

```html
<!-- These are auto-detected -->
transition-show="scale"
transition-hide="fade"
transition="slide-up"
transition-prev="flip-right"
transition-next="flip-left"
```

## Custom Transitions

You can define custom transition timing:

```css
:root {
  --q-transition-duration: 0.2s;
  --q-transition-easing: ease;
}
```

Or override per-element:

```html
<q-dialog
  transition-show="scale"
  transition-hide="fade"
  transition-duration="500"
>
```
