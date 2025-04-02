import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-tooltip--style$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tooltip--style'] ??
      `text-[10px] text-[#fafafa] bg-[#757575] rounded-[4px] normal-case font-normal`
  ],

  [
    /^q-tooltip$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-tooltip'] ??
      `z-${theme.quasar.z['tooltip']} !fixed overflow-y-auto overflow-x-hidden px-[10px] py-[6px] max-w-[95vw] max-h-[65vh] sm:(text-14px pt-8px pb-8px pl-16px pr-16px)`
  ]
]

export { shortcuts }
