import type { Preflight } from '@unocss/core'

/**
 * Animate.css-style animation helpers, mirroring quasar.css.
 * The `.animated.*` modifiers are multi-class selectors rendered by
 * consumers directly, so they live here as a static preflight.
 */
export const transitionsPreflights: Preflight[] = [
  {
    getCSS: () => `:root {
  --animate-duration: 0.3s;
  --animate-delay: 0.3s;
  --animate-repeat: 1;
}
.animated {
  animation-duration: var(--animate-duration);
  animation-fill-mode: both;
}
.animated.infinite {
  animation-iteration-count: infinite;
}
.animated.hinge {
  animation-duration: 2s;
}
.animated.repeat-1 {
  animation-iteration-count: var(--animate-repeat);
}
.animated.repeat-2 {
  animation-iteration-count: calc(var(--animate-repeat) * 2);
}
.animated.repeat-3 {
  animation-iteration-count: calc(var(--animate-repeat) * 3);
}
.animated.delay-1s {
  animation-delay: var(--animate-delay);
}
.animated.delay-2s {
  animation-delay: calc(var(--animate-delay) * 2);
}
.animated.delay-3s {
  animation-delay: calc(var(--animate-delay) * 3);
}
.animated.delay-4s {
  animation-delay: calc(var(--animate-delay) * 4);
}
.animated.delay-5s {
  animation-delay: calc(var(--animate-delay) * 5);
}
.animated.fast {
  animation-duration: calc(var(--animate-duration) * 0.8);
}
.animated.faster {
  animation-duration: calc(var(--animate-duration) / 2);
}
.animated.slow {
  animation-duration: calc(var(--animate-duration) * 2);
}
.animated.slower {
  animation-duration: calc(var(--animate-duration) * 3);
}`
  }
]
