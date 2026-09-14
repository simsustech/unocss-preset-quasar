import type { Rule } from '@unocss/core'

export const uploaderRules = [
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
  ],
  [
    /^q-uploader__file$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-uploader__file:before`,
        content: '""',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'pointer-events': 'none',
        background: 'currentColor',
        opacity: '0.04'
      }
    }
  ],
  [
    /^q-uploader__file--img$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-uploader__file--img:before`,
        content: 'none'
      }
    }
  ],
  [
    /^q-uploader--bordered$/,
    function* () {
      yield { border: '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-uploader__input$/,
    function* (_, { symbols }) {
      yield {
        opacity: '0',
        width: '100%',
        height: '100%',
        cursor: 'pointer !important',
        zIndex: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}::file-selector-button`,
        cursor: 'pointer'
      }
    }
  ],
  [
    /^q-uploader__spinner$/,
    function* () {
      yield { fontSize: '24px', marginRight: '4px' }
    }
  ],
  [
    /^q-uploader__overlay$/,
    function* () {
      yield {
        fontSize: '36px',
        color: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
      }
    }
  ],
  [
    /^q-uploader__file-header$/,
    function* () {
      yield {
        position: 'relative',
        padding: '4px 8px',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit'
      }
    }
  ],
  [
    /^q-uploader__file-header-content$/,
    function* () {
      yield { paddingRight: '8px' }
    }
  ],
  [
    /^q-uploader__file-status$/,
    function* () {
      yield { fontSize: '24px', marginRight: '4px' }
    }
  ],
  [
    /^q-uploader__title$/,
    function* () {
      yield {
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '1.285714',
        wordBreak: 'break-word'
      }
    }
  ],
  [
    /^q-uploader__subtitle$/,
    function* () {
      yield { fontSize: '12px', lineHeight: '1.5' }
    }
  ],
  [
    /^q-uploader--disable$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-uploader__header`,
        pointerEvents: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-uploader__list`,
        pointerEvents: 'none'
      }
    }
  ]
] as Rule[]
