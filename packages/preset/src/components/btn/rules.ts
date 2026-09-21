import type { Rule } from '@unocss/core'

export const btnRules = [
  [
    /^q-btn$/,
    function* (_, { symbols }) {
      yield {
        display: 'inline-flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        position: 'relative',
        // Reference states the resets as longhands, not shorthands.
        'outline-style': 'var(--un-outline-style)',
        'outline-width': '0px',
        'border-width': '0px',
        'vertical-align': 'middle',
        'font-size': 'var(--q-btn-font-size)',
        'line-height': 'var(--q-btn-line-height)',
        'text-decoration': 'none',
        color: 'inherit',
        'background-color': 'transparent',
        'font-weight': 'var(--q-btn-font-weight)',
        'text-transform': 'var(--q-btn-text-transform)',
        'text-align': 'center',
        width: 'auto',
        height: 'auto',
        cursor: 'default',
        'padding-inline': 'var(--q-btn-padding-x)',
        'padding-block': '4px',
        'min-height': 'var(--q-btn-min-height)',
        'min-width': 'var(--q-btn-min-width)',
        'border-radius': 'var(--q-btn-radius)',
        overflow: 'visible'
      }
      // Icon sizing inside buttons. Source: reference `.q-btn .q-icon{font-size:1.715em}`.
      // Merged here (not a second /^q-btn$/ entry): the engine keeps one rule
      // per identical regex, so duplicate entries silently drop the earlier one.
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel} .q-icon, ${sel} .q-spinner`,
        'font-size': '1.715em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        'border-radius': 'inherit',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled`,
        opacity: '70% !important'
      }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-btn--actionable$/,
    function* (_, { symbols }) {
      yield { cursor: 'pointer' }
      yield {
        [symbols.selector]: (sel: string) => `${sel}.q-btn--standard:before`,
        transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      // Two different elevations: the pressed (:active) state and the sustained
      // (--active) state are separate tokens in the reference.
      yield {
        [symbols.selector]: (sel) => `${sel}.q-btn--standard:active:before`,
        'box-shadow': 'var(--q-btn-pressed-shadow)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-btn--standard.q-btn--active:before`,
        'box-shadow': 'var(--q-btn-pressed-shadow-lg)'
      }
    }
  ],
  [
    /^q-btn--no-uppercase$/,
    () => ({
      'text-transform': 'none'
    })
  ],
  [
    /^q-btn--standard$/,
    function* (_, { symbols }) {
      yield {
        background: 'var(--q-btn-bg)',
        color: 'var(--q-btn-color)'
      }
      // Reference `.q-btn--standard:before`.
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'border-radius': 'inherit',
        'box-shadow': 'var(--q-btn-shadow)'
      }
    }
  ],
  [
    /^q-btn--outline$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'transparent !important',
        color: 'var(--q-btn-outline-color)',
        'border-radius': 'var(--q-btn-radius)',
        border: '1px solid var(--q-btn-outline-border)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        // Reference states the ring as longhands.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'var(--q-btn-outline-border)',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn__progress-indicator`,
        'background-color': 'currentColor',
        opacity: '20%'
      }
    }
  ],
  [
    /^q-btn--flat$/,
    function* (_, { symbols }) {
      yield {
        'background-color': 'transparent !important',
        color: 'var(--q-btn-flat-color)',
        'border-radius': 'var(--q-btn-radius)',
        'padding-inline': 'var(--q-btn-flat-padding-x)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:before, .q-btn--outline:before, .q-btn--unelevated:before`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn__progress-indicator`,
        'background-color': 'currentColor',
        opacity: '20%'
      }
    }
  ],
  [
    /^q-btn--push$/,
    function* (_, { symbols }) {
      yield {
        'border-radius': 'var(--q-btn-push-radius)',
        'border-bottom': 'var(--q-btn-push-border-bottom)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:before`,
        'border-bottom': '3px solid rgba(0, 0, 0, 0.15)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-btn--actionable:before`,
        transition: 'border-width 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-btn--actionable:active:before, ${sel}.q-btn--actionable.q-btn--active:before`,
        'border-bottom-width': '0'
      }
      // Reference `.q-btn--push.q-btn--actionable` and its pressed states: the
      // button translates instead of merely changing its border.
      yield {
        [symbols.selector]: (sel) => `${sel}.q-btn--actionable`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      for (const state of [':active', '.q-btn--active']) {
        yield {
          [symbols.selector]: (sel) => `${sel}.q-btn--actionable${state}`,
          translate: 'var(--un-translate-x) var(--un-translate-y)'
        }
      }
    }
  ],
  [
    /^q-btn--rounded$/,
    () => ({
      'border-radius': 'var(--q-btn-rounded-radius)'
    })
  ],
  [
    /^q-btn--round$/,
    () => ({
      'border-radius': 'var(--q-btn-round-radius)',
      // Reference `.q-btn--round`: a 3em square with no box padding.
      'min-width': '3em',
      'min-height': '3em',
      padding: 'calc(var(--spacing) * 0)'
    })
  ],
  [
    /^q-btn--square$/,
    () => ({
      'border-radius': 'var(--q-btn-square-radius)'
    })
  ],
  [
    /^q-btn--dense$/,
    function* (_, { symbols }) {
      yield {
        padding: 'var(--q-btn-dense-padding)',
        'min-height': '2em'
      }
      // Reference `.q-btn--dense .on-left` / `.on-right` and the round variant.
      yield {
        [symbols.selector]: (sel) => `${sel} .on-left`,
        'margin-right': '6px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .on-right`,
        'margin-left': '6px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-btn--round`,
        padding: 'calc(var(--spacing) * 0)',
        'min-height': '2.4em',
        'min-width': '2.4em'
      }
    }
  ],
  [
    /^q-btn--disabled$/,
    () => ({
      opacity: '0.4',
      cursor: 'not-allowed',
      'box-shadow': 'none'
    })
  ],
  [
    /^q-btn__content$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      gap: 'var(--q-btn-content-gap)',
      transition: 'opacity 0.3s',
      'z-index': '0'
    })
  ],
  [
    /^q-btn__icon$/,
    () => ({
      'font-size': 'var(--q-btn-icon-font-size)'
    })
  ],
  [
    /^q-btn__label$/,
    () => ({
      'line-height': 'var(--q-btn-icon-line-height)'
    })
  ],
  [
    /^q-btn__progress$/,
    () => ({
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
      'border-radius': 'inherit',
      'z-index': '0'
    })
  ],
  [
    /^q-btn--rectangle$/,
    function* () {
      // Was hardcoded 3px, which overrode --q-btn-radius in every style and is
      // out of spec: MD3 buttons are corner.full (28px), MD2 4px.
      yield { 'border-radius': 'var(--q-btn-radius)' }
    }
  ],
  [
    /^q-btn--fab$/,
    function* (_, { symbols }) {
      yield {
        // Reference `.q-btn--fab`: a square, centred, no-padding circle.
        color: 'var(--q-btn-color)',
        padding: 'calc(var(--spacing) * 0)',
        'border-radius': 'var(--q-fab-radius)',
        'flex-direction': 'row',
        'min-width': 'var(--q-fab-size)',
        'min-height': 'var(--q-fab-size)',
        height: 'var(--q-fab-size)',
        'align-items': 'center',
        'justify-content': 'center',
        'z-index': '990'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        margin: 'auto'
      }
    }
  ],
  [
    /^q-btn--fab-mini$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-btn-color)',
        padding: 'calc(var(--spacing) * 0)',
        'border-radius': 'var(--q-fab-radius)',
        'flex-direction': 'row',
        'min-width': 'var(--q-fab-mini-size)',
        'min-height': 'var(--q-fab-mini-size)',
        height: 'var(--q-fab-mini-size)',
        'align-items': 'center',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '24px'
      }
    }
  ],
  [
    /^q-btn__content--hidden$/,
    function* () {
      yield { opacity: '0', 'pointer-events': 'none' }
    }
  ],
  [
    /^q-btn__progress-indicator$/,
    function* () {
      yield {
        'z-index': '-1',
        transform: 'translateX(-100%)',
        background: 'rgba(255, 255, 255, 0.25)'
      }
    }
  ],
  [
    /^q-btn__progress--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn__progress-indicator`,
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }
  ]
] as Rule[]
