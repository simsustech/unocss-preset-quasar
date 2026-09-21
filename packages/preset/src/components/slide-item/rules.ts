import type { Rule } from '@unocss/core'

export const slideItemRules = [
  [
    /^q-slide-item$/,
    function* (_, { symbols }) {
      yield { position: 'relative', background: 'white' }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-surface)'
      }
      // Reference `body.quasar-style-unstyled .q-slide-item`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-slide-item__left$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        'font-size': '14px',
        color: '#fff',
        background: '#4caf50',
        // Reference states the padding as logical longhands.
        'padding-inline': '16px',
        'padding-block': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'transform-origin': 'left center'
      }
    }
  ],
  [
    /^q-slide-item__right$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        'font-size': '14px',
        color: '#fff',
        background: '#ff9800',
        'padding-inline': '16px',
        'padding-block': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'transform-origin': 'right center'
      }
    }
  ],
  [
    /^q-slide-item__top$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        'font-size': '14px',
        color: '#fff',
        background: '#2196f3',
        'padding-inline': '8px',
        'padding-block': '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'transform-origin': 'top center'
      }
    }
  ],
  [
    /^q-slide-item__bottom$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        'font-size': '14px',
        color: '#fff',
        background: '#9c27b0',
        'padding-inline': '8px',
        'padding-block': '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'transform-origin': 'bottom center'
      }
    }
  ],
  [
    /^q-slide-item__content$/,
    function* () {
      yield {
        background: 'inherit',
        transition: 'transform 0.2s ease-in',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'pointer'
      }
    }
  ]
] as Rule[]
