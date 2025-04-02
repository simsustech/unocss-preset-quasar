import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `

`
  }
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-toggle$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle'] ??
      `align-middle [&.disabled]:(!opacity-75)
      [&:not(.disabled)_.q-toggle\\_\\_thumb:before]:(absolute content-[''] top-0 left-0 right-0 bottom-0 bg-current border-rd-[50%] transform-scale-z-1 op-12)
      [&:not(.disabled):focus_.q-toggle\\_\\_thumb:before]:(scale-200)
      [&:not(.disabled):hover_.q-toggle\\_\\_thumb:before]:(scale-200)`
  ],

  [
    /^q-toggle__native$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle__native'] ?? `w-px h-px`
  ],

  [
    /^q-toggle__track$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle__track'] ??
      `outline-solid outline-2px outline-light-outline dark:outline-dark-outline !rounded-full h-[2em] w-[3.25em] bg-light-surface-container dark:bg-dark-surface-container`
  ],

  [
    /^q-toggle__thumb$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle__thumb'] ??
      `top-[0.5625em] left-[0.5625em] w-[1.5em] h-[1.5em] [transition:left_0.22s_cubic-bezier(0.4,_0,_0.2,_1)] select-none z-0 
    [&:before]:()
    [&:after]:(content-[''] bg-light-outline dark:bg-dark-outline absolute top-[0] right-[0] bottom-[0] left-[0] rounded-[50%] [box-shadow:0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)]) 
    [&_.q-icon]:(layer-components:text-[0.3em] min-w-[1em] layer-components:text-[#000] opacity-[0.54])`
  ],

  [
    /^q-toggle__inner$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle__inner'] ??
      `text-[1.25em] w-[1.4em] min-w-[1.4em] max-h-[1em] px-[0.3em] py-[0.325em]`
  ],

  [
    /^q-toggle__inner--indet$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle__inner--indet'] ??
      `[&_.q-toggle\\_\\_thumb]:(left-[0.45em])`
  ],

  [
    /^q-toggle__inner--truthy$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle__inner--truthy'] ??
      `[&_.q-toggle\\_\\_track]:(bg-light-primary dark:bg-dark-primary) 
      [&_.q-toggle\\_\\_thumb]:(left-[1.625em] top-[0.45em] w-[1.75em] h-[1.75em])
      [&_.q-toggle\\_\\_thumb:after]:(!bg-light-on-primary dark:!bg-dark-on-primary)
      [&_.q-toggle\\_\\_thumb_.q-icon]:(layer-components:text-[#fff] opacity-100)
      [&:not(.disabled):focus_.q-toggle\\_\\_thumb:before]:(scale-200)
      [&:not(.disabled):hover_.q-toggle\\_\\_thumb:before]:(scale-200)`
  ],

  [
    /^q-toggle--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle--dark'] ??
      `[&_.q-toggle\\_\\_inner--truthy]:() [&_.q-toggle\\_\\_thumb:after]:([box-shadow:none]) [&_.q-toggle\\_\\_thumb:before]:(!opacity-[0.32])`
    // [&_.q-toggle\\_\\_inner]:(layer-components:text-[#fff])
  ],

  [
    /^q-toggle--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-toggle--dense'] ??
      `[&_.q-toggle\\_\\_inner]:(w-[0.8em] min-w-[0.8em] h-[0.5em] px-[0] py-[0.07625em]) [&_.q-toggle\\_\\_thumb]:(top-[0] left-[0]) [&_.q-toggle\\_\\_inner--indet_.q-toggle\\_\\_thumb]:(left-[0.15em]) [&_.q-toggle\\_\\_inner--truthy_.q-toggle\\_\\_thumb]:(left-[0.3em]) [&_.q-toggle\\_\\_label]:(pl-[0.5em]) [&.reverse_.q-toggle\\_\\_label]:(pl-0 pr-[0.5em])`
  ]
]

export { preflights, shortcuts }
