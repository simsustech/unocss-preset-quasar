import type { Rule } from '@unocss/core'

/**
 * `calendar-resource.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (57 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarResourceRules = [
  [
    /^q-calendar-resource$/u,
    function* (_, { symbols }) {
      // .q-calendar-resource
      yield {
        display: 'flex',
        flex: '1',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        height: '100%',
        width: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--intervals`,
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'row'
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
        display: 'flex',
        'flex-direction': 'row'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head--interval`,
        'box-sizing': 'border-box',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        position: 'relative',
        // quasar: upstream's own value, not a forked role
        'font-size': '10px',
        'user-select': 'none',
        width: '100%',
        height: '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__body`,
        position: 'relative',
        display: 'flex',
        flex: '1 1 60%',
        'flex-direction': 'column',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__scroll-area`,
        flex: '1 1 auto',
        display: 'flex',
        'align-items': 'flex-start',
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__day--container`,
        position: 'relative',
        display: 'flex',
        flex: '1',
        'flex-wrap': 'nowrap',
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--head`,
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'row',
        flex: '1',
        position: 'relative',
        // quasar: upstream's own value, not a forked role
        'font-size': '10px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resources--body`,
        display: 'flex',
        position: 'relative',
        'flex-direction': 'column',
        'flex-wrap': 'wrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--row`,
        'box-sizing': 'border-box',
        display: 'flex',
        position: 'relative',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        flex: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource`,
        position: 'relative',
        'box-sizing': 'border-box',
        display: 'flex',
        'align-items': 'center',
        'text-align': 'left',
        'vertical-align': 'middle',
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
        display: 'flex',
        position: 'relative',
        // quasar: upstream's own value, not a forked role
        'font-size': '12px',
        'align-items': 'center',
        'flex-wrap': 'wrap',
        padding: '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--intervals`,
        'box-sizing': 'border-box',
        display: 'flex',
        position: 'relative'
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
        'z-index': '10'
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
        'box-sizing': 'border-box',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        overflow: 'hidden',
        'border-right': 'var(--q-calendar-border)',
        'border-bottom': 'var(--q-calendar-border)',
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
        [symbols.selector]: (selector) => `${selector}__head--interval`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--interval:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__head--interval.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
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
        [symbols.selector]: (selector) => `${selector}__resource:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__resource--row`,
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__resource--row:first-child`,
        'border-top': 'none'
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
        [symbols.selector]: (selector) => `${selector}__resource--interval`,
        'border-right': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__resource--interval:last-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__resource--interval.q-disabled-day`,
        color: 'var(--q-calendar-disabled-date-color)',
        background: 'var(--q-calendar-disabled-date-background) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar__child--expanded > .q-calendar-resource__resource--row`,
        'border-top': 'var(--q-calendar-border) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-calendar-resource__resource--row:not(:first-child) .q-calendar-resource__resource--interval, ${selector} .q-calendar__child--expanded > .q-calendar-resource__resource--row .q-calendar-resource__resource--interval`,
        'border-top': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-resource__head--resources, ${selector}:dir(rtl) .q-calendar-resource__resource, ${selector}:dir(rtl) .q-calendar-resource__resource--section`,
        'border-right': 'none',
        'border-left': 'var(--q-calendar-border)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-resource__head--interval:first-child, ${selector}:dir(rtl) .q-calendar-resource__resource--interval:first-child`,
        'border-right': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}:dir(rtl) .q-calendar-resource__head--interval:last-child, ${selector}:dir(rtl) .q-calendar-resource__resource--interval:last-child`,
        'border-right': 'var(--q-calendar-border)'
      }
    }
  ]
] as Rule[]
