import type { Rule } from '@unocss/core'

export const spaceRules = [
  [
    /^q-space$/,
    function* (_, { symbols }) {
      yield { flex: '1', 'flex-grow': 1 }
      // The unstyled style entry drops the component's own surface.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
] as Rule[]
