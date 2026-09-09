import type { Rule } from '@unocss/core'

export const qColorRules: Rule[] = [
  [
    /^q-color$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '300px'
    })
  ],
  [
    /^q-color__header$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'margin-bottom': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__header-content$/,
    () => ({
      // Header content
    })
  ],
  [
    /^q-color__header-bg$/,
    () => ({
      // Header background
    })
  ],
  [
    /^q-color__spectrum$/,
    () => ({
      position: 'relative',
      width: '100%',
      height: '200px',
      'border-radius': 'var(--q-radius-sm)',
      overflow: 'hidden'
    })
  ],
  [
    /^q-color__spectrum-tab$/,
    () => ({
      // Spectrum tab
    })
  ],
  [
    /^q-color__spectrum-white$/,
    () => ({
      // White gradient
    })
  ],
  [
    /^q-color__spectrum-black$/,
    () => ({
      // Black gradient
    })
  ],
  [
    /^q-color__hue$/,
    () => ({
      width: '100%',
      height: '12px',
      'margin-top': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__alpha$/,
    () => ({
      width: '100%',
      height: '12px',
      'margin-top': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__footer$/,
    () => ({
      display: 'flex',
      'justify-content': 'flex-end',
      gap: 'var(--q-space-sm)',
      'margin-top': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-color__buttons$/,
    () => ({
      // Buttons
    })
  ],
  [
    /^q-color__field$/,
    () => ({
      // Field
    })
  ],
  [
    /^q-color__field-tab$/,
    () => ({
      // Field tab
    })
  ],
  [
    /^q-color__field-hex$/,
    () => ({
      // Hex field
    })
  ],
  [
    /^q-color__field-rgb$/,
    () => ({
      // RGB field
    })
  ],
  [
    /^q-color__field-hsl$/,
    () => ({
      // HSL field
    })
  ],
  [
    /^q-color__field-hsv$/,
    () => ({
      // HSV field
    })
  ],
  [
    /^q-color__field-cmyk$/,
    () => ({
      // CMYK field
    })
  ],
  [
    /^q-color__field-input$/,
    () => ({
      width: '100%'
    })
  ],
  [
    /^q-color__field-label$/,
    () => ({
      'font-size': '0.75em'
    })
  ],
  [
    /^q-color__field-prefix$/,
    () => ({
      // Prefix
    })
  ],
  [
    /^q-color__field-suffix$/,
    () => ({
      // Suffix
    })
  ]
]
