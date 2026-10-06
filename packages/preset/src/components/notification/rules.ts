import type { Rule } from '@unocss/core'

/**
 * Notification positions Quasar keys its Vue transitions off.
 *
 * `enter-from` and `leave-to` share one rule per direction; `leave-active` pins
 * the element while it animates out. `edge` is the side `leave-active` pins to,
 * and it is NOT simply "the position's own edge": Quasar pins only
 * `--top`/`--center` to `top` and the three bottom positions to `bottom`, while
 * `--top-left`, `--top-right`, `--left` and `--right` get no edge at all.
 */
const POSITIONS: [
  position: string,
  offset: string,
  edge: 'top' | 'bottom' | null
][] = [
  ['top', 'translateY(-50px)', 'top'],
  ['top-left', 'translateY(-50px)', null],
  ['top-right', 'translateY(-50px)', null],
  ['bottom', 'translateY(50px)', 'bottom'],
  ['bottom-left', 'translateY(50px)', 'bottom'],
  ['bottom-right', 'translateY(50px)', 'bottom'],
  ['left', 'rotateX(90deg)', null],
  ['right', 'rotateX(90deg)', null],
  ['center', 'rotateX(90deg)', 'top']
]

/** Quasar's notification box, verbatim (quasar.css `.q-notification`). */
const NOTIFICATION_SHADOW =
  '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'

/**
 * Badge offsets. The base `.q-notification__badge--*` sits 6px outside; the
 * `--multi-line` variant pushes it to 15px because that box is taller.
 */
