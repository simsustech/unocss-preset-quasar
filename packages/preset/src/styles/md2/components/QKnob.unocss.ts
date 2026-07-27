import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-knob$/, componentClass('q-knob', `text-[48px]`)],

  [
    /^q-knob--editable$/,
    componentClass(
      'q-knob--editable',
      `cursor-pointer outline-[0] [&_.q-knob__overlay]:(absolute top-[0] right-[0] bottom-[0] left-[0] rounded-[50%] [box-shadow:none] [transition:box-shadow_0.24s_ease-in-out]) [&:focus_.q-knob__overlay]:([box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)])`
    )
  ]
]

export { shortcuts }
