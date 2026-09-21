import type { Rule } from '@unocss/core'

export const bannerRules = [
  [
    /^q-banner$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        padding: 'var(--q-space-sm) var(--q-space-md)',
        'min-height': 'var(--q-banner-min-height)',
        'background-color': 'var(--q-surface-container-high)',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
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
        [symbols.selector]: (sel) => `${sel}--dense`,
        padding: '8px',
        'min-height': '32px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--dense.q-banner--top-padding`,
        'padding-top': '12px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--dense .q-banner__actions.col-auto`,
        'padding-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--dense .q-banner__avatar > .q-avatar`,
        'font-size': '28px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--dense .q-banner__avatar > .q-icon`,
        'font-size': '28px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--dense .q-banner__avatar:not(:empty) + .q-banner__content`,
        'padding-left': '8px'
      }
    }
  ],
  [
    /^q-banner--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-banner--dense$/,
    () => ({
      'min-height': '32px',
      padding: '8px'
    })
  ],
  [
    /^q-banner__icon$/,
    () => ({
      'font-size': '1.5em',
      'margin-right': 'var(--q-space-md)',
      'flex-shrink': 0
    })
  ],
  [
    /^q-banner__content$/,
    () => ({
      flex: '1',
      'min-width': 0
    })
  ],
  [
    /^q-banner__actions$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)',
        'margin-left': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.col-auto`,
        'padding-left': '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.col-all .q-btn-item`,
        'margin-top': '4px',
        'margin-right': '0',
        'margin-bottom': '0',
        'margin-left': '4px'
      }
    }
  ],
  [
    /^q-banner__avatar$/,
    function* (_, { symbols }) {
      yield {
        'margin-right': 'var(--q-space-md)'
      }
      yield {
        flex: '0 1 auto !important',
        'min-width': '1px !important',
        'align-self': 'auto !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-avatar`,
        'font-size': '46px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-icon`,
        'font-size': '40px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:not(:empty) + .q-banner__content`,
        'padding-left': '16px'
      }
    }
  ],
  [
    /^q-banner--top-padding$/,
    function* () {
      yield { 'padding-top': '14px' }
    }
  ],
  [/^q-banner__content$/, () => ({ 'max-width': 'calc(100% - 56px)' })]
] as Rule[]
