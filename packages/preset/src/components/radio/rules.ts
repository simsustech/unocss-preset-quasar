import type { Rule } from '@unocss/core'

export const radioRules = [
  [
    /^q-radio$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-radio__inner$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      border: '2px solid var(--q-outline)',
      'border-radius': '50%',
      transition: 'all var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-radio__inner--truthy$/,
    () => ({
      'border-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-radio__inner--falsy$/,
    () => ({
      // Falsy state
    })
  ],
  [
    /^q-radio__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-radio--dense$/,
    () => ({
      'font-size': '0.8em'
    })
  ],
  [
    /^q-radio--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-radio__bg$/,
    () => ({
      // Background
    })
  ],
  [
    /^q-radio__native$/,
    () => ({
      // Native input
    })
  ],
  [
    /^q-radio__icon$/,
    () => ({
      'font-size': '0.6em',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-radio--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-radio--dark .q-radio__inner:before`,
        opacity: '0.32 !important'
      }
    }
  ],
  [
    /^q-radio$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-radio:not(.disabled) .q-radio__inner:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'border-radius': '50%',
        background: 'currentColor',
        opacity: '0.12',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
    }
  ],
  [
    /^q-radio$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-radio:not(.disabled):focus-visible .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
    }
  ],
  [
    /^q-radio--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-radio--dense:not(.disabled):focus-visible .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
    }
  ][
    (/^q-radio__icon-container$/,
    function* () {
      yield { userSelect: 'none', WebkitUserSelect: 'none' }
    })
  ],
  [
    /^q-radio__check$/,
    function* () {
      yield {
        transformOrigin: '50% 50%',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
    }
  ]
] as Rule[]
