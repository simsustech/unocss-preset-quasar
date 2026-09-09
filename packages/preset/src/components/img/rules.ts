import type { Rule } from '@unocss/core'

export const imgRules = [
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
    /^q-img__error$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'var(--q-surface-container-high)',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-img__loading$/,
    () => ({
      position: 'absolute',
      inset: 0,
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'var(--q-surface-container-high)'
    })
  ],
  [
    /^q-img--contain$/,
    () => ({
      'object-fit': 'contain'
    })
  ],
  [
    /^q-img--no-menu$/,
    () => ({
      // No context menu
    })
  ],
  [
    /^q-img--rounded$/,
    () => ({
      'border-radius': 'var(--q-radius-md)'
    })
  ][
    (/^q-img__container$/,
    function* () {
      yield { borderRadius: 'inherit', fontSize: '0' }
    })
  ],
  [
    /^q-img__image--with-transition$/,
    function* () {
      yield { transition: 'opacity 0.28s ease-in' }
    }
  ],
  [
    /^q-img__image--loaded$/,
    function* () {
      yield { opacity: '1' }
    }
  ]
] as Rule[]
