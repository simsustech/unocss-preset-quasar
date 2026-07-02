import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-img$/,
    componentClass(
      'q-img',
      `relative w-full inline-block align-middle overflow-hidden`
    )
  ],

  [/^q-img__loading$/, staticClass(`[&_.q-spinner]:(text-[50px])`)],

  [/^q-img__container$/, staticClass(`text-[0]`)],

  [
    /^q-img__image$/,
    componentClass(
      'q-img__image',
      `[border-radius:inherit] w-full h-full opacity-0`
    )
  ],

  [
    /^q-img__image--with-transition$/,
    componentClass(
      'q-img__image--with-transition',
      `[transition:opacity_0.28s_ease-in]`
    )
  ],

  [/^q-img__image--loaded$/, staticClass(`!opacity-100`)],

  [
    /^q-img__content$/,
    componentClass(
      'q-img__content',
      `pointer-events-none [&_>_div]:(pointer-events-all absolute p-[16px])`
    )
  ],

  [
    /^q-img--no-menu$/,
    componentClass(
      'q-img--no-menu',
      qe`[&_.q-img__image]:(pointer-events-none) [&_.q-img__placeholder]:(pointer-events-none)`
    )
  ]
]

export { shortcuts }
