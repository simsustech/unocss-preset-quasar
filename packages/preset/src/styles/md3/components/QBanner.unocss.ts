import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-banner$/,
    componentClass(
      'q-banner',
      `min-h-[54px] [padding-inline:var(--q-space-lg)] [padding-block:var(--q-space-sm)] bg-transparent`
    )
  ],

  [/^q-banner--top-padding$/, staticClass(`pt-[14px]`)],

  [
    /^q-banner__avatar$/,
    componentClass(
      'q-banner__avatar',
      qe`!self-auto !flex-initial !min-w-[1px] [&_>_.q-avatar]:(text-[46px]) [&_>_.q-icon]:(text-[40px]) [&:not(:empty)_+_.q-banner__content]:(pl-[16px])`
    )
  ],

  [
    /^q-banner__content$/,
    componentClass('q-banner__content', `max-w-[calc(100%-56px)]`)
  ],

  [
    /^q-banner__actions$/,
    componentClass(
      'q-banner__actions',
      `[&.col-auto]:(pl-[16px]) [&.col-all_.q-btn-item]:(mt-[4px] mr-[0] mb-[0] ml-[4px])`
    )
  ],

  [
    /^q-banner--dense$/,
    componentClass(
      'q-banner--dense',
      qe`min-h-[32px] p-[8px] [&.q-banner--top-padding]:(pt-[12px]) [&_.q-banner__avatar_>_.q-avatar]:(text-[28px]) [&_.q-banner__avatar_>_.q-icon]:(text-[28px]) [&_.q-banner__avatar:not(:empty)_+_.q-banner__content]:(pl-[8px]) [&_.q-banner__actions.col-auto]:(pl-[8px])`
    )
  ]
]

export { shortcuts }
