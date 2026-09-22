import type { Rule } from '@unocss/core'

export const bannerRules = [
  [
    /^q-banner$/,
    function* (_, { symbols }) {
      // .q-banner
      yield {
        display: 'flex',
        'align-items': 'center',
        padding: 'var(--q-space-sm) var(--q-space-md)',
        'min-height': 'var(--q-banner-min-height)',
        'background-color': 'var(--q-surface-container-high)',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        'padding-inline': '16px',
        'padding-block': '8px',
        'background-color': 'transparent',
        'min-height': '54px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        padding: '8px',
        'min-height': '32px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.q-banner--top-padding`,
        'padding-top': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-banner__actions.col-auto`,
        'padding-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-banner__avatar > .q-avatar`,
        'font-size': '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-banner__avatar > .q-icon`,
        'font-size': '28px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-banner__avatar:not(:empty) + .q-banner__content`,
        'padding-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'background-color': 'var(--q-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        'min-height': '32px',
        padding: '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        'font-size': '1.5em',
        'margin-right': 'var(--q-space-md)',
        'flex-shrink': 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        flex: '1',
        'min-width': 0
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)',
        'margin-left': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions.col-auto`,
        'padding-left': '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__actions.col-all .q-btn-item`,
        'margin-top': '4px',
        'margin-right': '0',
        'margin-bottom': '0',
        'margin-left': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar`,
        'margin-right': 'var(--q-space-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar`,
        flex: '0 1 auto !important',
        'min-width': '1px !important',
        'align-self': 'auto !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar > .q-avatar`,
        'font-size': '46px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar > .q-icon`,
        'font-size': '40px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__avatar:not(:empty) + .q-banner__content`,
        'padding-left': '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--top-padding`,
        'padding-top': '14px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'max-width': 'calc(100% - 56px)'
      }
    }
  ]
] as Rule[]
