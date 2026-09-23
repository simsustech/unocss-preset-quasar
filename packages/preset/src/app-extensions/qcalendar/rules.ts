import type { Rule } from '@unocss/core'

/**
 * `q-calendar.scss` — the shell: `.q-calendar`, its elements and modifiers, the
 * scroll container, and the `.disabled` rules.
 *
 * Colours read the calendar's own tokens, which are themed and scheme-aware
 * (see `variables.ts`); upstream's `--calendar-*` names are gone. Upstream's
 * `-dark` fast path is not ported: it restated the same twelve declarations with
 * `--calendar-*-dark` values for `.q-dark div`, `.body--dark div` and
 * `.q-calendar--dark`, and the tokens already flip on `body.body--dark` — the
 * coverage test asserts those selectors stay unemitted, so a dark rule cannot
 * creep back in.
 *
 * The focus-helper family is the same structure Quasar's own helper has, which
 * `src/core/helpers/rules.ts` already ports: the tint comes from
 * `background: currentColor` on the helper rather than from upstream's
 * `#000`/`#fff` pseudo-element fills, so a theme reaches it.
 */

const CALENDAR = /^q-calendar$/u

export const qcalendarRules = [
  [
    CALENDAR,
    function* (_, { symbols }) {
      // .q-calendar — upstream states `overflow: hidden` then `clip`; only the
      // last one can apply, and `clip` is what quasar's sheet ends up with.
      yield {
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        color: 'var(--q-calendar-color)',
        background: 'var(--q-calendar-background)',
        width: '100%',
        'min-width': 'auto',
        overflow: 'clip'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bordered`,
        border: 'var(--q-calendar-border)'
      }

      // The calendar's own button. Its type case is the style's decision, so it
      // reads the button token (md3 `none`, md2 `uppercase`); the metrics are
      // upstream's.
      yield {
        [symbols.selector]: (selector) => `${selector}__button`,
        display: 'inline-block',
        'flex-direction': 'row',
        'align-items': 'center',
        position: 'relative',
        outline: '0',
        border: '0',
        'vertical-align': 'middle',
        padding: '0',
        // quasar: upstream's own button metrics, not forked roles
        'font-size': '0.75em',
        'line-height': '1.715em',
        'min-height': '2em',
        'min-width': '2em',
        'text-transform': 'var(--q-btn-text-transform)',
        'text-decoration': 'none',
        color: 'inherit',
        background: 'transparent',
        'text-align': 'center',
        width: 'auto',
        height: 'auto',
        'will-change': 'background',
        transition: 'background 0.3s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__button--rounded`,
        // quasar: upstream's button radius
        'border-radius': '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__button--round`,
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__button--bordered`,
        border: 'var(--q-calendar-border)'
      }

      // Alignment helpers.
      for (const [suffix, declarations] of [
        ['__left', { 'text-align': 'left', 'justify-content': 'flex-start' }],
        ['__center', { 'text-align': 'center', 'justify-content': 'center' }],
        ['__right', { 'text-align': 'right', 'justify-content': 'flex-end' }],
        ['__justify', { 'justify-content': 'space-between' }]
      ] as const) {
        yield {
          [symbols.selector]: (selector) => `${selector}${suffix}`,
          ...declarations
        }
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__header--inline`,
        display: 'flex',
        flex: '1 0 0',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'justify-content': 'space-between',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__head-days-event-slot`,
        position: 'absolute',
        top: '0',
        right: '0',
        left: '0',
        overflow: 'hidden',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__ellipsis`,
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__overflow-wrap`,
        'overflow-wrap': 'break-word',
        overflow: 'hidden'
      }

      // The collapse chevron: a rotated square drawn with two borders.
      yield {
        [symbols.selector]: (selector) => `${selector}__parent`,
        transition: 'transform 0.3s',
        border: 'solid currentColor',
        'border-width': '0 2px 2px 0',
        display: 'inline-block',
        // quasar: upstream's chevron metrics
        padding: '2px',
        width: '2px',
        height: '2px',
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__parent--expanded`,
        margin: '0 2px',
        transform: 'rotate(-135deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__parent--collapsed`,
        margin: '0 2px',
        transform: 'rotate(45deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__child`,
        position: 'relative',
        transition: 'max-height 0.28s linear'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__child--expanded`,
        'max-height': '800px',
        height: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__child--collapsed`,
        'max-height': '0',
        'overflow-y': 'hidden'
      }

      // Focus/hover scaffolding. One yield per selector group: `.q-calendar__focusable`,
      // `…--manual-focusable` and `…--hoverable` share the outline reset, and the
      // tint lives on the helper, exactly as `body.desktop .q-focus-helper` does.
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__focusable, ${selector}__manual-focusable, ${selector}__hoverable`,
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-helper`,
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        'pointer-events': 'none',
        'border-radius': 'inherit',
        opacity: '0',
        transition:
          'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__focus-helper:before, ${selector}__focus-helper:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: '0',
        'border-radius': 'inherit',
        transition:
          'background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-helper--rounded`,
        // quasar: upstream's helper radius
        'border-radius': '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focus-helper--round`,
        'border-radius': '50%'
      }

      // The tint itself, driven from the wrapper's state. Upstream's opacities
      // (0.15 / 0.1 / 0.4, then 0.22 for focus) are its own design and are kept.
      for (const state of [
        '__focusable:focus',
        '__manual-focusable--focused',
        '__hoverable:hover'
      ]) {
        yield {
          [symbols.selector]: (selector) =>
            `${selector}${state} > ${selector}__focus-helper`,
          background: 'currentColor',
          opacity: '0.15'
        }
        yield {
          [symbols.selector]: (selector) =>
            `${selector}${state} > ${selector}__focus-helper:before`,
          opacity: '0.1'
        }
        yield {
          [symbols.selector]: (selector) =>
            `${selector}${state} > ${selector}__focus-helper:after`,
          opacity: '0.4'
        }
      }
      for (const state of [
        '__focusable:focus',
        '__manual-focusable--focused'
      ]) {
        yield {
          [symbols.selector]: (selector) =>
            `${selector}${state} > ${selector}__focus-helper`,
          opacity: '0.22'
        }
      }

      // Disabled subtrees.
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .disabled, ${selector} .disabled *, ${selector} [disabled], ${selector} [disabled] *`,
        'outline-width': '0px',
        cursor: 'not-allowed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .disabled, ${selector} [disabled]`,
        opacity: '0.6'
      }

      // The scroll container's webkit scrollbar. Its width and colours are the
      // calendar's tokens, so a theme reaches them.
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .${selector.slice(1)}__scroll::-webkit-scrollbar`,
        width: 'var(--q-calendar-scrollbar-width-height)',
        height: 'var(--q-calendar-scrollbar-width-height)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .${selector.slice(1)}__scroll::-webkit-scrollbar-track`,
        background: 'var(--q-calendar-scrollbar-track)',
        'box-shadow': 'inset 0 0 4px var(--q-calendar-scrollbar-track)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .${selector.slice(1)}__scroll::-webkit-scrollbar-corner`,
        background: 'var(--q-calendar-scrollbar-track)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .${selector.slice(1)}__scroll::-webkit-scrollbar-thumb`,
        background: 'var(--q-calendar-scrollbar-thumb)',
        // quasar: upstream's thumb radius
        'border-radius': '5px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .${selector.slice(1)}__scroll::-webkit-scrollbar-thumb:hover`,
        background: 'var(--q-calendar-scrollbar-thumb-hover)'
      }
    }
  ]
] as Rule[]
