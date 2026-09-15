import type { Rule } from '@unocss/core'

export const virtualScrollRules = [
  [
    /^q-virtual-scroll$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        outline: '0'
      }
    }
  ],
  [
    /^q-virtual-scroll__content$/,
    function* (_, { symbols }) {
      yield { outline: 'none', contain: 'content' }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        'overflow-anchor': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > [data-q-vs-anchor]`,
        'overflow-anchor': 'auto'
      }
    }
  ],
  [
    /^q-virtual-scroll__padding$/,
    function* (_, { symbols }) {
      yield {
        background:
          'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(128, 128, 128, 0.03) 20%, rgba(128, 128, 128, 0.08) 50%, rgba(128, 128, 128, 0.03) 80%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0)) /* rtl:ignore */',
        'background-size':
          'var(--q-virtual-scroll-item-width, 100%) var(--q-virtual-scroll-item-height, 50px) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} td`,
        position: 'static !important'
      }
    }
  ],
  [
    /^q-virtual-scroll--horizontal$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__content`,
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__padding`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__content`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__content > *`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-virtual-scroll__padding`,
        background:
          'linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(128, 128, 128, 0.03) 20%, rgba(128, 128, 128, 0.08) 50%, rgba(128, 128, 128, 0.03) 80%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0)) /* rtl:ignore */',
        'background-size':
          'var(--q-virtual-scroll-item-width, 50px) var(--q-virtual-scroll-item-height, 100%) /* rtl:ignore */'
      }
    }
  ]
] as Rule[]
