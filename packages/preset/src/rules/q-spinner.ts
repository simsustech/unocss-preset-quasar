import type { Rule } from '@unocss/core'

export const qSpinnerRules: Rule[] = [
  [
    /^q-spinner$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center'
    })
  ],
  [
    /^q-spinner-mat$/,
    () => ({
      // Material spinner
    })
  ],
  [
    /^q-spinner--gears$/,
    () => ({
      // Gears spinner
    })
  ],
  [
    /^q-spinner--oval$/,
    () => ({
      // Oval spinner
    })
  ],
  [
    /^q-spinner--radio$/,
    () => ({
      // Radio spinner
    })
  ],
  [
    /^q-spinner--tail$/,
    () => ({
      // Tail spinner
    })
  ]
]
