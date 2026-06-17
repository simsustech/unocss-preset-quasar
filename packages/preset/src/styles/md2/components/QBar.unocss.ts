import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-bar$/,
    mdComponent(
      'q-bar',
      `bg-black/20
    [&>.q-icon]:(ml-2px)
    [&>div]:(ml-8px)
    [&>div+.q-icon]:(ml-8px)
    [&>.q-btn]:(ml-2px)
    [&>.q-icon:first-child]:(ml-0)
    [&>.q-btn:first-child]:(ml-0)
    [&>div:first-child]:(ml-0)`
    )
  ],
  [
    /^q-bar--standard$/,
    mdComponent(
      'q-bar--standard',
      `px-12px py-0 h-32px text-18px
    [&>div]:(text-16px)
    [&_.q-btn]:(text-11px)`
    )
  ],
  [
    /^q-bar--dense$/,
    mdComponent(
      'q-bar--dense',
      `px-8px py-0 h-24px text-14px
    [&_.q-btn]:(text-8px)`
    )
  ],
  [/^q-bar--dark$/, mdStatic(`bg-white/20`)]
]

export { shortcuts }
