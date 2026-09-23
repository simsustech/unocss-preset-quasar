import type { Rule } from '@unocss/core'

/**
 * `calendar-month.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (90 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarMonthRules = [
  [
    /^q-calendar-month$/u,
    function* (_, { symbols }) {
      // .q-calendar-month
      yield {
        display: 'flex',
        flex: '1 0 100%',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head`,
        position: 'relative',
        flex: '0 0 auto',
        display: 'flex',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--wrapper`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1 1 100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--workweek`,
        position: 'relative',
        display: 'flex',
        'flex-wrap': 'nowrap',
        'flex-direction': 'column',
        'user-select': 'none',
        padding: '0',
        'justify-content': 'center',
        'align-items': 'center',
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--weekdays`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'user-select': 'none',
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--events`,
        position: 'relative',
        display: 'flex',
        flex: '1 1 100%',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--weekday`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: '1 0 100%',
        'flex-direction': 'column',
        'justify-content': 'flex-start',
        height: 'auto',
        overflow: 'hidden',
        'user-select': 'none',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__body`,
        position: 'relative',
        flex: '1 1 auto',
        overflow: 'hidden',
        display: 'flex',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__week`,
        position: 'relative',
        display: 'flex',
        'flex-wrap': 'nowrap',
        flex: '10000 1 0%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__week--wrapper`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        overflow: 'hidden',
        'min-width': '100%',
        transition: 'height 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__week--auto-height`,
        flex: '1 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__week--days`,
        position: 'relative',
        height: 'auto',
        display: 'flex',
        flex: '1 0 auto',
        'flex-wrap': 'nowrap',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__week--events`,
        position: 'absolute',
        'margin-top': '28px',
        width: '100%',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__workweek`,
        position: 'relative',
        display: 'flex',
        'flex-wrap': 'nowrap',
        'flex-direction': 'column',
        'user-select': 'none',
        padding: '0',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: '1 0 100%',
        'flex-direction': 'column',
        height: 'auto',
        overflow: 'hidden',
        'user-select': 'none',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--content`,
        position: 'relative',
        width: '100%',
        height: 'auto',
        flex: '1 0 auto',
        'flex-direction': 'column',
        'min-width': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--label`,
        'text-decoration': 'none',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--label__wrapper`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'min-width': '100%',
        // quasar: upstream's own value, not a forked role
        'min-height': '22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--month`,
        position: 'relative',
        'text-decoration': 'none',
        'user-select': 'none',
        // quasar: upstream's own value, not a forked role
        padding: '1px',
        'font-size': '0.75em',
        'line-height': '22px',
        transition: 'font-size 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--day-of-year`,
        position: 'relative',
        'text-decoration': 'none',
        'user-select': 'none',
        'box-shadow': 'none',
        // quasar: upstream's own value, not a forked role
        'font-size': '0.6rem',
        padding: '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head`,
        'border-bottom': 'var(--q-calendar-border)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--workweek`,
        'font-size': 'var(--q-calendar-work-week-font-size)',
        'border-right': 'var(--q-calendar-border)',
        'max-width': 'var(--q-calendar-work-week-width)',
        'min-width': 'var(--q-calendar-work-week-width)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--weekday`,
        'border-right': 'var(--q-calendar-border)',
        'font-weight': 'var(--q-calendar-head-font-weight)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--weekday:last-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--event`,
        'border-right': 'var(--q-calendar-border)',
        'font-weight': 'var(--q-calendar-head-font-weight)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--event:last-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--event.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__workweek`,
        'font-size': 'var(--q-calendar-work-week-font-size)',
        'border-right': 'var(--q-calendar-border)',
        'max-width': 'var(--q-calendar-work-week-width)',
        'min-width': 'var(--q-calendar-work-week-width)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__workweek.q-current-day`,
        color: 'var(--q-calendar-current-color)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__week--wrapper`,
        'border-bottom': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__week--wrapper:last-child`,
        'border-bottom': 'none !important'
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
        [symbols.selector]: (selector) =>
          `${selector}__day.q-active-date .q-calendar__button`,
        color: 'var(--q-calendar-active-date-color)',
        background: 'var(--q-calendar-active-date-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day.q-current-day .q-calendar__button`,
        border: 'var(--q-calendar-border-current)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day.q-outside`,
        color: 'var(--q-calendar-outside-color) !important',
        background: 'var(--q-calendar-outside-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day.q-selected`,
        color: 'var(--q-calendar-selected-color)',
        background: 'var(--q-calendar-selected-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day.q-selected .q-current-day .q-calendar__button`,
        border: 'var(--q-calendar-border-current-dark) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day.q-range-first, ${selector}__day.q-range-last, ${selector}__day.q-range`,
        color: 'var(--q-calendar-range-color)',
        background: 'var(--q-calendar-range-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day.q-range-first .q-current-day .q-calendar__button, ${selector}__day.q-range-last .q-current-day .q-calendar__button, ${selector}__day.q-range .q-current-day .q-calendar__button`,
        border: 'var(--q-calendar-border-current-dark) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-month__head--weekday:first-child, ${selector}:dir(rtl) .q-calendar-month__head--event:first-child, ${selector}:dir(rtl) .q-calendar-month__day:first-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-month__head--weekday:last-child, ${selector}:dir(rtl) .q-calendar-month__head--event:last-child, ${selector}:dir(rtl) .q-calendar-month__day:last-child`,
        'border-right': 'var(--q-calendar-border) !important'
      }
    }
  ],
  [
    /^q-day-event$/u,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}:first-child`,
        'margin-top': '0em'
      }
    }
  ]
] as Rule[]
