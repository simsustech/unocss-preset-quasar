import type { Rule } from '@unocss/core'

export const qTimeRules: Rule[] = [
  [
    /^q-time$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '300px',
      'background-color': 'var(--q-surface)',
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  [
    /^q-time--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-time--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-time--readonly$/,
    () => ({
      // Readonly
    })
  ],
  [
    /^q-time--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-time--with-seconds$/,
    () => ({
      // With seconds
    })
  ],
  [
    /^q-time__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: 'var(--q-space-md)',
      'font-size': '2em'
    })
  ],
  [
    /^q-time__header-content$/,
    () => ({
      // Header content
    })
  ],
  [
    /^q-time__header-label$/,
    () => ({
      // Header label
    })
  ],
  [
    /^q-time__header-ampm$/,
    () => ({
      // AM/PM
    })
  ],
  [
    /^q-time__clock$/,
    () => ({
      position: 'relative',
      width: '200px',
      height: '200px',
      'border-radius': '50%',
      'background-color': 'var(--q-surface-container-highest)',
      margin: 'var(--q-space-md) auto'
    })
  ],
  [
    /^q-time__content$/,
    () => ({
      // Content
    })
  ],
  [
    /^q-time__container$/,
    () => ({
      // Container
    })
  ],
  [
    /^q-time__main$/,
    () => ({
      // Main
    })
  ],
  [
    /^q-time__now$/,
    () => ({
      // Now
    })
  ],
  [
    /^q-time__progress$/,
    () => ({
      // Progress
    })
  ],
  [
    /^q-time__text$/,
    () => ({
      // Text
    })
  ],
  [
    /^q-time__input$/,
    () => ({
      // Input
    })
  ],
  [
    /^q-time__actions$/,
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: 'var(--q-space-sm)',
      padding: 'var(--q-space-sm) var(--q-space-md)'
    })
  ]
]
