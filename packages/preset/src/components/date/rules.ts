import type { Rule } from '@unocss/core'

export const dateRules = [
  [
    /^q-date$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'max-width': '300px',
        'background-color': 'var(--q-surface)',
        'border-radius': 'var(--q-radius-md)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-date',
        'background-color': 'var(--q-surface-container-high)'
      }
    }
  ],
  [
    /^q-date__header$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        padding: '8px 16px'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-date__header',
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container-high)'
      }
    }
  ],
  [
    /^q-date__calendar$/,
    () => ({
      display: 'grid',
      'grid-template-columns': 'repeat(7, 1fr)',
      gap: '2px',
      padding: '8px'
    })
  ],
  [
    /^q-date__day$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'aspect-ratio': '1',
      'border-radius': '50%',
      cursor: 'pointer'
    })
  ],
  [
    /^q-date__day--selected$/,
    () => ({
      'background-color': 'var(--q-primary)',
      color: 'var(--q-on-primary)'
    })
  ],
  [
    /^q-date__day--today$/,
    () => ({
      border: '1px solid var(--q-primary)'
    })
  ],
  [
    /^q-date__calendar-item$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-date__calendar-item:after`,
        content: '""',
        position: 'absolute',
        'pointer-events': 'none',
        top: '1px',
        right: '0',
        bottom: '1px',
        left: '0',
        'border-style': 'dashed',
        'border-color': 'transparent',
        'border-width': '1px'
      }
    }
  ],
  [
    /^q-date__range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-date__range:before, .q-date__range-from:before, .q-date__range-to:before`,
        content: '""',
        'background-color': 'currentColor',
        position: 'absolute',
        top: '1px',
        bottom: '1px',
        left: '0',
        right: '0',
        opacity: '0.3'
      }
    }
  ],
  [
    /^q-date__range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-date__range:nth-child(7n-6):before, .q-date__range-from:nth-child(7n-6):before, .q-date__range-to:nth-child(7n-6):before`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
    }
  ],
  [
    /^q-date__range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-date__range:nth-child(7n):before, .q-date__range-from:nth-child(7n):before, .q-date__range-to:nth-child(7n):before`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
    }
  ],
  [
    /^q-date__range-from$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-date__range-from:before`,
        left: '50%'
      }
    }
  ],
  [
    /^q-date__range-to$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-date__range-to:before`,
        right: '50%'
      }
    }
  ],
  [
    /^q-date__edit-range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-date__edit-range:after`,
        'border-color': 'currentColor transparent'
      }
    }
  ],
  [
    /^q-date__edit-range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-date__edit-range:nth-child(7n-6):after`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
    }
  ],
  [
    /^q-date__edit-range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-date__edit-range:nth-child(7n):after`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
    }
  ],
  [
    /^q-date__edit-range-from$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-date__edit-range-from:after, .q-date__edit-range-from-to:after`,
        left: '4px',
        'border-left-color': 'currentColor',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
        'border-top-left-radius': '28px',
        'border-bottom-left-radius': '28px'
      }
    }
  ],
  [
    /^q-date__edit-range-to$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-date__edit-range-to:after, .q-date__edit-range-from-to:after`,
        right: '4px',
        'border-right-color': 'currentColor',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
        'border-top-right-radius': '28px',
        'border-bottom-right-radius': '28px'
      }
    }
  ],
  [
    /^q-date--bordered$/,
    function* () {
      yield { border: '1px solid rgba(0, 0, 0, 0.12)' }
    }
  ],
  [
    /^q-date__actions$/,
    function* () {
      yield { padding: '0 16px 16px' }
    }
  ],
  [
    /^q-date__content$/,
    function* (_, { symbols }) {
      yield { outline: '0' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        'font-weight': 'normal'
      }
    }
  ],
  [
    /^q-date__main$/,
    function* () {
      yield { outline: '0' }
    }
  ],
  [
    /^q-date__header-link$/,
    function* (_, { symbols }) {
      yield {
        opacity: '0.64',
        outline: '0',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus-visible`,
        opacity: '1',
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
    }
  ],
  [
    /^q-date__header-link--active$/,
    function* () {
      yield { opacity: '1' }
    }
  ],
  [
    /^q-date__header-subtitle$/,
    function* () {
      yield {
        'font-size': '14px',
        'line-height': '1.75',
        'letter-spacing': '0.00938em'
      }
    }
  ],
  [
    /^q-date__header-title-label$/,
    function* () {
      yield {
        'font-size': '24px',
        'line-height': '1.2',
        'letter-spacing': '0.00735em'
      }
    }
  ],
  [
    /^q-date__view$/,
    function* () {
      yield {
        height: '100%',
        width: '100%',
        'min-height': '290px',
        padding: '16px'
      }
    }
  ],
  [
    /^q-date__navigation$/,
    function* (_, { symbols }) {
      yield { height: '12.5%' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:first-child`,
        width: '8%',
        'min-width': '24px',
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:last-child`,
        width: '8%',
        'min-width': '24px',
        'justify-content': 'flex-start'
      }
    }
  ],
  [
    /^q-date__calendar-weekdays$/,
    function* (_, { symbols }) {
      yield { height: '12.5%' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        opacity: '0.38',
        'font-size': '12px'
      }
    }
  ],
  [
    /^q-date__calendar-item--out$/,
    function* () {
      yield { opacity: '0.18' }
    }
  ],
  [
    /^q-date__calendar-item--fill$/,
    function* () {
      yield { visibility: 'hidden' }
    }
  ],
  [
    /^q-date__calendar-days-container$/,
    function* () {
      yield { height: '75%', 'min-height': '192px' }
    }
  ],
  [
    /^q-date__calendar-days$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        height: '16.66% !important'
      }
    }
  ],
  [
    /^q-date__event$/,
    function* () {
      yield {
        position: 'absolute',
        bottom: '2px',
        left: '50%',
        height: '5px',
        width: '8px',
        'border-radius': '5px',
        'background-color': 'var(--q-secondary)',
        transform: 'translate3d(-50%, 0, 0)'
      }
    }
  ],
  [
    /^q-date__today$/,
    function* () {
      yield { 'box-shadow': '0 0 1px 0 currentColor' }
    }
  ],
  [
    /^q-date__years-content$/,
    function* () {
      yield { padding: '0 8px' }
    }
  ],
  [
    /^q-date__years-item$/,
    function* () {
      yield { flex: '0 0 33.3333%' }
    }
  ],
  [
    /^q-date__months-item$/,
    function* () {
      yield { flex: '0 0 33.3333%' }
    }
  ],
  [
    /^q-date--readonly$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__header`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__content`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__navigation`,
        display: 'none'
      }
    }
  ],
  [
    /^q-date--portrait$/,
    function* () {
      yield { 'flex-direction': 'column' }
    }
  ],
  [
    /^q-date--portrait-standard$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__content`,
        height: 'calc(100% - 86px)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__header`,
        'border-top-right-radius': 'inherit',
        height: '86px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__header-title`,
        'align-items': 'center',
        height: '30px'
      }
    }
  ],
  [
    /^q-date--portrait-minimal$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__content`,
        height: '100%'
      }
    }
  ],
  [
    /^q-date--landscape$/,
    function* (_, { symbols }) {
      yield {
        'flex-direction': 'row',
        'align-items': 'stretch',
        'min-width': '420px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__content`,
        height: '100%'
      }
    }
  ],
  [
    /^q-date--landscape-standard$/,
    function* (_, { symbols }) {
      yield { 'min-width': '420px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__header`,
        'border-bottom-left-radius': 'inherit',
        'min-width': '110px',
        width: '110px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__header-title`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-date__header-today`,
        'margin-top': '12px',
        'margin-left': '-8px'
      }
    }
  ],
  [
    /^q-date--landscape-minimal$/,
    function* () {
      yield { width: '310px' }
    }
  ],
  [
    /^q-date--dark$/,
    function* () {
      yield {
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)',
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
    }
  ],
  // Dark: the picker's nav buttons fade to the surface role, the selected
  // day/month/year keeps primary contrast, and the edit range uses primary.
  [
    /^q-date$/,
    function* (_, { symbols }) {
      for (const container of [
        'calendar-item--in',
        'months-item',
        'years-item'
      ]) {
        yield {
          [symbols.selector]: (sel) =>
            `.body--dark ${sel}__${container} .q-btn--flat`,
          color: 'var(--q-on-surface)'
        }
        yield {
          [symbols.selector]: (sel) =>
            `.body--dark ${sel}__${container} .q-btn`,
          color: 'var(--q-on-primary)',
          'background-color': 'var(--q-primary)'
        }
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__navigation .q-btn`,
        color: 'var(--q-on-surface)'
      }
      for (const range of [
        'edit-range',
        'edit-range-from',
        'edit-range-to',
        'edit-range-from-to'
      ]) {
        yield {
          [symbols.selector]: (sel) => `.body--dark ${sel}__${range}:after`,
          'border-color': 'var(--q-primary)'
        }
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__event`,
        'background-color': 'var(--q-primary)'
      }
    }
  ]
] as Rule[]
