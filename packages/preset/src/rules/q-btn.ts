import type { Rule } from '@unocss/core'

export const qBtnRules: Rule[] = [
  // Base
  [
    /^q-btn$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': 'var(--q-btn-radius)',
      background: 'var(--q-btn-bg)',
      color: 'var(--q-btn-color)',
      'font-size': 'var(--q-btn-font-size)',
      'line-height': 'var(--q-btn-line-height)',
      'min-width': 'var(--q-btn-min-width)',
      'padding-inline': 'var(--q-btn-padding-x)',
      'text-transform': 'var(--q-btn-text-transform)',
      'box-shadow': 'var(--q-btn-shadow)',
      border: 'none',
      cursor: 'pointer',
      transition: 'box-shadow var(--q-duration-short) var(--q-easing-standard)',
      outline: 'none',
      position: 'relative',
      overflow: 'visible',
      'text-align': 'center',
      'white-space': 'nowrap',
      'user-select': 'none'
    })
  ],
  // Actionable variant
  [
    /^q-btn--actionable$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  // Standard variant
  [
    /^q-btn--standard$/,
    () => ({
      background: 'var(--q-btn-bg)',
      color: 'var(--q-btn-color)'
    })
  ],
  // Outline variant
  [
    /^q-btn--outline$/,
    () => ({
      background: 'transparent',
      color: 'var(--q-btn-outline-color)',
      border: '1px solid var(--q-btn-outline-border)'
    })
  ],
  // Flat variant
  [
    /^q-btn--flat$/,
    () => ({
      background: 'transparent',
      color: 'var(--q-btn-flat-color)',
      'padding-inline': 'var(--q-btn-flat-padding-x)'
    })
  ],
  // Push variant
  [
    /^q-btn--push$/,
    () => ({
      'border-radius': 'var(--q-btn-push-radius)',
      'border-bottom': 'var(--q-btn-push-border-bottom)'
    })
  ],
  // Rounded variant
  [
    /^q-btn--rounded$/,
    () => ({
      'border-radius': 'var(--q-btn-rounded-radius)'
    })
  ],
  // Round variant
  [
    /^q-btn--round$/,
    () => ({
      'border-radius': 'var(--q-btn-round-radius)',
      'min-width': 'auto',
      padding: '0'
    })
  ],
  // Square variant
  [
    /^q-btn--square$/,
    () => ({
      'border-radius': 'var(--q-btn-square-radius)'
    })
  ],
  // Dense variant
  [
    /^q-btn--dense$/,
    () => ({
      padding: 'var(--q-btn-dense-padding)'
    })
  ],
  // Disabled state
  [
    /^q-btn--disabled$/,
    () => ({
      opacity: '0.4',
      cursor: 'not-allowed',
      'box-shadow': 'none'
    })
  ],
  // QBtnGroup
  [
    /^q-btn-group$/,
    () => ({
      display: 'inline-flex',
      'box-shadow': 'var(--q-elevation-1)',
      'border-radius': 'var(--q-btn-radius)'
    })
  ],
  // QBtnGroup > QBtn
  [
    /^q-btn-group > .q-btn$/,
    () => ({
      'border-radius': '0',
      'box-shadow': 'none'
    })
  ],
  // QBtnToggle
  [
    /^q-btn-toggle$/,
    () => ({
      display: 'inline-flex',
      'border-radius': 'var(--q-btn-radius)'
    })
  ],
  // QBtnDropdown
  [
    /^q-btn-dropdown$/,
    () => ({
      display: 'inline-flex'
    })
  ],
  // QBtnDropdown arrow
  [
    /^q-btn-dropdown__arrow$/,
    () => ({
      'margin-left': '4px'
    })
  ],
  // QFab
  [
    /^q-fab$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': 'var(--q-fab-radius)',
      width: 'var(--q-fab-size)',
      height: 'var(--q-fab-size)',
      'min-width': 'auto',
      background: 'var(--q-fab-bg)',
      color: 'var(--q-fab-color)',
      'box-shadow': 'var(--q-elevation-3)'
    })
  ],
  // QFab mini
  [
    /^q-fab--mini$/,
    () => ({
      width: 'var(--q-fab-mini-size)',
      height: 'var(--q-fab-mini-size)'
    })
  ],
  // QBtn content
  [
    /^q-btn__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      gap: '4px',
      'z-index': '1'
    })
  ],
  // QBtn icon
  [
    /^q-btn__icon$/,
    () => ({
      'font-size': '1.4em'
    })
  ],
  // QBtn label
  [
    /^q-btn__label$/,
    () => ({
      'line-height': '1.2'
    })
  ],
  // QBtn progress
  [
    /^q-btn__progress$/,
    () => ({
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
      'border-radius': 'inherit'
    })
  ]
]
