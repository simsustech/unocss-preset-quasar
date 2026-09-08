import type { Rule } from '@unocss/core'

export const qParallaxRules: Rule[] = [
  [
    /^q-parallax$/,
    () => ({
      position: 'relative',
      overflow: 'hidden'
    })
  ],
  [
    /^q-parallax__media$/,
    () => ({
      position: 'absolute',
      inset: '0'
    })
  ],
  [
    /^q-parallax__content$/,
    () => ({
      position: 'relative'
    })
  ]
]
