import type { Rule } from '@unocss/core'

/**
 * QOptionGroup — was an empty stub: the inline variant never laid its options
 * out in a row, and the unstyled style entry's reset had nowhere to land.
 */
export const optionGroupRules = [
  [
    /^q-option-group$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-option-group--inline$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        display: 'inline-block'
      }
    }
  ]
] as Rule[]
