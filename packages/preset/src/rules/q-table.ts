import type { Rule } from '@unocss/core'

export const qTableRules: Rule[] = [
  [
    /^q-table$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      width: '100%',
      position: 'relative'
    })
  ],
  [
    /^q-table--bordered$/,
    () => ({
      border: '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table--cell-separator$/,
    () => ({
      // Cells have borders
    })
  ],
  [
    /^q-table--horizontal-separator$/,
    () => ({
      // Rows have horizontal borders
    })
  ],
  [
    /^q-table--vertical-separator$/,
    () => ({
      // Columns have vertical borders
    })
  ],
  [
    /^q-table--flat$/,
    () => ({
      'box-shadow': 'none'
    })
  ],
  [
    /^q-table--grid$/,
    () => ({
      'box-shadow': 'none',
      border: '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table--dense$/,
    () => ({
      // Dense padding handled by cell rules
    })
  ],
  [
    /^q-table--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-table--loading$/,
    () => ({
      // Loading state
    })
  ],
  [
    /^q-table--no-hover$/,
    () => ({
      // No hover effect
    })
  ],
  [
    /^q-table--no-wrap$/,
    () => ({
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-table--separator$/,
    () => ({
      // Auto separator
    })
  ],
  [
    /^q-table--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-table--striped$/,
    () => ({
      // Striped rows handled by nth-child
    })
  ],
  [
    /^q-table--fullscreen$/,
    () => ({
      position: 'fixed',
      inset: 0,
      zIndex: 6000
    })
  ],
  [
    /^q-table__container$/,
    () => ({
      overflow: 'auto'
    })
  ],
  [
    /^q-table__content$/,
    () => ({
      position: 'relative'
    })
  ],
  [
    /^q-table__middle$/,
    () => ({
      flex: '1 1 auto'
    })
  ],
  [
    /^q-table__top$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      padding: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-table__bottom$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      padding: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-table__header$/,
    () => ({
      'font-weight': 600,
      'text-align': 'left'
    })
  ],
  [
    /^q-table__header-row$/,
    () => ({
      'border-bottom': '2px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table__linear-progress$/,
    () => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px'
    })
  ],
  [
    /^q-table__loading$/,
    () => ({
      position: 'absolute',
      inset: 0,
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'rgba(255, 255, 255, 0.7)'
    })
  ],
  [
    /^q-table__nav$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-table__sort-icon$/,
    () => ({
      'margin-left': 'var(--q-space-xs)',
      opacity: 0.5,
      transition: 'opacity var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-table__grid-content$/,
    () => ({
      display: 'grid'
    })
  ],
  [
    /^q-table th$/,
    () => ({
      'text-align': 'left',
      padding: 'var(--q-space-sm)',
      'font-weight': 600,
      'border-bottom': '2px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table td$/,
    () => ({
      padding: 'var(--q-space-sm)',
      'border-bottom': '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-table tbody tr:hover$/,
    () => ({
      'background-color': 'var(--q-surface-container-highest)'
    })
  ],
  [
    /^q-table--striped tbody tr:nth-child\(odd\)$/,
    () => ({
      'background-color': 'var(--q-surface-container-low)'
    })
  ]
]
