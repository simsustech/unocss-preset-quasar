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
        'min-height': '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        transform: 'translate3d(0, 0, 0)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div > div`,
        'min-height': '0',
        'max-height': '100%'
      }
    }
  ],
  [
    /^q-layout__section--marginal$/,
    function* () {
      // Spec: md.sys.color.surface-container-low (same token the navigation
      // drawer uses). Was painting --q-primary with white text, and the class
      // was missing from the safelist so it never emitted at all.
      yield {
        'background-color': 'var(--q-surface-container-low)',
        color: 'var(--q-on-surface)'
      }
    }
  ],
  // NOTE: /^q-header$/ and /^q-footer$/ were declared here as well as in the
  // header/footer modules. The engine keeps one rule per regex, so the later
  // declarations won and the bases were lost — do not reintroduce them here.
  [
    /^q-page$/,
    function* () {
      yield { position: 'relative' }
    }
  ]
] as Rule[]
