import type { Rule } from '@unocss/core'

export const qUploaderRules: Rule[] = [
  [
    /^q-uploader$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      border: '2px dashed var(--q-outline)',
      'border-radius': 'var(--q-radius-md)',
      padding: '16px'
    })
  ],
  [
    /^q-uploader__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'margin-bottom': '8px'
    })
  ],
  [
    /^q-uploader__list$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      gap: '8px'
    })
  ],
  [
    /^q-uploader__file$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '8px',
      padding: '8px',
      'background-color': 'var(--q-surface-container-high)',
      'border-radius': 'var(--q-radius-sm)'
    })
  ]
]
