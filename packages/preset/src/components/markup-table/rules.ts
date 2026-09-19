import type { Rule } from '@unocss/core'

export const markupTableRules: Rule[] = [
  [
    /^q-markup-table$/,
    function* (_, { symbols }) {
      yield {
        'border-collapse': 'collapse',
        'border-spacing': '0',
        width: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)'
      }
    }
  ]
]
