import type { Rule } from '@unocss/core'

export const btnToggleRules = [
  [
    /^q-btn-toggle$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        // Reference `.q-btn-toggle { position: relative }` — the pressed-state
        // overlay is positioned against the group.
        position: 'relative',
        'border-radius': 'var(--q-btn-radius)'
      }
      // Reference `body.quasar-style-unstyled .q-btn-toggle`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ]
] as Rule[]
