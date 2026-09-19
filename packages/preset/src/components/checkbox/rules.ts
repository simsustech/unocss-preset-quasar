import type { Rule } from '@unocss/core'

export const checkboxRules = [
  [
    /^q-checkbox$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-checkbox__inner$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      border: '2px solid var(--q-outline)',
      'border-radius': 'var(--q-radius-xs)',
      transition: 'all var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-checkbox__inner--truthy$/,
    () => ({
      'border-color': 'var(--q-primary)',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-checkbox__inner--indet$/,
    () => ({
      'border-color': 'var(--q-primary)',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-checkbox__icon$/,
    () => ({
      color: 'var(--q-on-primary)',
      'font-size': '0.7em'
    })
  ],
  [
    /^q-checkbox__label$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-checkbox--dense$/,
    () => ({
      'font-size': '0.8em'
    })
  ],
  [
    /^q-checkbox--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-checkbox__bg$/,
    () => ({
      // Background
    })
  ],
  [
    /^q-checkbox__icon-container$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center'
    })
  ],
  [
    /^q-checkbox__native$/,
    () => ({
      // Native input
    })
  ],
  [
    /^q-checkbox__svg$/,
    () => ({
      width: '1em',
      height: '1em'
    })
  ],
  [
    /^q-checkbox__truthy$/,
    () => ({
      // Truthy state
    })
  ],
  [
    /^q-checkbox--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-checkbox--dark .q-checkbox__inner:before`,
        opacity: '0.32 !important'
      }
    }
  ],
  [
    /^q-checkbox$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-checkbox:not(.disabled) .q-checkbox__inner:before`,
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
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1)'
      }
    }
  ],
  [
    /^q-checkbox$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-checkbox:not(.disabled):focus-visible .q-checkbox__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
    }
  ],
  [
    /^q-checkbox--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-checkbox--dense:not(.disabled):focus-visible .q-checkbox__inner:before`,
        transform: 'scale3d(1.4, 1.4, 1)'
      }
    }
  ],
  [
    /^q-checkbox__indet$/,
    function* () {
      yield {
        fill: 'currentColor',
        'transform-origin': '50% 50%',
        transform: 'rotate(-280deg) scale(0)'
      }
    }
  ],
  // Dark: the truthy/indeterminate marks take the primary role, both on the
  // base class and under the explicit `.q-checkbox--dark` scope.
  [
    /^q-checkbox$/,
    function* (_, { symbols }) {
      for (const state of ['--truthy', '--indet']) {
        yield {
          [symbols.selector]: (sel) => `.body--dark ${sel}__inner${state}`,
          color: 'var(--q-primary)'
        }
        yield {
          [symbols.selector]: (sel) =>
            `.body--dark ${sel}--dark .q-checkbox__inner${state}`,
          color: 'var(--q-primary)'
        }
      }
    }
  ]
] as Rule[]
