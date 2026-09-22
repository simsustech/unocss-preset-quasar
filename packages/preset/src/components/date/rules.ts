import type { Rule } from '@unocss/core'

export const dateRules = [
  [
    /^q-date$/,
    function* (_, { symbols }) {
      // .q-date
      yield {
        // The reference's own values are in the yields below — `display:
        // inline-flex`, `max-width: 100%` and the `surface-container-high` mix.
        // The copies that used to sit here won after the fold and changed the
        // picker's layout.
        'flex-direction': 'column',
        // 4px, not `var(--q-radius-md)` (12px in md3): the reference states the
        // date picker's corner as 4px and the token would round it threefold.
        'border-radius': 'var(--q-corner-extra-small)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__calendar-item--in .q-btn--flat`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__calendar-item--in .q-btn`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__months-item .q-btn--flat`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__months-item .q-btn`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__years-item .q-btn--flat`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__years-item .q-btn`,
        color: 'var(--q-on-primary)',
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__navigation .q-btn`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__edit-range:after`,
        'border-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__edit-range-from:after`,
        'border-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__edit-range-to:after`,
        'border-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__edit-range-from-to:after`,
        'border-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__event`,
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        // quasar: this rule reproduces Quasar's own 4px corner
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
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        color: 'var(--q-on-surface)',
        'border-color': 'rgba(255, 255, 255, 0.28)',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container) var(--un-bg-opacity), transparent)',
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        'border-color': 'rgba(0, 0, 0, 0.12)',
        'border-style': 'solid',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--portrait`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape`,
        'flex-direction': 'row',
        'min-width': '420px',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape > div`,
        display: 'flex',
        flex: '1 1 auto',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape .q-date__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait-minimal .q-date__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape-standard .q-date__header`,
        'max-width': '110px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape-standard .q-date__header-title`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape-standard .q-date__header-today`,
        'margin-top': '12px',
        'margin-left': '-8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between'
        // padding comes from the yield below: the reference's 12px
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__header`,
        color: 'var(--q-on-surface)',
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        padding: '12px',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        'border-top-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__header`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-surface-container-high) var(--un-bg-opacity), transparent)'
      }
      // No `__calendar` grid, and no `__day*` rules. Quasar lays the calendar out
      // through `.q-date__calendar-days-container` (height 75%, min-height 192px),
      // `.q-date__calendar-days > div` (one week row, 16.66% tall) and
      // `.q-date__calendar-item` — all of which the preset already emits. On the
      // view element, `q-date__calendar` is a marker class with no rule in
      // Quasar, and `__day`, `__day--selected` and `__day--today` do not exist in
      // Quasar at all. The invented grid was actively harmful: `display: grid` on
      // the view turned `.q-date__calendar-days-container` into a size-to-content
      // grid item, so it collapsed to width 0 and /availability rendered a date
      // picker whose day grid was invisible.
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item:after`,
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
        [symbols.selector]: (selector) => `${selector}__calendar-item`,
        'vertical-align': 'middle',
        display: 'inline-flex',
        width: '14.285% !important',
        height: '12.5% !important',
        'align-items': 'center',
        'justify-content': 'center',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item:after`,
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
        [symbols.selector]: (selector) => `${selector}__calendar-item > button`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item > div`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '30px',
        'text-align': 'center',
        'border-radius': '50%',
        width: '30px',
        height: '30px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item button`,
        'border-radius': '50%',
        width: '30px',
        height: '30px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item--out`,
        opacity: '0.18'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range:before`,
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
        [symbols.selector]: (selector) =>
          `${selector}__range:nth-child(7n-6):before, .q-date__range-from:nth-child(7n-6):before, .q-date__range-to:nth-child(7n-6):before`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__range:nth-child(7n):before, .q-date__range-from:nth-child(7n):before, .q-date__range-to:nth-child(7n):before`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range:before`,
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
        [symbols.selector]: (selector) =>
          `${selector}__range:nth-child(7n-6):before`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__range:nth-child(7n):before`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range-from:before`,
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range-from:before`,
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
        [symbols.selector]: (selector) =>
          `${selector}__range-from:nth-child(7n-6):before`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__range-from:nth-child(7n):before`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range-to:before`,
        right: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__range-to:before`,
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
        [symbols.selector]: (selector) =>
          `${selector}__range-to:nth-child(7n-6):before`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__range-to:nth-child(7n):before`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__edit-range:after`,
        'border-color': 'currentColor transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__edit-range:nth-child(7n-6):after`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__edit-range:nth-child(7n):after`,
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__edit-range:after`,
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__edit-range:nth-child(7n-6):after`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__edit-range:nth-child(7n):after`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__edit-range:after`,
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__edit-range-from:after`,
        left: '4px',
        'border-left-color': 'currentColor',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
        'border-top-left-radius': '28px',
        'border-bottom-left-radius': '28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__edit-range-from:after`,
        'border-right-width': '0px',
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)',
        'border-top-left-radius': '28px',
        'border-bottom-left-radius': '28px',
        left: '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__edit-range-to:after`,
        right: '4px',
        'border-right-color': 'currentColor',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
        'border-top-right-radius': '28px',
        'border-bottom-right-radius': '28px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__edit-range-to:after`,
        'border-color':
          'color-mix(in oklab, var(--q-primary) var(--un-border-opacity), transparent)',
        'border-left-color': 'transparent',
        'border-top-right-radius': '28px',
        'border-bottom-right-radius': '28px',
        right: '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        border: '1px solid rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        padding: '0 16px 16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        'padding-inline': 'var(--q-space-lg)',
        'padding-top': '0',
        'padding-bottom': 'var(--q-space-lg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content .q-btn`,
        'font-weight': 'normal'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        'outline-style': 'solid',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content .q-btn`,
        'font-weight': 'var(--fontWeight-normal)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__main`,
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__main`,
        'outline-style': 'solid',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link`,
        opacity: '0.64',
        outline: '0',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link:focus`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__header-link:focus-visible`,
        opacity: '1',
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link`,
        'outline-style': 'solid',
        'outline-width': '0px',
        opacity: '0.64',
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link--active`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link:hover`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link:focus`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-link--active`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-subtitle`,
        'font-size': 'var(--q-body-medium-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.75',
        'letter-spacing': '0.00938em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-subtitle`,
        'font-size': 'var(--q-body-medium-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.75',
        'letter-spacing': '0.00938em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-title-label`,
        'font-size': 'var(--q-headline-small-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.2',
        'letter-spacing': '0.00735em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header-title-label`,
        'font-size': 'var(--q-headline-small-size)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '1.2',
        'letter-spacing': '0.00735em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__view`,
        height: '100%',
        width: '100%',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '290px',
        padding: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__view`,
        padding: '12px',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '160px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation`,
        height: '12.5%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation > div:first-child`,
        width: '8%',
        'min-width': '24px',
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation > div:last-child`,
        width: '8%',
        'min-width': '24px',
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation`,
        height: '12.5%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation > div:first-child`,
        width: '8%',
        'min-width': '24px',
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__navigation > div:last-child`,
        width: '8%',
        'min-width': '24px',
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__navigation .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-weekdays`,
        height: '12.5%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__calendar-weekdays > div`,
        opacity: '0.38',
        'font-size': 'var(--q-body-small-size)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-weekdays`,
        height: '12.5%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__calendar-weekdays > div`,
        'font-size': 'var(--q-body-small-size)',
        opacity: '0.38'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item--out`,
        opacity: '0.18'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-item--fill`,
        visibility: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__calendar-days-container`,
        height: '75%',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '192px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__calendar-days-container`,
        'padding-top': 'var(--q-space-md)',
        height: '75%',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '192px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-days > div`,
        height: '16.66% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__calendar-days > div`,
        height: '16.6666666667% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__event`,
        position: 'absolute',
        bottom: '2px',
        left: '50%',
        height: '5px',
        width: '8px',
        // quasar: this value is Quasar's own, not a forked token
        'border-radius': '5px',
        // background comes from the yield below: the reference's primary mix
        transform: 'translate3d(-50%, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__event`,
        // quasar: this value is Quasar's own, not a forked token
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
        [symbols.selector]: (selector) => `.body--dark ${selector}__event`,
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__today`,
        'box-shadow': '0 0 1px 0 currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__years-content`,
        padding: '0 8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__years-content`,
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': '0',
        'row-gap': '0.5em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__years-item`,
        flex: '0 0 33.3333%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__years-item`,
        flex: '0 0 33.3333%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__years-item .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)',
        height: '30px',
        width: '60px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__years-item .q-btn--flat`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)',
        height: '30px',
        width: '60px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__months-item`,
        flex: '0 0 33.3333%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__months-item`,
        flex: '0 0 33.3333%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__months-item .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__months-item .q-btn--flat`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly .q-date__header`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly .q-date__content`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly .q-date__navigation`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--portrait`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait-standard .q-date__content`,
        height: 'calc(100% - 86px)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait-standard .q-date__header`,
        'border-top-right-radius': 'inherit',
        height: '86px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait-standard .q-date__header-title`,
        'align-items': 'center',
        height: '30px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--portrait-minimal .q-date__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape`,
        'flex-direction': 'row',
        'align-items': 'stretch',
        'min-width': '420px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape > div`,
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape .q-date__content`,
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape-standard`,
        'min-width': '420px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape-standard .q-date__header`,
        'border-bottom-left-radius': 'inherit',
        'min-width': '110px',
        width: '110px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape-standard .q-date__header-title`,
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--landscape-standard .q-date__header-today`,
        'margin-top': '12px',
        'margin-left': '-8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--landscape-minimal`,
        width: '310px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        'box-shadow':
          '0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12)',
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__arrow`,
        flex: '0 1 auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__arrow.q-date__arrow:has(+.q-date__arrow)`,
        'padding-right': '40px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__calendar-item--in .q-btn`,
        color:
          'color-mix(in oklab, var(--q-on-primary) var(--un-text-opacity), transparent)',
        'background-color':
          'color-mix(in oklab, var(--q-primary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__calendar-item--in .q-btn--flat`,
        color:
          'color-mix(in oklab, var(--q-on-surface) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__months`,
        'flex-wrap': 'wrap'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__edit-range-from-to:after`,
        'border-right-color': 'transparent',
        'border-left-color': 'transparent',
        'border-top-color': 'currentColor',
        'border-bottom-color': 'currentColor',
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
