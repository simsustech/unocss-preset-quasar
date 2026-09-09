import type { Rule } from '@unocss/core'

export const badgeRules = [
  [
    /^q-badge$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': 'var(--q-radius-full)',
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)',
      'font-size': '12px',
      'font-weight': 'var(--q-badge-font-weight)',
      'line-height': 1,
      padding: '3px 7px',
      'min-height': '20px',
      'min-width': '20px',
      'text-align': 'center'
    })
  ],
  [
    /^q-badge--floating$/,
    () => ({
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      'z-index': 1
    })
  ],
  [
    /^q-badge--outline$/,
    () => ({
      'background-color': 'transparent',
      color: 'var(--q-primary)',
      border: '1px solid var(--q-primary)'
    })
  ],
  [
    /^q-badge--rounded$/,
    () => ({
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  [
    /^q-badge--transparent$/,
    () => ({
      'background-color': 'transparent',
      color: 'var(--q-primary)'
    })
  ],
  [
    /^q-badge--multi-line$/,
    () => ({
      'white-space': 'normal',
      padding: '4px 8px'
    })
  ],
  [
    /^q-badge--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-badge--dot$/,
    () => ({
      width: '8px',
      height: '8px',
      padding: 0,
      'min-width': '8px',
      'min-height': '8px'
    })
  ][
    (/^q-badge--single-line$/,
    function* () {
      yield { whiteSpace: 'nowrap' }
    })
  ]
] as Rule[]
