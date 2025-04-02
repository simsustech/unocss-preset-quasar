import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-textarea$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-textarea'] ??
      `[&_.q-field\\_\\_control]:(min-h-[56px] h-auto) [&_.q-field\\_\\_control-container]:(pt-[2px] pb-[2px]) [&_.q-field\\_\\_shadow]:(top-[2px] bottom-[2px]) [&_.q-field\\_\\_native]:(leading-[18px]) [&_.q-field\\_\\_prefix]:(leading-[18px]) [&_.q-field\\_\\_suffix]:(leading-[18px]) [&_.q-field\\_\\_native]:(resize-y pt-[17px] min-h-[52px]) [&.q-field--labeled_.q-field\\_\\_control-container]:(pt-[26px]) [&.q-field--labeled_.q-field\\_\\_shadow]:(top-[26px]) [&.q-field--labeled_.q-field\\_\\_native]:(pt-0) [&.q-field--labeled_.q-field\\_\\_prefix]:(pt-0) [&.q-field--labeled_.q-field\\_\\_suffix]:(pt-0) [&.q-field--labeled_.q-field\\_\\_native]:(min-h-[26px] pt-px) [&.q-field--dense_.q-field\\_\\_control]:(min-h-[36px]) [&.q-field--dense_.q-field\\_\\_native]:(min-h-[36px]) [&.q-field--dense_.q-field\\_\\_native]:(pt-[9px]) [&.q-field--dense.q-field--labeled_.q-field\\_\\_control-container]:(pt-[14px]) [&.q-field--dense.q-field--labeled_.q-field\\_\\_shadow]:(top-[14px]) [&.q-field--dense.q-field--labeled_.q-field\\_\\_native]:(min-h-[24px] pt-[3px]) [&.q-field--dense.q-field--labeled_.q-field\\_\\_prefix]:(pt-[2px]) [&.q-field--dense.q-field--labeled_.q-field\\_\\_suffix]:(pt-[2px]) [&.disabled_.q-field\\_\\_native]:(resize-none)`
  ],

  [
    /^q-textarea--autogrow$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-textarea--autogrow'] ??
      `[&_.q-field\\_\\_native]:(resize-none)`
  ]
]

export { shortcuts }
