import type { Rule } from '@unocss/core'

export const itemRules = [
  [
    /^q-item$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-wrap': 'nowrap',
        padding: 'var(--q-space-sm) var(--q-space-lg)',
        'min-height': 'var(--q-item-min-height)',
        // Label colour role; the side sections override to on-surface-variant.
        color: 'inherit',
        transition: 'color 0.3s, background-color 0.3s',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}.q-router-link--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        // The base rule's geometry, kept as the reference's longhands (the gate
        // measures longhands, not the shorthand), but taken from tokens. The
        // `min-height: 28px` that used to sit here was the literal copy that
        // beat the token and sized every item to 28px instead of md3's 56px.
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-router-link--active`,
        color:
          'color-mix(in oklab, var(--q-primary) var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-focus-helper + .q-item__section--thumbnail`,
        'margin-left': '-16px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-item__section--thumbnail:first-child`,
        'margin-left': '-16px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > .q-item__section--thumbnail:last-of-type`,
        'margin-right': '-16px'
      }
      yield {
        // Dark overrides without a scheme-token equivalent stay literal, as the
        // reference emits them.
        [symbols.selector]: (sel) => `${sel}--dark`,
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)',
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--dark .q-item__label--caption`,
        color: 'rgba(255, 255, 255, 0.8)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--dark .q-item__label--overline`,
        color: 'rgba(255, 255, 255, 0.8)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--dark .q-item__label--header`,
        color: 'rgba(255, 255, 255, 0.64)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}--dark .q-item__section--side:not(.q-item__section--avatar)`,
        color: 'rgba(255, 255, 255, 0.7)'
      }
    }
  ],
  [
    /^q-item--clickable$/,
    function* (_, { symbols }) {
      yield {
        cursor: 'pointer',
        'user-select': 'none'
      }
      yield {
        cursor: 'pointer',
        'user-select': 'none'
      }
    }
  ],
  [
    /^q-item--active$/,
    function* (_, { symbols }) {
      yield {
        // Selected colours are per style: md3 uses `secondary-container` with
        // `on-secondary-container` text, md2 `primary` at 12% with `primary`
        // text (specs/reference/normalized/{md3,md2}-lists.json). The reference
        // has no such rule at all.
        'background-color': 'var(--q-item-active-bg)',
        color: 'var(--q-item-active-color)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
      yield {
        // Selected colours are per style: md3 uses `secondary-container` with
        // `on-secondary-container` text, md2 `primary` at 12% with `primary`
        // text (specs/reference/normalized/{md3,md2}-lists.json). The reference
        // has no such rule at all.
        'background-color': 'var(--q-item-active-bg)',
        color: 'var(--q-item-active-color)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-primary)'
      }
    }
  ],
  [/^q-item--dark$/, function* (_, { symbols }) {}],
  [
    /^q-item--dense$/,
    () => ({
      'min-height': 'var(--q-item-dense-min-height)',
      gap: 'var(--q-space-md)',
      // The reference declares the dense padding as logical longhands; the
      // inline value is the space token, the 2px block inset is Quasar's own
      // density (not part of the md3 list spec).
      'padding-inline': 'var(--q-space-lg)',
      'padding-block': '2px'
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
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        'min-width': '0'
      }
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        'min-width': '0',
        'align-items': 'stretch'
      }
    }
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
      yield {
        'padding-right': '16px',
        flex: '0 1 auto !important',
        width: 'auto',
        color: 'var(--q-on-surface-variant)',
        'align-items': 'flex-start'
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
      yield {
        [symbols.selector]: (sel) => `${sel} + ${sel}`,
        'margin-left': '8px'
      }
      // Two lines of content set the row to 36px, three to 44px.
      yield {
        [symbols.selector]: (sel) => `${sel}:has(>:last-child:nth-child(2))`,
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:has(>:last-child:nth-child(3))`,
        'min-height': '44px'
      }
    }
  ],
  [
    /^q-item__section--avatar$/,
    function* (_, { symbols }) {
      yield {
        'min-width': '56px',
        color: 'inherit'
      }
      yield {
        flex: '0 1 auto !important',
        'min-width': '56px',
        color: 'inherit'
      }
    }
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
      yield {
        'line-height': '1.2em !important',
        'max-width': '100%'
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
    function* (_, { symbols }) {
      yield {
        // Spec (md3-lists.json overline): label-small + on-surface-variant.
        'font-size': '0.875rem',
        'line-height': '1.25rem',
        'letter-spacing': '0.01786em',
        padding: 'var(--q-space-lg)',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        'font-size': '0.875rem',
        'line-height': 'calc(var(--spacing) * 5)',
        'letter-spacing': '0.01786em',
        padding: '16px',
        color: 'var(--q-on-surface-variant)'
      }
    }
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
  ]
] as Rule[]
