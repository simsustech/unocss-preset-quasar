import type { Rule } from '@unocss/core'

export const skeletonRules = [
  [
    /^q-skeleton$/,
    function* (_, { symbols }) {
      yield {
        background: 'var(--q-surface-container-highest)',
        'border-radius': 'var(--q-radius-sm)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '" "'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-skeleton--dark$/,
    function* (_, { symbols }) {
      yield {
        background: 'var(--q-surface-variant)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-skeleton--anim-wave:after`,
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-skeleton--anim-blink:after`,
        background: 'rgba(255, 255, 255, 0.2)'
      }
    }
  ],
  [
    /^q-skeleton--anim$/,
    () => ({
      animation: 'q-skeleton-blink 1.5s infinite'
    })
  ],
  [
    /^q-skeleton--bordered$/,
    () => ({
      border: '1px solid var(--q-outline-variant)'
    })
  ],
  [
    /^q-skeleton--text$/,
    () => ({
      height: '1em',
      'border-radius': 'var(--q-radius-xs)'
    })
  ],
  [
    /^q-skeleton--rect$/,
    () => ({
      'border-radius': 'var(--q-radius-sm)'
    })
  ],
  [
    /^q-skeleton--circle$/,
    () => ({
      'border-radius': '50%'
    })
  ],
  [
    /^q-skeleton--square$/,
    () => ({
      'border-radius': '0'
    })
  ],
  [
    /^q-skeleton--type$/,
    () => ({
      // Type
    })
  ],
  [
    /^q-skeleton--anim-wave$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:after, .q-skeleton--anim-blink:after, .q-skeleton--anim-pop:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'z-index': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))',
        animation:
          'q-skeleton--wave var(--q-skeleton-speed) linear 0.5s infinite'
      }
    }
  ],
  [
    /^q-skeleton--anim-blink$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        background: 'rgba(255, 255, 255, 0.7)',
        animation:
          'q-skeleton--fade var(--q-skeleton-speed) linear 0.5s infinite'
      }
    }
  ],
  [
    /^q-skeleton--type-text$/,
    function* () {
      yield { transform: 'scale(1, 0.5)' }
    }
  ],
  [
    /^q-skeleton--type-circle$/,
    function* () {
      yield {
        height: '48px',
        width: '48px',
        'border-radius': '50%'
      }
    }
  ],
  [
    /^q-skeleton--type-QAvatar$/,
    function* () {
      yield {
        height: '48px',
        width: '48px',
        'border-radius': '50%'
      }
    }
  ],
  [
    /^q-skeleton--type-QBtn$/,
    function* () {
      yield { width: '90px', height: '36px' }
    }
  ],
  [
    /^q-skeleton--type-QBadge$/,
    function* () {
      yield { width: '70px', height: '16px' }
    }
  ],
  [
    /^q-skeleton--type-QChip$/,
    function* () {
      yield {
        width: '90px',
        height: '28px',
        'border-radius': '16px'
      }
    }
  ],
  [
    /^q-skeleton--type-QToolbar$/,
    function* () {
      yield { height: '50px' }
    }
  ],
  [
    /^q-skeleton--type-QCheckbox$/,
    function* () {
      yield {
        width: '40px',
        height: '40px',
        'border-radius': '50%'
      }
    }
  ],
  [
    /^q-skeleton--type-QRadio$/,
    function* () {
      yield {
        width: '40px',
        height: '40px',
        'border-radius': '50%'
      }
    }
  ],
  [
    /^q-skeleton--type-QToggle$/,
    function* () {
      yield {
        width: '56px',
        height: '40px',
        'border-radius': '7px'
      }
    }
  ],
  [
    /^q-skeleton--type-QSlider$/,
    function* () {
      yield { height: '40px' }
    }
  ],
  [
    /^q-skeleton--type-QRange$/,
    function* () {
      yield { height: '40px' }
    }
  ],
  [
    /^q-skeleton--type-QInput$/,
    function* () {
      yield { height: '56px' }
    }
  ],
  [
    /^q-skeleton--anim-fade$/,
    function* () {
      yield {
        animation:
          'q-skeleton--fade var(--q-skeleton-speed) linear 0.5s infinite'
      }
    }
  ],
  [
    /^q-skeleton--anim-pulse$/,
    function* () {
      yield {
        animation:
          'q-skeleton--pulse var(--q-skeleton-speed) ease-in-out 0.5s infinite'
      }
    }
  ],
  [
    /^q-skeleton--anim-pulse-x$/,
    function* () {
      yield {
        animation:
          'q-skeleton--pulse-x var(--q-skeleton-speed) ease-in-out 0.5s infinite'
      }
    }
  ],
  [
    /^q-skeleton--anim-pulse-y$/,
    function* () {
      yield {
        animation:
          'q-skeleton--pulse-y var(--q-skeleton-speed) ease-in-out 0.5s infinite'
      }
    }
  ],
  [
    /^q-skeleton--anim-pop$/,
    function* () {
      yield {
        position: 'relative',
        overflow: 'hidden',
        'z-index': '1'
      }
    }
  ]
] as Rule[]
