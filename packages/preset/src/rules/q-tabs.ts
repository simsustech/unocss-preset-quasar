import type { Rule } from '@unocss/core'

export const qTabsRules: Rule[] = [
  [
    /^q-tabs$/,
    () => ({
      display: 'flex',
      'align-items': 'center'
    })
  ],
  [
    /^q-tabs__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'overflow-x': 'auto'
    })
  ],
  [
    /^q-tabs__indicator$/,
    () => ({
      position: 'absolute',
      bottom: '0',
      height: '2px',
      'background-color': 'var(--q-primary)',
      transition: 'left var(--q-duration-short) var(--q-easing-standard)'
    })
  ]
]
