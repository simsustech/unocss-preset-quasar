import type { Rule } from '@unocss/core'

export const menuRules = [
  [
    /^q-menu$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        'z-index': 9500,
        'min-width': '100px',
        'background-color': 'var(--q-surface)',
        'border-radius': 'var(--q-radius-md)',
        'box-shadow': 'var(--q-elevation-3)',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)'
      }
    }
  ],
  [
    /^q-menu--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-menu--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ]
] as Rule[]
