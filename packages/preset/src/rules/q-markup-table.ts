import type { Rule } from '@unocss/core'

export const qMarkupTableRules: Rule[] = [
  [
    /^q-markup-table$/,
    () => ({
      width: '100%',
      'border-collapse': 'collapse'
    })
  ],
  [
    /^q-markup-table--bordered$/,
    () => ({
      border: '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-markup-table--cell-separator$/,
    () => ({
      // Cell separator
    })
  ],
  [
    /^q-markup-table--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-markup-table--dense$/,
    () => ({
      // Dense
    })
  ],
  [
    /^q-markup-table--flat$/,
    () => ({
      'box-shadow': 'none'
    })
  ],
  [
    /^q-markup-table--horizontal-separator$/,
    () => ({
      // Horizontal separator
    })
  ],
  [
    /^q-markup-table--loading$/,
    () => ({
      // Loading
    })
  ],
  [
    /^q-markup-table--no-hover$/,
    () => ({
      // No hover
    })
  ],
  [
    /^q-markup-table--separator$/,
    () => ({
      // Separator
    })
  ],
  [
    /^q-markup-table--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-markup-table--striped$/,
    () => ({
      // Striped
    })
  ],
  [
    /^q-markup-table--vertical-separator$/,
    () => ({
      // Vertical separator
    })
  ],
  [
    /^q-markup-table th$/,
    () => ({
      'text-align': 'left',
      padding: 'var(--q-space-sm)',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-markup-table td$/,
    () => ({
      padding: 'var(--q-space-sm)',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ]
]
