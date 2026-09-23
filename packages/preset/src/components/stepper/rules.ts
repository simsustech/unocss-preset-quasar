import type { Rule } from '@unocss/core'

/**
 * The stepper's surfaces are stated as colour roles rather than literals:
 * `--q-surface` and `--q-on-surface-variant` already flip with the body class,
 * so the dark block only restates what has no light counterpart (the inverted
 * box shadow, the translucent disabled greys and the dark `--dark` variants).
 */
const surfaceMix =
  'color-mix(in oklab, var(--q-surface) var(--q-bg-opacity), transparent)'
const darkDisabledText =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--q-text-opacity), transparent)'
const darkDisabledLabel =
  'color-mix(in oklab, rgba(255, 255, 255, 0.54) var(--q-text-opacity), transparent)'
const darkDisabledDot =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--q-bg-opacity), transparent)'
const darkBorder =
  'color-mix(in oklab, rgba(255, 255, 255, 0.28) var(--q-border-opacity), transparent)'
const lightBorder =
  'color-mix(in oklab, rgba(0,0,0,0.12) var(--q-border-opacity), transparent)'
const lightBoxShadow =
  '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
const darkBoxShadow =
  '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'

export const stepperRules = [
  [
    /^q-stepper$/,
    function* (_, { symbols }) {
      // .q-stepper
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color': surfaceMix,
        'box-shadow': lightBoxShadow
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-surface)',
        'box-shadow': darkBoxShadow
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__label`,
        'background-color': 'var(--q-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__tab--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'box-shadow': darkBoxShadow
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-stepper__tab--disabled`,
        color: darkDisabledText
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-stepper__tab--disabled .q-stepper__dot`,
        'background-color': darkDisabledDot
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-stepper__tab--disabled .q-stepper__label`,
        color: darkDisabledLabel
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-stepper__header--border`,
        'border-color': darkBorder
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-stepper__dot span`,
        color: 'color-mix(in oklab, #000 var(--q-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-stepper--bordered`,
        'border-color': darkBorder
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-stepper--horizontal .q-stepper__line:before, ${selector}--dark.q-stepper--horizontal .q-stepper__line:after`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-stepper--vertical .q-stepper__dot:before, ${selector}--dark.q-stepper--vertical .q-stepper__dot:after`,
        background: 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--vertical`,
        'padding-inline': '0',
        'padding-block': 'var(--q-space-lg)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__dot`,
        'margin-right': '12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step-inner`,
        'padding-top': '0',
        'padding-right': '24px',
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '32px',
        'padding-left': '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step:last-child .q-stepper__dot:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step:last-child .q-stepper__step-inner`,
        'padding-bottom': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__tab`,
        'padding-inline': 'var(--q-space-xl)',
        'padding-block': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__title`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical > .q-stepper__nav`,
        'padding-inline': 'var(--q-space-xl)',
        'padding-top': 'var(--q-space-xl)',
        'padding-bottom': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__dot:before, ${selector}--vertical .q-stepper__dot:after`,
        content: '""',
        position: 'absolute',
        left: '50%',
        width: '1px',
        height: '99999px',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__dot:before`,
        bottom: '100%',
        'margin-bottom': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__dot:after`,
        top: '100%',
        'margin-top': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step:first-child .q-stepper__dot:before`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step`,
        display: 'flex',
        'align-items': 'flex-start',
        gap: 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step--disabled`,
        opacity: 0.5
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step--error`,
        color: 'var(--q-error)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step--done`
        // Done state
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__dot`,
        'font-size': 'var(--q-body-medium-size)',
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
        [symbols.selector]: (selector) => `${selector}__dot span`,
        color: 'color-mix(in oklab, #fff var(--q-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__line`,
        width: '2px',
        flex: '1',
        'background-color': 'var(--q-outline-variant)',
        'margin-top': 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        flex: '1',
        'padding-bottom': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__caption`,
        'font-size': 'var(--q-body-small-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.16667',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__nav`,
        display: 'flex',
        'justify-content': 'space-between',
        'padding-top': 'var(--q-space-xl)',
        'margin-top': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step-content`
        // Step content
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step-inner`
        // Step inner
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step-icon`
        // Step icon
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step-label`
        // Step label
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step-title`,
        'font-weight': 500
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'background-color': surfaceMix
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--standard-labels .q-stepper__dot:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--standard-labels .q-stepper__tab`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '72px',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--standard-labels .q-stepper__tab:first-child`,
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--standard-labels .q-stepper__tab:last-child`,
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--standard-labels .q-stepper__tab:only-child`,
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--alternative-labels .q-stepper__label:before, ${selector}__header--alternative-labels .q-stepper__label:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--alternative-labels .q-stepper__dot`,
        'margin-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--alternative-labels .q-stepper__label`,
        'margin-top': '8px',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--alternative-labels .q-stepper__tab`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-inline': '32px',
        'padding-block': 'var(--q-space-xl)',
        'flex-direction': 'column',
        'min-height': '104px',
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header--contracted .q-stepper__tab:not(:last-child) .q-stepper__dot:after`,
        display: 'block !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__line`,
        // Quasar's own declaration (quasar.css: `.q-stepper__tab--horizontal
        // .q-stepper__line { contain: layout }`). The reference's four-slot
        // `var(--un-contain-*)` form is a wind4 `contain-layout` utility
        // emission whose `@property` companions were never ported, so with only
        // `--un-contain-size` set it is invalid at computed-value time and
        // computes to `none`.
        contain: 'layout'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab:first-child .q-stepper__dot:before, ${selector}--horizontal .q-stepper__tab:last-child .q-stepper__label`,
        // quasar: the first tab drops its connector and the last its label in
        // the horizontal axis (quasar.css `.q-stepper__tab--horizontal:…`).
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step`,
        // quasar: quasar.css `.q-stepper__step--vertical { overflow: hidden }`
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step-inner`,
        // quasar: quasar.css `.q-stepper__step-inner--vertical`'s box
        padding: '0 24px 32px 60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--vertical .q-stepper__step:last-child .q-stepper__step-inner`,
        // quasar: quasar.css `.q-stepper__step--vertical:last-child … { padding-bottom: 8px }`
        'padding-bottom': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__step-content--leaving`,
        // quasar: quasar.css `.q-stepper__step-content--leaving { top: 0; left: 0 }`
        top: '0',
        left: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__step-inner`,
        padding: '24px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab`,
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab:first-child`,
        'border-top-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab:last-child`,
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab:last-child .q-stepper__dot:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab:last-child .q-stepper__label:after`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal > .q-stepper__nav`,
        'padding-inline': 'var(--q-space-xl)',
        'padding-top': '0',
        'padding-bottom': 'var(--q-space-xl)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__tab:first-child .q-stepper__dot:before`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__line:before, ${selector}--horizontal .q-stepper__line:after`,
        position: 'absolute',
        top: '50%',
        height: '1px',
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__label:after, ${selector}--horizontal .q-stepper__dot:after`,
        content: '""',
        left: '100%',
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--horizontal .q-stepper__dot:before`,
        content: '""',
        right: '100%',
        'margin-right': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title`,
        'font-size': 'var(--q-body-medium-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.285714',
        'letter-spacing': '0.1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tab`,
        'font-size': 'var(--q-body-medium-size)',
        'padding-inline': 'var(--q-space-xl)',
        'padding-block': 'var(--q-space-sm)',
        'flex-direction': 'row',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tab--navigation`,
        'user-select': 'none',
        '-webkit-user-select': 'none',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tab--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--active .q-stepper__dot`,
        'text-shadow': '0 0 0 currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--active .q-stepper__label`,
        'text-shadow': '0 0 0 currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tab--done`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--done .q-stepper__dot`,
        'text-shadow': '0 0 0 currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--done .q-stepper__label`,
        'text-shadow': '0 0 0 currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--disabled .q-stepper__dot`,
        background: 'rgba(0, 0, 0, 0.22)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--disabled .q-stepper__label`,
        color: 'rgba(0, 0, 0, 0.32)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__tab--error`,
        color: 'var(--q-negative)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--error-with-icon .q-stepper__dot`,
        'background-color': 'transparent !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__tab--error-with-icon .q-stepper__dot span`,
        color: 'currentColor',
        'font-size': 'var(--q-size-icon)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header--border`,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flat`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-color': lightBorder,
        'border-style': 'solid',
        'border-width': '1px'
      }
    }
  ]
] as Rule[]
