import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-splitter__panel$/,
    mdComponent(
      'q-splitter__panel',
      `relative z-0 [&_>_.q-splitter]:(w-full h-full)`
    )
  ],

  [
    /^q-splitter__separator$/,
    mdComponent(
      'q-splitter__separator',
      `bg-[rgba(0,_0,_0,_0.12)] select-none relative`
    )
  ],

  [
    /^q-splitter__separator-area$/,
    mdComponent(
      'q-splitter__separator-area',
      `[&_>_*]:(absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2)`
    )
  ],

  [
    /^q-splitter--dark$/,
    mdComponent(
      'q-splitter--dark',
      `[&_.q-splitter\\_\\_separator]:(bg-[rgba(255,_255,_255,_0.28)])`
    )
  ],

  [
    /^q-splitter--vertical$/,
    mdComponent(
      'q-splitter--vertical',
      `[&_>_.q-splitter\\_\\_panel]:(h-full) [&.q-splitter--active]:(cursor-col-resize) [&_>_.q-splitter\\_\\_separator]:(w-px) [&_>_.q-splitter\\_\\_separator_>_div]:(-left-[6px] -right-[6px]) [&.q-splitter--workable_>_.q-splitter\\_\\_separator]:(cursor-col-resize)`
    )
  ],

  [
    /^q-splitter--horizontal$/,
    mdComponent(
      'q-splitter--horizontal',
      `[&_>_.q-splitter\\_\\_panel]:(w-full) [&.q-splitter--active]:(cursor-row-resize) [&_>_.q-splitter\\_\\_separator]:(h-px) [&_>_.q-splitter\\_\\_separator_>_div]:(-top-[6px] -bottom-[6px]) [&.q-splitter--workable_>_.q-splitter\\_\\_separator]:(cursor-row-resize)`
    )
  ],

  [/^q-splitter__before$/, mdComponent('q-splitter__before', `overflow-auto`)],

  [/^q-splitter__after$/, mdComponent('q-splitter__after', `overflow-auto`)]
]

export { shortcuts }
