import type { Rule } from '@unocss/core'

export const barRules = [
  [
    /^q-bar$/,
    function* (_, { symbols }) {
      // .q-bar
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'padding-inline': '12px',
        'padding-block': 'calc(var(--spacing) * 0)',
        'min-height': '32px',
        // Reference `.q-bar`: a 20% tint of the dark surface, which reads as a
        // raised rail; a surface-container role is lighter than that.
        'background-color':
          'color-mix(in oklab, var(--dark-surface) 20%, transparent)',
        color: 'var(--q-on-surface)',
        gap: 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>.q-btn`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>.q-btn:first-child`,
        'margin-left': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>.q-icon`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>.q-icon:first-child`,
        'margin-left': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>div`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>div:first-child`,
        'margin-left': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}>div+.q-icon`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        // Reference `.q-bar--dense`: 14px type, 24px track, no block padding.
        'font-size': '14px',
        'padding-inline': '8px',
        'padding-block': 'calc(var(--spacing) * 0)',
        height: '24px',
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-btn`,
        'font-size': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        // Dark roles rather than the `--q-*` aliases, which follow the body
        // class: a `q-bar--dark` on a light body kept the light surface.
        'background-color': 'var(--dark-surface-container)',
        color:
          'color-mix(in oklab, var(--dark-on-surface) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--standard`,
        // Reference `.q-bar--standard`: 18px type, 32px track, 12px inline.
        'font-size': '18px',
        'padding-inline': '12px',
        'padding-block': 'calc(var(--spacing) * 0)',
        height: '32px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--standard>div`,
        'font-size': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--standard .q-btn`,
        'font-size': '11px'
      }
    }
  ]
] as Rule[]
