import type { Rule } from '@unocss/core'

export const infiniteScrollRules = [
  [
    /^q-infinite-scroll__sentinel$/,
    function* () {
      yield {
        height: '1px',
        marginTop: '-1px',
        pointerEvents: 'none'
      }
    }
  ],
  [
    /^q-infinite-scroll--reverse$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-infinite-scroll__sentinel`,
        marginTop: '0',
        marginBottom: '-1px'
      }
    }
  ],
  [
    /^q-infinite-scroll--no-anchoring$/,
    function* () {
      yield { overflowAnchor: 'none' }
    }
  ]
] as Rule[]
