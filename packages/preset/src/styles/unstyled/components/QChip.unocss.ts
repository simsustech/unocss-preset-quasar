import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => ``
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-chip$/,
    componentClass(
      'q-chip',
      `!flex-initial align-middle relative h-[32px] max-w-full m-[4px] 
      [&_.q-avatar]:(text-[2em] -ml-[0.45em] mr-[0.2em])`
    )
  ],

  [/^q-chip--colored$/, componentClass('q-chip--colored', ``)],

  [/^q-chip--dark$/, componentClass('q-chip--dark', ``)],

  [/^q-chip--outline$/, componentClass('q-chip--outline', ``)],

  [
    /^q-chip--selected$/,
    componentClass('q-chip--selected', `[&_.q-avatar]:(hidden)`)
  ],

  [
    /^q-chip__icon$/,
    componentClass('q-chip__icon', `text-[1.40625em] -m-[0.2em]`)
  ],

  [/^q-chip__icon--left$/, componentClass('q-chip__icon--left', `mr-[0.5em]`)],

  [
    /^q-chip__icon--right$/,
    componentClass('q-chip__icon--right', `ml-[0.5em]`)
  ],

  [
    /^q-chip__icon--remove$/,
    componentClass(
      'q-chip__icon--remove',
      `ml-[0.1em] -mr-[0.5em] opacity-60 outline-[0] [&:hover]:(opacity-100) [&:focus]:(opacity-100)`
    )
  ],

  [/^q-chip__content$/, componentClass('q-chip__content', `whitespace-nowrap`)],

  [
    /^q-chip--dense$/,
    componentClass(
      'q-chip--dense',
      qe`px-[0.4em] py-[0] h-[1.5em] [&_.q-avatar]:(text-[1.5em] -ml-[0.27em] mr-[0.1em]) [&_.q-chip__icon]:(text-[1.25em]) [&_.q-chip__icon--left]:(mr-[0.195em]) [&_.q-chip__icon--remove]:(-mr-[0.25em])`
    )
  ],

  [/^q-chip--square$/, componentClass('q-chip--square', ``)]
]

export { preflights, shortcuts }
