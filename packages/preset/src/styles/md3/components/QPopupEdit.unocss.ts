import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-popup-edit$/, mdStatic(`px-[16px] py-[8px]`)],

  [
    /^q-popup-edit__buttons$/,
    mdComponent(
      'q-popup-edit__buttons',
      `mt-[8px] [&_.q-btn_+_.q-btn]:(ml-[8px])`
    )
  ]
]

export { shortcuts }
