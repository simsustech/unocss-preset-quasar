import type { Rule } from '@unocss/core'

export const linearProgressRules = [
  [
    /^q-linear-progress$/,
    function* (_, { symbols }) {
      // .q-linear-progress
      yield {
        // Reference `.q-linear-progress { font-size: 4px; … height: 1em }`: the
        // bar's thickness is em-based so a taller bar only needs `font-size`.
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '4px',
        color:
          'color-mix(in oklab, var(--light-primary) var(--un-text-opacity), transparent)',
        width: '100%',
        height: '1em',
        transform: 'scale3d(1, 1, 1)',
        position: 'relative',
        overflow: 'hidden',
        'border-radius': 'var(--q-radius-full)',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-linear-progress__track',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'background-color': 'var(--q-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--reverse .q-linear-progress__model`,
        'transform-origin': '0 100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--reverse .q-linear-progress__track`,
        'transform-origin': '0 100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rounded`
        // Rounded
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--stripe`
        // Stripe
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--striped`
        // Striped
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track`,
        position: 'absolute',
        inset: '0',
        'transform-origin': '0 0',
        // The track is the unfilled rail, not the fill: `--q-primary` painted
        // the whole rail with the accent colour.
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track--light`,
        'background-color': 'var(--light-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track--dark`,
        'background-color': 'var(--dark-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__model`,
        // Reference `.q-linear-progress__model { transform-origin: 0 0 }`.
        'transform-origin': '0 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__model--with-transition`,
        transition: 'transform var(--q-linear-progress-speed)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__track--with-transition`,
        transition: 'transform var(--q-linear-progress-speed)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__model--determinate`,
        'background-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__model--query`,
        transition: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__stripe`,
        'background-image':
          'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0)) !important',
        'background-size': '40px 40px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__stripe--with-transition`,
        transition: 'width var(--q-linear-progress-speed)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__model--indeterminate`,
        // Reference `.q-linear-progress__model--indeterminate { transition: none }`.
        transition: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__model--indeterminate:before, ${selector}__model--indeterminate:after, .q-linear-progress__model--query:before, .q-linear-progress__model--query:after`,
        'background-color': 'currentColor',
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'transform-origin': '0 0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__model--indeterminate:before, .q-linear-progress__model--query:before`,
        animation:
          'q-linear-progress--indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__model--indeterminate:after, .q-linear-progress__model--query:after`,
        transform: 'translate3d(-101%, 0, 0) scale3d(1, 1, 1)',
        animation:
          'q-linear-progress--indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
        'animation-delay': '1.15s'
      }
    }
  ]
] as Rule[]
