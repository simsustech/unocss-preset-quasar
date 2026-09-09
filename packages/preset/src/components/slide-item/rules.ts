import type { Rule } from '@unocss/core'

export const slideItemRules = [
  [
    /^q-slide-item$/,
    function* () {
      yield { position: 'relative', background: 'white' }
    }
  ],
  [
    /^q-slide-item__left$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        fontSize: '14px',
        color: '#fff',
        background: '#4caf50',
        padding: '8px 16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transformOrigin: 'left center'
      }
    }
  ],
  [
    /^q-slide-item__right$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        fontSize: '14px',
        color: '#fff',
        background: '#ff9800',
        padding: '8px 16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transformOrigin: 'right center'
      }
    }
  ],
  [
    /^q-slide-item__top$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        fontSize: '14px',
        color: '#fff',
        background: '#2196f3',
        padding: '16px 8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transformOrigin: 'top center'
      }
    }
  ],
  [
    /^q-slide-item__bottom$/,
    function* (_, { symbols }) {
      yield {
        visibility: 'hidden',
        fontSize: '14px',
        color: '#fff',
        background: '#9c27b0',
        padding: '16px 8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '1.714em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transformOrigin: 'bottom center'
      }
    }
  ],
  [
    /^q-slide-item__content$/,
    function* () {
      yield {
        background: 'inherit',
        transition: 'transform 0.2s ease-in',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer'
      }
    }
  ]
] as Rule[]
