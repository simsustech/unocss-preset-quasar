import type { Rule } from '@unocss/core'

export const qCardRules: Rule[] = [
  [
    /^q-card$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'border-radius': 'var(--q-radius-md)',
      'background-color': 'var(--q-surface)',
      'box-shadow': 'var(--q-elevation-1)',
      position: 'relative'
    })
  ],
  [
    /^q-card--dark$/,
    () => ({
      'background-color': 'var(--q-surface-variant)'
    })
  ],
  [
    /^q-card--horizontal$/,
    () => ({
      'flex-direction': 'row'
    })
  ],
  [
    /^q-card__section$/,
    () => ({
      padding: 'var(--q-space-md)'
    })
  ],
  [
    /^q-card__section--vertical$/,
    () => ({
      padding: 'var(--q-space-sm) var(--q-space-md)'
    })
  ],
  [
    /^q-card__section--img$/,
    () => ({
      display: 'block',
      'object-fit': 'cover'
    })
  ],
  [
    /^q-card__actions$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-sm)',
      padding: 'var(--q-space-sm) var(--q-space-md)'
    })
  ],
  [
    /^q-card__actions--horizontal$/,
    () => ({
      'flex-direction': 'row'
    })
  ],
  [
    /^q-card__actions--vertical$/,
    () => ({
      'flex-direction': 'column'
    })
  ],
  [/^q-card__actions--align-start$/, () => ({ justifyContent: 'flex-start' })],
  [/^q-card__actions--align-center$/, () => ({ justifyContent: 'center' })],
  [/^q-card__actions--align-end$/, () => ({ justifyContent: 'flex-end' })],
  [
    /^q-card__actions--align-between$/,
    () => ({ justifyContent: 'space-between' })
  ],
  [
    /^q-card__actions--align-around$/,
    () => ({ justifyContent: 'space-around' })
  ],
  [
    /^q-card__actions--align-evenly$/,
    () => ({ justifyContent: 'space-evenly' })
  ],
  [/^q-card__actions--items-start$/, () => ({ alignItems: 'flex-start' })],
  [/^q-card__actions--items-center$/, () => ({ alignItems: 'center' })],
  [/^q-card__actions--items-end$/, () => ({ alignItems: 'flex-end' })],
  [/^q-card__actions--items-stretch$/, () => ({ alignItems: 'stretch' })],
  [/^q-card__actions--items-baseline$/, () => ({ alignItems: 'baseline' })]
]
