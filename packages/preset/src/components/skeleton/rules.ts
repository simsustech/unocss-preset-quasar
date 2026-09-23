import type { Rule } from '@unocss/core'

export const skeletonRules = [
  [
    /^q-skeleton$/,
    function* (_, { symbols }) {
      // .q-skeleton
      yield {
        background: 'var(--q-surface-container-highest)',
        'border-radius': 'var(--q-radius-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}:before`,
        content: '" "'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`,
        background: 'var(--q-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-skeleton--anim-wave:after`,
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark.q-skeleton--anim-blink:after`,
        background: 'rgba(255, 255, 255, 0.2)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim`,
        // quasar: quasar.css states only the cursor here — the blink animation is
        // `--anim-blink:after`, and a keyframe named `q-skeleton-blink` does not
        // exist in Quasar at all.
        cursor: 'wait'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--bordered`,
        border: '1px solid var(--q-outline-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--text`,
        height: '1em',
        'border-radius': 'var(--q-radius-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rect`,
        'border-radius': 'var(--q-radius-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--circle`,
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type`
        // Type
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--anim-wave:after, .q-skeleton--anim-blink:after, .q-skeleton--anim-pop:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'z-index': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-wave:after`,
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))',
        animation:
          'q-skeleton--wave var(--q-skeleton-speed) linear 0.5s infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-blink:after`,
        background: 'rgba(255, 255, 255, 0.7)',
        animation:
          'q-skeleton--fade var(--q-skeleton-speed) linear 0.5s infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-text`,
        transform: 'scale(1, 0.5)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-circle`,
        height: '48px',
        width: '48px',
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QAvatar`,
        height: '48px',
        width: '48px',
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QBtn`,
        width: '90px',
        height: '36px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QBadge`,
        width: '70px',
        height: '16px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QChip`,
        width: '90px',
        height: '28px',
        'border-radius': 'var(--q-corner-large)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QToolbar`,
        height: '50px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QCheckbox`,
        width: '40px',
        height: '40px',
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QRadio`,
        width: '40px',
        height: '40px',
        'border-radius': '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QToggle`,
        width: '56px',
        height: '40px',
        // quasar: Quasar's toggle-skeleton corner (7px is not the MD3 medium, 12px)
        'border-radius': '7px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QSlider`,
        height: '40px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QRange`,
        height: '40px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--type-QInput`,
        height: '56px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-fade`,
        animation:
          'q-skeleton--fade var(--q-skeleton-speed) linear 0.5s infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-pulse`,
        animation:
          'q-skeleton--pulse var(--q-skeleton-speed) ease-in-out 0.5s infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-pulse-x`,
        animation:
          'q-skeleton--pulse-x var(--q-skeleton-speed) ease-in-out 0.5s infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-pulse-y`,
        animation:
          'q-skeleton--pulse-y var(--q-skeleton-speed) ease-in-out 0.5s infinite'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--anim-pop`,
        position: 'relative',
        overflow: 'hidden',
        'z-index': '1'
      }
    }
  ]
] as Rule[]
