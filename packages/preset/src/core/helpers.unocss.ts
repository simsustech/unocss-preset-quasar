import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.electron .q-electron-drag {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
body.electron .q-electron-drag .q-btn-item, body.electron .q-electron-drag--exception {
  -webkit-app-region: no-drag;
}

img.responsive {
  max-width: 100%;
  height: auto;
}`
  }
]

const rules: Rule<QuasarTheme>[] = [
  [
    /^content-empty$/,
    function* ([, color]) {
      yield {
        content: '""'
      }
    }
  ]
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^rounded-borders$/, ([, c], { theme }) => `rounded-[4px]`],

  [/^border-radius-inherit$/, ([, c], { theme }) => `[border-radius:inherit]`],

  [/^no-transition$/, ([, c], { theme }) => `transition-none`],

  [/^transition-0$/, ([, c], { theme }) => `[transition:0s!important]`],

  [
    /^glossy$/,
    ([, c], { theme }) =>
      `!bg-[linear-gradient(_to_bottom,_rgba(255,_255,_255,_0.3),_rgba(255,_255,_255,_0)_50%,_rgba(0,_0,_0,_0.12)_51%,_rgba(0,_0,_0,_0.04)_)]`
  ],

  [
    /^q-placeholder::placeholder$/,
    ([, c], { theme }) => `[color:inherit] opacity-70`
  ],

  [/^q-body--fullscreen-mixin$/, ([, c], { theme }) => `!fixed`],

  [/^q-body--prevent-scroll$/, ([, c], { theme }) => `!fixed`],

  [/^q-body--force-scrollbar-x$/, ([, c], { theme }) => `overflow-x-scroll`],

  [/^q-body--force-scrollbar-y$/, ([, c], { theme }) => `overflow-y-scroll`],

  [/^q-no-input-spinner$/, ([, c], { theme }) => ``],

  [
    /^q-no-input-spinner::-webkit-outer-spin-button$/,
    ([, c], { theme }) => `m-0`
  ],

  [
    /^q-no-input-spinner::-webkit-inner-spin-button$/,
    ([, c], { theme }) => `m-0`
  ],

  [/^q-link$/, ([, c], { theme }) => `outline-0 no-underline`],

  [/^q-link--focusable:focus-visible$/, ([, c], { theme }) => ``]
]

export { rules, preflights, shortcuts }
