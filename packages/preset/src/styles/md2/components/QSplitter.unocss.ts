import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-splitter__panel$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter__panel'] ??
      `relative z-0 [&_>_.q-splitter]:(w-full h-full)`
  ],

  [
    /^q-splitter__separator$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter__separator'] ??
      `bg-[rgba(0,_0,_0,_0.12)] select-none relative`
  ],

  [
    /^q-splitter__separator-area$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter__separator-area'] ??
      `[&_>_*]:(absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2)`
  ],

  [
    /^q-splitter--dark$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter--dark'] ??
      `[&_.q-splitter\\_\\_separator]:(bg-[rgba(255,_255,_255,_0.28)])`
  ],

  [
    /^q-splitter--vertical$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter--vertical'] ??
      `[&_>_.q-splitter\\_\\_panel]:(h-full) [&.q-splitter--active]:(cursor-col-resize) [&_>_.q-splitter\\_\\_separator]:(w-px) [&_>_.q-splitter\\_\\_separator_>_div]:(-left-[6px] -right-[6px]) [&.q-splitter--workable_>_.q-splitter\\_\\_separator]:(cursor-col-resize)`
  ],

  [
    /^q-splitter--horizontal$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter--horizontal'] ??
      `[&_>_.q-splitter\\_\\_panel]:(w-full) [&.q-splitter--active]:(cursor-row-resize) [&_>_.q-splitter\\_\\_separator]:(h-px) [&_>_.q-splitter\\_\\_separator_>_div]:(-top-[6px] -bottom-[6px]) [&.q-splitter--workable_>_.q-splitter\\_\\_separator]:(cursor-row-resize)`
  ],

  [
    /^q-splitter__before$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter__before'] ?? `overflow-auto`
  ],

  [
    /^q-splitter__after$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-splitter__after'] ?? `overflow-auto`
  ]
]

export { shortcuts }
