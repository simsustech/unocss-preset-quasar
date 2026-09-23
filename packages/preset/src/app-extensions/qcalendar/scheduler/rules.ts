import type { Rule } from '@unocss/core'

/**
 * `calendar-scheduler.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (177 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarSchedulerRules = [
  [
    /^q-calendar-scheduler$/u,
    function* (_, { symbols }) {
      // .q-calendar-scheduler
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
        [symbols.selector]: (selector) => `${selector}__head--resources`,
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--days__body`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        flex: '10000 1 0%',
        'user-select': 'none'
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
        [symbols.selector]: (selector) => `${selector}__day--container`,
        position: 'relative',
        display: 'flex',
        flex: '1',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resources--column`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1 1 100%',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'align-items': 'center',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--interval`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'align-items': 'center',
        'text-align': 'left',
        'vertical-align': 'middle',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--section`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'align-items': 'center',
        'text-align': 'left',
        'vertical-align': 'middle',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--text`,
        position: 'relative',
        display: 'block',
        // quasar: upstream's own value, not a forked role
        'font-size': '12px',
        'text-align': 'left',
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--row`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: '1 0 100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--days`,
        flex: '1 1 60%',
        overflow: 'hidden',
        display: 'flex',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--section`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'column',
        flex: '1',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--resource`,
        position: 'relative',
        'box-sizing': 'border-box',
        width: '100%',
        outline: '0',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--resource__section`,
        position: 'relative',
        'box-sizing': 'border-box',
        width: '100%',
        outline: '0',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__resource.q-calendar__sticky, ${selector}__resource--section.q-calendar__sticky`,
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
          `${selector}__head--resources.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        top: '0',
        'z-index': '3'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head`,
        'border-bottom': 'var(--q-calendar-border)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'font-weight': 'var(--q-calendar-head-font-weight)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--resources`,
        'align-items': 'center',
        'justify-content': 'center',
        overflow: 'hidden',
        'border-right': 'var(--q-calendar-border)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'min-width': 'var(--q-calendar-resources-width)',
        'max-width': 'var(--q-calendar-resources-width)',
        // quasar: upstream's own value, not a forked role
        padding: '0 4px',
        'text-align': 'center',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource`,
        'border-right': 'var(--q-calendar-border)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'min-width': 'var(--q-calendar-resources-width)',
        'max-width': 'var(--q-calendar-resources-width)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--section`,
        'border-right': 'var(--q-calendar-border)',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'min-width': 'var(--q-calendar-resources-width)',
        'max-width': 'var(--q-calendar-resources-width)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day`,
        'border-right': 'var(--q-calendar-border)',
        'font-weight': 'var(--q-calendar-head-font-weight)'
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
        [symbols.selector]: (selector) => `${selector}__resources--column`,
        'border-right': 'var(--q-calendar-border)',
        'min-width': 'var(--q-calendar-resources-width)',
        'max-width': 'var(--q-calendar-resources-width)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--row`,
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__resource--row:first-child`,
        'border-top': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day, ${selector}__day--section`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day:last-child, ${selector}__day--section:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day.q-disabled-day, ${selector}__day--section.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--resource`,
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day--resource.q-selected`,
        color: 'var(--q-calendar-selected-color)',
        background: 'var(--q-calendar-selected-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day--resource.q-range-first, ${selector}__day--resource.q-range-last, ${selector}__day--resource.q-range`,
        color: 'var(--q-calendar-range-color)',
        background: 'var(--q-calendar-range-background)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--resource__section`,
        'border-top': 'var(--q-calendar-border-section)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day--resource__section.q-selected`,
        color: 'var(--q-calendar-selected-color)',
        background: 'var(--q-calendar-selected-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day--resource__section.q-range-first, ${selector}__day--resource__section.q-range-last, ${selector}__day--resource__section.q-range`,
        color: 'var(--q-calendar-range-color)',
        background: 'var(--q-calendar-range-background)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day--resource__section:first-child`,
        'border-top': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__day--resource__section:last-child`,
        'border-bottom': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar__child--expanded > .q-calendar-scheduler__resource--row`,
        'border-top': 'var(--q-calendar-border) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-scheduler__head--resources, ${selector}:dir(rtl) .q-calendar-scheduler__resources--column, ${selector}:dir(rtl) .q-calendar-scheduler__resource, ${selector}:dir(rtl) .q-calendar-scheduler__resource--section`,
        'border-right': 'none',
        'border-left': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-scheduler__head--day:first-child, ${selector}:dir(rtl) .q-calendar-scheduler__head--day__event:first-child, ${selector}:dir(rtl) .q-calendar-scheduler__day:first-child, ${selector}:dir(rtl) .q-calendar-scheduler__day--section:first-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-scheduler__head--day:last-child, ${selector}:dir(rtl) .q-calendar-scheduler__head--day__event:last-child, ${selector}:dir(rtl) .q-calendar-scheduler__day:last-child, ${selector}:dir(rtl) .q-calendar-scheduler__day--section:last-child`,
        'border-right': 'var(--q-calendar-border) !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-first:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-first:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-last:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-last:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-first:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-first:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-last:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-last:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-first:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-first:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-last:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-last:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range:first-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range:first-child`,
        'border-top': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-first:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-first:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-last:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-last:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-first:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-first:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-last:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-last:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-first:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-first:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range-last:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range-last:last-child`,
        'border-bottom': 'none !important'
      }
      // Dark-only in upstream: .q-calendar-scheduler__day--resource.q-range:last-child
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector}__day--resource.q-range:last-child`,
        'border-bottom': 'none !important'
      }
    }
  ]
] as Rule[]
