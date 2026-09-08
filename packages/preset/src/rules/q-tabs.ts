import type { Rule } from '@unocss/core'

export const qTabsRules: Rule[] = [
  [
    /^q-tabs$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      position: 'relative'
    })
  ],
  [
    /^q-tabs--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-tabs--dense$/,
    () => ({
      // Dense padding
    })
  ],
  [
    /^q-tabs--vertical$/,
    () => ({
      'flex-direction': 'column'
    })
  ],
  [
    /^q-tabs--scrollable$/,
    () => ({
      overflow: 'hidden'
    })
  ],
  [
    /^q-tabs__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'overflow-x': 'auto',
      flex: '1 1 auto'
    })
  ],
  [
    /^q-tabs__content--align-center$/,
    () => ({
      'justify-content': 'center'
    })
  ],
  [
    /^q-tabs__content--align-justify$/,
    () => ({
      'justify-content': 'space-between'
    })
  ],
  [
    /^q-tabs__content--align-left$/,
    () => ({
      'justify-content': 'flex-start'
    })
  ],
  [
    /^q-tabs__content--align-right$/,
    () => ({
      'justify-content': 'flex-end'
    })
  ],
  [
    /^q-tabs__indicator$/,
    () => ({
      position: 'absolute',
      bottom: 0,
      height: '2px',
      'background-color': 'var(--q-primary)',
      transition:
        'left var(--q-duration-short) var(--q-easing-standard), width var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tab$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: 'var(--q-space-sm) var(--q-space-md)',
      'min-height': '48px',
      cursor: 'pointer',
      'user-select': 'none',
      transition: 'color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-tab--active$/,
    () => ({
      color: 'var(--q-primary)'
    })
  ],
  [
    /^q-tab--inactive$/,
    () => ({
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-tab--disabled$/,
    () => ({
      opacity: 0.4,
      cursor: 'not-allowed'
    })
  ],
  [
    /^q-tab__icon$/,
    () => ({
      'font-size': '1.5em',
      'margin-right': 'var(--q-space-xs)'
    })
  ],
  [
    /^q-tab__label$/,
    () => ({
      'font-size': '0.875em',
      'font-weight': 500
    })
  ]
]
