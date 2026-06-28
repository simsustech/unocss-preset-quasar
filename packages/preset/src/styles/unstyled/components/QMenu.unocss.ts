import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import {
  componentClass,
  staticClass,
  componentCtxClass
} from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-menu$/,
    componentCtxClass(
      'q-menu',
      ({ theme }) =>
        `!fixed inline-block max-w-[95vw] max-h-[65vh] overflow-y-auto overflow-x-hidden outline-0 z-${theme.quasar.z['menu']}`
    )
  ],

  [/^q-menu--square$/, staticClass(``)],

  [/^q-menu--dark$/, componentCtxClass('q-menu--dark', ({ theme }) => ``)]
]

export { shortcuts }
