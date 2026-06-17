import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-rating$/, mdStatic(`text-[#ffeb3b] align-middle`)],

  [
    /^q-rating__icon-container$/,
    mdComponent(
      'q-rating__icon-container',
      `h-[1em] outline-0 [&_+_.q-rating\\_\\_icon-container]:(ml-[2px])`
    )
  ],

  [
    /^q-rating__icon$/,
    mdComponent(
      'q-rating__icon',
      `text-current [text-shadow:0_1px_3px_rgba(0,_0,_0,_0.12),_0_1px_2px_rgba(0,_0,_0,_0.24)] relative opacity-40 [transition:transform_0.2s_ease-in,_opacity_0.2s_ease-in]`
    )
  ],

  [/^q-rating__icon--hovered$/, mdStatic(`scale-[1.3]`)],

  [/^q-rating__icon--active$/, mdStatic(`opacity-100`)],

  [/^q-rating__icon--exselected$/, mdStatic(`opacity-70`)],

  [
    /^q-rating--no-dimming$/,
    mdComponent('q-rating--no-dimming', `[&_.q-rating\\_\\_icon]:(opacity-100)`)
  ],

  [
    /^q-rating--editable$/,
    mdComponent(
      'q-rating--editable',
      `[&_.q-rating\\_\\_icon-container]:(cursor-pointer)`
    )
  ]
]

export { shortcuts }
