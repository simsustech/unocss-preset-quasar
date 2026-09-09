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
    /^q-stepper--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-stepper--vertical$/,
    () => ({
      // Vertical layout
    })
  ],
  [
    /^q-stepper__step$/,
    () => ({
      display: 'flex',
      'align-items': 'flex-start',
      gap: 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__step--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-stepper__step--error$/,
    () => ({
      color: 'var(--q-error)'
    })
  ],
  [
    /^q-stepper__step--done$/,
    () => ({
      // Done state
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
      'font-size': '0.8em',
      'font-weight': 600
    })
  ],
  [
    /^q-stepper__line$/,
    () => ({
      width: '2px',
      flex: '1',
      'background-color': 'var(--q-outline-variant)',
      'margin-top': 'var(--q-space-xs)'
    })
  ],
  [
    /^q-stepper__content$/,
    () => ({
      flex: '1',
      'padding-bottom': 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__caption$/,
    () => ({
      'font-size': '0.75em',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-stepper__nav$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between',
      'margin-top': 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__header$/,
    () => ({
      // Header
    })
  ],
  [
    /^q-stepper__step-content$/,
    () => ({
      // Step content
    })
  ],
  [
    /^q-stepper__step-inner$/,
    () => ({
      // Step inner
    })
  ],
  [
    /^q-stepper__step-icon$/,
    () => ({
      // Step icon
    })
  ],
  [
    /^q-stepper__step-label$/,
    () => ({
      // Step label
    })
  ],
  [
    /^q-stepper__step-title$/,
    () => ({
      'font-weight': 500
    })
  ]
]
