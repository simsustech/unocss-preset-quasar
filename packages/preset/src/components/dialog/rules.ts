import type { Rule } from '@unocss/core'

export const dialogRules = [
  [
    /^q-dialog$/,
    () => ({
      position: 'fixed',
      inset: '0',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'z-index': 6000
    })
  ],
  [
    /^q-dialog__backdrop$/,
    () => ({
      position: 'absolute',
      inset: '0',
      'background-color': 'rgba(0, 0, 0, 0.5)'
    })
  ],
  [
    /^q-dialog__inner$/,
    () => ({
      position: 'relative',
      display: 'flex',
      'flex-direction': 'column',
      'max-width': '90vw',
      'max-height': '90vh',
      'border-radius': 'var(--q-radius-lg)',
      'background-color': 'var(--q-surface)',
      'box-shadow': 'var(--q-elevation-5)'
    })
  ],
  [
    /^q-dialog__inner--maximized$/,
    () => ({
      'max-width': '100vw',
      'max-height': '100vh',
      'border-radius': '0'
    })
  ],
  [
    /^q-dialog__inner--bottom$/,
    () => ({
      'align-self': 'flex-end'
    })
  ],
  [
    /^q-dialog__inner--top$/,
    () => ({
      'align-self': 'flex-start'
    })
  ],
  [
    /^q-dialog__inner--left$/,
    () => ({
      'justify-self': 'flex-start'
    })
  ],
  [
    /^q-dialog__inner--right$/,
    () => ({
      'justify-self': 'flex-end'
    })
  ],
  [
    /^q-dialog__inner--center$/,
    () => ({
      'align-self': 'center'
    })
  ],
  [
    /^q-dialog__inner--full$/,
    () => ({
      'max-width': '100vw',
      'max-height': '100vh',
      'border-radius': '0'
    })
  ],
  [
    /^q-dialog--modal$/,
    () => ({
      // Modal dialog
    })
  ],
  [
    /^q-dialog--seamless$/,
    () => ({
      // Seamless dialog
    })
  ],
  [
    /^q-dialog--inner$/,
    () => ({
      // Inner dialog
    })
  ],
  [
    /^q-dialog__title$/,
    function* () {
      yield {
        'font-size': '1.25rem',
        'font-weight': '500',
        'line-height': '1.6',
        'letter-spacing': '0.0125em'
      }
    }
  ],
  [
    /^q-dialog__progress$/,
    function* () {
      yield { 'font-size': '4rem' }
    }
  ],
  [
    /^q-dialog__inner--square$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'border-radius': '0 !important'
      }
    }
  ],
  [
    /^q-dialog__inner--minimized$/,
    function* (_, { symbols }) {
      yield { padding: '24px' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'max-height': 'calc(var(--q-dialog-viewport-height, 100dvh) - 48px)'
      }
    }
  ],
  [
    /^q-dialog__inner--fullwidth$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        width: '100% !important',
        'max-width': '100% !important'
      }
    }
  ],
  [
    /^q-dialog__inner--fullheight$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        height: '100% !important',
        'max-height': '100% !important'
      }
    }
  ],
  [
    /^q-dialog-plugin$/,
    function* (_, { symbols }) {
      yield { width: '400px' }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-card__section + .q-card__section`,
        'padding-top': '0'
      }
    }
  ],
  [
    /^q-dialog-plugin__form$/,
    function* () {
      yield { 'max-height': '50vh' }
    }
  ],
  [
    /^q-dialog-plugin--progress$/,
    function* () {
      yield { 'text-align': 'center' }
    }
  ]
] as Rule[]
