import type { Rule } from '@unocss/core'

export const btnToggleRules = [
  [
    /^q-btn-toggle$/,
    function* () {
      // .q-btn-toggle
      yield {
        display: 'inline-flex',
        // Reference `.q-btn-toggle { position: relative }` — the pressed-state
        // overlay is positioned against the group.
        position: 'relative',
        'border-radius': 'var(--q-btn-radius)'
      }
    }
  ]
] as Rule[]
