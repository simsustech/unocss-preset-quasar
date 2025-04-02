import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-icon$/,
    (
      [, c],
      { theme }
    ) => `lh-1 w-1em h-1em shrink-0 tracking-normal normal-case whitespace-nowrap break-normal 
  text-center relative box-content fill-current
  [&>svg]:(h-full w-full)
  [&>img]:(h-full w-full)
  [&:before]:(w-full h-full flex! items-center justify-center)
  [&:after]:(w-full h-full flex! items-center justify-center)
  select-none cursor-inherit text-inherit inline-flex items-center justify-center v-middle
  `
  ],
  // [
  //   /^(q-icon:before|q-icon:after)$/,
  //   ([, c], { theme }) => `w-full h-full flex! items-center justify-center`
  // ],
  [
    /^(material-icons|material-icons-outlined|material-icons-round|material-icons-sharp|material-symbols-outlined|material-symbols-rounded|material-symbols-sharp)$/,
    ([, c], { theme }) =>
      `select-none cursor-inherit text-inherit inline-flex items-center justify-center v-middle`
  ]
]

export { shortcuts }
