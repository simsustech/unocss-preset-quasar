import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-ripple$/,
    ([, c], { theme }) =>
      `absolute top-0 left-0 w-full h-full [color:inherit] [border-radius:inherit] z-0 pointer-events-none overflow-hidden z-0`
  ],

  [
    /^q-ripple__inner$/,
    ([, c], { theme }) =>
      `absolute top-0 left-0 opacity-0 [color:inherit] rounded-[50%] bg-current pointer-events-none`
  ],

  [
    /^q-ripple__inner--enter$/,
    ([, c], { theme }) =>
      `[transition:transform_0.225s_cubic-bezier(0.4,_0,_0.2,_1),_opacity_0.1s_cubic-bezier(0.4,_0,_0.2,_1)]`
  ],

  [
    /^q-ripple__inner--leave$/,
    ([, c], { theme }) =>
      `[transition:opacity_0.25s_cubic-bezier(0.4,_0,_0.2,_1)]`
  ]
]

export { shortcuts }
