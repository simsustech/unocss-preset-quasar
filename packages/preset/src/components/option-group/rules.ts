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
        [symbols.selector]: (selector) => `${selector}--inline`,
        // inline-block children tile edge-to-edge: at 375px the wrapped row's
        // radio ring starts at the previous label's last pixel. Flex + gap is
        // the preset's existing spacing idiom (`q-uploader__list`).
        display: 'flex',
        'flex-wrap': 'wrap',
        'column-gap': 'var(--q-space-sm)',
        'row-gap': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inline > div`,
        display: 'inline-block'
      }
    }
  ]
] as Rule[]
