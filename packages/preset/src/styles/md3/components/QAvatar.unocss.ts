import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-avatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-avatar'] ??
      `relative align-middle inline-block rounded-[50%] text-[48px] h-[1em] w-[1em] [&_img:not(.q-icon):not(.q-img\\_\\_image)]:([border-radius:inherit] [height:inherit] [width:inherit])`
  ],

  [
    /^q-avatar__content$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-avatar__content'] ??
      `text-[0.5em] leading-[0.5em] [border-radius:inherit] [height:inherit] [width:inherit]`
  ],

  [/^q-avatar--square$/, ([, c], { theme }) => `rounded-none`]
]

export { shortcuts }
