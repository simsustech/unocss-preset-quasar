import type { Rule } from '@unocss/core'

export const pageRules = [
  [
    /^q-page$/,
    function* (_, { symbols }) {
      // .q-page
      yield { padding: 'var(--q-space-md)' }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--padding`,
        padding: 'var(--q-space-md)'
      }
    }
  ],
  [
    /^q-page-sticky$/,
    function* (_, { symbols }) {
      // .q-page-sticky
      yield { position: 'fixed', 'z-index': '7000' }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--expand`
        // Expand
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--shrink`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--shrink > div`,
        display: 'inline-block',
        'pointer-events': 'auto'
      }
    }
  ]
] as Rule[]
