import type { Rule } from '@unocss/core'

export const imgRules = [
  [
    /^q-img$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-block',
        // Reference `.q-img { vertical-align: middle; width: 100%; display:
        // inline-block; position: relative; overflow: hidden }`.
        'vertical-align': 'middle',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }
      // Reference `body.quasar-style-unstyled .q-img`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-img__image$/,
    () => ({
      width: '100%',
      height: '100%',
      'border-radius': 'inherit',
      'object-fit': 'cover'
    })
  ],
  [
    /^q-img__content$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        inset: '0',
        overflow: 'auto',
        // Reference `.q-img__content { pointer-events: none; border-radius:
        // inherit }` — the overlay never swallows clicks; the first child opts
        // back in.
        'pointer-events': 'none',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > div`,
        'pointer-events': 'all !important',
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)',
        padding: '16px',
        'background-color':
          'color-mix(in oklab, rgba(0, 0, 0, 0.47) var(--un-bg-opacity), transparent)',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-img__error$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'var(--q-surface-container-high)',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-img__loading$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'var(--q-surface-container-high)'
      }
      // Reference `.q-img__loading .q-spinner { font-size: 50px }`.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-spinner`,
        'font-size': '50px'
      }
    }
  ],
  [
    /^q-img--contain$/,
    () => ({
      'object-fit': 'contain'
    })
  ],
  [
    /^q-img--no-menu$/,
    function* (_, { symbols }) {
      // Reference `.q-img--no-menu .q-img__image` /
      // `.q-img--no-menu .q-img__placeholder { pointer-events: none }`.
      for (const child of ['.q-img__image', '.q-img__placeholder']) {
        yield {
          [symbols.selector]: (sel) => `${sel} ${child}`,
          'pointer-events': 'none'
        }
      }
    }
  ],
  [
    /^q-img--rounded$/,
    () => ({
      'border-radius': 'var(--q-radius-md)'
    })
  ],
  [
    /^q-img__container$/,
    function* () {
      yield { 'border-radius': 'inherit', 'font-size': '0' }
    }
  ],
  [
    /^q-img__image--with-transition$/,
    function* () {
      yield { transition: 'opacity 0.28s ease-in' }
    }
  ],
  [
    /^q-img__image--loaded$/,
    function* () {
      yield { opacity: '1' }
    }
  ]
] as Rule[]
