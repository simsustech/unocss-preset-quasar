import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { componentClass, staticClass, qe } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-btn-dropdown--split$/,
    ([, c], { theme }) => qe`[&_.q-btn-dropdown__arrow-container]:(px-4px py-0)
    [&_.q-btn-dropdown__arrow-container.q-btn--outline]:(border-l-1px border-l-solid border-l-current)
    [&_.q-btn-dropdown__arrow-container:not(.q-btn--outline)]:(border-l-1px border-l-solid border-l-white)
    `
  ],
  [
    /^q-btn-dropdown--simple$/,
    componentClass(
      'q-btn-dropdown--simple',
      qe`[&+.q-btn-dropdown__arrow]:(ml-8px)`
    )
  ],
  [
    /^q-btn-dropdown__arrow$/,
    componentClass(
      'q-btn-dropdown__arrow',
      `transition-property-transform transition-duration-280`
    )
  ],
  [/^q-btn-dropdown--current$/, staticClass(`grow-1`)]
]

export { shortcuts }
