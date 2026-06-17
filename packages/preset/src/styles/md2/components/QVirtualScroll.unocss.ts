import type { Preflight, Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-virtual-scroll:focus$/, mdStatic(`focus:outline-0`)],

  [
    /^q-virtual-scroll__content$/,
    mdComponent(
      'q-virtual-scroll__content',
      `outline-[none] [&_>_*]:([overflow-anchor:none]) [&_>_[data-q-vs-anchor]]:([overflow-anchor:auto])`
    )
  ],

  [
    /^q-virtual-scroll__padding$/,
    mdComponent(
      'q-virtual-scroll__padding',
      `bg-[linear-gradient(_rgba(255,_255,_255,_0),_rgba(255,_255,_255,_0)_20%,_rgba(128,_128,_128,_0.03)_20%,_rgba(128,_128,_128,_0.08)_50%,_rgba(128,_128,_128,_0.03)_80%,_rgba(255,_255,_255,_0)_80%,_rgba(255,_255,_255,_0)_)] [background-size:var(--q-virtual-scroll-item-width,_100%)_var(--q-virtual-scroll-item-height,_50px)]`
    )
  ],

  [
    /^q-virtual-scroll--horizontal$/,
    mdComponent(
      'q-virtual-scroll--horizontal',
      `flex flex-row flex-nowrap items-stretch [&_.q-virtual-scroll\\_\\_content]:(flex flex-row flex-nowrap) [&_.q-virtual-scroll\\_\\_padding]:(flex-[0_0_auto]) [&_.q-virtual-scroll\\_\\_content]:(flex-[0_0_auto]) [&_.q-virtual-scroll\\_\\_content_>_*]:(flex-[0_0_auto]) [&_.q-virtual-scroll\\_\\_padding]:(bg-[linear-gradient(_to_left,_rgba(255,_255,_255,_0),_rgba(255,_255,_255,_0)_20%,_rgba(128,_128,_128,_0.03)_20%,_rgba(128,_128,_128,_0.08)_50%,_rgba(128,_128,_128,_0.03)_80%,_rgba(255,_255,_255,_0)_80%,_rgba(255,_255,_255,_0)_)] [background-size:var(--q-virtual-scroll-item-width,_50px)_var(--q-virtual-scroll-item-height,_100%)])`
    )
  ]
]

export { shortcuts }
