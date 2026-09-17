import type { Rule } from '@unocss/core'

export const avatarRules = [
  [
    /^q-avatar$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': 'var(--q-radius-circle)',
      overflow: 'hidden',
      'flex-shrink': 0,
      // 1em, not a fixed 40px: the reference sizes avatars as width/height 1em
      // so they scale with the font-size the context sets (48px standalone,
      // 40px in a list row, 38px in a toolbar).
      width: '1em',
      height: '1em',
      'font-size': 'var(--q-avatar-font-size)',
      'line-height': 1
    })
  ],
  [
    /^q-avatar__content$/,
    () => ({
      // Reference: `.q-avatar__content { font-size:0.5em; line-height:0.5em;
      // border-radius:inherit; height:inherit; width:inherit }`. Without the
      // 0.5em font-size the content inherits the avatar's own size (40px in a
      // list row), so the letter rendered enormous and clipped the circle.
      'font-size': '0.5em',
      'line-height': '0.5em',
      'border-radius': 'inherit',
      width: 'inherit',
      height: 'inherit',
      'object-fit': 'cover'
    })
  ],
  [
    /^q-avatar__icon$/,
    () => ({
      'font-size': 'inherit'
    })
  ],
  [
    /^q-avatar--square$/,
    () => ({
      'border-radius': 'var(--q-radius-sm)'
    })
  ]
] as Rule[]
