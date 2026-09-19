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
        padding: '8px 16px'
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
        padding: '8px 16px'
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
        padding: '16px 8px'
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
        padding: '16px 8px'
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
