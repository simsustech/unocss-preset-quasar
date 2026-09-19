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

const transitionRules: Rule[] = POSITIONS.flatMap(
  ([position, offset, edge]) => {
    const hidden = () => ({
      opacity: '0',
      transform: offset,
      'z-index': '9499'
    })
    const pinned = () => ({
      position: 'absolute',
      'z-index': '9499',
      'margin-left': '0',
      'margin-right': '0',
      ...(edge ? { [edge]: '0' } : {})
    })
    return [
      [new RegExp(`^q-notification--${position}-enter-from$`), hidden],
      [new RegExp(`^q-notification--${position}-leave-to$`), hidden],
      [new RegExp(`^q-notification--${position}-leave-active$`), pinned]
    ] as Rule[]
  }
)

/** Quasar's notification box, verbatim (quasar.css `.q-notification`). */
const NOTIFICATION_SHADOW =
  '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'

export const notificationRules: Rule[] = [
  [
    /^q-notification$/,
    function* (_, { symbols }) {
      yield {
        // `!important` so the notification stays clickable even when an
        // ancestor disables pointer events, as Quasar's own
        // `.q-notifications__list` does.
        'pointer-events': 'all !important',
        'font-size': '14px',
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
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-inverse-on-surface)',
        'background-color': 'var(--q-inverse-surface)'
      }
    }
  ],
  [
    /^q-notification__actions$/,
    function* (_, { symbols }) {
      // `margin-left: auto` right-aligns the actions: Quasar gets that from its
      // `.q-notification__content`, which this preset does not emit.
      yield { color: 'var(--q-primary)', 'margin-left': 'auto' }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-notification__badge$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `.q-notification--multi-line ${sel}--bottom-left`,
        bottom: '-15px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.q-notification--multi-line ${sel}--bottom-right`,
        bottom: '-15px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.q-notification--multi-line ${sel}--top-left`,
        top: '-15px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.q-notification--multi-line ${sel}--top-right`,
        top: '-15px'
      }
    }
  ],
  [
    /^q-notification__progress$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-notification--multi-line ${sel}`,
        bottom: '-8px'
      }
    }
  ],
  [
    /^q-notification--standard$/,
    function* (_, { symbols }) {
      yield {
        'min-height': '48px',
        'padding-inline': '16px',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-notification__actions`,
        'margin-right': '-8px',
        'padding-block': '6px',
        'padding-left': '8px',
        'padding-right': '0'
      }
    }
  ],
  [
    /^q-notification--multi-line$/,
    function* (_, { symbols }) {
      yield {
        'min-height': '68px',
        'padding-inline': '16px',
        'padding-block': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-notification__actions`,
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-notification__actions--with-media`,
        'padding-left': '25px'
      }
    }
  ],
  // The plugin wraps each stack in `.q-notifications__list`. Without it the
  // notifications have no stacking context or anchor and fall into the page
  // flow, so it is part of the component, not of the host page.
  [
    /^q-notifications__list$/,
    () => ({
      'z-index': '9500',
      'pointer-events': 'none',
      left: '0',
      right: '0',
      'margin-bottom': '10px',
      position: 'relative'
    })
  ],
  [/^q-notifications__list--center$/, () => ({ top: '0', bottom: '0' })],
  [/^q-notifications__list--top$/, () => ({ top: '0' })],
  [/^q-notifications__list--bottom$/, () => ({ bottom: '0' })],
  ...transitionRules
] as Rule[]
