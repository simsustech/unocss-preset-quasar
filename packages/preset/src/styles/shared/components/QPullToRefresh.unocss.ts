import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [/^q-pull-to-refresh$/, staticClass(`relative`)],

  [
    /^q-pull-to-refresh__puller$/,
    componentClass(
      'q-pull-to-refresh__puller',
      `!flex-initial rounded-[50%] w-[40px] h-[40px] bg-[#fff] [box-shadow:0_0_4px_0_rgba(0,_0,_0,_0.3)] text-primary`
    )
  ],

  [
    /^q-pull-to-refresh__puller--animating$/,
    componentClass(
      'q-pull-to-refresh__puller--animating',
      `[transition:transform_0.3s,_opacity_0.3s]`
    )
  ]
]

export { shortcuts }
