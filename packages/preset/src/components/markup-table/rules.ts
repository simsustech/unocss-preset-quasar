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
          'color-mix(in oklab, var(--light-on-surface) var(--q-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--light-surface-container) var(--q-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        color: 'var(--q-on-surface)'
      }
    }
  ]
]
