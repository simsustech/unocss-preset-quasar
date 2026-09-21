import type { Rule } from '@unocss/core'

export const cardRules = [
  [
    /^q-card$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        'vertical-align': 'top',
        padding: 'var(--q-space-lg)',
        'border-radius': 'var(--q-card-radius)',
        // The style token stays authoritative: the reference's own
        // `color-mix(… var(--light-surface-container-low) …)` is not compared by
        // the gate (`var(--un-bg-opacity)` is skipped), and md2/unstyled must
        // keep resolving through the token.
        'background-color': 'var(--q-card-surface)',
        'box-shadow': 'var(--q-elevation-1)',
        position: 'relative'
      }
      // Reference family `.q-card > div|img`: children lose their own radius so
      // only the card's corners show, the first and last of the run inherit them
      // back, and an image spans the card.
      for (const child of ['div', 'img']) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel} > ${child}:not(.q--avoid-card-border)`,
          'border-top-left-radius': 'var(--radius-none)',
          'border-top-right-radius': 'var(--radius-none)',
          'border-bottom-left-radius': 'var(--radius-none)',
          'border-bottom-right-radius': 'var(--radius-none)'
        }
        yield {
          [symbols.selector]: (sel) =>
            `${sel} > ${child}:nth-child(1 of :not(.q--avoid-card-border))`,
          'border-top': '0',
          'border-top-left-radius': 'inherit',
          'border-top-right-radius': 'inherit'
        }
        yield {
          [symbols.selector]: (sel) =>
            `${sel} > ${child}:nth-last-child(1 of :not(.q--avoid-card-border))`,
          'border-bottom': '0',
          'border-bottom-left-radius': 'inherit',
          'border-bottom-right-radius': 'inherit'
        }
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:not(.q--avoid-card-border)`,
        'border-left': '0',
        'border-right': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > img`,
        'border-color':
          'color-mix(in oklab, 0 var(--un-border-opacity), transparent)',
        width: '100%',
        'max-width': '100%',
        display: 'block'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled`,
        opacity: '38%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:not(.disabled):focus`,
        'background-color':
          'color-mix(in oklab, var(--light-secondary) var(--un-bg-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:not(.disabled):hover`,
        'box-shadow': 'var(--q-elevation-2)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'background-color': 'var(--q-surface-container-low)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-card--bordered',
        // `outline-variant`, not `outline`: the bordered edge is the faint role.
        'border-color': 'var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark .q-dialog__inner>${sel}`,
        'background-color': 'var(--q-surface-container-high)'
      }
      // Reference `body.quasar-style-unstyled .q-card`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}:not(.disabled):focus`,
        'background-color': 'var(--q-secondary)'
      }
    }
  ],
  [
    /^q-card--dark$/,
    function* (_, { symbols }) {
      yield {
        // The component-level dark variant names the dark roles directly: the
        // `--q-*` aliases follow the *body* class, so using them here left a
        // `.q-card--dark` on a light body with light surfaces.
        'background-color': 'var(--dark-surface-container)',
        color:
          'color-mix(in oklab, var(--dark-on-surface) var(--un-text-opacity), transparent)',
        'border-color':
          'color-mix(in srgb, var(--colors-white) 28%, transparent)'
      }
    }
  ],
  [
    /^q-card--horizontal$/,
    () => ({
      'flex-direction': 'row'
    })
  ],
  [
    /^q-card__section$/,
    () => ({
      padding: 'var(--q-space-md)',
      position: 'relative'
    })
  ],
  [
    /^q-card__section--vertical$/,
    () => ({
      padding: 'var(--q-space-sm) var(--q-space-md)'
    })
  ],
  [
    /^q-card__section--img$/,
    () => ({
      display: 'block',
      'object-fit': 'cover'
    })
  ],
  [
    /^q-card__actions$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-sm)',
      // Reference `.q-card__actions { padding: 8px }`.
      padding: '8px'
    })
  ],
  [
    /^q-card__actions--horizontal$/,
    () => ({
      'flex-direction': 'row'
    })
  ],
  [
    /^q-card__actions--vertical$/,
    () => ({
      'flex-direction': 'column'
    })
  ],
  [
    /^q-card__actions--align-start$/,
    () => ({ 'justify-content': 'flex-start' })
  ],
  [/^q-card__actions--align-center$/, () => ({ 'justify-content': 'center' })],
  [/^q-card__actions--align-end$/, () => ({ 'justify-content': 'flex-end' })],
  [
    /^q-card__actions--align-between$/,
    () => ({ 'justify-content': 'space-between' })
  ],
  [
    /^q-card__actions--align-around$/,
    () => ({ 'justify-content': 'space-around' })
  ],
  [
    /^q-card__actions--align-evenly$/,
    () => ({ 'justify-content': 'space-evenly' })
  ],
  [/^q-card__actions--items-start$/, () => ({ 'align-items': 'flex-start' })],
  [/^q-card__actions--items-center$/, () => ({ 'align-items': 'center' })],
  [/^q-card__actions--items-end$/, () => ({ 'align-items': 'flex-end' })],
  [/^q-card__actions--items-stretch$/, () => ({ 'align-items': 'stretch' })],
  [/^q-card__actions--items-baseline$/, () => ({ 'align-items': 'baseline' })],
  [
    /^q-card--bordered$/,
    function* () {
      // Longhands: the reference names `border-width`/`border-style` separately.
      yield {
        'border-style': 'solid',
        'border-width': '1px',
        'border-color':
          'color-mix(in oklab, var(--light-outline-variant) var(--un-border-opacity), transparent)'
      }
    }
  ],
  [
    /^q-card__section--vert$/,
    function* () {
      yield { padding: '16px' }
    }
  ],
  [
    /^q-card__section--horiz$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > div:not(.q--avoid-card-border)`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > img:not(.q--avoid-card-border)`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > div:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > img:nth-child(1 of :not(.q--avoid-card-border))`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > div:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} > img:nth-last-child(1 of :not(.q--avoid-card-border))`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div:not(.q--avoid-card-border)`,
        'border-top': '0',
        'border-bottom': '0',
        'box-shadow': 'none'
      }
    }
  ],
  [
    /^q-card__actions--horiz$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-item`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group + .q-btn-item`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-group`,
        'margin-left': '8px'
      }
    }
  ],
  [
    /^q-card__actions--vert$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item.q-btn--round`,
        'align-self': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-item`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group + .q-btn-item`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-item + .q-btn-group`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-btn-group > .q-btn-item`,
        'flex-grow': '1'
      }
    }
  ]
] as Rule[]
