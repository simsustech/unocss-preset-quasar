import type { Rule } from '@unocss/core'

export const qKnobRules: Rule[] = [
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
  ]
]
