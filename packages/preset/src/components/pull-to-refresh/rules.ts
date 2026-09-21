import type { Rule } from '@unocss/core'

export const pullToRefreshRules = [
  [
    /^q-pull-to-refresh$/,
    function* () {
      yield { position: 'relative' }
    }
  ],
  [
    /^q-pull-to-refresh__sentinel$/,
    function* () {
      yield { position: 'absolute', 'pointer-events': 'none' }
    }
  ],
  [
    /^q-pull-to-refresh--top$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        left: '0',
        right: '0',
        height: '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        top: '0'
      }
    }
  ],
  [
    /^q-pull-to-refresh--bottom$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        left: '0',
        right: '0',
        height: '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        bottom: '0'
      }
    }
  ],
  [
    /^q-pull-to-refresh--left$/,
    function* (_, { symbols }) {
      yield { 'min-width': 'fit-content' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        top: '0',
        bottom: '0',
        width: '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        left: '0'
      }
    }
  ],
  [
    /^q-pull-to-refresh--right$/,
    function* (_, { symbols }) {
      yield { 'min-width': 'fit-content' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        top: '0',
        bottom: '0',
        width: '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-pull-to-refresh__sentinel`,
        right: '0'
      }
    }
  ],
  [
    /^q-pull-to-refresh__puller$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': '50%',
        width: '40px',
        height: '40px',
        color: 'var(--q-primary)',
        background: '#fff',
        'box-shadow': '0 0 4px 0 rgba(0, 0, 0, 0.3)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-primary) var(--un-text-opacity), transparent)',
        'border-radius': '50%',
        'background-color':
          'color-mix(in oklab, #fff var(--un-bg-opacity), transparent)',
        flex: '0 1 auto !important',
        width: '40px',
        height: '40px',
        'box-shadow': '0 0 4px 0 rgba(0, 0, 0, 0.3)'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-primary) var(--un-text-opacity), transparent)',
        'border-radius': '50%',
        'background-color':
          'color-mix(in oklab, #fff var(--un-bg-opacity), transparent)',
        flex: '0 1 auto !important',
        width: '40px',
        height: '40px',
        'box-shadow': '0 0 4px 0 rgba(0, 0, 0, 0.3)'
      }
    }
  ],
  [
    /^q-pull-to-refresh__puller--animating$/,
    function* () {
      yield { transition: 'transform 0.3s, opacity 0.3s' }
    }
  ]
] as Rule[]
