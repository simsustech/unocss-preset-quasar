import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-scrollarea$/, staticClass(`relative [contain:strict]`)],

  [
    /^q-scrollarea__bar$/,
    componentClass('q-scrollarea__bar', `opacity-20 [transition:opacity_0.3s]`)
  ],

  [
    /^q-scrollarea__thumb$/,
    componentClass(
      'q-scrollarea__thumb',
      `opacity-20 [transition:opacity_0.3s] bg-[#000] rounded-[3px]`
    )
  ],

  [/^q-scrollarea__bar--v$/, staticClass(`right-0 w-[10px]`)],

  [/^q-scrollarea__thumb--v$/, staticClass(`right-0 w-[10px]`)],

  [/^q-scrollarea__bar--h$/, staticClass(`bottom-0 h-[10px]`)],

  [/^q-scrollarea__thumb--h$/, staticClass(`bottom-0 h-[10px]`)],

  [
    /^q-scrollarea__bar--invisible$/,
    componentClass(
      'q-scrollarea__bar--invisible',
      `!opacity-0 pointer-events-none`
    )
  ],

  [
    /^q-scrollarea__thumb--invisible$/,
    componentClass(
      'q-scrollarea__thumb--invisible',
      `!opacity-0 pointer-events-none`
    )
  ],

  [/^q-scrollarea__thumb:hover$/, staticClass(`hover:opacity-30`)],

  [/^q-scrollarea__thumb:active$/, staticClass(`active:opacity-50`)],

  [/^q-scrollarea__content$/, staticClass(`min-h-full w-full`)],

  [
    /^q-scrollarea--dark$/,
    componentClass(
      'q-scrollarea--dark',
      qe`[&_.q-scrollarea__thumb]:(bg-[#fff])`
    )
  ]
]

export { shortcuts }