export const notificationRules: Rule[] = [
  [
    /^q-notification$/,
    function* (_, { symbols }) {
      yield {
        // `!important` so the notification stays clickable even when an
        // ancestor disables pointer events, as Quasar's own
        // `.q-notifications__list` does.
        'pointer-events': 'all !important',
        'font-size': 'var(--q-body-medium-size)',
        'margin-inline': '10px',
        'margin-top': '10px',
        'margin-bottom': '0',
        'border-radius': 'var(--q-corner-extra-small)',
        background: 'var(--q-inverse-surface)',
        color: 'var(--q-inverse-on-surface)',
        display: 'inline-flex',
        'flex-shrink': '0',
        'max-width': '95vw',
        'box-shadow': NOTIFICATION_SHADOW,
        transition: 'transform 1s, opacity 1s',
        'z-index': '9500'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}`,
        color: 'var(--q-inverse-on-surface)',
        'background-color': 'var(--q-inverse-surface)'
      }
      // .q-notification__message
      yield {
        [symbols.selector]: (selector) => `${selector}__message`,
        // Reference states the message padding as logical longhands.
        'padding-inline': '0',
        'padding-block': 'var(--q-space-sm)'
      }
      // .q-notification__caption
      yield {
        [symbols.selector]: (selector) => `${selector}__caption`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '0.9em',
        opacity: '0.7'
      }
      // .q-notification__icon
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        'font-size': 'var(--q-comp-icon)',
        flex: '0 0 1em'
      }
      // .q-notification__icon--additional
      yield {
        [symbols.selector]: (selector) => `${selector}__icon--additional`,
        'margin-right': '16px'
      }
      // .q-notification__avatar
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '32px'
      }
      // .q-notification__avatar--additional
      yield {
        [symbols.selector]: (selector) => `${selector}__avatar--additional`,
        'margin-right': '8px'
      }
      // .q-notification__spinner
      yield {
        [symbols.selector]: (selector) => `${selector}__spinner`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '32px'
      }
      // .q-notification__spinner--additional
      yield {
        [symbols.selector]: (selector) => `${selector}__spinner--additional`,
        'margin-right': '8px'
      }
      // .q-notification__actions
      yield {
        [symbols.selector]: (selector) => `${selector}__actions`,
        color: 'var(--q-primary)',
        'margin-left': 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__actions`,
        color: 'var(--q-primary)'
      }
      // .q-notification__badge
      yield {
        [symbols.selector]: (selector) => `${selector}__badge`,
        // Reference states the padding as logical longhands.
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-xs)',
        position: 'absolute',
        'box-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)',
        'background-color': 'var(--q-negative)',
        'font-size': 'var(--q-body-small-size)',
        // Reference states the radius once, as a shorthand (`border-radius: 4px`).
        'border-radius': 'var(--q-corner-extra-small)',
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '12px',
        // Needs `@keyframes q-notif-badge`, which this preset does not emit yet;
        // inert until then, but it is what quasar.css declares.
        animation: 'q-notif-badge 0.42s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__badge--top-left`,
        top: '-6px',
        left: '-22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__badge--top-right`,
        top: '-6px',
        right: '-22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__badge--bottom-left`,
        bottom: '-6px',
        left: '-22px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__badge--bottom-right`,
        bottom: '-6px',
        right: '-22px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-notification--multi-line ${selector}__badge--top-left`,
        top: '-15px',
        left: '-22px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-notification--multi-line ${selector}__badge--top-right`,
        top: '-15px',
        right: '-22px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-notification--multi-line ${selector}__badge--bottom-left`,
        bottom: '-15px',
        left: '-22px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-notification--multi-line ${selector}__badge--bottom-right`,
        bottom: '-15px',
        right: '-22px'
      }
      // .q-notification__progress
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        'z-index': '-1',
        position: 'absolute',
        height: '3px',
        bottom: '0',
        left: '-10px',
        right: '-10px',
        // Needs `@keyframes q-notif-progress` (see above).
        animation: 'q-notif-progress linear',
        // Reference states the colour as `background-color` and the corners as
        // longhands (shorthand would leave both absent).
        'background-color': 'currentColor',
        opacity: '0.3',
        'border-top-left-radius': '4px',
        'border-top-right-radius': '4px',
        'border-bottom-left-radius': '0',
        'border-bottom-right-radius': '0',
        'transform-origin': '0 50%',
        transform: 'scaleX(0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-notification--multi-line ${selector}__progress`,
        bottom: '-8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--standard`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '48px',
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-notification__actions`,
        'margin-right': '-8px',
        // quasar: this value is Quasar's own, not a forked token
        'padding-block': '6px',
        'padding-left': '8px',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--multi-line`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '68px',
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--multi-line .q-notification__actions`,
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--multi-line .q-notification__actions--with-media`,
        'padding-left': '25px'
      }

      // Transition states Quasar adds per position ($q.notify({ position })). The
      // member classes are yielded here — one loop — instead of the spread of
      // computed rules `...transitionRules` this file used to carry, so the base
      // keeps the single /^q-notification$/ regex.
      for (const [position, offset, edge] of POSITIONS) {
        yield {
          [symbols.selector]: (selector) =>
            `${selector}--${position}-enter-from`,
          opacity: '0',
          transform: offset,
          'z-index': '9499'
        }
        yield {
          [symbols.selector]: (selector) => `${selector}--${position}-leave-to`,
          opacity: '0',
          transform: offset,
          'z-index': '9499'
        }
        yield {
          [symbols.selector]: (selector) =>
            `${selector}--${position}-leave-active`,
          position: 'absolute',
          'z-index': '9499',
          'margin-left': '0',
          'margin-right': '0',
          ...(edge ? { [edge]: '0' } : {})
        }
      }
    }
  ],
  [
    /^q-notifications$/,
    function* (_, { symbols }) {
      // .q-notifications__list
      yield {
        [symbols.selector]: (selector) => `${selector}__list`,
        'z-index': '9500',
        'pointer-events': 'none',
        left: '0',
        right: '0',
        'margin-bottom': '10px',
        position: 'relative'
      }
      // .q-notifications__list--center
      yield {
        [symbols.selector]: (selector) => `${selector}__list--center`,
        top: '0',
        bottom: '0'
      }
      // .q-notifications__list--top
      yield {
        [symbols.selector]: (selector) => `${selector}__list--top`,
        top: '0'
      }
      // .q-notifications__list--bottom
      yield {
        [symbols.selector]: (selector) => `${selector}__list--bottom`,
        bottom: '0'
      }
    }
  ]
] as Rule[]

/**
 * `@media (min-width: 40rem)` override for the notification box.
 *
 * Emitted as CSS text because a UnoCSS rule body cannot carry an at-rule, and
 * because the reference does the same: below 640px a notification may take 95vw,
 * above it the reference caps it at 65vw so it does not span the viewport.
 */
export const notificationMediaCss =
  '@media (min-width: 40rem){.q-notification{max-width:65vw}}'
