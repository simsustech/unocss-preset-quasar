import type { Rule } from '@unocss/core'

export const responsiveRules = [
  [
    /^q-responsive$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-responsive--ratio$/,
    () => ({
      // Ratio
    })
  ],
  [
    /^q-responsive__filler$/,
    function* () {
      yield {
        width: 'inherit',
        'max-width': 'inherit',
        height: 'inherit',
        'max-height': 'inherit'
      }
    }
  ],
  [
    /^q-responsive__content$/,
    function* (_, { symbols }) {
      yield { 'border-radius': 'inherit' }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        width: '100% !important',
        height: '100% !important',
        'max-height': '100% !important',
        'max-width': '100% !important'
      }
    }
  ]
] as Rule[]
