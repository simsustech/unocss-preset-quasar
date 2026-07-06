import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-splitter__panel$/,
    componentClass(
      'q-splitter__panel',
      `relative z-0 [&_>_.q-splitter]:(w-full h-full)`
    )
  ],

  [
    /^q-splitter__separator$/,
    componentClass(
      'q-splitter__separator',
      `bg-[rgba(0,_0,_0,_0.12)] select-none relative`
    )
  ],

  [
    /^q-splitter__separator-area$/,
    componentClass(
      'q-splitter__separator-area',
      `[&_>_*]:(absolute top-2/4 left-2/4 [transform:translate(-50%,-50%)])`
    )
  ],

  [
    /^q-splitter--dark$/,
    componentClass(
      'q-splitter--dark',
      qe`[&_.q-splitter__separator]:(bg-[rgba(255,_255,_255,_0.28)])`
    )
  ],

  [
    /^q-splitter--vertical$/,
    componentClass(
      'q-splitter--vertical',
      qe`[&_>_.q-splitter__panel]:(h-full) [&.q-splitter--active]:(cursor-col-resize) [&_>_.q-splitter__separator]:(w-px) [&_>_.q-splitter__separator_>_div]:(-left-[6px] -right-[6px]) [&.q-splitter--workable_>_.q-splitter__separator]:(cursor-col-resize)`
    )
  ],

  [
    /^q-splitter--horizontal$/,
    componentClass(
      'q-splitter--horizontal',
      qe`[&_>_.q-splitter__panel]:(w-full) [&.q-splitter--active]:(cursor-row-resize) [&_>_.q-splitter__separator]:(h-px) [&_>_.q-splitter__separator_>_div]:(-top-[6px] -bottom-[6px]) [&.q-splitter--workable_>_.q-splitter__separator]:(cursor-row-resize)`
    )
  ],

  [
    /^q-splitter__before$/,
    componentClass('q-splitter__before', `overflow-auto`)
  ],

  [/^q-splitter__after$/, componentClass('q-splitter__after', `overflow-auto`)]
]

export { shortcuts }
