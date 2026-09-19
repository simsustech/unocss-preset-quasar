import type { Rule } from '@unocss/core'

export const linearProgressRules = [
  [
    /^q-linear-progress$/,
    function* (_, { symbols }) {
      yield {
        position: 'relative',
        height: '4px',
        overflow: 'hidden',
        'border-radius': 'var(--q-radius-full)',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-linear-progress__track',
        'background-color': 'var(--q-surface-container-highest)'
      }
    }
  ],
  [
    /^q-linear-progress--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-linear-progress--reverse$/,
    () => ({
      // Reverse
    })
  ],
  [
    /^q-linear-progress--rounded$/,
    () => ({
      // Rounded
    })
  ],
  [
    /^q-linear-progress--stripe$/,
    () => ({
      // Stripe
    })
  ],
  [
    /^q-linear-progress--striped$/,
    () => ({
      // Striped
    })
  ],
  [
    /^q-linear-progress__track$/,
    () => ({
      position: 'absolute',
      inset: '0',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-linear-progress__model$/,
    () => ({
      // Model
    })
  ],
  [
    /^q-linear-progress__model--indeterminate$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:before, ${sel}:after, .q-linear-progress__model--query:before, .q-linear-progress__model--query:after`,
        background: 'currentColor',
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'transform-origin': '0 0'
      }
    }
  ],
  [
    /^q-linear-progress__model--indeterminate$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:before, .q-linear-progress__model--query:before`,
        animation:
          'q-linear-progress--indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite'
      }
    }
  ],
  [
    /^q-linear-progress__model--indeterminate$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:after, .q-linear-progress__model--query:after`,
        transform: 'translate3d(-101%, 0, 0) scale3d(1, 1, 1)',
        animation:
          'q-linear-progress--indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
        'animation-delay': '1.15s'
      }
    }
  ],
  [
    /^q-linear-progress__model--with-transition$/,
    function* () {
      yield { transition: 'transform var(--q-linear-progress-speed)' }
    }
  ],
  [
    /^q-linear-progress__track--with-transition$/,
    function* () {
      yield { transition: 'transform var(--q-linear-progress-speed)' }
    }
  ],
  [
    /^q-linear-progress__model--determinate$/,
    function* () {
      yield { background: 'currentColor' }
    }
  ],
  [
    /^q-linear-progress__model--query$/,
    function* () {
      yield { transition: 'none' }
    }
  ],
  [
    /^q-linear-progress__track--light$/,
    function* () {
      yield { background: 'rgba(0, 0, 0, 0.26)' }
    }
  ],
  [
    /^q-linear-progress__track--dark$/,
    function* () {
      yield { background: 'rgba(255, 255, 255, 0.6)' }
    }
  ],
  [
    /^q-linear-progress__stripe$/,
    function* () {
      yield {
        'background-image':
          'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0)) !important',
        'background-size': '40px 40px !important'
      }
    }
  ],
  [
    /^q-linear-progress__stripe--with-transition$/,
    function* () {
      yield { transition: 'width var(--q-linear-progress-speed)' }
    }
  ]
] as Rule[]
