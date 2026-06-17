import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-toolbar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toolbar'] ??
      `relative px-[12px] py-[0] min-h-[50px] [&_.q-avatar]:(text-[38px])
      `
    // w-full
  ],

  [/^q-toolbar--inset$/, mdStatic(`pl-[58px]`)],

  [
    /^q-toolbar__title$/,
    mdComponent(
      'q-toolbar__title',
      `flex-initial min-w-[1px] max-w-full text-[21px] font-normal tracking-[0.01em] px-[12px] py-[0] [&:first-child]:(pl-0) [&:last-child]:(pr-0)`
    )
  ]
]

export { shortcuts }
