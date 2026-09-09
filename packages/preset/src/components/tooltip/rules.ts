import type { Rule } from '@unocss/core'

export const tooltipRules = [
  [
    /^q-tooltip$/,
    () => ({
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
    })
  ],
  [
    /^q-tooltip--dark$/,
    () => ({
      // Dark mode
    })
  ][
    (/^q-tooltip--style$/,
    function* () {
      yield {
        fontSize: '10px',
        color: '#fafafa',
        background: '#757575',
        borderRadius: '4px',
        textTransform: 'none',
        fontWeight: 'normal'
      }
    })
  ]
] as Rule[]
