import type { Rule } from '@unocss/core'

export const chipRules = [
  [
    /^q-chip$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'border-radius': 'var(--q-radius-full)',
      'background-color': 'var(--q-surface-container-high)',
      color: 'var(--q-on-surface)',
      'font-size': '13px',
      'line-height': 1.2,
      padding: '6px 12px',
      'min-height': 'var(--q-chip-min-height)',
      gap: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-chip--square$/,
    () => ({
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-chip--dense$/,
    () => ({
      'min-height': '24px',
      padding: '2px 8px'
    })
  ],
  [
    /^q-chip--selected$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-chip--removable$/,
    () => ({
      'padding-right': '4px'
    })
  ],
  [
    /^q-chip--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-chip--outline$/,
    () => ({
      'background-color': 'transparent',
      border: '1px solid var(--q-outline)'
    })
  ],
  [
    /^q-chip--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-chip__icon$/,
    () => ({
      'font-size': '1.2em'
    })
  ],
  [
    /^q-chip__close$/,
    () => ({
      cursor: 'pointer',
      'font-size': '1.2em',
      opacity: 0.7,
      transition: 'opacity var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-chip__content$/,
    () => ({
      'white-space': 'nowrap'
    })
  ],
  [
    /^q-chip__label$/,
    () => ({
      // Label
    })
  ],
  [
    /^q-chip--colored$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-chip__icon`,
        color: 'inherit'
      }
    }
  ],
  [
    /^q-chip__icon--left$/,
    function* () {
      yield { 'margin-right': '0.2em' }
    }
  ],
  [
    /^q-chip__icon--right$/,
    function* () {
      yield { 'margin-left': '0.2em' }
    }
  ],
  [
    /^q-chip__icon--remove$/,
    function* (_, { symbols }) {
      yield {
        'margin-left': '0.1em',
        'margin-right': '-0.5em',
        opacity: '0.6',
        outline: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        opacity: '1'
      }
    }
  ],
  [
    /^q-chip--clickable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:focus-visible`,
        'box-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)'
      }
    }
  ]
] as Rule[]
