import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-menu$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-menu'] ??
      `bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface dark:text-dark-on-surface
      !fixed inline-block max-w-[95vw] max-h-[65vh] [box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] overflow-y-auto overflow-x-hidden outline-0 z-${theme.quasar.z['menu']}`
  ],

  [/^q-menu--square$/, ([, c], { theme }) => `rounded-none`],

  [
    /^q-menu--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-menu--dark'] ??
      `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)]`
  ]
]

export { shortcuts }
