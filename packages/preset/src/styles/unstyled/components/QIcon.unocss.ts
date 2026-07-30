import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-icon$/,
    ([, c], { theme }) => `w-1em h-1em shrink-0 whitespace-nowrap break-normal 
  text-center relative box-content
  [&>svg]:(h-full w-full)
  [&>img]:(h-full w-full)
  [&:before]:(w-full h-full flex! items-center justify-center)
  [&:after]:(w-full h-full flex! items-center justify-center)
  select-none cursor-inherit inline-flex items-center justify-center v-middle
  `
  ],
  [
    /^(material-icons|material-icons-outlined|material-icons-round|material-icons-sharp|material-symbols-outlined|material-symbols-rounded|material-symbols-sharp)$/,
    ([, c], { theme }) =>
      `select-none cursor-inherit inline-flex items-center justify-center v-middle`
  ]
]

export { shortcuts }
