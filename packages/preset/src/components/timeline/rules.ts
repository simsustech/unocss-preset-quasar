import type { Rule } from '@unocss/core'

export const timelineRules = [
  // Reference `.q-timeline h6 { line-height: inherit }`.
  [
    /^q-timeline$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} h6`,
        'line-height': 'inherit'
      }
    }
  ],
  [
    /^q-timeline$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'flex-direction': 'column',
        // Reference `.q-timeline { padding: calc(var(--spacing) * 0);
        // width: 100%; list-style: none }` — the track has no padding of its
        // own; the entries and dots carry the offsets.
        padding: 'calc(var(--spacing) * 0)',
        width: '100%',
        'list-style': 'none'
      }
      // Reference `body.quasar-style-unstyled .q-timeline`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-timeline--dark$/,
    function* (_, { symbols }) {
      // Reference `.q-timeline--dark { color: color-mix(in oklab, #fff …) }`
      // and its dimmed subtitle.
      yield {
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        opacity: '70%'
      }
    }
  ],
  [
    /^q-timeline--dense$/,
    () => ({
      // Dense
    })
  ],
  [
    /^q-timeline--responsive$/,
    () => ({
      // Responsive
    })
  ],
  [
    /^q-timeline--reverse$/,
    () => ({
      // Reverse
    })
  ],
  [
    /^q-timeline__entry$/,
    () => ({
      position: 'relative',
      'line-height': '22px',
      'padding-bottom': 'var(--q-space-md)'
    })
  ],
  [
    /^q-timeline__heading$/,
    () => ({
      // Reference `.q-timeline__heading { position: relative }`.
      position: 'relative'
    })
  ],
  [
    /^q-timeline__dot$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        left: '-24px',
        top: 0,
        bottom: 0,
        width: '15px',
        height: '12px',
        'border-radius': '50%',
        'background-color': 'var(--q-primary)'
      }
      // Reference `.q-timeline__dot .q-icon` and its media children.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '16px',
        color: 'color-mix(in oklab, #fff var(--un-text-opacity), transparent)',
        'line-height': '38px',
        height: '38px',
        width: '100%',
        top: '0',
        left: '0',
        right: '0',
        position: 'absolute'
      }
      for (const media of ['img', 'svg']) {
        yield {
          [symbols.selector]: (sel) => `${sel} .q-icon > ${media}`,
          width: '1em',
          height: '1em'
        }
      }
    }
  ],
  [
    /^q-timeline__content$/,
    () => ({
      'padding-left': 'var(--q-space-md)',
      'padding-bottom': '24px'
    })
  ],
  [
    /^q-timeline__subtitle$/,
    () => ({
      // Reference `.q-timeline__subtitle`: overline typography at 60% opacity.
      'font-size': '12px',
      'letter-spacing': '1px',
      'font-weight': 'var(--fontWeight-bold)',
      'margin-bottom': '8px',
      opacity: '60%',
      'text-transform': 'uppercase',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-timeline__dot$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before, ${sel}:after`,
        content: 'var(--un-content)',
        'background-color': 'currentColor',
        display: 'block',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-timeline__dot$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        // Reference states the ring as longhands with a 1px border.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'transparent',
        'border-radius': '100%',
        height: '15px',
        width: '15px',
        top: '4px',
        left: '0',
        transition: 'background 0.3s ease-in-out, border 0.3s ease-in-out'
      }
    }
  ],
  [
    /^q-timeline__dot$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        width: '3px',
        opacity: '0.4',
        top: '24px',
        bottom: '0',
        left: '6px'
      }
    }
  ],
  [
    /^q-timeline__entry$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child .q-timeline__dot:after`,
        content: 'none'
      }
      // Reference `.q-timeline__entry:last-child`.
      yield {
        [symbols.selector]: (sel) => `${sel}:last-child`,
        'padding-bottom': 'calc(var(--spacing) * 0) !important'
      }
    }
  ],
  [
    /^q-timeline__entry--icon$/,
    function* (_, { symbols }) {
      // Reference `.q-timeline__entry--icon .q-timeline__dot { width: 31px }`
      // and the 30px ring inside it.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        width: '31px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot:before`,
        height: '30px',
        width: '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        'padding-top': '8px'
      }
    }
  ],
  [
    /^q-timeline__entry--icon$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot:after`,
        top: '41px',
        left: '14px'
      }
    }
  ],
  [
    /^q-timeline__title$/,
    function* () {
      yield { 'margin-top': '0', 'margin-bottom': '16px' }
    }
  ],
  [
    /^q-timeline__dot-img$/,
    function* () {
      yield {
        position: 'absolute',
        top: '4px',
        left: '0',
        right: '0',
        height: '31px',
        width: '31px',
        'background-color': 'currentColor',
        'border-radius': '50%'
      }
    }
  ],
  [
    /^q-timeline__heading-title$/,
    function* (_, { symbols }) {
      yield {
        // Reference states the vertical padding as logical longhands.
        margin: 'calc(var(--spacing) * 0)',
        'padding-inline': '0',
        'padding-block': '32px'
      }
      for (const [pseudo, axis] of [
        [':first-child', 'padding-top'],
        [':last-child', 'padding-bottom']
      ] as const) {
        yield {
          [symbols.selector]: (sel) =>
            `${sel.replace(/__heading-title$/, '__heading')}${pseudo} .q-timeline__heading-title`,
          [axis]: 'calc(var(--spacing) * 0)'
        }
      }
    }
  ],
  [
    /^q-timeline--dense--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        'padding-left': '40px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        left: '-8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        left: '0'
      }
    }
  ],
  [
    /^q-timeline--dense--left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__heading`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        'padding-right': '40px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        right: '-8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__title`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        right: '0'
      }
    }
  ],
  [
    /^q-timeline--comfortable$/,
    function* (_, { symbols }) {
      yield { display: 'table' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__heading`,
        display: 'table-row',
        'font-size': '200%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__heading > div`,
        display: 'table-cell'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        display: 'table-row',
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__content`,
        'padding-top': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        display: 'table-cell',
        'vertical-align': 'top'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        display: 'table-cell',
        'vertical-align': 'top'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        display: 'table-cell',
        'vertical-align': 'top'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        width: '35%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        position: 'relative',
        'min-width': '31px'
      }
    }
  ],
  [
    /^q-timeline--comfortable--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__heading .q-timeline__heading-title`,
        'margin-left': '-50px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        'text-align': 'right',
        'padding-right': '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        left: '-8px'
      }
    }
  ],
  [
    /^q-timeline--comfortable--left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__heading`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__heading .q-timeline__heading-title`,
        'margin-right': '-50px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        'padding-right': '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__title`,
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        right: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        right: '-8px'
      }
    }
  ],
  [
    /^q-timeline--loose$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__heading-title`,
        'text-align': 'center',
        'margin-left': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        display: 'block',
        margin: '0',
        padding: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        position: 'absolute',
        left: '50%',
        'margin-left': '-7.15px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        'padding-bottom': '24px',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        'margin-left': '-15px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__subtitle`,
        'line-height': '38px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__content`,
        'padding-top': '8px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--left .q-timeline__content`,
        float: 'left',
        'padding-right': '30px',
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--right .q-timeline__subtitle`,
        float: 'left',
        'padding-right': '30px',
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--left .q-timeline__subtitle`,
        float: 'right',
        'text-align': 'left',
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--right .q-timeline__content`,
        float: 'right',
        'text-align': 'left',
        'padding-left': '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        width: '50%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        width: '50%'
      }
    }
  ]
] as Rule[]
