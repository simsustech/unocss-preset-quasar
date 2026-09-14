import type { Rule } from '@unocss/core'

export const layoutRules = [
  [
    /^q-layout$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'min-height': '100vh'
    })
  ],
  [
    /^q-layout--containerized$/,
    () => ({
      // Containerized
    })
  ],
  [
    /^q-layout--view$/,
    () => ({
      // View
    })
  ],
  [
    /^q-layout__section$/,
    () => ({
      display: 'flex',
      'flex-direction': 'row'
    })
  ],
  [
    /^q-layout__container$/,
    () => ({
      flex: '1',
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-layout__content$/,
    () => ({
      // Content
    })
  ],
  [
    /^q-layout__shadow$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-layout__shadow:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'box-shadow':
          '0 0 10px 2px rgba(0, 0, 0, 0.2), 0 0px 10px rgba(0, 0, 0, 0.24)'
      }
    }
  ],
  [
    /^q-layout-container$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-layout`,
        minHeight: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transform: 'translate3d(0, 0, 0)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div > div`,
        minHeight: '0',
        maxHeight: '100%'
      }
    }
  ],
  [
    /^q-layout__section--marginal$/,
    function* () {
      yield { backgroundColor: 'var(--q-primary)', color: '#fff' }
    }
  ],
  [
    /^q-header$/,
    function* () {
      yield { position: 'relative' }
    }
  ],
  [
    /^q-footer$/,
    function* () {
      yield { position: 'relative' }
    }
  ],
  [
    /^q-page$/,
    function* () {
      yield { position: 'relative' }
    }
  ]
] as Rule[]
