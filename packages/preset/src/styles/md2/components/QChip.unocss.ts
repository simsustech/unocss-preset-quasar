import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

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

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-chip$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip'] ??
      `!flex-initial align-middle rounded-[16px] outline-[0] relative h-[2em] max-w-full m-[4px] bg-[#e0e0e0] text-[rgba(0,_0,_0,_0.87)] text-[14px] px-[0.9em] py-[0.5em] [&_.q-avatar]:(text-[2em] -ml-[0.45em] mr-[0.2em] rounded-[16px])`
  ],

  [
    /^q-chip--colored$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip--colored'] ??
      `[&_.q-chip\\_\\_icon]:([color:inherit])`
  ],

  [
    /^q-chip--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip--dark'] ??
      `[&_.q-chip\\_\\_icon]:([color:inherit])`
  ],

  [
    /^q-chip--outline$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip--outline'] ??
      `!bg-transparent border-[1px] border-solid border-[currentColor]`
  ],

  [
    /^q-chip--selected$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip--selected'] ?? `[&_.q-avatar]:(hidden)`
  ],

  [
    /^q-chip__icon$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip__icon'] ??
      `text-[rgba(0,_0,_0,_0.54)] text-[1.5em] -m-[0.2em]`
  ],

  [
    /^q-chip__icon--left$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip__icon--left'] ?? `mr-[0.2em]`
  ],

  [
    /^q-chip__icon--right$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip__icon--right'] ?? `ml-[0.2em]`
  ],

  [
    /^q-chip__icon--remove$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip__icon--remove'] ??
      `ml-[0.1em] -mr-[0.5em] opacity-60 outline-[0] [&:hover]:(opacity-100) [&:focus]:(opacity-100)`
  ],

  [/^q-chip__content$/, ([, c], { theme }) => `whitespace-nowrap`],

  [
    /^q-chip--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip--dense'] ??
      `rounded-[12px] px-[0.4em] py-[0] h-[1.5em] [&_.q-avatar]:(text-[1.5em] -ml-[0.27em] mr-[0.1em] rounded-[12px]) [&_.q-chip\\_\\_icon]:(text-[1.25em]) [&_.q-chip\\_\\_icon--left]:(mr-[0.195em]) [&_.q-chip\\_\\_icon--remove]:(-mr-[0.25em])`
  ],

  [
    /^q-chip--square$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-chip--square'] ??
      `rounded-[4px] [&_.q-avatar]:(rounded-tl-[3px] rounded-br-[0] rounded-tr-[0] rounded-bl-[3px])`
  ]
]

export { preflights, shortcuts }
