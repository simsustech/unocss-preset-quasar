import type { Rule } from '@unocss/core'

export const radioRules = [
  [
    /^q-radio$/,
    function* (_, { symbols }) {
      // .q-radio
      yield {
        display: 'inline-flex',
        'align-items': 'center',
        cursor: 'pointer',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled) .q-radio__inner:before`,
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
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:not(.disabled):focus-visible .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__inner`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__check`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}--dark .q-radio__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (selector) => `${selector}.disabled`,
        opacity: '75% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector}:not(.disabled) .q-radio__inner:before`,
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
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector}:not(.disabled):hover .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector}:not(.disabled):focus .q-radio__inner:before`,
        transform: 'scale3d(1, 1, 1)'
      }
      // AUD-024 fold: one yield for `__inner`; the two agreed on the corner and the
      // box, so the union is what both declared.
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        border: '2px solid var(--q-outline)',
        transition: 'all var(--q-duration-short) var(--q-easing-standard)',
        'font-size': 'var(--q-size-md)',
        color: 'var(--q-on-surface-variant)',
        'border-radius': '50%',
        width: '1em',
        'min-width': '1em',
        height: '1em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--truthy`,
        'border-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner--falsy`
        // Falsy state
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'margin-left': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.8em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense:not(.disabled):focus-visible .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector}--dense:not(.disabled):hover .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.desktop ${selector}--dense:not(.disabled):focus .q-radio__inner:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-radio__inner`,
        width: '0.5em',
        'min-width': '0.5em',
        height: '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-radio__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.reverse .q-radio__label`,
        'padding-left': '0',
        'padding-right': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-radio__bg`,
        width: '100%',
        height: '100%',
        left: '0',
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-radio__inner:before`,
        opacity: '0.32 !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-radio__inner`,
        color: 'rgba(255, 255, 255, 0.7)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-radio__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bg`,
        width: '50%',
        height: '50%',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        top: '25%',
        left: '25%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bg path`,
        fill: 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native`,
        width: '1px',
        height: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.5em',
        color: 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon-container`,
        'user-select': 'none',
        '-webkit-user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__check`,
        'transform-origin': '50% 50%',
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-radio__inner--truthy ${selector}__check`,
        transform: 'scale3d(1, 1, 1)'
      }
    }
  ]
] as Rule[]
