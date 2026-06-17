import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-img$/,
    mdComponent(
      'q-img',
      `relative w-full inline-block align-middle overflow-hidden`
    )
  ],

  [/^q-img__loading$/, mdStatic(`[&_.q-spinner]:(text-[50px])`)],

  [
    /^q-img__container$/,
    mdComponent('q-img__container', `[border-radius:inherit] text-[0]`)
  ],

  [
    /^q-img__image$/,
    mdComponent(
      'q-img__image',
      `[border-radius:inherit] w-full h-full opacity-0`
    )
  ],

  [
    /^q-img__image--with-transition$/,
    mdComponent(
      'q-img__image--with-transition',
      `[transition:opacity_0.28s_ease-in]`
    )
  ],

  [/^q-img__image--loaded$/, mdStatic(`opacity-100`)],

  [
    /^q-img__content$/,
    mdComponent(
      'q-img__content',
      `[border-radius:inherit] pointer-events-none [&_>_div]:(pointer-events-all absolute p-[16px] text-[#fff] bg-[rgba(0,_0,_0,_0.47)])`
    )
  ],

  [
    /^q-img--no-menu$/,
    mdComponent(
      'q-img--no-menu',
      `[&_.q-img\\_\\_image]:(pointer-events-none) [&_.q-img\\_\\_placeholder]:(pointer-events-none)`
    )
  ]
]

export { shortcuts }
