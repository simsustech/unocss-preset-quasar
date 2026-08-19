import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
[aria-busy=true] {
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
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^non-selectable$/, ([, c], { theme }) => `!select-none`],

  [/^scroll$/, ([, c], { theme }) => `overflow-auto`],

  [/^scroll-x$/, ([, c], { theme }) => `overflow-x-auto`],

  [/^scroll-y$/, ([, c], { theme }) => `overflow-y-auto`],

  [/^no-scroll$/, ([, c], { theme }) => `!overflow-hidden`],

  [/^no-pointer-events$/, ([, c], { theme }) => `!pointer-events-none`],

  [
    /^no-pointer-events--children$/,
    ([, c], { theme }) => `!pointer-events-none [&_*]:(!pointer-events-none)`
  ],

  [/^cursor-inherit$/, ([, c], { theme }) => `[cursor:inherit!important]`],

  ['cursor-pointer', 'cursor-[pointer]!']
]

const rules: Rule<QuasarTheme>[] = [
  [
    'pointer-events-all',
    {
      'pointer-events': 'all !important'
    }
  ]
]

export { preflights, shortcuts, rules }
