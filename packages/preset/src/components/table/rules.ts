import type { Rule } from '@unocss/core'

export const tableRules = [
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
  ],
  [
    /^q-table$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-table tbody td:before, .q-table tbody td:after`,
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        'pointer-events': 'none'
      }
    }
  ],
  [
    /^q-table$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-table tbody td:before`,
        background: 'rgba(0, 0, 0, 0.03)'
      }
    }
  ],
  [
    /^q-table$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-table tbody td:after`,
        background: 'rgba(0, 0, 0, 0.06)'
      }
    }
  ],
  [
    /^q-table$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-table tbody tr.selected td:after`,
        content: '""'
      }
    }
  ],
  [
    /^q-table--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-table--dark tbody td:before`,
        background: 'rgba(255, 255, 255, 0.07)'
      }
    }
  ],
  [
    /^q-table--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-table--dark tbody td:after`,
        background: 'rgba(255, 255, 255, 0.1)'
      }
    }
  ][
    (/^q-table__card$/,
    function* (_, { symbols }) {
      yield {
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow:
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__middle`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__top`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-table__bottom`,
        flex: '0 0 auto'
      }
    })
  ],
  [
    /^q-table__title$/,
    function* () {
      yield {
        fontSize: '20px',
        letterSpacing: '0.005em',
        fontWeight: '400'
      }
    }
  ],
  [
    /^q-table__separator$/,
    function* () {
      yield { minWidth: '8px !important' }
    }
  ],
  [
    /^q-table__progress$/,
    function* (_, { symbols }) {
      yield { height: '0 !important' }
      yield {
        [symbols.selector]: (sel) => `${sel} th`,
        padding: '0 !important',
        border: '0 !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-linear-progress`,
        position: 'absolute',
        bottom: '0'
      }
    }
  ],
  [
    /^q-table__bottom-nodata-icon$/,
    function* () {
      yield { fontSize: '200%', marginRight: '8px' }
    }
  ],
  [
    /^q-table__bottom-item$/,
    function* () {
      yield { marginRight: '16px' }
    }
  ],
  [
    /^q-table__control$/,
    function* () {
      yield { display: 'flex', alignItems: 'center' }
    }
  ],
  [
    /^q-table__sort-icon--left$/,
    function* () {
      yield { marginLeft: '4px' }
    }
  ],
  [
    /^q-table__sort-icon--center$/,
    function* () {
      yield { marginLeft: '4px' }
    }
  ],
  [
    /^q-table__sort-icon--right$/,
    function* () {
      yield { marginRight: '4px' }
    }
  ],
  [
    /^q-table--col-auto-width$/,
    function* () {
      yield { width: '1px' }
    }
  ],
  [
    /^q-table__card--dark$/,
    function* () {
      yield {
        boxShadow:
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-table__grid-item-card$/,
    function* (_, { symbols }) {
      yield { verticalAlign: 'top', padding: '12px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-separator`,
        margin: '12px 0'
      }
    }
  ],
  [
    /^q-table__grid-item-row$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-table__grid-item-row`,
        marginTop: '8px'
      }
    }
  ],
  [
    /^q-table__grid-item-title$/,
    function* () {
      yield {
        opacity: '0.54',
        fontWeight: '500',
        fontSize: '12px'
      }
    }
  ],
  [
    /^q-table__grid-item-value$/,
    function* () {
      yield { fontSize: '13px' }
    }
  ],
  [
    /^q-table__grid-item$/,
    function* () {
      yield {
        padding: '4px',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
    }
  ],
  [
    /^q-table__grid-item--selected$/,
    function* () {
      yield { transform: 'scale(0.95)' }
    }
  ]
] as Rule[]
