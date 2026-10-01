# Transitions & Motion

Vue transitions Quasar's markup asks for by name, plus the animate.css-style helper family. Transition classes cannot be scanned — their names come from prop _values_ — so they are derived by the [value extractor](/architecture/extraction#value-extractor) and emitted unconditionally where no rule can reach them.

## Quasar transitions

`transition-show="fade"` (or a `transition` prop) makes Quasar emit `q-transition--<name>-*` classes. Each family provides the four Vue phases:

```html
<QDialog transition-show="slide-right" transition-hide="fade"></QDialog>
```

| Family | Names                                                 |
| ------ | ----------------------------------------------------- |
| slide  | `slide-right`, `slide-left`, `slide-up`, `slide-down` |
| jump   | `jump-right`, `jump-left`, `jump-up`, `jump-down`     |
| fade   | `fade`                                                |
| scale  | `scale`                                               |
| rotate | `rotate`                                              |
| flip   | `flip-right`, `flip-left`, `flip-up`, `flip-down`     |

Phases per family: `…-enter-active`, `…-leave-active`, `…-enter-from`, `…-leave-to` (flip also ships `enter-to` / `leave-from`).

The class names are derived from the prop **value**: `transition-show="scale"` in a template produces `q-transition--scale-*` candidates. A bound expression (`:transition-show="x"`) names nothing — write literals where you can.

## Animation helper family

```html
<div class="animated faster">…</div>
<div class="animated delay-2s">…</div>
```

- `.animated` sets the animation/transition durations that the `animated-*` / `une-*` classes (from the composed `animated-unocss` preset) rely on, plus the entrance `opacity: 0` state for `…Out` names.
- Bare modifiers (`faster`, `slower`, `delay-2s`, `duration-500ms`, …) resolve to `.animated.<modifier>` — the combined form dist states — so you never need to hand-compose two classes.
- `--animate-duration`, `--animate-delay`, `--animate-repeat` are stated at animate.css defaults on `:root`, so the declarations resolve even though a Quasar app does not import animate.css.

### Reduced motion

`@media print, (prefers-reduced-motion: reduce)` forces `.animated` durations to `1ms` and hides `…Out` entrance states — dist's own override, emitted through the preflight's CSS-text channel because a rule body cannot carry the at-rule.

## Quasar's own animations

| Class              | Effect                       |
| ------------------ | ---------------------------- |
| `q-animate--fade`  | `q-fade 0.2s` keyframed fade |
| `q-animate--scale` | scale entrance               |

The `q-fade` / `q-scale` keyframes ship in the preflight's static CSS, alongside the `une*` keyframes the animated-unocss preset provides for its own classes.

## Motion tokens

Durations and easings are style tokens, so components animate differently per style without different rules:

| Token             | md3                          | md2                            |
| ----------------- | ---------------------------- | ------------------------------ |
| `duration-short`  | 100ms                        | 100ms                          |
| `duration-medium` | 300ms                        | 300ms (toggle: 200ms)          |
| `duration-long`   | 500ms                        | 500ms                          |
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Component transitions (button press, tab indicator, field label) read `var(--q-motion-*)`; `setStyle()` changes their timing with everything else. Unstyled sets durations to `0s`.

## Engine transitions

The nested engine's own `transition-*` utilities work as usual — the `q-transition--*` family is Quasar's naming for Vue hooks, `transition-colors` etc. is the engine's utility vocabulary.

Related: [Extraction & Safelisting](/architecture/extraction) · [Theming & Tokens](/core/theming)
