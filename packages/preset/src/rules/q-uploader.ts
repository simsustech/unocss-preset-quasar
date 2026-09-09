import type { Rule } from '@unocss/core'

export const qUploaderRules: Rule[] = [
  [
    /^q-uploader$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      border: '2px dashed var(--q-outline)',
      'border-radius': 'var(--q-radius-md)',
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-uploader--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-uploader--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-uploader--readonly$/,
    () => ({
      // Readonly
    })
  ],
  [
    /^q-uploader--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-uploader__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'margin-bottom': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-uploader__header-content$/,
    () => ({
      // Header content
    })
  ],
  [
    /^q-uploader__list$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      gap: 'var(--q-space-sm)'
    })
  ],
  [
    /^q-uploader__file$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-sm)',
      padding: 'var(--q-space-sm)',
      'background-color': 'var(--q-surface-container-high)',
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-uploader__add$/,
    () => ({
      // Add
    })
  ],
  [
    /^q-uploader__badge$/,
    () => ({
      // Badge
    })
  ],
  [
    /^q-uploader__btn$/,
    () => ({
      // Button
    })
  ],
  [
    /^q-uploader__clear$/,
    () => ({
      // Clear
    })
  ],
  [
    /^q-uploader__dnd$/,
    () => ({
      // Drag and drop
    })
  ],
  [
    /^q-uploader__drop-zone$/,
    () => ({
      // Drop zone
    })
  ],
  [
    /^q-uploader__progress$/,
    () => ({
      // Progress
    })
  ],
  [
    /^q-uploader__status$/,
    () => ({
      // Status
    })
  ]
]
