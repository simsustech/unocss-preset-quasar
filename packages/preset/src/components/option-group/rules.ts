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
        [symbols.selector]: (selector) => `${selector}--inline > div`,
        display: 'inline-block'
      }
    }
  ]
] as Rule[]
