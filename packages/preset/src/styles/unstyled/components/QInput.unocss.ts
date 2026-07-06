import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-textarea$/,
    componentClass(
      'q-textarea',
      qe`[&_.q-field__control]:(min-h-[56px] h-auto) 
       [&_.q-field__control-container]:(pt-[2px] pb-[2px]) 
       [&_.q-field__shadow]:(top-[2px] bottom-[2px]) 
       [&_.q-field__native]:(leading-[18px]) 
       [&_.q-field__prefix]:(leading-[18px]) 
       [&_.q-field__suffix]:(leading-[18px]) 
       [&_.q-field__native]:(resize-y pt-[17px] min-h-[52px]) 
       [&.q-field--labeled_.q-field__control-container]:(pt-[26px]) 
       [&.q-field--labeled_.q-field__shadow]:(top-[26px]) 
       [&.q-field--labeled_.q-field__native]:(pt-0) 
       [&.q-field--labeled_.q-field__prefix]:(pt-0) 
       [&.q-field--labeled_.q-field__suffix]:(pt-0) 
       [&.q-field--labeled_.q-field__native]:(min-h-[26px] pt-px) 
       [&.q-field--dense_.q-field__control]:(min-h-[36px]) 
       [&.q-field--dense_.q-field__native]:(min-h-[36px]) 
       [&.q-field--dense_.q-field__native]:(pt-[9px]) 
       [&.q-field--dense.q-field--labeled_.q-field__control-container]:(pt-[14px]) 
       [&.q-field--dense.q-field--labeled_.q-field__shadow]:(top-[14px]) 
       [&.q-field--dense.q-field--labeled_.q-field__native]:(min-h-[24px] pt-[3px]) 
       [&.q-field--dense.q-field--labeled_.q-field__prefix]:(pt-[2px]) 
       [&.q-field--dense.q-field--labeled_.q-field__suffix]:(pt-[2px]) 
       [&.disabled_.q-field__native]:(resize-none)`
    )
  ],

  [
    /^q-textarea--autogrow$/,
    componentClass(
      'q-textarea--autogrow',
      qe`[&_.q-field__native]:(resize-none)`
    )
  ]
]

export { shortcuts }
