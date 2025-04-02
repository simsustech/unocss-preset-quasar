import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-dialog-plugin$/,
    ([, c], { theme }) =>
      `w-[400px] [&_.q-card\\_\\_section_+_.q-card\\_\\_section]:(pt-0)`
  ],

  [/^q-dialog-plugin__form$/, ([, c], { theme }) => `max-h-[50vh]`],

  [/^q-dialog-plugin--progress$/, ([, c], { theme }) => `text-center`]
]

export { shortcuts }
