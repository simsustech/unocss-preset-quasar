import type { Rule } from '@unocss/core'

export const footerRules = [
  [
    /^q-footer$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 var(--q-space-md)',
      'min-height': '50px',
      'background-color': 'var(--q-surface-container)'
    })
  ],
  [
    /^q-footer--bordered$/,
    () => ({
      'border-top': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-footer--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-2)'
    })
  ],
  [
    /^q-footer--hidden$/,
    () => ({
      display: 'none'
    })
  ],
  [
    /^q-footer--reveal$/,
    () => ({
      // Reveal
    })
  ],
  [
    /^q-footer$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-footer .q-layout__shadow:after`,
        top: '10px'
      }
    }
  ]
] as Rule[]
