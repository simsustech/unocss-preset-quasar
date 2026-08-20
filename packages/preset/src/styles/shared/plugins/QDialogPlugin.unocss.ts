import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-dialog-plugin$/,
    ([, c], { theme }) =>
      qe`min-w-[280px] [&_.q-card__section_+_.q-card__section]:(pt-0)
    `
  ],

  [/^q-dialog-plugin__form$/, ([, c], { theme }) => `max-h-[50vh]`],

  [/^q-dialog-plugin--progress$/, ([, c], { theme }) => `text-center`]
]

export { shortcuts }
