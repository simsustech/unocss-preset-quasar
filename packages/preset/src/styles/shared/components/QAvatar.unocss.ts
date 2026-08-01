import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-avatar$/,
    componentClass(
      'q-avatar',
      qe`relative align-middle inline-flex items-center justify-center rounded-[50%] text-[48px] h-[1em] w-[1em] [&_img:not(.q-icon):not(.q-img__image)]:([border-radius:inherit] [height:inherit] [width:inherit])`
    )
  ],

  [
    /^q-avatar__content$/,
    componentClass(
      'q-avatar__content',
      `text-[0.5em] leading-[0.5em] [border-radius:inherit] [height:inherit] [width:inherit]`
    )
  ],

  [/^q-avatar--square$/, staticClass(`rounded-none`)]
]

export { shortcuts }
