import type { Rule } from '@unocss/core'

export const qAvatarRules: Rule[] = [
  [
    /^q-avatar$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': 'var(--q-radius-circle)',
      overflow: 'hidden',
      'flex-shrink': '0',
      width: '40px',
      height: '40px',
      'font-size': '16px',
      'line-height': '1'
    })
  ],
  [
    /^q-avatar__content$/,
    () => ({
      width: '100%',
      height: '100%',
      'object-fit': 'cover'
    })
  ],
  [
    /^q-avatar__icon$/,
    () => ({
      'font-size': 'inherit'
    })
  ]
]
