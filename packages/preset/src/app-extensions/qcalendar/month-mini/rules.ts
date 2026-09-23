import type { Rule } from '@unocss/core'

/**
 * `calendar-month-mini.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (63 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarMonthMiniRules = [
  [
    /^q-calendar-mini$/u,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} .q-calendar-month__head`,
        border: '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__head--workweek`,
        'border-right': 'unset',
        'border-bottom': 'unset'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__head--weekday`,
        'border-right': '0 !important',
        // quasar: upstream's own value, not a forked role
        'min-height': '1.5em !important',
        'min-width': '1.5em !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__workweek`,
        'border-right': 'unset',
        // quasar: upstream's own value, not a forked role
        'font-size': '1em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__week--wrapper`,
        'border-bottom': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-calendar-month__day`,
        display: 'flex',
        'justify-content': 'center',
        'flex-direction': 'column',
        'flex-wrap': 'wrap',
        padding: '0',
        border: '0 !important',
        // quasar: upstream's own value, not a forked role
        'min-height': '1.5em !important',
        'min-width': '1.5em !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day--content`,
        height: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day--label`,
        position: 'relative',
        'vertical-align': 'middle',
        'text-align': 'center',
        top: 'unset',
        left: 'unset'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__head--workweek`,
        'max-width': 'var(--q-calendar-mini-work-week-width)',
        'min-width': 'var(--q-calendar-mini-work-week-width)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__workweek`,
        'max-width': 'var(--q-calendar-mini-work-week-width)',
        'min-width': 'var(--q-calendar-mini-work-week-width)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-active-date .q-calendar__button`,
        color: 'var(--q-calendar-active-date-color)',
        background: 'var(--q-calendar-active-date-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-current-day .q-calendar__button`,
        border: 'var(--q-calendar-border-current)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-selected`,
        color: 'var(--q-calendar-mini-selected-color)',
        background: 'var(--q-calendar-mini-selected-background) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-selected .q-calendar__button`,
        color: 'var(--q-calendar-mini-selected-label-color) !important',
        background:
          'var(--q-calendar-mini-selected-label-background) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color) !important',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-outside`,
        color: 'var(--q-calendar-outside-color) !important',
        background: 'var(--q-calendar-outside-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first, ${selector} .q-calendar-month__day.q-range-last`,
        color: 'var(--q-calendar-mini-range-firstlast-color)',
        background:
          'var(--q-calendar-mini-range-firstlast-background) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first .q-calendar__button, ${selector} .q-calendar-month__day.q-range-last .q-calendar__button`,
        color: 'var(--q-calendar-mini-range-firstlast-label-color) !important',
        background:
          'var(--q-calendar-mini-range-firstlast-label-background) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range`,
        color: 'unset',
        background: 'unset'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range.q-range-hover`,
        color: 'var(--q-calendar-mini-range-hover-color)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first .q-calendar-month__day--label__wrapper:before, ${selector} .q-calendar-month__day.q-range-last .q-calendar-month__day--label__wrapper:before, ${selector} .q-calendar-month__day.q-range .q-calendar-month__day--label__wrapper:before`,
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        background: 'var(--q-calendar-mini-range-connector-color)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first .q-calendar-month__day--label__wrapper.q-range-hover:before, ${selector} .q-calendar-month__day.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover:before, ${selector} .q-calendar-month__day.q-range .q-calendar-month__day--label__wrapper.q-range-hover:before`,
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        margin: '1px 0 1px 0',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'border-top': 'var(--q-calendar-mini-range-connector-hover-border)',
        'border-bottom': 'var(--q-calendar-mini-range-connector-hover-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-first .q-calendar-month__day--label__wrapper .q-calendar__button, ${selector} .q-calendar-month__day.q-range-first.q-range-last .q-calendar-month__day--label__wrapper .q-calendar__button, ${selector} .q-calendar-month__day.q-range-last.q-range-first .q-calendar-month__day--label__wrapper .q-calendar__button, ${selector} .q-calendar-month__day.q-range-last.q-range-last .q-calendar-month__day--label__wrapper .q-calendar__button, ${selector} .q-calendar-month__day.q-range.q-range-first .q-calendar-month__day--label__wrapper .q-calendar__button, ${selector} .q-calendar-month__day.q-range.q-range-last .q-calendar-month__day--label__wrapper .q-calendar__button`,
        color: 'var(--q-calendar-mini-range-firstlast-label-color) !important',
        background:
          'var(--q-calendar-mini-range-firstlast-label-background) !important',
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-first .q-calendar-month__day--label__wrapper:before, ${selector} .q-calendar-month__day.q-range-last.q-range-first .q-calendar-month__day--label__wrapper:before, ${selector} .q-calendar-month__day.q-range.q-range-first .q-calendar-month__day--label__wrapper:before`,
        width: '50%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-first .q-calendar-month__day--label__wrapper.q-range-hover:before, ${selector} .q-calendar-month__day.q-range-last.q-range-first .q-calendar-month__day--label__wrapper.q-range-hover:before, ${selector} .q-calendar-month__day.q-range.q-range-first .q-calendar-month__day--label__wrapper.q-range-hover:before`,
        width: '50%',
        left: '50%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-last .q-calendar-month__day--label__wrapper:before, ${selector} .q-calendar-month__day.q-range-last.q-range-last .q-calendar-month__day--label__wrapper:before, ${selector} .q-calendar-month__day.q-range.q-range-last .q-calendar-month__day--label__wrapper:before`,
        width: '50%',
        right: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-last .q-calendar-month__day--label__wrapper.q-range-first:before, ${selector} .q-calendar-month__day.q-range-last.q-range-last .q-calendar-month__day--label__wrapper.q-range-first:before, ${selector} .q-calendar-month__day.q-range.q-range-last .q-calendar-month__day--label__wrapper.q-range-first:before`,
        width: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover:before, ${selector} .q-calendar-month__day.q-range-last.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover:before, ${selector} .q-calendar-month__day.q-range.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover:before`,
        width: '50%',
        right: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover.q-range-first:before, ${selector} .q-calendar-month__day.q-range-last.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover.q-range-first:before, ${selector} .q-calendar-month__day.q-range.q-range-last .q-calendar-month__day--label__wrapper.q-range-hover.q-range-first:before`,
        width: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-month__day.q-range-first.q-range-first .q-button, ${selector} .q-calendar-month__day.q-range-first.q-range-last .q-button, ${selector} .q-calendar-month__day.q-range-last.q-range-first .q-button, ${selector} .q-calendar-month__day.q-range-last.q-range-last .q-button, ${selector} .q-calendar-month__day.q-range.q-range-first .q-button, ${selector} .q-calendar-month__day.q-range.q-range-last .q-button`,
        opacity: '1 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-day-event:not(.q-day-event-void) .q-calendar-month__day--label__wrapper:after`,
        content: '""',
        width: '0.6em',
        // quasar: upstream's own value, not a forked role
        height: '0.4em',
        'border-radius': '50%',
        left: '0',
        right: '0',
        margin: 'auto',
        background: 'var(--q-calendar-selected-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-calendar-month__week`,
        'border-bottom': 'unset',
        'max-width': '100%'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__week--wrapper
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__week--wrapper`,
        'border-bottom': 'unset'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__week--wrapper
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__week--wrapper`,
        'border-bottom': 'unset'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__week--wrapper
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__week--wrapper`,
        'border-bottom': 'unset'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__day.q-range-first .q-calendar__button
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__day.q-range-first .q-calendar__button`,
        opacity: '1 !important'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__day.q-range-last .q-calendar__button
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__day.q-range-last .q-calendar__button`,
        opacity: '1 !important'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__day.q-range-first .q-calendar__button
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__day.q-range-first .q-calendar__button`,
        opacity: '1 !important'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__day.q-range-last .q-calendar__button
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__day.q-range-last .q-calendar__button`,
        opacity: '1 !important'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__day.q-range-first .q-calendar__button
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__day.q-range-first .q-calendar__button`,
        opacity: '1 !important'
      }
      // Dark-only in upstream: .q-calendar-mini .q-calendar-month__day.q-range-last .q-calendar__button
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-calendar-month__day.q-range-last .q-calendar__button`,
        opacity: '1 !important'
      }
    }
  ]
] as Rule[]
