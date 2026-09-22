import type { Rule } from '@unocss/core'

export const virtualScrollRules = [
  [
    /^q-virtual-scroll$/,
    function* (_, { symbols }) {
      // .q-virtual-scroll
      yield {
        [symbols.selector]: (selector) => `${selector}:focus`,
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        outline: 'none',
        contain: 'content'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content > *`,
        'overflow-anchor': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__content > [data-q-vs-anchor]`,
        'overflow-anchor': 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__padding`,
        'background-image':
          'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(128, 128, 128, 0.03) 20%, rgba(128, 128, 128, 0.08) 50%, rgba(128, 128, 128, 0.03) 80%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0)) /* rtl:ignore */',
        'background-size':
          'var(--q-virtual-scroll-item-width, 100%) var(--q-virtual-scroll-item-height, 50px) /* rtl:ignore */'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__padding td`,
        position: 'static !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--horizontal`,
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-virtual-scroll__content`,
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-virtual-scroll__padding`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-virtual-scroll__content`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-virtual-scroll__content > *`,
        flex: '0 0 auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-virtual-scroll__padding`,
        'background-image':
          'linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(128, 128, 128, 0.03) 20%, rgba(128, 128, 128, 0.08) 50%, rgba(128, 128, 128, 0.03) 80%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0)) /* rtl:ignore */',
        'background-size':
          'var(--q-virtual-scroll-item-width, 50px) var(--q-virtual-scroll-item-height, 100%) /* rtl:ignore */'
      }
    }
  ]
] as Rule[]
