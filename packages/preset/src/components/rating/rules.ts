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
  ]
] as Rule[]
