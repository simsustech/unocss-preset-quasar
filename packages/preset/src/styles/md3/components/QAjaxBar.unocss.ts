import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-loading-bar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-loading-bar'] ??
      `fixed z-${theme.quasar.z['max']} transition-transform bg-red`
  ],
  [/^q-loading-bar--top$/, ([, c], { theme }) => `left-0 right-0 top-0 w-full`],
  [
    /^q-loading-bar--bottom$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-loading-bar--bottom'] ??
      `left-0 right-0 bottom-0 w-full`
  ],
  [
    /^q-loading-bar--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-loading-bar--right'] ??
      `top-0 bottom-0 right-0 h-full`
  ],
  [
    /^q-loading-bar--left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-loading-bar--left'] ??
      `top-0 bottom-0 left-0 h-full`
  ]
]

export { shortcuts }
