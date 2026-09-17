import type { Rule } from '@unocss/core'

export const itemRules = [
  [
    /^q-item$/,
    // No align-items/gap: Quasar sets padding + min-height only; vertical
    // centering comes from section layout.
    // position:relative is load-bearing (quasar.css:2903): it contains the
    // absolutely-positioned .q-focus-helper. Without it the 100%x100% hover
    // overlay resolves against the viewport and tints the whole page.
    () => ({
      display: 'flex',
      'flex-wrap': 'nowrap',
      padding: 'var(--q-space-sm) var(--q-space-lg)',
      'min-height': 'var(--q-item-min-height)',
      position: 'relative'
    })
  ],
  [
    /^q-item--clickable$/,
    () => ({
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-item--active$/,
    () => ({
      'background-color': 'var(--q-primary-container)',
      color: 'var(--q-on-primary-container)'
    })
  ],
  [
    /^q-item--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-item--dense$/,
    () => ({
      'min-height': 'var(--q-item-dense-min-height)',
      gap: 'var(--q-space-md)'
    })
  ],
  [
    /^q-item--clickable$/,
    () => ({
      cursor: 'pointer',
      'user-select': 'none'
    })
  ],
  [
    /^q-item--active$/,
    () => ({
      'background-color': 'var(--q-primary-container)',
      color: 'var(--q-on-primary-container)'
    })
  ],
  [
    /^q-item--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-item--dense$/,
    () => ({
      'min-height': '32px',
      padding: 'var(--q-space-xs) var(--q-space-md)'
    })
  ],
  [
    /^q-item--disabled$/,
    () => ({
      opacity: 0.5,
      'pointer-events': 'none'
    })
  ],
  [
    /^q-item--inset$/,
    () => ({
      'padding-left': 'calc(var(--q-space-md) + 56px)'
    })
  ],
  [
    /^q-item--section$/,
    () => ({
      // Section item
    })
  ],
  [
    /^q-item--tag$/,
    () => ({
      // Tag item
    })
  ],
  [
    /^q-item__section$/,
    // No align-items: with a column-direction section it horizontally centers
    // anonymous text children (the centered-playground-list bug). Quasar source
    // sets no alignment here; side/avatar variants align themselves.
    () => ({
      display: 'flex'
    })
  ],
  [
    /^q-item__section--side$/,
    function* (_, { symbols }) {
      yield {
        'justify-content': 'center',
        'min-width': '40px',
        'flex-shrink': 0
      }
      // Source: quasar.css `.q-item__section--side > .q-avatar/.q-icon`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} > .q-avatar`,
        'font-size': '40px'
      }
      yield {
        [symbols.selector]: (sel: string) => `${sel} > .q-icon`,
        'font-size': '24px'
      }
    }
  ],
  [
    /^q-item__section--main$/,
    function* (_, { symbols }) {
      yield { flex: '1', 'min-width': 0 }
      // Source: quasar.css `.q-item__section--main ~ .q-item__section--side`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} ~ .q-item__section--side`,
        'align-items': 'flex-end',
        'padding-right': 0,
        'padding-left': '16px'
      }
    }
  ],
  [
    /^q-item__section--avatar$/,
    () => ({
      'min-width': '40px'
    })
  ],
  [
    /^q-item__section--thumbnail$/,
    () => ({
      'min-width': '80px'
    })
  ],
  [
    /^q-item__label$/,
    function* (_, { symbols }) {
      yield {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      }
      // Source: quasar.css `.q-item__label + .q-item__label`.
      yield {
        [symbols.selector]: (sel: string) => `${sel} + .q-item__label`,
        'margin-top': '4px'
      }
    }
  ],
  [
    /^q-item__label--caption$/,
    () => ({
      'font-size': '0.75em',
      opacity: 0.7
    })
  ],
  [
    /^q-item__label--header$/,
    () => ({
      'font-weight': 600
    })
  ],
  [
    /^q-item__label--inset$/,
    () => ({
      // Inset label
    })
  ],
  [
    /^q-item__section--nowrap$/,
    function* () {
      yield { 'white-space': 'nowrap' }
    }
  ],
  [
    /^q-item__label--overline$/,
    function* () {
      yield { color: 'color-mix(in srgb, currentColor 70%, transparent)' }
    }
  ]
] as Rule[]
