import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-toolbar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toolbar'] ??
      `relative min-h-[50px] [&_.q-avatar]:(text-[38px])`
  ],

  [/^q-toolbar--inset$/, staticClass(`pl-[58px]`)],

  [
    /^q-toolbar__title$/,
    componentClass(
      'q-toolbar__title',
      `flex-initial min-w-[1px] max-w-full px-[12px] py-[0] [&:first-child]:(pl-0) [&:last-child]:(pr-0)`
    )
  ]
]

export { shortcuts }
