import type { Rule } from '@unocss/core'

export const slideItemRules = [
  [
    /^q-slide-item$/,
    function* (_, { symbols }) {
      // .q-slide-item
      yield { position: 'relative', background: 'white' }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__left`,
        visibility: 'hidden',
        'font-size': 'var(--q-body-medium-size)',
        color: '#fff',
        background: '#4caf50',
        // Reference states the padding as logical longhands.
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__left .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__left > div`,
        'transform-origin': 'left center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__right`,
        visibility: 'hidden',
        'font-size': 'var(--q-body-medium-size)',
        color: '#fff',
        background: '#ff9800',
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__right .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__right > div`,
        'transform-origin': 'right center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__top`,
        visibility: 'hidden',
        'font-size': 'var(--q-body-medium-size)',
        color: '#fff',
        background: '#2196f3',
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-lg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__top .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__top > div`,
        'transform-origin': 'top center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom`,
        visibility: 'hidden',
        'font-size': 'var(--q-body-medium-size)',
        color: '#fff',
        background: '#9c27b0',
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-lg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom > div`,
        'transform-origin': 'bottom center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        background: 'inherit',
        transition: 'transform 0.2s ease-in',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'pointer'
      }
    }
  ]
] as Rule[]
