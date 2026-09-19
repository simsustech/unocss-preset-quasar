import type { Rule } from '@unocss/core'

export const cardRules = [
  [
    /^q-card$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        padding: 'var(--q-space-lg)',
        'border-radius': 'var(--q-card-radius)',
        'background-color': 'var(--q-card-surface)',
        'box-shadow': 'var(--q-elevation-1)',
        position: 'relative'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-card',
        'background-color': 'var(--q-surface-container-low)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-card--bordered',
        'border-color': 'var(--q-outline)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-dialog__inner>.q-card',
        'background-color': 'var(--q-surface-container-high)'
      }
    }
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
  [
    /^q-card__actions--align-start$/,
    () => ({ 'justify-content': 'flex-start' })
  ],
  [/^q-card__actions--align-center$/, () => ({ 'justify-content': 'center' })],
  [/^q-card__actions--align-end$/, () => ({ 'justify-content': 'flex-end' })],
  [
    /^q-card__actions--align-between$/,
    () => ({ 'justify-content': 'space-between' })
  ],
  [
    /^q-card__actions--align-around$/,
    () => ({ 'justify-content': 'space-around' })
  ],
  [
    /^q-card__actions--align-evenly$/,
    () => ({ 'justify-content': 'space-evenly' })
  ],
  [/^q-card__actions--items-start$/, () => ({ 'align-items': 'flex-start' })],
  [/^q-card__actions--items-center$/, () => ({ 'align-items': 'center' })],
  [/^q-card__actions--items-end$/, () => ({ 'align-items': 'flex-end' })],
  [/^q-card__actions--items-stretch$/, () => ({ 'align-items': 'stretch' })],
  [/^q-card__actions--items-baseline$/, () => ({ 'align-items': 'baseline' })],
  [
    /^q-card--bordered$/,
    function* () {
      yield { border: '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-card__section--vert$/,
    function* () {
      yield { padding: '16px' }
    }
  ],
  [
    /^q-card__section--horiz$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div:not(.q--avoid-card-border)`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > img:not(.q--avoid-card-border)`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > div:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > img:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > div:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > img:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:not(.q--avoid-card-border)`,
        'border-top': '0',
        'border-bottom': '0',
        'box-shadow': 'none'
      }
    }
  ],
  [
    /^q-card__actions--horiz$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-item`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group + .q-btn-item`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-group`,
        'margin-left': '8px'
      }
    }
  ],
  [
    /^q-card__actions--vert$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item.q-btn--round`,
        'align-self': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-item`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group + .q-btn-item`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-group`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group > .q-btn-item`,
        'flex-grow': '1'
      }
    }
  ]
] as Rule[]
