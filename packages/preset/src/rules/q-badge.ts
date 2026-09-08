import type { Rule } from '@unocss/core'

/**
 * QBadge — multi-selector rules.
 * One rule per BEM class. Each generator returns declarations.
 * References CSS custom properties directly — no theme access.
 */
export const qBadgeRules: Rule[] = [
  // Base
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
      'font-weight': '500',
      'line-height': '1',
      padding: '3px 7px',
      'min-height': '20px',
      'min-width': '20px',
      'text-align': 'center'
    })
  ],
  // Floating variant
  [
    /^q-badge--floating$/,
    () => ({
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      'z-index': '1'
    })
  ],
  // Outline variant
  [
    /^q-badge--outline$/,
    () => ({
      'background-color': 'transparent',
      color: 'var(--q-primary)',
      border: '1px solid var(--q-primary)'
    })
  ],
  // Rounded variant
  [
    /^q-badge--rounded$/,
    () => ({
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  // Transparent variant
  [
    /^q-badge--transparent$/,
    () => ({
      'background-color': 'transparent',
      color: 'var(--q-primary)'
    })
  ],
  // Multi-line variant
  [
    /^q-badge--multi-line$/,
    () => ({
      'white-space': 'normal',
      padding: '4px 8px'
    })
  ]
]
