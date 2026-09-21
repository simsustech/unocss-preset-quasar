import type { Rule } from '@unocss/core'

export const intersectionRules = [
  [
    /^q-intersection$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative'
      }
      // Reference `body.quasar-style-unstyled .q-intersection`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-intersection--once$/,
    () => ({
      // Once
    })
  ],
  [
    /^q-intersection--disable$/,
    () => ({
      // Disable
    })
  ]
] as Rule[]
