import type { Rule } from '@unocss/core'

/**
 * The stepper's surfaces are stated as colour roles rather than literals:
 * `--q-surface` and `--q-on-surface-variant` already flip with the body class,
 * so the dark block only restates what has no light counterpart (the inverted
 * box shadow, the translucent disabled greys and the dark `--dark` variants).
 */
const surfaceMix =
  'color-mix(in oklab, var(--q-surface) var(--un-bg-opacity), transparent)'
const darkDisabledText =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-text-opacity), transparent)'
const darkDisabledLabel =
  'color-mix(in oklab, rgba(255, 255, 255, 0.54) var(--un-text-opacity), transparent)'
const darkDisabledDot =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-bg-opacity), transparent)'
const darkBorder =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--un-border-opacity), transparent)'
const lightBorder =
  'color-mix(in oklab, rgba(0,0,0,0.12) var(--un-border-opacity), transparent)'
const lightBoxShadow =
  '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
const darkBoxShadow =
  '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'

export const stepperRules = [
  [
    /^q-stepper$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'border-radius': '4px',
        'background-color': surfaceMix,
        'box-shadow': lightBoxShadow
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-surface)',
        'box-shadow': darkBoxShadow
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__label`,
        'background-color': 'var(--q-surface)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__tab--active`,
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-stepper--dark$/,
    function* (_, { symbols }) {
      yield {
        'box-shadow': darkBoxShadow
      }
      // Disabled tabs and the border rows are the two places the dark stepper
      // states a translucent grey that no surface role covers.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab--disabled`,
        color: darkDisabledText
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__tab--disabled .q-stepper__dot`,
        'background-color': darkDisabledDot
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__tab--disabled .q-stepper__label`,
        color: darkDisabledLabel
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__header--border`,
        'border-color': darkBorder
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot span`,
        color: 'color-mix(in oklab, #000 var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-stepper--bordered`,
        'border-color': darkBorder
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-stepper--horizontal .q-stepper__line:before, ${sel}.q-stepper--horizontal .q-stepper__line:after`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-stepper--vertical .q-stepper__dot:before, ${sel}.q-stepper--vertical .q-stepper__dot:after`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  [
    /^q-stepper--vertical$/,
    function* (_, { symbols }) {
      yield {
        'padding-inline': '0',
        'padding-block': '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot`,
        'margin-right': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__step`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__step-inner`,
        'padding-top': '0',
        'padding-right': '24px',
        'padding-bottom': '32px',
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__step:last-child .q-stepper__dot:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__step:last-child .q-stepper__step-inner`,
        'padding-bottom': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab`,
        'padding-inline': '24px',
        'padding-block': '12px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__title`,
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-stepper__nav`,
        'padding-inline': '24px',
        'padding-top': '24px',
        'padding-bottom': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__dot:before, ${sel} .q-stepper__dot:after`,
        content: '""',
        position: 'absolute',
        left: '50%',
        width: '1px',
        height: '99999px',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot:before`,
        bottom: '100%',
        'margin-bottom': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot:after`,
        top: '100%',
        'margin-top': '8px'
      }
      // A trailing comma makes the whole selector list invalid and the browser
      // drops the rule, so the connector hangs off the first step.
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__step:first-child .q-stepper__dot:before`,
        display: 'none'
      }
    }
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
    function* (_, { symbols }) {
      yield {
        'font-size': '14px',
        'margin-right': '8px',
        'border-radius': '50%',
        'background-color': 'currentColor',
        flex: '0 1 auto !important',
        width: '24px',
        'min-width': '24px',
        height: '24px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-weight': 600
      }
      yield {
        [symbols.selector]: (sel) => `${sel} span`,
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
      }
    }
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
      'font-size': '12px',
      'line-height': '1.16667',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-stepper__nav$/,
    () => ({
      display: 'flex',
      'justify-content': 'space-between',
      'padding-top': '24px',
      'margin-top': 'var(--q-space-md)'
    })
  ],
  [
    /^q-stepper__header$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
    }
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
    /^q-stepper__label$/,
    () => ({
      'background-color': surfaceMix
    })
  ],
  [
    /^q-stepper__header--standard-labels$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab`,
        'min-height': '72px',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab:first-child`,
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab:last-child`,
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab:only-child`,
        'justify-content': 'center'
      }
    }
  ],
  [
    /^q-stepper__header--alternative-labels$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__label:before, ${sel} .q-stepper__label:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot`,
        'margin-right': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__label`,
        'margin-top': '8px',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab`,
        'padding-inline': '32px',
        'padding-block': '24px',
        'flex-direction': 'column',
        'min-height': '104px',
        'justify-content': 'flex-start'
      }
    }
  ],
  [
    /^q-stepper__header--contracted$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__tab:not(:last-child) .q-stepper__dot:after`,
        display: 'block !important'
      }
    }
  ],
  [
    /^q-stepper--horizontal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__line`,
        contain:
          'var(--un-contain-size) var(--un-contain-layout) var(--un-contain-paint) var(--un-contain-style)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__step-inner`,
        padding: '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab:first-child`,
        'border-top-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__tab:last-child`,
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__tab:last-child .q-stepper__dot:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__tab:last-child .q-stepper__label:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-stepper__nav`,
        'padding-inline': '24px',
        'padding-top': '0',
        'padding-bottom': '24px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__tab:first-child .q-stepper__dot:before`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__line:before, ${sel} .q-stepper__line:after`,
        position: 'absolute',
        top: '50%',
        height: '1px',
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-stepper__label:after, ${sel} .q-stepper__dot:after`,
        content: '""',
        left: '100%',
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-stepper__dot:before`,
        content: '""',
        right: '100%',
        'margin-right': '8px'
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
        'font-size': '14px',
        'padding-inline': '24px',
        'padding-block': '8px',
        'flex-direction': 'row',
        color: 'var(--q-on-surface-variant)'
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
        'background-color': 'transparent !important'
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
      yield {
        'border-color': lightBorder,
        'border-style': 'solid',
        'border-width': '1px'
      }
    }
  ]
] as Rule[]
