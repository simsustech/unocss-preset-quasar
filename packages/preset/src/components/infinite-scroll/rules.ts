import type { Rule } from '@unocss/core'

export const infiniteScrollRules = [
  [
    /^q-infinite-scroll__sentinel$/,
    function* () {
      yield {
        height: '1px',
        'margin-top': '-1px',
        'pointer-events': 'none'
      }
    }
  ],
  [
    /^q-infinite-scroll--reverse$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-infinite-scroll__sentinel`,
        'margin-top': '0',
        'margin-bottom': '-1px'
      }
    }
  ],
  [
    /^q-infinite-scroll--no-anchoring$/,
    function* () {
      yield { 'overflow-anchor': 'none' }
    }
  ]
] as Rule[]
