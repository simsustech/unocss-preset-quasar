import type { Rule } from '@unocss/core'

/**
 * `calendar-agenda.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (108 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarAgendaRules = [
  [
    /^q-calendar-agenda$/u,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        flex: '1',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        height: '100%',
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head`,
        position: 'relative',
        flex: 'none',
        display: 'flex',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--intervals`,
        'box-sizing': 'border-box',
        flex: 'none',
        display: 'flex',
        'vertical-align': 'bottom'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--days__column`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1 1 100%',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--days__weekdays`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'user-select': 'none',
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--days__event`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        height: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--days__events`,
        position: 'absolute',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        bottom: '0',
        left: '0',
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day`,
        position: 'relative',
        'box-sizing': 'border-box',
        flex: '1 1 100%',
        'flex-wrap': 'nowrap',
        overflow: 'hidden',
        width: '0',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day__event`,
        position: 'relative',
        'box-sizing': 'border-box',
        flex: '1 1 auto',
        'flex-wrap': 'nowrap',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--weekday, ${selector}__head--date, ${selector}__column-header--before, ${selector}__column-header--after`,
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-wrap': 'nowrap',
        'user-select': 'none',
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--weekday, ${selector}__head--date`,
        margin: '2px',
        flex: '1 0 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day__label`,
        'user-select': 'none',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__body`,
        flex: '1 1 60%',
        overflow: 'hidden',
        display: 'flex',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__scroll-area`,
        overflow: 'auto',
        flex: '1 1 auto',
        display: 'flex',
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__pane`,
        width: '100%',
        overflow: 'hidden',
        flex: 'none',
        display: 'flex',
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day-container`,
        position: 'relative',
        display: 'flex',
        flex: '1',
        'flex-direction': 'column',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__intervals-column`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1 1 100%',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__interval`,
        'box-sizing': 'border-box',
        'text-align': 'left',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__interval--section`,
        position: 'relative',
        'box-sizing': 'border-box',
        'text-align': 'left',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__interval--text`,
        display: 'block',
        position: 'relative',
        top: '-6px',
        // quasar: upstream's own value, not a forked role
        'font-size': '10px',
        width: '100%',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1',
        width: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day-interval`,
        position: 'relative',
        'box-sizing': 'border-box',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day-interval--section`,
        position: 'relative',
        'box-sizing': 'border-box',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__intervals-column.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        top: '0',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--intervals.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        top: '0',
        'z-index': '3'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head`,
        'border-bottom': 'var(--q-calendar-border)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__interval`,
        'border-bottom': 'var(--q-calendar-background) 1px solid',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--intervals`,
        'border-right': 'var(--q-calendar-border)',
        'min-width': 'var(--q-calendar-intervals-width)',
        'max-width': 'var(--q-calendar-intervals-width)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day`,
        'font-weight': 'var(--q-calendar-head-font-weight)',
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--day.q-active-date .q-calendar__button`,
        color: 'var(--q-calendar-active-date-color)',
        background: 'var(--q-calendar-active-date-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--day.q-current-day .q-calendar__button`,
        border: 'var(--q-calendar-border-current)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--day.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day__event`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--day__event:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__column-header--before`,
        'border-bottom': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__column-header--after`,
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__intervals-column`,
        'border-right': 'var(--q-calendar-border)',
        'min-width': 'var(--q-calendar-intervals-width)',
        'max-width': 'var(--q-calendar-intervals-width)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day:last-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day-interval`,
        width: '100%',
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day-interval.q-selected`,
        color: 'var(--q-calendar-selected-color)',
        background: 'var(--q-calendar-selected-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day-interval.q-range-first, ${selector}__day-interval.q-range-last, ${selector}__day-interval.q-range`,
        color: 'var(--q-calendar-range-color)',
        background: 'var(--q-calendar-range-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day-interval--section`,
        'border-top': 'var(--q-calendar-border-section)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day-interval--section.q-selected`,
        color: 'var(--q-calendar-selected-color)',
        background: 'var(--q-calendar-selected-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day-interval--section.q-range-first, ${selector}__day-interval--section.q-range-last, ${selector}__day-interval--section.q-range`,
        color: 'var(--q-calendar-range-color)',
        background: 'var(--q-calendar-range-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day-interval:first-child`,
        'border-top': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day-interval:last-child`,
        'border-bottom': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-agenda__head--intervals, ${selector}:dir(rtl) .q-calendar-agenda__intervals-column`,
        'border-right': 'none',
        'border-left': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-agenda__head--day:first-child, ${selector}:dir(rtl) .q-calendar-agenda__head--day__event:first-child, ${selector}:dir(rtl) .q-calendar-agenda__day:first-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-agenda__head--day:last-child, ${selector}:dir(rtl) .q-calendar-agenda__head--day__event:last-child, ${selector}:dir(rtl) .q-calendar-agenda__day:last-child`,
        'border-right': 'var(--q-calendar-border) !important'
      }
    }
  ]
] as Rule[]
