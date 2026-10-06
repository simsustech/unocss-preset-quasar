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
      yield {
        [symbols.selector]: (selector) => `${selector}__image`,
        width: '100%',
        height: '100%',
        'border-radius': 'inherit',
        'object-fit': 'cover'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
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
        [symbols.selector]: (selector) => `${selector}__content > div`,
        'pointer-events': 'all !important',
        color: 'color-mix(in oklab, #fff var(--q-text-opacity), transparent)',
        padding: '16px',
        'background-color':
          'color-mix(in oklab, rgba(0, 0, 0, 0.47) var(--q-bg-opacity), transparent)',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__error`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'var(--q-surface-container-high)',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__loading`,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'var(--q-surface-container-high)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__loading .q-spinner`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '50px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--contain`,
        'object-fit': 'contain'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-menu .q-img__image`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--no-menu .q-img__placeholder`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rounded`,
        'border-radius': 'var(--q-radius-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__container`,
        'border-radius': 'inherit',
        'font-size': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__image--with-transition`,
        transition: 'opacity 0.28s ease-in'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__image--loaded`,
        opacity: '1'
      }
    }
  ]
] as Rule[]
