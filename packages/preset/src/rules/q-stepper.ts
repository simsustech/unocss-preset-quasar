import type { Rule } from '@unocss/core'

export const qStepperRules: Rule[] = [
  [
    /^q-stepper$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-stepper__step$/,
    () => ({
      display: 'flex',
      'align-items': 'flex-start',
      gap: '12px'
    })
  ],
  [
    /^q-stepper__dot$/,
    () => ({
      width: '24px',
      height: '24px',
      'border-radius': '50%',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'var(--q-surface-container-highest)',
      'font-size': '0.8em'
    })
  ],
  [
    /^q-stepper__line$/,
    () => ({
      width: '2px',
      flex: '1',
      'background-color': 'var(--q-outline-variant)',
      'margin-top': '4px'
    })
  ],
  [
    /^q-stepper__content$/,
    () => ({
      flex: '1',
      'padding-bottom': '16px'
    })
  ]
]
