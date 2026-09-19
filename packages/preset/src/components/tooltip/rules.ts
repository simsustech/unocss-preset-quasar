import type { Rule } from '@unocss/core'

export const tooltipRules = [
  [
    /^q-tooltip$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        'z-index': 9500,
        'pointer-events': 'none',
        'max-width': '300px',
        padding: 'var(--q-space-sm) var(--q-space-md)',
        'border-radius': 'var(--q-radius-sm)',
        'background-color': 'var(--q-inverse-surface)',
        color: 'var(--q-inverse-on-surface)',
        'font-size': '0.85em',
        'box-shadow': 'var(--q-elevation-2)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-tooltip--style',
        color: 'var(--q-inverse-on-surface)'
      }
    }
  ],
  [
    /^q-tooltip--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-tooltip--style$/,
    function* () {
      yield {
        'font-size': '10px',
        color: '#fafafa',
        background: '#757575',
        'border-radius': '4px',
        'text-transform': 'none',
        'font-weight': 'normal'
      }
    }
  ]
] as Rule[]
