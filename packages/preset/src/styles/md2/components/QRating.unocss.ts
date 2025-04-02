import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-rating$/, ([, c], { theme }) => `text-[#ffeb3b] align-middle`],

  [
    /^q-rating__icon-container$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-rating__icon-container'] ??
      `h-[1em] outline-0 [&_+_.q-rating\\_\\_icon-container]:(ml-[2px])`
  ],

  [
    /^q-rating__icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-rating__icon'] ??
      `text-current [text-shadow:0_1px_3px_rgba(0,_0,_0,_0.12),_0_1px_2px_rgba(0,_0,_0,_0.24)] relative opacity-40 [transition:transform_0.2s_ease-in,_opacity_0.2s_ease-in]`
  ],

  [/^q-rating__icon--hovered$/, ([, c], { theme }) => `scale-[1.3]`],

  [/^q-rating__icon--active$/, ([, c], { theme }) => `opacity-100`],

  [/^q-rating__icon--exselected$/, ([, c], { theme }) => `opacity-70`],

  [
    /^q-rating--no-dimming$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-rating--no-dimming'] ??
      `[&_.q-rating\\_\\_icon]:(opacity-100)`
  ],

  [
    /^q-rating--editable$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-rating--editable'] ??
      `[&_.q-rating\\_\\_icon-container]:(cursor-pointer)`
  ]
]

export { shortcuts }
