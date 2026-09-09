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
  ][
    (/^q-responsive__filler$/,
    function* () {
      yield {
        width: 'inherit',
        maxWidth: 'inherit',
        height: 'inherit',
        maxHeight: 'inherit'
      }
    })
  ],
  [
    /^q-responsive__content$/,
    function* (_, { symbols }) {
      yield { borderRadius: 'inherit' }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        width: '100% !important',
        height: '100% !important',
        maxHeight: '100% !important',
        maxWidth: '100% !important'
      }
    }
  ]
] as Rule[]
