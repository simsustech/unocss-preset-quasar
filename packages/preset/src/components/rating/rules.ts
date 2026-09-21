import type { Rule } from '@unocss/core'

export const ratingRules = [
  [
    /^q-rating$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center'
    })
  ],
  [
    /^q-rating--dark$/,
    () => ({
      // Dark mode
    })
  ],
  [
    /^q-rating--editable$/,
    () => ({
      cursor: 'pointer'
    })
  ],
  [
    /^q-rating--no-reset$/,
    () => ({
      // No reset
    })
  ],
  [
    /^q-rating__icon$/,
    () => ({
      'font-size': '1.5em',
      color: 'var(--q-surface-container-highest)',
      cursor: 'pointer',
      transition: 'color var(--q-duration-short) var(--q-easing-standard)'
    })
  ],
  [
    /^q-rating__icon--active$/,
    () => ({
      color: '#f9a825'
    })
  ],
  [
    /^q-rating__icon--inactive$/,
    () => ({
      color: 'var(--q-surface-container-highest)'
    })
  ],
  [
    /^q-rating__icon-container$/,
    function* (_, { symbols }) {
      yield { height: '1em', outline: '0' }
      yield {
        [symbols.selector]: (sel) => `${sel} + .q-rating__icon-container`,
        'margin-left': '2px'
      }
    }
  ],
  [
    /^q-rating__icon--hovered$/,
    function* () {
      yield { transform: 'scale(1.3)' }
    }
  ],
  [
    /^q-rating__icon--exselected$/,
    function* () {
      yield { opacity: '0.7' }
    }
  ],
  [
    /^q-rating--no-dimming$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-rating__icon`,
        opacity: '1'
      }
    }
  ],
  // --- Reference parity: yellow stars, dimming and the hover scale ---
  [
    /^q-rating$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        color:
          'color-mix(in oklab, #ffeb3b var(--un-text-opacity), transparent)',
        'vertical-align': 'middle'
      }
    }
  ],
  [
    /^q-rating__icon$/,
    function* (_, { symbols }) {
      yield {
        color: 'currentColor',
        opacity: '40%',
        'text-shadow':
          '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'transform 0.2s ease-in, opacity 0.2s ease-in',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--active`,
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--exselected`,
        opacity: '70%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}--hovered`,
        transform: 'scale(1.3)'
      }
      yield {
        [symbols.selector]: (sel) => `.q-rating--no-dimming ${sel}`,
        opacity: '100%'
      }
    }
  ],
  [
    /^q-rating__icon-container$/,
    function* (_, { symbols }) {
      yield {
        'outline-style': 'solid',
        'outline-width': '0px',
        height: '1em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} + ${sel}`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `.q-rating--editable ${sel}`,
        cursor: 'pointer !important'
      }
    }
  ]
] as Rule[]
