import type { Rule } from '@unocss/core'

export const loadingRules: Rule[] = [
  [
    /^q-loading$/,
    function* (_, { symbols }) {
      // .q-loading
      yield {
        // `!important` matches quasar.css: the overlay must stay fixed even when
        // the app sets a positioning context on an ancestor.
        position: 'fixed !important',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'rgba(0, 0, 0, 0.7)',
        color: 'var(--q-on-primary)',
        'z-index': 9500
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__backdrop`,
        // Reference `.q-loading__backdrop`: pinned to the viewport corners through
        // wind4's spacing step, behind the box, and click-through when the plugin
        // does not want to intercept.
        'background-color':
          'color-mix(in oklab, #000 var(--q-bg-opacity), transparent)',
        opacity: '50%',
        transition: 'background-color 0.28s',
        top: 'calc(var(--spacing) * 0)',
        right: 'calc(var(--spacing) * 0)',
        bottom: 'calc(var(--spacing) * 0)',
        left: 'calc(var(--spacing) * 0)',
        position: 'fixed',
        'z-index': '-1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__box`,
        color: 'color-mix(in oklab, #fff var(--q-text-opacity), transparent)',
        padding: '18px',
        'border-radius': 'var(--q-corner-extra-small)',
        'max-width': '450px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__message`,
        'margin-inline': '20px',
        'margin-top': '40px',
        'margin-bottom': '0',
        'text-align': 'center'
      }
    }
  ]
]
