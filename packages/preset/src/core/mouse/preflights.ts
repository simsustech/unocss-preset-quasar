import type { Preflight } from '@unocss/core'

export const mousePreflight: Preflight = {
  getCSS: () => `[aria-busy=true] {
  cursor: progress;
}
[aria-controls] {
  cursor: pointer;
}
[aria-disabled=true] {
  cursor: default;
}

/*
 * Defined as a preflight instead of a rule because @unocss/preset-wind4's
 * "all" scope variant (scopeMatcher("all", " ")) consumes the all- prefix
 * of all-pointer-events, so a rule with that name never matches
 * (parseToken returns null). Emitting the class CSS here guarantees it is
 * always present, which QDialog's internal menu portal relies on.
 */
.all-pointer-events {
  pointer-events: all !important;
}`
}
