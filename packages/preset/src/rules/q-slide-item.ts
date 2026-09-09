import type { Rule } from '@unocss/core'

export const qSlideItemRules: Rule[] = [
  [
    /^q-slide-item$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-slide-item--active$/,
    () => ({
      // Active
    })
  ],
  [
    /^q-slide-item__content$/,
    () => ({
      position: 'relative',
      'z-index': 1,
      'background-color': 'var(--q-surface)',
      transition: 'transform var(--q-duration-medium) var(--q-easing-standard)'
    })
  ],
  [
    /^q-slide-item__left$/,
    () => ({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      'align-items': 'center'
    })
  ],
  [
    /^q-slide-item__right$/,
    () => ({
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      'align-items': 'center'
    })
  ]
]
