import type { Rule } from '@unocss/core'

/**
 * `calendar-task.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (87 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarTaskRules = [
  [
    /^q-calendar-task$/u,
    function* (_, { symbols }) {
      // .q-calendar-task
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
        display: 'flex',
        flex: 'none',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--tasks`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--days`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'user-select': 'none',
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem'
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
        [symbols.selector]: (selector) => `${selector}__title`,
        position: 'relative',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title--task`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title--days`,
        position: 'relative',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'user-select': 'none',
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title--day`,
        position: 'relative',
        'box-sizing': 'border-box',
        flex: '1 1 100%',
        'flex-wrap': 'nowrap',
        overflow: 'hidden',
        width: '0',
        outline: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--weekday, ${selector}__head--date`,
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-wrap': 'nowrap',
        'user-select': 'none',
        margin: '2px',
        flex: '1 0 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container`,
        position: 'relative',
        display: 'flex',
        flex: '1',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__body`,
        position: 'relative',
        display: 'flex',
        flex: '1 1 60%',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__scroll-area`,
        overflow: 'auto',
        flex: '1 1 auto',
        display: 'flex',
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'row',
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--section`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'row',
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--container`,
        position: 'relative',
        'box-sizing': 'border-box',
        // quasar: upstream's own value, not a forked role
        'min-height': '22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--item`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--days-row`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--day`,
        'box-sizing': 'border-box',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer`,
        position: 'relative',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer--wrapper`,
        position: 'relative',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__footer--task, ${selector}__footer--day-wrapper`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        flex: 'none',
        'flex-direction': 'row'
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
          `${selector}__head--tasks.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        top: '0',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__title--task.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        top: '0',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__task--container.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__task--item.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__footer.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        bottom: '0',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__footer--task.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        bottom: '0',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__footer--day.q-calendar__sticky`,
        position: 'sticky',
        left: '0',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head`,
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'border-bottom': 'var(--q-calendar-border)',
        'font-weight': 'var(--q-calendar-head-font-weight)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--tasks`,
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--day`,
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
        [symbols.selector]: (selector) => `${selector}__title`,
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title--task`,
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title--day`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__title--day:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__title--day.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task`,
        'border-bottom': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task:last-child`,
        'border-bottom': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--section`,
        'border-bottom': 'var(--q-calendar-border-section)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--item`,
        background: 'var(--q-calendar-background)',
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--day`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__task--day:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer`,
        'font-weight': 'var(--q-calendar-head-font-weight)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer--wrapper`,
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer--task`,
        background: 'var(--q-calendar-background)',
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer--day`,
        background: 'var(--q-calendar-background)',
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__footer--day:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-task__head--tasks, ${selector}:dir(rtl) .q-calendar-task__title--task, ${selector}:dir(rtl) .q-calendar-task__task--item, ${selector}:dir(rtl) .q-calendar-task__footer--task`,
        'border-right': 'none',
        'border-left': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-task__head--day:first-child, ${selector}:dir(rtl) .q-calendar-task__title--day:first-child, ${selector}:dir(rtl) .q-calendar-task__task--day:first-child, ${selector}:dir(rtl) .q-calendar-task__footer--day:first-child`,
        'border-right': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-task__head--day:last-child, ${selector}:dir(rtl) .q-calendar-task__title--day:last-child, ${selector}:dir(rtl) .q-calendar-task__task--day:last-child, ${selector}:dir(rtl) .q-calendar-task__footer--day:last-child`,
        'border-right': 'var(--q-calendar-border) !important'
      }
    }
  ]
] as Rule[]
