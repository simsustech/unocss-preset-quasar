import type { Rule } from '@unocss/core'

export const menuRules = [
  [
    /^q-menu$/,
    function* (_, { symbols }) {
      // .q-menu
      yield {
        // Reference `.q-menu`: a fixed, scrollable popup surface. The preset used
        // to leave it `absolute` at z-index 9500, which pushed menus under
        // dialogs and let them overflow the viewport.
        position: 'fixed',
        'z-index': 6000,
        display: 'inline-block',
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color':
          'color-mix(in oklab, var(--light-surface-container) var(--q-bg-opacity), transparent)',
        color:
          'color-mix(in oklab, var(--light-on-surface) var(--q-text-opacity), transparent)',
        'max-width': '95vw',
        'max-height': '65vh',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'background-color': 'var(--q-surface-variant)',
        // Reference overrides the elevation with the light-coloured shadow pair.
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
    }
  ]
] as Rule[]
