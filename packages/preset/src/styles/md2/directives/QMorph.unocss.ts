import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-morph--invisible$/,
    ([, c], { theme }) =>
      `!opacity-0 !pointer-events-none !fixed !right-[200vw] !bottom-[200vh]`
  ],

  [
    /^q-morph--internal$/,
    ([, c], { theme }) =>
      `!opacity-0 !pointer-events-none !fixed !right-[200vw] !bottom-[200vh]`
  ]
]

export { shortcuts }
