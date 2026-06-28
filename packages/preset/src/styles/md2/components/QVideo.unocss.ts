import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-video$/,
    componentClass(
      'q-video',
      `relative overflow-hidden [border-radius:inherit] [&_iframe]:(w-full h-full) [&_object]:(w-full h-full) [&_embed]:(w-full h-full)`
    )
  ],

  [
    /^q-video--responsive$/,
    componentClass(
      'q-video--responsive',
      `h-[0] [&_iframe]:(absolute top-0 left-0) [&_object]:(absolute top-0 left-0) [&_embed]:(absolute top-0 left-0)`
    )
  ]
]

export { shortcuts }
