import type { Rule } from '@unocss/core'

export const knobRules = [
  [
    /^q-knob$/,
    function* (_, { symbols }) {
      // .q-knob
      yield {
        position: 'relative',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        // Reference `.q-knob { font-size: 48px }`: the SVG geometry is em-based,
        // so this is the knob's diameter.
        'font-size': '48px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        position: 'relative',
        width: '1em',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track`,
        fill: 'none',
        stroke: 'var(--q-surface-container-highest)',
        'stroke-width': '0.1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__value`,
        fill: 'none',
        stroke: 'var(--q-primary)',
        'stroke-width': '0.1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--editable`,
        cursor: 'pointer',
        'outline-color':
          'color-mix(in oklab, 0 var(--un-outline-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--editable:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'border-radius': '50%',
        'box-shadow': 'none',
        transition: 'box-shadow 0.24s ease-in-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--editable:focus:before`,
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
    }
  ]
] as Rule[]
