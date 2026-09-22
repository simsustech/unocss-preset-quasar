import type { Rule } from '@unocss/core'

export const parallaxRules = [
  [
    /^q-parallax$/,
    function* (_, { symbols }) {
      // .q-parallax
      yield {
        position: 'relative',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__media`,
        position: 'absolute',
        inset: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__image`
        // Image
      }
    }
  ]
] as Rule[]
