import type { Rule } from '@unocss/core'

export const separatorRules = [
  [
    /^q-separator$/,
    () => ({
      'background-color': 'var(--q-outline-variant)',
      border: 'none'
    })
  ],
  [
    /^q-separator--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-separator--horizontal$/,
    () => ({
      height: '1px',
      margin: 'var(--q-space-sm) 0'
    })
  ],
  [
    /^q-separator--vertical$/,
    () => ({
      width: '1px',
      margin: '0 var(--q-space-sm)'
    })
  ],
  [
    /^q-separator--inset$/,
    () => ({
      // Inset
    })
  ],
  [
    /^q-separator--spaced$/,
    () => ({
      margin: 'var(--q-space-md) 0'
    })
  ],
  [
    /^q-list--padding$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-item__label--header`,
        'padding-top': '8px'
      }
    }
  ],
  [
    /^q-separator--horizontal-inset$/,
    function* () {
      yield { 'margin-left': '16px', 'margin-right': '16px' }
    }
  ],
  [
    /^q-separator--horizontal-item-inset$/,
    function* () {
      yield { 'margin-left': '72px', 'margin-right': '0' }
    }
  ],
  [
    /^q-separator--horizontal-item-thumbnail-inset$/,
    function* () {
      yield { 'margin-left': '116px', 'margin-right': '0' }
    }
  ],
  [
    /^q-separator--vertical-inset$/,
    function* () {
      yield { 'margin-top': '8px', 'margin-bottom': '8px' }
    }
  ]
] as Rule[]
