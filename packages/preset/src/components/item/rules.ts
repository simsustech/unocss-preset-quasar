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
      // Label colour role; the side sections override to on-surface-variant.
      color: 'inherit',
      transition: 'color 0.3s, background-color 0.3s',
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
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-primary-container)',
        color: 'var(--q-on-primary-container)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
    }
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
    function* (_, { symbols }) {
      yield {
        'background-color': 'var(--q-primary-container)',
        color: 'var(--q-on-primary-container)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
    }
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
      display: 'flex',
      'flex-direction': 'column',
      'flex-wrap': 'nowrap',
      'min-width': '0'
    })
  ],
  [
    /^q-item__section--side$/,
    function* (_, { symbols }) {
      yield {
        'justify-content': 'center',
        'min-width': '40px',
        'flex-shrink': 0,
        // Spec (md3-lists.json): leading/trailing icon slots are
        // on-surface-variant, not the label colour. This was the reported
        // "wrong text colour" in lists.
        color: 'var(--q-on-surface-variant)',
        'align-items': 'flex-start'
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
      yield {
        flex: '10000 1 0%',
        width: 'auto',
        'min-width': 0,
        'max-width': '100%'
      }
      // Reference: taller main content reserves a min-height per child count.
      yield {
        [symbols.selector]: (sel) => `${sel}:has(> :last-child:nth-child(2))`,
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:has(> :last-child:nth-child(3))`,
        'min-height': '44px'
      }
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
      'min-width': '56px',
      color: 'inherit'
    })
  ],
  [
    /^q-item__section--thumbnail$/,
    function* (_, { symbols }) {
      yield { flex: '0 1 auto !important' }
      // Reference: thumbnail media measures 100x56.
      yield {
        [symbols.selector]: (sel) => `${sel} img`,
        width: '100px',
        height: '56px'
      }
    }
  ],
  [
    /^q-item__label$/,
    function* (_, { symbols }) {
      yield {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        // Reference sets 1.2em!important here; without it the label inherits
        // the typography line-height (21px instead of 16.8px at 14px).
        'line-height': '1.2em'
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
      // Spec: supporting text is on-surface-variant (was a 70% currentColor
      // opacity, which washed out against the label colour).
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-item__label--header$/,
    () => ({
      // Spec (md3-lists.json overline): label-small + on-surface-variant.
      'font-size': '0.875rem',
      'line-height': '1.25rem',
      'letter-spacing': '0.01786em',
      padding: 'var(--q-space-lg)',
      color: 'var(--q-on-surface-variant)'
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
      yield { color: 'var(--q-on-surface-variant)' }
    }
  ],
  [
    // Reference bleeds a leading/trailing thumbnail to the row edge.
    /^q-item > .q-item__section--thumbnail$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:first-child`,
        'margin-left': 'calc(var(--q-space-lg) * -1)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:last-of-type`,
        'margin-right': 'calc(var(--q-space-lg) * -1)'
      }
    }
  ],
  // Dark: an active router-link item takes the primary role.
  [
    /^q-item$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}.q-router-link--active`,
        color: 'var(--q-primary)'
      }
    }
  ]
] as Rule[]
