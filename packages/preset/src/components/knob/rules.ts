import type { Rule } from '@unocss/core'

export const knobRules = [
  [
    /^q-knob$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        // Reference `.q-knob { font-size: 48px }`: the SVG geometry is em-based,
        // so this is the knob's diameter.
        'font-size': '48px'
      }
      // Reference `body.quasar-style-unstyled .q-knob`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-knob__inner$/,
    () => ({
      position: 'relative',
      width: '1em',
      height: '1em'
    })
  ],
  [
    /^q-knob__track$/,
    () => ({
      fill: 'none',
      stroke: 'var(--q-surface-container-highest)',
      'stroke-width': '0.1em'
    })
  ],
  [
    /^q-knob__value$/,
    () => ({
      fill: 'none',
      stroke: 'var(--q-primary)',
      'stroke-width': '0.1em'
    })
  ],
  [
    // One matcher per regex: the previous file registered `/^q-knob--editable$/`
    // twice and UnoCSS silently dropped the first entry's yield.
    /^q-knob--editable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}`,
        cursor: 'pointer',
        'outline-color':
          'color-mix(in oklab, 0 var(--un-outline-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
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
        [symbols.selector]: (sel) => `${sel}:focus:before`,
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
    }
  ]
] as Rule[]
