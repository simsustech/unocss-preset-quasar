import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-video$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-video'] ??
      `relative overflow-hidden [border-radius:inherit] [&_iframe]:(w-full h-full) [&_object]:(w-full h-full) [&_embed]:(w-full h-full)`
  ],

  [
    /^q-video--responsive$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-video--responsive'] ??
      `h-[0] [&_iframe]:(absolute top-0 left-0) [&_object]:(absolute top-0 left-0) [&_embed]:(absolute top-0 left-0)`
  ]
]

export { shortcuts }
