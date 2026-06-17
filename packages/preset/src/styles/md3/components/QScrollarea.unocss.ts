import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-scrollarea$/, mdStatic(`relative [contain:strict]`)],

  [
    /^q-scrollarea__bar$/,
    mdComponent('q-scrollarea__bar', `opacity-20 [transition:opacity_0.3s]`)
  ],

  [
    /^q-scrollarea__thumb$/,
    mdComponent(
      'q-scrollarea__thumb',
      `opacity-20 [transition:opacity_0.3s] bg-[#000] rounded-[3px]`
    )
  ],

  [/^q-scrollarea__bar--v$/, mdStatic(`right-0 w-[10px]`)],

  [/^q-scrollarea__thumb--v$/, mdStatic(`right-0 w-[10px]`)],

  [/^q-scrollarea__bar--h$/, mdStatic(`bottom-0 h-[10px]`)],

  [/^q-scrollarea__thumb--h$/, mdStatic(`bottom-0 h-[10px]`)],

  [
    /^q-scrollarea__bar--invisible$/,
    mdComponent(
      'q-scrollarea__bar--invisible',
      `!opacity-0 pointer-events-none`
    )
  ],

  [
    /^q-scrollarea__thumb--invisible$/,
    mdComponent(
      'q-scrollarea__thumb--invisible',
      `!opacity-0 pointer-events-none`
    )
  ],

  [/^q-scrollarea__thumb:hover$/, mdStatic(`hover:opacity-30`)],

  [/^q-scrollarea__thumb:active$/, mdStatic(`active:opacity-50`)],

  [/^q-scrollarea__content$/, mdStatic(`min-h-full w-full`)],

  [
    /^q-scrollarea--dark$/,
    mdComponent(
      'q-scrollarea--dark',
      `[&_.q-scrollarea\\_\\_thumb]:(bg-[#fff])`
    )
  ]
]

export { shortcuts }
