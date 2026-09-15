import type { Rule } from '@unocss/core'

export const headerRules = [
  [
    /^q-header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      padding: '0 var(--q-space-md)',
      'min-height': '50px',
      'background-color': 'var(--q-surface-container)'
    })
  ],
  [
    /^q-header--bordered$/,
    () => ({
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-header--elevated$/,
    () => ({
      'box-shadow': 'var(--q-elevation-2)'
    })
  ],
  [
    /^q-header--hidden$/,
    () => ({
      display: 'none'
    })
  ],
  [
    /^q-header--reveal$/,
    () => ({
      // Reveal
    })
  ],
  [
    /^q-header$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-header .q-layout__shadow:after`,
        bottom: '10px'
      }
    }
  ],
  [
    /^q-footer$/,
    function* () {
      yield { 'z-index': '2000' }
    }
  ]
] as Rule[]
