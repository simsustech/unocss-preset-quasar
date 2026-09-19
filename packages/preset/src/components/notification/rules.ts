import type { Rule } from '@unocss/core'

/**
 * Notification positions Quasar keys its Vue transitions off. `enter-from` and
 * `leave-to` are the same rule; `leave-active` pins the element while it
 * animates out, so the position decides which edge it pins to.
 *
 * `offset` is the direction the notification travels, `edge` the side it pins
 * to once `absolute` (null for the horizontal/centred positions, which only
 * offset along their own axis).
 */
const POSITIONS: [
  position: string,
  offset: string,
  edge: 'top' | 'bottom' | null
][] = [
  ['top', 'translateY(-50px)', 'top'],
  ['top-left', 'translateY(-50px)', 'top'],
  ['top-right', 'translateY(-50px)', 'top'],
  ['bottom', 'translateY(50px)', 'bottom'],
  ['bottom-left', 'translateY(50px)', 'bottom'],
  ['bottom-right', 'translateY(50px)', 'bottom'],
  ['left', 'rotateX(90deg)', null],
  ['right', 'rotateX(90deg)', null],
  ['center', 'rotateX(90deg)', null]
]

const transitionRules: Rule[] = POSITIONS.flatMap(
  ([position, offset, edge]) => {
    const hidden = () => ({
      opacity: '0',
      transform: offset,
      'z-index': '9499'
    })
    const pinned = () => ({
      'margin-left': '0',
      'margin-right': '0',
      ...(edge ? { [edge]: '0' } : {}),
      position: 'absolute'
    })
    return [
      [new RegExp(`^q-notification--${position}-enter-from$`), hidden],
      [new RegExp(`^q-notification--${position}-leave-to$`), hidden],
      [new RegExp(`^q-notification--${position}-leave-active$`), pinned]
    ] as Rule[]
  }
)

export const notificationRules: Rule[] = [
  [
    /^q-notification$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'min-width': '300px',
        'max-width': '95vw',
        'border-radius': 'var(--q-radius-sm)',
        background: 'var(--q-inverse-surface)',
        color: 'var(--q-inverse-on-surface)',
        'box-shadow': 'var(--q-elevation-6)',
        'word-break': 'break-word'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-notification',
        color: 'var(--q-inverse-on-surface)',
        'background-color': 'var(--q-inverse-surface)'
      }
    }
  ],
  [
    /^q-notification__actions$/,
    function* (_, { symbols }) {
      yield { 'margin-left': 'auto' }
      yield {
        [symbols.selector]: () => '.body--dark .q-notification__actions',
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
  ...transitionRules
] as Rule[]
