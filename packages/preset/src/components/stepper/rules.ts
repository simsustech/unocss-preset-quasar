import type { Rule } from '@unocss/core'

export const stepperRules = [
  [
    /^q-stepper$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column'
    })
  ],
  [
    /^q-stepper--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-stepper--vertical$/,
    () => ({
      // Vertical layout
    })
  ],
  [
    /^q-stepper__step$/,
    () => ({
      display: 'flex',
      'align-items': 'flex-start',
      gap: 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__step--disabled$/,
    () => ({
      opacity: 0.5
    })
  ],
  [
    /^q-stepper__step--error$/,
    () => ({
      color: 'var(--q-error)'
    })
  ],
  [
    /^q-stepper__step--done$/,
    () => ({
      // Done state
    })
  ],
  [
    /^q-stepper__dot$/,
    () => ({
      width: '24px',
      height: '24px',
      'border-radius': '50%',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'var(--q-surface-container-highest)',
      'font-size': 'var(--q-stepper-font-size)',
      'font-weight': 600
    })
  ],
  [
    /^q-stepper__line$/,
    () => ({
      width: '2px',
      flex: '1',
      'background-color': 'var(--q-outline-variant)',
      'margin-top': 'var(--q-space-xs)'
    })
  ],
  [
    /^q-stepper__content$/,
    () => ({
      flex: '1',
      'padding-bottom': 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__caption$/,
    () => ({
      'font-size': '0.75em',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-stepper__nav$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between',
      'margin-top': 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__header$/,
    () => ({
      // Header
    })
  ],
  [
    /^q-stepper__step-content$/,
    () => ({
      // Step content
    })
  ],
  [
    /^q-stepper__step-inner$/,
    () => ({
      // Step inner
    })
  ],
  [
    /^q-stepper__step-icon$/,
    () => ({
      // Step icon
    })
  ],
  [
    /^q-stepper__step-label$/,
    () => ({
      // Step label
    })
  ],
  [
    /^q-stepper__step-title$/,
    () => ({
      'font-weight': 500
    })
  ],
  [
    /^q-stepper__header--standard-labels$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper__header--standard-labels .q-stepper__dot:after`,
        display: 'none'
      }
    }
  ],
  [
    /^q-stepper__header--alternative-labels$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper__header--alternative-labels .q-stepper__label:before, .q-stepper__header--alternative-labels .q-stepper__label:after`,
        display: 'none'
      }
    }
  ],
  [
    /^q-stepper__header--contracted$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper__header--contracted .q-stepper__tab:not(:last-child) .q-stepper__dot:after`,
        display: 'block !important'
      }
    }
  ],
  [
    /^q-stepper--horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--horizontal .q-stepper__tab:first-child .q-stepper__dot:before,`,
        display: 'none'
      }
    }
  ],
  [
    /^q-stepper--horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--horizontal .q-stepper__line:before, .q-stepper--horizontal .q-stepper__line:after`,
        position: 'absolute',
        top: '50%',
        height: '1px',
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.12)'
      }
    }
  ],
  [
    /^q-stepper--horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--horizontal .q-stepper__label:after, .q-stepper--horizontal .q-stepper__dot:after`,
        content: '""',
        left: '100%',
        'margin-left': '8px'
      }
    }
  ],
  [
    /^q-stepper--horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--horizontal .q-stepper__dot:before`,
        content: '""',
        right: '100%',
        'margin-right': '8px'
      }
    }
  ],
  [
    /^q-stepper--vertical$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--vertical .q-stepper__dot:before, .q-stepper--vertical .q-stepper__dot:after`,
        content: '""',
        position: 'absolute',
        left: '50%',
        width: '1px',
        height: '99999px',
        background: 'rgba(0, 0, 0, 0.12)'
      }
    }
  ],
  [
    /^q-stepper--vertical$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--vertical .q-stepper__dot:before`,
        bottom: '100%',
        'margin-bottom': '8px'
      }
    }
  ],
  [
    /^q-stepper--vertical$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--vertical .q-stepper__dot:after`,
        top: '100%',
        'margin-top': '8px'
      }
    }
  ],
  [
    /^q-stepper--vertical$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--vertical .q-stepper__step:first-child .q-stepper__dot:before,`,
        display: 'none'
      }
    }
  ],
  [
    /^q-stepper--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--dark.q-stepper--horizontal .q-stepper__line:before, .q-stepper--dark.q-stepper--horizontal .q-stepper__line:after`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-stepper--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-stepper--dark.q-stepper--vertical .q-stepper__dot:before, .q-stepper--dark.q-stepper--vertical .q-stepper__dot:after`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-stepper__title$/,
    function* () {
      yield {
        'font-size': '14px',
        'line-height': '1.285714',
        'letter-spacing': '0.1px'
      }
    }
  ],
  [
    /^q-stepper__tab$/,
    function* () {
      yield {
        padding: '8px 24px',
        'font-size': '14px',
        color: '#9e9e9e',
        'flex-direction': 'row'
      }
    }
  ],
  [
    /^q-stepper__tab--navigation$/,
    function* () {
      yield {
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'pointer'
      }
    }
  ],
  [
    /^q-stepper__tab--active$/,
    function* (_, { symbols }) {
      yield { color: 'var(--q-primary)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot`,
        'text-shadow': '0 0 0 currentColor'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__label`,
        'text-shadow': '0 0 0 currentColor'
      }
    }
  ],
  [
    /^q-stepper__tab--done$/,
    function* (_, { symbols }) {
      yield { color: 'var(--q-primary)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot`,
        'text-shadow': '0 0 0 currentColor'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__label`,
        'text-shadow': '0 0 0 currentColor'
      }
    }
  ],
  [
    /^q-stepper__tab--disabled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot`,
        background: 'rgba(0, 0, 0, 0.22)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__label`,
        color: 'rgba(0, 0, 0, 0.32)'
      }
    }
  ],
  [
    /^q-stepper__tab--error$/,
    function* () {
      yield { color: 'var(--q-negative)' }
    }
  ],
  [
    /^q-stepper__tab--error-with-icon$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot`,
        background: 'transparent !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot span`,
        color: 'currentColor',
        'font-size': '24px'
      }
    }
  ],
  [
    /^q-stepper__header--border$/,
    function* () {
      yield { 'border-bottom': '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-stepper--flat$/,
    function* () {
      yield { 'box-shadow': 'none' }
    }
  ],
  [
    /^q-stepper--bordered$/,
    function* () {
      yield { border: '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ]
] as Rule[]
