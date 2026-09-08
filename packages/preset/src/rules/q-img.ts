import type { Rule } from '@unocss/core'

export const qImgRules: Rule[] = [
  [
    /^q-img$/,
    () => ({
      display: 'inline-block',
      overflow: 'hidden',
      position: 'relative'
    })
  ],
  [
    /^q-img__image$/,
    () => ({
      width: '100%',
      height: '100%',
      'object-fit': 'cover'
    })
  ],
  [
    /^q-img__content$/,
    () => ({
      position: 'absolute',
      inset: '0',
      overflow: 'auto'
    })
  ],
  [
    /^q-img--contain$/,
    () => ({
      'object-fit': 'contain'
    })
  ]
]
