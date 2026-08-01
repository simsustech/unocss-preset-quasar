import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-rating$/, staticClass(`text-[#ffeb3b] align-middle`)],

  [
    /^q-rating__icon-container$/,
    componentClass(
      'q-rating__icon-container',
      qe`h-[1em] outline-0 [&_+_.q-rating__icon-container]:(ml-[2px])`
    )
  ],

  [
    /^q-rating__icon$/,
    componentClass(
      'q-rating__icon',
      `text-current [text-shadow:0_1px_3px_rgba(0,_0,_0,_0.12),_0_1px_2px_rgba(0,_0,_0,_0.24)] relative opacity-40 [transition:transform_0.2s_ease-in,_opacity_0.2s_ease-in]`
    )
  ],

  [/^q-rating__icon--hovered$/, staticClass(`scale-[1.3]`)],

  [/^q-rating__icon--active$/, staticClass(`opacity-100`)],

  [/^q-rating__icon--exselected$/, staticClass(`opacity-70`)],

  [
    /^q-rating--no-dimming$/,
    componentClass(
      'q-rating--no-dimming',
      qe`[&_.q-rating__icon]:(opacity-100)`
    )
  ],

  [
    /^q-rating--editable$/,
    componentClass(
      'q-rating--editable',
      qe`[&_.q-rating__icon-container]:(cursor-pointer)`
    )
  ]
]

export { shortcuts }
