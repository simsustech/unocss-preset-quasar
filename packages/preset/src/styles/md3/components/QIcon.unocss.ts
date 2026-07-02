import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-icon$/,
    (
      [, c],
      { theme }
    ) => `relative inline-flex lh-1 w-1em h-1em shrink-0 tracking-normal normal-case whitespace-nowrap break-normal 
  overflow-visible
  select-none cursor-inherit text-inherit items-center justify-center v-middle
  `
  ],
  [
    /^(material-icons|material-icons-outlined|material-icons-round|material-icons-sharp|material-symbols-outlined|material-symbols-rounded|material-symbols-sharp)$/,
    ([, c], { theme }) =>
      `select-none cursor-inherit text-inherit inline-flex items-center justify-center v-middle`
  ]
]

export { shortcuts }
