import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-parallax$/,
    mdComponent(
      'q-parallax',
      `relative w-full overflow-hidden [border-radius:inherit]`
    )
  ],

  [
    /^q-parallax__media$/,
    mdComponent(
      'q-parallax__media',
      `[&_>_img]:(absolute left-2/4 bottom-0 min-w-full min-h-full hidden) [&_>_video]:(absolute left-2/4 bottom-0 min-w-full min-h-full hidden)`
    )
  ]
]

export { shortcuts }
