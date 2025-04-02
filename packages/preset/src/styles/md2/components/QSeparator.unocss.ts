import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-separator'] ??
      `border-0 bg-[rgba(0,_0,_0,_0.12)] m-0 [transition:background_0.3s,_opacity_0.3s] flex-shrink-0`
  ],

  [
    /^q-separator--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-separator--dark'] ??
      `bg-[rgba(255,_255,_255,_0.28)]`
  ],

  [/^q-separator--horizontal$/, ([, c], { theme }) => `block h-px`],

  [
    /^q-separator--horizontal-inset$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-separator--horizontal-inset'] ??
      `ml-[16px] mr-[16px]`
  ],

  [
    /^q-separator--horizontal-item-inset$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-separator--horizontal-item-inset'] ??
      `ml-[72px] mr-0`
  ],

  [
    /^q-separator--horizontal-item-thumbnail-inset$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.[
        'q-separator--horizontal-item-thumbnail-inset'
      ] ?? `ml-[116px] mr-0`
  ],

  [/^q-separator--vertical$/, ([, c], { theme }) => `w-px h-auto self-stretch`],

  [/^q-separator--vertical-inset$/, ([, c], { theme }) => `mt-[8px] mb-[8px]`]
]

export { shortcuts }
