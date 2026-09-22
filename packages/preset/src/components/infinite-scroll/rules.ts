import type { Rule } from '@unocss/core'

export const infiniteScrollRules = [
  [
    /^q-infinite-scroll$/,
    function* (_, { symbols }) {
      // .q-infinite-scroll
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel`,
        height: '1px',
        'margin-top': '-1px',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--reverse .q-infinite-scroll__sentinel`,
        'margin-top': '0',
        'margin-bottom': '-1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-anchoring`,
        'overflow-anchor': 'none'
      }
    }
  ]
] as Rule[]
