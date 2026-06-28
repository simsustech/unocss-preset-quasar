import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.desktop .q-chip--clickable:focus {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
body.desktop.body--dark .q-chip--clickable:focus {
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.14), 0 2px 1px -1px rgba(255, 255, 255, 0.12);
}
`
  }
]

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-chip$/,
    componentClass(
      'q-chip',
      `!flex-initial align-middle rounded-$shape-corner-small outline-[0] relative h-[32px] max-w-full m-[4px] 
      outline-solid outline-1px outline-$light-outline dark:outline-$dark-outline
      bg-$light-surface-container-low dark:bg-$dark-secondary-container
      text-$light-on-surface-variant dark:text-$dark-on-secondary-container
      text-[14px] leading-[20px] font-500 px-[12px] py-[0]
      [&_.q-avatar]:(text-[2em] -ml-[0.45em] mr-[0.2em] rounded-tl-[3px] rounded-br-[0] rounded-tr-[0] rounded-bl-[3px])`
    )
  ],

  [
    /^q-chip--colored$/,
    componentClass('q-chip--colored', qe`[&_.q-chip__icon]:([color:inherit])`)
  ],

  [
    /^q-chip--dark$/,
    componentClass('q-chip--dark', qe`[&_.q-chip__icon]:([color:inherit])`)
  ],

  [
    /^q-chip--outline$/,
    componentClass(
      'q-chip--outline',
      `!bg-transparent border-[1px] border-solid border-[currentColor]`
    )
  ],

  [
    /^q-chip--selected$/,
    componentClass('q-chip--selected', `[&_.q-avatar]:(hidden)`)
  ],

  [
    /^q-chip__icon$/,
    componentClass(
      'q-chip__icon',
      `text-$light-primary dark:text-$dark-primary text-[1.40625em] -m-[0.2em]`
    )
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

  [
    /^q-chip__content$/,
    componentClass('q-chip__content', `whitespace-nowrap font-size-1.25em`)
  ],

  [
    /^q-chip--dense$/,
    componentClass(
      'q-chip--dense',
      qe`rounded-$shape-corner-medium px-[0.4em] py-[0] h-[1.5em] [&_.q-avatar]:(text-[1.5em] -ml-[0.27em] mr-[0.1em] rounded-$shape-corner-medium) [&_.q-chip__icon]:(text-[1.25em]) [&_.q-chip__icon--left]:(mr-[0.195em]) [&_.q-chip__icon--remove]:(-mr-[0.25em])`
    )
  ],

  [
    /^q-chip--square$/,
    componentClass(
      'q-chip--square',
      `rounded-$shape-corner-small [&_.q-avatar]:(rounded-tl-[3px] rounded-br-[0] rounded-tr-[0] rounded-bl-[3px])`
    )
  ]
]

export { preflights, shortcuts }
