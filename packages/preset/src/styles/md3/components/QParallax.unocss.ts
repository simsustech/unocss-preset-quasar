import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-parallax$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-parallax'] ??
      `relative w-full overflow-hidden [border-radius:inherit]`
  ],

  [
    /^q-parallax__media$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-parallax__media'] ??
      `[&_>_img]:(absolute left-2/4 bottom-0 min-w-full min-h-full hidden) [&_>_video]:(absolute left-2/4 bottom-0 min-w-full min-h-full hidden)`
  ]
]

export { shortcuts }
