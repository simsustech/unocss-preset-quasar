import type { Rule } from '@unocss/core'

export const timelineRules = [
  [
    /^q-timeline$/,
    () => ({
      display: 'flex',
      'flex-direction': 'column',
      'padding-left': '24px'
    })
  ],
  [
    /^q-timeline--dark$/,
    () => ({
      // Dark mode
    })
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
      'padding-bottom': 'var(--q-space-md)'
    })
  ],
  [
    /^q-timeline__heading$/,
    () => ({
      // Heading
    })
  ],
  [
    /^q-timeline__dot$/,
    () => ({
      position: 'absolute',
      left: '-24px',
      top: 0,
      width: '12px',
      height: '12px',
      'border-radius': '50%',
      'background-color': 'var(--q-primary)'
    })
  ],
  [
    /^q-timeline__content$/,
    () => ({
      'padding-left': 'var(--q-space-md)'
    })
  ],
  [
    /^q-timeline__subtitle$/,
    () => ({
      'font-size': '0.75em',
      color: 'var(--q-on-surface-variant)'
    })
  ],
  [
    /^q-timeline__dot$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-timeline__dot:before, .q-timeline__dot:after`,
        content: '""',
        background: 'currentColor',
        display: 'block',
        position: 'absolute'
      }
    }
  ],
  [
    /^q-timeline__dot$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-timeline__dot:before`,
        border: '3px solid transparent',
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
        [symbols.selector]: (_sel) => `.q-timeline__dot:after`,
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
        [symbols.selector]: (_sel) =>
          `.q-timeline__entry:last-child .q-timeline__dot:after`,
        content: 'none'
      }
    }
  ],
  [
    /^q-timeline__entry--icon$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-timeline__entry--icon .q-timeline__dot:before`,
        height: '31px',
        width: '31px'
      }
    }
  ],
  [
    /^q-timeline__entry--icon$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) =>
          `.q-timeline__entry--icon .q-timeline__dot:after`,
        top: '41px',
        left: '14px'
      }
    }
  ],
  [
    /^q-timeline__title$/,
    function* () {
      yield { marginTop: '0', marginBottom: '16px' }
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
        background: 'currentColor',
        borderRadius: '50%'
      }
    }
  ],
  [
    /^q-timeline__heading-title$/,
    function* () {
      yield { padding: '32px 0', margin: '0' }
    }
  ],
  [
    /^q-timeline--dense--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        paddingLeft: '40px'
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
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        paddingRight: '40px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        right: '-8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__title`,
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        textAlign: 'right'
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
        fontSize: '200%'
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
        paddingTop: '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        display: 'table-cell',
        verticalAlign: 'top'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        display: 'table-cell',
        verticalAlign: 'top'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        display: 'table-cell',
        verticalAlign: 'top'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        width: '35%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__dot`,
        position: 'relative',
        minWidth: '31px'
      }
    }
  ],
  [
    /^q-timeline--comfortable--right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__heading .q-timeline__heading-title`,
        marginLeft: '-50px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        textAlign: 'right',
        paddingRight: '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        paddingLeft: '30px'
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
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__heading .q-timeline__heading-title`,
        marginRight: '-50px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__subtitle`,
        paddingLeft: '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        paddingRight: '30px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__content`,
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__title`,
        textAlign: 'right'
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
        textAlign: 'center',
        marginLeft: '0'
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
        marginLeft: '-7.15px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-timeline__entry`,
        paddingBottom: '24px',
        overflow: 'hidden'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__dot`,
        marginLeft: '-15px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__subtitle`,
        lineHeight: '38px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--icon .q-timeline__content`,
        paddingTop: '8px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--left .q-timeline__content`,
        float: 'left',
        paddingRight: '30px',
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--right .q-timeline__subtitle`,
        float: 'left',
        paddingRight: '30px',
        textAlign: 'right'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--left .q-timeline__subtitle`,
        float: 'right',
        textAlign: 'left',
        paddingLeft: '30px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-timeline__entry--right .q-timeline__content`,
        float: 'right',
        textAlign: 'left',
        paddingLeft: '30px'
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
