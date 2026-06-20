import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-dialog-plugin$/,
    ([, c], { theme }) =>
      `w-[400px] [&_.q-card__section_+_.q-card__section]:(pt-0)`
  ],

  [/^q-dialog-plugin__form$/, ([, c], { theme }) => `max-h-[50vh]`],

  [/^q-dialog-plugin--progress$/, ([, c], { theme }) => `text-center`]
]

export { shortcuts }
