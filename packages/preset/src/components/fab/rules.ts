import type { Rule } from '@unocss/core'

export const fabRules = [
  [
    /^q-fab$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': 'var(--q-fab-radius)',
      width: 'var(--q-fab-size)',
      height: 'var(--q-fab-size)',
      'min-width': 'auto',
      background: 'var(--q-fab-bg)',
      color: 'var(--q-fab-color)',
      'box-shadow': 'var(--q-elevation-3)'
    })
  ],
  [
    /^q-fab--mini$/,
    () => ({
      width: 'var(--q-fab-mini-size)',
      height: 'var(--q-fab-mini-size)'
    })
  ],
  [
    /^q-fab--form-rounded$/,
    function* () {
      yield { borderRadius: '28px' }
    }
  ],
  [
    /^q-fab--form-square$/,
    function* () {
      yield { borderRadius: '4px' }
    }
  ],
  [
    /^q-fab__icon$/,
    function* () {
      yield {
        transition: 'opacity 0.4s, transform 0.4s',
        opacity: '1',
        transform: 'rotate(0deg)'
      }
    }
  ],
  [
    /^q-fab__active-icon$/,
    function* () {
      yield {
        transition: 'opacity 0.4s, transform 0.4s',
        opacity: '0',
        transform: 'rotate(-180deg)'
      }
    }
  ],
  [
    /^q-fab__label--external$/,
    function* () {
      yield {
        position: 'absolute',
        padding: '0 8px',
        transition: 'opacity 0.18s cubic-bezier(0.65, 0.815, 0.735, 0.395)'
      }
    }
  ],
  [
    /^q-fab__label--external-hidden$/,
    function* () {
      yield { opacity: '0', pointerEvents: 'none' }
    }
  ],
  [
    /^q-fab__label--external-left$/,
    function* () {
      yield {
        top: '50%',
        left: '-12px',
        transform: 'translate(-100%, -50%)'
      }
    }
  ],
  [
    /^q-fab__label--external-right$/,
    function* () {
      yield {
        top: '50%',
        right: '-12px',
        transform: 'translate(100%, -50%)'
      }
    }
  ],
  [
    /^q-fab__label--external-bottom$/,
    function* () {
      yield {
        bottom: '-12px',
        left: '50%',
        transform: 'translate(-50%, 100%)'
      }
    }
  ],
  [
    /^q-fab__label--external-top$/,
    function* () {
      yield {
        top: '-12px',
        left: '50%',
        transform: 'translate(-50%, -100%)'
      }
    }
  ],
  [
    /^q-fab__label--internal$/,
    function* () {
      yield {
        padding: '0',
        transition:
          'font-size 0.12s cubic-bezier(0.65, 0.815, 0.735, 0.395), max-height 0.12s cubic-bezier(0.65, 0.815, 0.735, 0.395), opacity 0.07s cubic-bezier(0.65, 0.815, 0.735, 0.395)',
        maxHeight: '30px'
      }
    }
  ],
  [
    /^q-fab__label--internal-hidden$/,
    function* () {
      yield { fontSize: '0', opacity: '0' }
    }
  ],
  [
    /^q-fab__label--internal-top$/,
    function* (_, { symbols }) {
      yield { paddingBottom: '0.12em' }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-fab__label--internal-hidden`,
        maxHeight: '0'
      }
    }
  ],
  [
    /^q-fab__label--internal-bottom$/,
    function* (_, { symbols }) {
      yield { paddingTop: '0.12em' }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-fab__label--internal-hidden`,
        maxHeight: '0'
      }
    }
  ],
  [
    /^q-fab__label--internal-left$/,
    function* () {
      yield { paddingLeft: '0.285em', paddingRight: '0.571em' }
    }
  ],
  [
    /^q-fab__label--internal-right$/,
    function* () {
      yield { paddingRight: '0.285em', paddingLeft: '0.571em' }
    }
  ],
  [
    /^q-fab__icon-holder$/,
    function* () {
      yield {
        minWidth: '24px',
        minHeight: '24px',
        position: 'relative'
      }
    }
  ],
  [
    /^q-fab__icon-holder--opened$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-fab__icon`,
        transform: 'rotate(180deg)',
        opacity: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-fab__active-icon`,
        transform: 'rotate(0deg)',
        opacity: '1'
      }
    }
  ],
  [
    /^q-fab__actions$/,
    function* (_, { symbols }) {
      yield {
        position: 'absolute',
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: '3px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        margin: '5px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        filter: 'opacity(0)',
        transform: 'scale(0.4)',
        transition: 'filter 0.18s ease-out, transform 0.18s ease-out'
      }
    }
  ],
  [
    /^q-fab__actions--right$/,
    function* () {
      yield {
        height: '56px',
        left: '100% /* rtl:ignore */',
        marginLeft: '9px /* rtl:ignore */',
        flexDirection: 'row /* rtl:row-reverse */'
      }
    }
  ],
  [
    /^q-fab__actions--left$/,
    function* () {
      yield {
        height: '56px',
        right: '100% /* rtl:ignore */',
        marginRight: '9px /* rtl:ignore */',
        flexDirection: 'row-reverse /* rtl:row */'
      }
    }
  ],
  [
    /^q-fab__actions--up$/,
    function* () {
      yield {
        width: '56px',
        bottom: '100%',
        marginBottom: '9px',
        flexDirection: 'column-reverse',
        left: '50%',
        marginLeft: '-28px'
      }
    }
  ],
  [
    /^q-fab__actions--down$/,
    function* () {
      yield {
        width: '56px',
        top: '100%',
        marginTop: '9px',
        flexDirection: 'column',
        left: '50%',
        marginLeft: '-28px'
      }
    }
  ],
  [
    /^q-fab__actions--opened$/,
    function* (_, { symbols }) {
      yield { pointerEvents: 'all' }
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        filter: 'opacity(1)',
        transform: 'scale(1)',
        transitionDelay: 'calc(var(--q-fab-stagger) * (sibling-index() - 1))'
      }
    }
  ],
  [
    /^q-fab__actions--closed$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > *`,
        transitionDelay:
          'calc(var(--q-fab-stagger) * (sibling-count() - sibling-index()))'
      }
    }
  ],
  [
    /^q-fab--align-left$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-fab__actions--up`,
        alignItems: 'flex-start',
        left: '28px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-fab__actions--down`,
        alignItems: 'flex-start',
        left: '28px'
      }
    }
  ],
  [
    /^q-fab--align-right$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-fab__actions--up`,
        alignItems: 'flex-end',
        left: 'auto',
        right: '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} > .q-fab__actions--down`,
        alignItems: 'flex-end',
        left: 'auto',
        right: '0'
      }
    }
  ]
] as Rule[]
