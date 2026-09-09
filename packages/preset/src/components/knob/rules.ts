import type { Rule } from '@unocss/core'

export const knobRules = [
  [
    /^q-knob$/,
    () => ({
      position: 'relative',
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center'
    })
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
    /^q-knob--editable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-knob--editable:before`,
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
    }
  ],
  [
    /^q-knob--editable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-knob--editable:focus:before`,
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
    }
  ]
] as Rule[]
