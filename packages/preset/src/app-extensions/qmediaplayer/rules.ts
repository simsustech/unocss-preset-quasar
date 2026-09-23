import type { Rule } from '@unocss/core'

/**
 * `media-player.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (12 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qmediaplayerRules = [
  [
    /^q-media$/u,
    function* (_, { symbols }) {
      // .q-media
      yield {
        position: 'relative',
        'min-width': '230px !important',
        // quasar: upstream's own value, not a forked role
        'min-height': '40px !important',
        overflow: 'hidden !important',
        display: 'flex',
        'flex-direction': 'column',
        background: 'var(--q-mediaplayer-background)',
        color: 'var(--q-mediaplayer-color)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--player`,
        width: '100%',
        height: '100%',
        'vertical-align': 'bottom',
        'align-self': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--player--bottom-controls--standard`,
        // quasar: upstream's own value, not a forked role
        height: 'calc(100vh - 80px)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--player--bottom-controls--dense`,
        // quasar: upstream's own value, not a forked role
        height: 'calc(100vh - 40px)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__audio--standard`,
        width: '100%',
        // quasar: upstream's own value, not a forked role
        height: '80px !important',
        'vertical-align': 'bottom',
        'align-self': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__audio--dense`,
        width: '100%',
        // quasar: upstream's own value, not a forked role
        height: '40px !important',
        'vertical-align': 'bottom',
        'align-self': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__error-window`,
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        // quasar: upstream's own value, not a forked role
        height: '40px',
        'font-size': '0.8rem',
        'text-align': 'center',
        background: 'var(--q-mediaplayer-error-background)',
        color: 'var(--q-mediaplayer-error-color)',
        transition: 'height 250ms ease-in'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__error-window--button`,
        position: 'absolute',
        right: '0',
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__overlay-window`,
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        height: 'auto',
        background: 'transparent',
        'z-index': '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__loading--video`,
        position: 'absolute',
        left: '50%',
        'margin-left': '-1.5rem',
        top: '50%',
        'margin-bottom': '-1.5rem',
        width: '3rem',
        // quasar: upstream's own value, not a forked role
        height: '3rem',
        color: 'white',
        background: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__loading--audio`,
        position: 'absolute',
        left: '50%',
        'margin-left': '-0.5rem',
        top: '50%',
        'margin-bottom': '-0.5rem',
        width: '1.5rem',
        // quasar: upstream's own value, not a forked role
        height: '1.5rem',
        color: 'white',
        background: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--big-button`,
        position: 'absolute',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '3rem',
        // quasar: upstream's own value, not a forked role
        height: '3rem',
        cursor: 'pointer',
        'border-radius': '1.5rem',
        opacity: '1',
        'font-size': '3rem',
        'z-index': '1000',
        background: 'var(--q-mediaplayer-big-play-button-background)',
        color: 'var(--q-mediaplayer-big-play-button-color)',
        border: 'var(--q-mediaplayer-big-play-button-border)',
        transition: 'all 200ms ease-in',
        'transition-property': 'color, background, border'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--big-button:hover`,
        color: 'var(--q-mediaplayer-big-play-button-hover-color) !important',
        background:
          'var(--q-mediaplayer-big-play-button-hover-background) !important',
        border: 'var(--q-mediaplayer-big-play-button-border-hover) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--big-button-icon`,
        position: 'relative',
        // quasar: upstream's own value, not a forked role
        'font-size': '2rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls`,
        position: 'absolute',
        left: '0',
        bottom: '0',
        right: '0',
        overflow: 'hidden',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--overlay`,
        background: 'rgba(0, 0, 0, 0.4)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__controls--bottom-controls`,
        position: 'relative !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--row`,
        // quasar: upstream's own value, not a forked role
        height: '40px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--standard`,
        // quasar: upstream's own value, not a forked role
        height: '80px !important',
        transition: 'height 250ms ease-in',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--dense`,
        // quasar: upstream's own value, not a forked role
        height: '40px !important',
        transition: 'height 250ms ease-in',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--hidden`,
        height: '0 !important',
        transition: 'height 250ms ease-out'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--button`,
        'max-width': '40px !important',
        'min-width': '40px !important',
        'max-height': '40px !important',
        // quasar: upstream's own value, not a forked role
        'min-height': '40px !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--volume-box`,
        'max-height': '40px !important',
        // quasar: upstream's own value, not a forked role
        'min-height': '40px !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__controls--video-time-text`,
        'min-width': '50px',
        // quasar: upstream's own value, not a forked role
        padding: '0 0.25rem',
        'font-size': '0.8rem',
        'text-align': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__controls--video-slider`,
        // quasar: upstream's own value, not a forked role
        padding: '0 4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__fullscreen`,
        'z-index': '5900'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__fullscreen--window`,
        position: 'fixed !important',
        top: '0 !important',
        left: '0 !important',
        // quasar: upstream's own value, not a forked role
        height: '100vh !important',
        width: '100vw !important',
        'max-height': '100vh !important',
        'max-width': '100vw !important',
        overflow: 'hidden'
      }
    }
  ]
] as Rule[]
