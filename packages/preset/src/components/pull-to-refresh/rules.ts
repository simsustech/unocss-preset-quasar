import type { Rule } from '@unocss/core'

export const pullToRefreshRules = [
  [
    /^q-pull-to-refresh$/,
    function* (_, { symbols }) {
      // .q-pull-to-refresh
      yield { position: 'relative' }
      yield {
        [symbols.selector]: (selector) => `${selector}__sentinel`,
        position: 'absolute',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--top .q-pull-to-refresh__sentinel`,
        left: '0',
        right: '0',
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--top .q-pull-to-refresh__sentinel`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--bottom .q-pull-to-refresh__sentinel`,
        left: '0',
        right: '0',
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--bottom .q-pull-to-refresh__sentinel`,
        bottom: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--left`,
        'min-width': 'fit-content'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--left .q-pull-to-refresh__sentinel`,
        top: '0',
        bottom: '0',
        width: '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--left .q-pull-to-refresh__sentinel`,
        left: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--right`,
        'min-width': 'fit-content'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--right .q-pull-to-refresh__sentinel`,
        top: '0',
        bottom: '0',
        width: '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--right .q-pull-to-refresh__sentinel`,
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__puller`,
        'border-radius': '50%',
        width: '40px',
        height: '40px',
        color: 'var(--q-primary)',
        background: '#fff',
        'box-shadow': '0 0 4px 0 rgba(0, 0, 0, 0.3)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__puller`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__puller`,
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
        [symbols.selector]: (selector) => `${selector}__puller`,
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
        [symbols.selector]: (selector) => `${selector}__puller--animating`,
        transition: 'transform 0.3s, opacity 0.3s'
      }
    }
  ]
] as Rule[]
