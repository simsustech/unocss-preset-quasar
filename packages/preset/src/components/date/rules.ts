import type { Rule } from '@unocss/core'

export const dateRules = [
  [
    /^q-date$/,
    function* (_, { symbols }) {
      yield {
        // The reference's own values are in the yields below — `display:
        // inline-flex`, `max-width: 100%` and the `surface-container-high` mix.
        // The copies that used to sit here won after the fold and changed the
        // picker's layout.
        'flex-direction': 'column',
        // 4px, not `var(--q-radius-md)` (12px in md3): the reference states the
        // date picker's corner as 4px and the token would round it threefold.
        'border-radius': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-surface-container-high)'
      }
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
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        'border-radius': '4px',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)',
        display: 'inline-flex',
        width: '290px',
        'min-width': '290px',
        'max-width': '100%',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--dark`,
        color: 'var(--q-on-surface)',
        'border-color': 'rgba(255, 255, 255, 0.28)',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container) var(--un-bg-opacity), transparent)',
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--bordered`,
        'border-color': 'rgba(0, 0, 0, 0.12)',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--portrait`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape`,
        'flex-direction': 'row',
        'min-width': '420px',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape > div`,
        display: 'flex',
        flex: '1 1 auto',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--landscape .q-date__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--portrait-minimal .q-date__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--landscape-standard .q-date__header`,
        'max-width': '110px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--landscape-standard .q-date__header-title`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--landscape-standard .q-date__header-today`,
        'margin-top': '12px',
        'margin-left': '-8px'
      }
    }
  ],
  [
    /^q-date__header$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between'
        // padding comes from the yield below: the reference's 12px
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        padding: '12px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        'border-top-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)'
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
        [symbols.selector]: (sel) => `${sel}:after`,
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
      yield {
        'vertical-align': 'middle',
        display: 'inline-flex',
        width: '14.285% !important',
        height: '12.5% !important',
        'align-items': 'center',
        'justify-content': 'center',
        position: 'relative'
      }
      // The dashed drop-target outline is painted by a pseudo element, with a
      // radius that matches the circular day cell it wraps.
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-width': '1px',
        'border-color': 'transparent',
        'border-style': 'dashed',
        'pointer-events': 'none',
        content: '""',
        top: '1px',
        right: '0',
        bottom: '1px',
        left: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > button`,
        'line-height': '22px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'line-height': '30px',
        'text-align': 'center',
        'border-radius': '50%',
        width: '30px',
        height: '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} button`,
        'border-radius': '50%',
        width: '30px',
        height: '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--out`,
        opacity: '0.18'
      }
    }
  ],
  [
    /^q-date__range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:before, .q-date__range-from:before, .q-date__range-to:before`,
        content: '""',
        'background-color': 'currentColor',
        position: 'absolute',
        top: '1px',
        bottom: '1px',
        left: '0',
        right: '0',
        opacity: '0.3'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:nth-child(7n-6):before, .q-date__range-from:nth-child(7n-6):before, .q-date__range-to:nth-child(7n-6):before`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:nth-child(7n):before, .q-date__range-from:nth-child(7n):before, .q-date__range-to:nth-child(7n):before`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'background-color': 'currentColor',
        opacity: '30%',
        content: '""',
        top: '1px',
        bottom: '1px',
        left: '0',
        right: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n-6):before`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n):before`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
    }
  ],
  [
    /^q-date__range-from$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        left: '50%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'background-color': 'currentColor',
        opacity: '30%',
        content: '""',
        top: '1px',
        bottom: '1px',
        left: '50%',
        right: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n-6):before`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n):before`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
    }
  ],
  [
    /^q-date__range-to$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        right: '50%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'background-color': 'currentColor',
        opacity: '30%',
        content: '""',
        top: '1px',
        bottom: '1px',
        left: '0',
        right: '50%',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n-6):before`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n):before`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
    }
  ],
  [
    /^q-date__edit-range$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-color': 'currentColor transparent'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n-6):after`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n):after`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n-6):after`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:nth-child(7n):after`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}:after`,
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)'
      }
    }
  ],
  [
    /^q-date__edit-range-from$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:after, .q-date__edit-range-from-to:after`,
        left: '4px',
        'border-left-color': 'currentColor',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
        'border-top-left-radius': '28px',
        'border-bottom-left-radius': '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-right-width': '0px',
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)',
        'border-top-left-radius': '28px',
        'border-bottom-left-radius': '28px',
        left: '4px'
      }
    }
  ],
  [
    /^q-date__edit-range-to$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:after, .q-date__edit-range-from-to:after`,
        right: '4px',
        'border-right-color': 'currentColor',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
        'border-top-right-radius': '28px',
        'border-bottom-right-radius': '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)',
        'border-left-color': 'transparent',
        'border-top-right-radius': '28px',
        'border-bottom-right-radius': '28px',
        right: '4px'
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
    function* (_, { symbols }) {
      yield { padding: '0 16px 16px' }
      yield {
        'padding-inline': '16px',
        'padding-top': '0',
        'padding-bottom': '16px'
      }
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
      yield { 'outline-style': 'solid', 'outline-width': '0px' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        'font-weight': 'var(--fontWeight-normal)'
      }
    }
  ],
  [
    /^q-date__main$/,
    function* (_, { symbols }) {
      yield { outline: '0' }
      yield { 'outline-style': 'solid', 'outline-width': '0px' }
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
      yield {
        'outline-style': 'solid',
        'outline-width': '0px',
        opacity: '0.64',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--active`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:hover`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:focus`,
        opacity: '100%'
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
    function* (_, { symbols }) {
      yield {
        'font-size': '14px',
        'line-height': '1.75',
        'letter-spacing': '0.00938em'
      }
      yield {
        'font-size': '14px',
        'line-height': '1.75',
        'letter-spacing': '0.00938em'
      }
    }
  ],
  [
    /^q-date__header-title-label$/,
    function* (_, { symbols }) {
      yield {
        'font-size': '24px',
        'line-height': '1.2',
        'letter-spacing': '0.00735em'
      }
      yield {
        'font-size': '24px',
        'line-height': '1.2',
        'letter-spacing': '0.00735em'
      }
    }
  ],
  [
    /^q-date__view$/,
    function* (_, { symbols }) {
      yield {
        height: '100%',
        width: '100%',
        'min-height': '290px',
        padding: '16px'
      }
      yield { padding: '12px', 'min-height': '160px' }
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
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
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
      yield { height: '12.5%' }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'font-size': '12px',
        opacity: '0.38'
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
    function* (_, { symbols }) {
      yield { height: '75%', 'min-height': '192px' }
      yield { 'padding-top': '12px', height: '75%', 'min-height': '192px' }
    }
  ],
  [
    /^q-date__calendar-days$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        height: '16.66% !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        height: '16.6666666667% !important'
      }
    }
  ],
  [
    /^q-date__event$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        bottom: '2px',
        left: '50%',
        height: '5px',
        width: '8px',
        'border-radius': '5px',
        // background comes from the yield below: the reference's primary mix
        transform: 'translate3d(-50%, 0, 0)'
      }
      yield {
        'border-radius': '5px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        height: '5px',
        width: '8px',
        transform: 'translate3d(-50%, 0, 0)',
        bottom: '2px',
        left: '50%',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
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
    function* (_, { symbols }) {
      yield { padding: '0 8px' }
      yield {
        'padding-inline': '8px',
        'padding-block': '0',
        'row-gap': '0.5em'
      }
    }
  ],
  [
    /^q-date__years-item$/,
    function* (_, { symbols }) {
      yield { flex: '0 0 33.3333%' }
      yield { flex: '0 0 33.3333%' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        height: '30px',
        width: '60px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn--flat`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        height: '30px',
        width: '60px'
      }
    }
  ],
  [
    /^q-date__months-item$/,
    function* (_, { symbols }) {
      yield { flex: '0 0 33.3333%' }
      yield { flex: '0 0 33.3333%' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn--flat`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
      }
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
  [
    /^q-date__arrow$/,
    function* (_, { symbols }) {
      yield { flex: '0 1 auto' }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-date__arrow:has(+.q-date__arrow)`,
        'padding-right': '40px'
      }
    }
  ],
  [
    /^q-date__calendar-item--in$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn--flat`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
      }
    }
  ],
  [
    /^q-date__months$/,
    function* () {
      yield { 'flex-wrap': 'wrap' }
    }
  ],
  [
    /^q-date__edit-range-from-to$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-right-color': 'transparent',
        'border-left-color': 'transparent',
        'border-top-left-radius': '28px',
        'border-bottom-left-radius': '28px',
        'border-top-right-radius': '28px',
        'border-bottom-right-radius': '28px',
        left: '4px',
        right: '4px'
      }
    }
  ]
] as Rule[]
