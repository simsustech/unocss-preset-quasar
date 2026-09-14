import type { Rule } from '@unocss/core'

export const btnDropdownRules = [
  [
    /^q-btn-dropdown$/,
    () => ({
      display: 'inline-flex'
    })
  ],
  [
    /^q-btn-dropdown__arrow$/,
    () => ({
      'margin-left': '4px'
    })
  ],
  [
    /^q-btn-dropdown--split$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn-dropdown__arrow-container`,
        padding: '0 4px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-btn-dropdown__arrow-container.q-btn--outline`,
        borderLeft: '1px solid currentColor'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-btn-dropdown__arrow-container:not(.q-btn--outline)`,
        borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
      }
    }
  ],
  [
    /^q-btn-dropdown--simple$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} * + .q-btn-dropdown__arrow`,
        marginLeft: '8px'
      }
    }
  ],
  [
    /^q-btn-dropdown--current$/,
    function* () {
      yield { flexGrow: '1' }
    }
  ]
] as Rule[]
