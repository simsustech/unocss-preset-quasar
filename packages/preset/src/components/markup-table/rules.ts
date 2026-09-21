import type { Rule } from '@unocss/core'

export const markupTableRules: Rule[] = [
  [
    /^q-markup-table$/,
    function* (_, { symbols }) {
      yield {
        'border-collapse': 'collapse',
        'border-spacing': '0',
        width: '100%',
        // Reference `.q-markup-table { … overflow: auto }` — a wide table scrolls
        // inside its own box instead of pushing the page.
        overflow: 'auto',
        color:
          'color-mix(in oklab, var(--light-on-surface) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--light-surface-container) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)'
      }
      // Reference `body.quasar-style-unstyled .q-markup-table`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
]
