import type { Rule, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { mdComponent, mdStatic } from '../../_helpers.js'

const shortcuts: Shortcut<QuasarTheme>[] = [
  [
    /^q-btn-dropdown--split$/,
    (
      [, c],
      { theme }
    ) => `[&_.q-btn-dropdown\\_\\_arrow-container]:(px-4px py-0)
    [&_.q-btn-dropdown\\_\\_arrow-container.q-btn--outline]:(border-l-1px border-l-solid border-l-current)
    [&_.q-btn-dropdown\\_\\_arrow-container:not(.q-btn--outline)]:(border-l-1px border-l-solid border-l-white)
    `
  ],
  [
    /^q-btn-dropdown--simple$/,
    mdComponent(
      'q-btn-dropdown--simple',
      `[&+.q-btn-dropdown\\_\\_arrow]:(ml-8px)`
    )
  ],
  [
    /^q-btn-dropdown__arrow$/,
    mdComponent(
      'q-btn-dropdown__arrow',
      `transition-property-transform transition-duration-280`
    )
  ],
  [/^q-btn-dropdown--current$/, mdStatic(`grow-1`)]
]

export { shortcuts }
