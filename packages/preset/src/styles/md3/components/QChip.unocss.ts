import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

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
    mdComponent(
      'q-chip',
      `!flex-initial align-middle rounded-[0.5em] outline-[0] relative h-[2em] max-w-full m-[4px] 
      outline-solid outline-1px outline-$light-outline-variant dark:outline-$dark-outline-variant
      bg-$light-surface-container-low dark:bg-$dark-secondary-container
      text-$light-on-surface-variant dark:text-$dark-on-secondary-container
      text-[14px] px-[1em] py-[0.375em] 
      [&_.q-avatar]:(text-[2em] -ml-[0.45em] mr-[0.2em] rounded-$shape-corner-large)`
    )
  ],

  [
    /^q-chip--colored$/,
    mdComponent('q-chip--colored', `[&_.q-chip\\_\\_icon]:([color:inherit])`)
  ],

  [
    /^q-chip--dark$/,
    mdComponent('q-chip--dark', `[&_.q-chip\\_\\_icon]:([color:inherit])`)
  ],

  [
    /^q-chip--outline$/,
    mdComponent(
      'q-chip--outline',
      `!bg-transparent border-[1px] border-solid border-[currentColor]`
    )
  ],

  [
    /^q-chip--selected$/,
    mdComponent('q-chip--selected', `[&_.q-avatar]:(hidden)`)
  ],

  [
    /^q-chip__icon$/,
    mdComponent(
      'q-chip__icon',
      `text-$light-primary dark:text-$dark-primary text-[1.40625em] -m-[0.2em]`
    )
  ],

  [/^q-chip__icon--left$/, mdComponent('q-chip__icon--left', `mr-[0.5em]`)],

  [/^q-chip__icon--right$/, mdComponent('q-chip__icon--right', `ml-[0.5em]`)],

  [
    /^q-chip__icon--remove$/,
    mdComponent(
      'q-chip__icon--remove',
      `ml-[0.1em] -mr-[0.5em] opacity-60 outline-[0] [&:hover]:(opacity-100) [&:focus]:(opacity-100)`
    )
  ],

  [
    /^q-chip__content$/,
    mdComponent('q-chip__content', `whitespace-nowrap font-size-1.25em`)
  ],

  [
    /^q-chip--dense$/,
    mdComponent(
      'q-chip--dense',
      `rounded-$shape-corner-medium px-[0.4em] py-[0] h-[1.5em] [&_.q-avatar]:(text-[1.5em] -ml-[0.27em] mr-[0.1em] rounded-$shape-corner-medium) [&_.q-chip\\_\\_icon]:(text-[1.25em]) [&_.q-chip\\_\\_icon--left]:(mr-[0.195em]) [&_.q-chip\\_\\_icon--remove]:(-mr-[0.25em])`
    )
  ],

  [
    /^q-chip--square$/,
    mdComponent(
      'q-chip--square',
      `rounded-$shape-corner-small [&_.q-avatar]:(rounded-tl-[3px] rounded-br-[0] rounded-tr-[0] rounded-bl-[3px])`
    )
  ]
]

export { preflights, shortcuts }
