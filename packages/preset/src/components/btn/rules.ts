import type { Rule } from '@unocss/core'

export const btnRules = [
  [
    /^q-btn$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        position: 'relative',
        outline: 0,
        border: 0,
        'vertical-align': 'middle',
        'font-size': 'var(--q-btn-font-size)',
        'line-height': 'var(--q-btn-line-height)',
        'text-decoration': 'none',
        color: 'inherit',
        background: 'transparent',
        'font-weight': 'var(--q-btn-font-weight)',
        'text-transform': 'var(--q-btn-text-transform)',
        'text-align': 'center',
        width: 'auto',
        height: 'auto',
        cursor: 'default',
        padding: 'var(--q-btn-padding-y) var(--q-btn-padding-x)',
        'min-height': 'var(--q-btn-min-height)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        'border-radius': 'inherit',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
    }
  ],
  [
    /^q-btn--actionable$/,
    function* (_, { symbols }) {
      yield { cursor: 'pointer' }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-btn--standard:before`,
        transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-btn--standard:active:before, ${sel}.q-btn--standard.q-btn--active:before`,
        'box-shadow': 'var(--q-btn-pressed-shadow)'
      }
    }
  ],
  [
    /^q-btn--no-uppercase$/,
    () => ({
      'text-transform': 'none'
    })
  ],
  [
    /^q-btn--standard$/,
    () => ({
      background: 'var(--q-btn-bg)',
      color: 'var(--q-btn-color)'
    })
  ],
  [
    /^q-btn--outline$/,
    function* (_, { symbols }) {
      yield {
        background: 'transparent',
        color: 'var(--q-btn-outline-color)',
        border: '1px solid var(--q-btn-outline-border)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        border: '1px solid currentColor'
      }
    }
  ],
  [
    /^q-btn--flat$/,
    function* (_, { symbols }) {
      yield {
        background: 'transparent',
        color: 'var(--q-btn-flat-color)',
        'padding-inline': 'var(--q-btn-flat-padding-x)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:before, .q-btn--outline:before, .q-btn--unelevated:before`,
        'box-shadow': 'none'
      }
    }
  ],
  [
    /^q-btn--push$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': 'var(--q-btn-push-radius)',
        'border-bottom': 'var(--q-btn-push-border-bottom)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'border-bottom': '3px solid rgba(0, 0, 0, 0.15)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-btn--actionable:before`,
        transition: 'border-width 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-btn--actionable:active:before, ${sel}.q-btn--actionable.q-btn--active:before`,
        'border-bottom-width': '0'
      }
    }
  ],
  [
    /^q-btn--rounded$/,
    () => ({
      'border-radius': 'var(--q-btn-rounded-radius)'
    })
  ],
  [
    /^q-btn--round$/,
    () => ({
      'border-radius': 'var(--q-btn-round-radius)',
      'min-width': 'auto',
      padding: '0'
    })
  ],
  [
    /^q-btn--square$/,
    () => ({
      'border-radius': 'var(--q-btn-square-radius)'
    })
  ],
  [
    /^q-btn--dense$/,
    () => ({
      padding: 'var(--q-btn-dense-padding)'
    })
  ],
  [
    /^q-btn--disabled$/,
    () => ({
      opacity: '0.4',
      cursor: 'not-allowed',
      'box-shadow': 'none'
    })
  ],
  [
    /^q-btn__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      gap: 'var(--q-btn-content-gap)',
      'z-index': '1'
    })
  ],
  [
    /^q-btn__icon$/,
    () => ({
      'font-size': 'var(--q-btn-icon-font-size)'
    })
  ],
  [
    /^q-btn__label$/,
    () => ({
      'line-height': 'var(--q-btn-icon-line-height)'
    })
  ],
  [
    /^q-btn__progress$/,
    () => ({
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
      'border-radius': 'inherit'
    })
  ],
  [
    /^q-btn--rectangle$/,
    function* () {
      yield { borderRadius: '3px' }
    }
  ],
  [
    /^q-btn--fab$/,
    function* (_, { symbols }) {
      yield {
        padding: '16px',
        minHeight: '56px',
        minWidth: '56px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        margin: 'auto'
      }
    }
  ],
  [
    /^q-btn--fab-mini$/,
    function* (_, { symbols }) {
      yield {
        padding: '8px',
        minHeight: '40px',
        minWidth: '40px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        fontSize: '24px'
      }
    }
  ],
  [
    /^q-btn__content--hidden$/,
    function* () {
      yield { opacity: '0', pointerEvents: 'none' }
    }
  ],
  [
    /^q-btn__progress-indicator$/,
    function* () {
      yield {
        zIndex: '-1',
        transform: 'translateX(-100%)',
        background: 'rgba(255, 255, 255, 0.25)'
      }
    }
  ],
  [
    /^q-btn__progress--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn__progress-indicator`,
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }
  ]
] as Rule[]
