import type { Rule } from '@unocss/core'

export const btnRules = [
  [
    /^q-btn$/,
    function* (_, { symbols }) {
      // .q-btn
      yield {
        display: 'inline-flex',
        'flex-direction': 'column',
        'align-items': 'stretch',
        position: 'relative',
        // Reference states the resets as longhands, not shorthands.
        'outline-style': 'var(--un-outline-style, var(--q-outline-style))',
        'outline-width': '0px',
        'border-width': '0px',
        'vertical-align': 'middle',
        'font-size': 'var(--q-btn-font-size)',
        'line-height': 'var(--q-btn-line-height)',
        'text-decoration': 'none',
        color: 'var(--q-btn-color)',
        background: 'var(--q-btn-bg)',
        'font-weight': 'var(--q-btn-font-weight)',
        'text-transform': 'var(--q-btn-text-transform)',
        'text-align': 'center',
        width: 'auto',
        height: 'auto',
        cursor: 'default',
        'padding-inline': 'var(--q-btn-padding-x)',
        'padding-block': 'var(--q-space-xs)',
        'min-height': 'var(--q-control-height)',
        'min-width': 'var(--q-btn-min-width)',
        'border-radius': 'var(--q-btn-radius)',
        overflow: 'visible'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector} .q-icon, ${selector} .q-spinner`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '1.715em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}:before`,
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        'border-radius': 'inherit'
        // No elevation here: the reference puts `box-shadow` on
        // `.q-btn--standard:before`, so a flat/outline/unelevated button has
        // none. Carrying it on the base selector gave every button in the app a
        // raised shadow — including the drawer's flat round button.
      }
      yield {
        [symbols.selector]: (selector) => `${selector}.disabled`,
        opacity: '70% !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--actionable`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}--actionable.q-btn--standard:before`,
        transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--actionable.q-btn--standard:active:before`,
        'box-shadow': 'var(--q-btn-pressed-shadow)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--actionable.q-btn--standard.q-btn--active:before`,
        'box-shadow': 'var(--q-btn-pressed-shadow-lg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--no-uppercase`,
        'text-transform': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--standard:before`,
        'border-radius': 'inherit',
        'box-shadow': 'var(--q-btn-shadow)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline`,
        'background-color': 'transparent !important',
        color: 'var(--q-btn-outline-color)',
        'border-radius': 'var(--q-btn-radius)',
        border: '1px solid var(--q-btn-outline-border)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline:before`,
        // Reference states the ring as longhands.
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'var(--q-btn-outline-border)',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outline .q-btn__progress-indicator`,
        'background-color': 'currentColor',
        opacity: '20%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flat`,
        'background-color': 'transparent !important',
        color: 'var(--q-btn-flat-color)',
        'border-radius': 'var(--q-btn-radius)',
        'padding-inline': 'var(--q-btn-flat-padding-x)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--flat:before, .q-btn--outline:before, .q-btn--unelevated:before`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--flat .q-btn__progress-indicator`,
        'background-color': 'currentColor',
        opacity: '20%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--push`,
        'border-radius': 'var(--q-btn-push-radius)',
        'border-bottom': 'var(--q-btn-push-border-bottom)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--push:before`,
        'border-bottom': '3px solid rgba(0, 0, 0, 0.15)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push.q-btn--actionable:before`,
        transition: 'border-width 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push.q-btn--actionable:active:before, ${selector}--push.q-btn--actionable.q-btn--active:before`,
        'border-bottom-width': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--push.q-btn--actionable`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push.q-btn--actionable:active`,
        translate:
          'var(--un-translate-x, var(--q-translate-x)) var(--un-translate-y, var(--q-translate-y))'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push.q-btn--actionable.q-btn--active`,
        translate:
          'var(--un-translate-x, var(--q-translate-x)) var(--un-translate-y, var(--q-translate-y))'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rounded`,
        'border-radius': 'var(--q-btn-rounded-radius)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--round`,
        'border-radius': 'var(--q-btn-round-radius)',
        // Reference `.q-btn--round`: a 3em square with no box padding.
        'min-width': '3em',
        // 48dp touch target: the reference's 3em (42px) misses the plan's
        // height floor, so the height forks while the 3em square width stays.
        'min-height': 'var(--q-control-height)',
        padding: 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': 'var(--q-btn-square-radius)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        padding: 'var(--q-btn-dense-padding)',
        // 48dp touch target: dense keeps its tighter padding, not a shorter box.
        'min-height': 'var(--q-control-height)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .on-left`,
        'margin-right': '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .on-right`,
        'margin-left': '6px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense.q-btn--round`,
        padding: 'calc(var(--spacing) * 0)',
        // 48dp touch target (dense round): height only; min-width keeps 2.4em.
        'min-height': 'var(--q-control-height)',
        'min-width': '2.4em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: '0.4',
        cursor: 'not-allowed',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content`,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        gap: 'var(--q-btn-content-gap)',
        transition: 'opacity 0.3s',
        'z-index': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__icon`,
        'font-size': 'var(--q-btn-icon-font-size)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'line-height': 'var(--q-btn-icon-line-height)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress`,
        position: 'absolute',
        inset: '0',
        overflow: 'hidden',
        'border-radius': 'inherit',
        'z-index': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rectangle`,
        'border-radius': 'var(--q-btn-radius)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fab`,
        // Reference `.q-btn--fab`: a square, centred, no-padding circle.
        color: 'var(--q-btn-color)',
        padding: 'calc(var(--spacing) * 0)',
        // `!important` is load-bearing: Quasar adds `q-btn--rounded` to EVERY fab
        // (QBtn 2.33: rounded || fab || fabMini), and `.q-btn--rounded` ->
        // var(--q-btn-rounded-radius) = --q-radius-xl = 28px is emitted after this
        // rule. Without it a 56px fab computes to 28px radius = a circle instead
        // of the M3 16px. Main carried the same intent as `!rounded-$q-fab-radius`
        // (07306d6); the shortcut file it lived in was deleted by this rewrite.
        'border-radius': 'var(--q-fab-radius) !important',
        'flex-direction': 'row',
        'min-width': 'var(--q-fab-size)',
        'min-height': 'var(--q-fab-size)',
        height: 'var(--q-fab-size)',
        'align-items': 'center',
        'justify-content': 'center',
        'z-index': '990'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fab .q-icon`,
        'font-size': 'var(--q-comp-icon)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fab .q-icon`,
        margin: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fab-mini`,
        color: 'var(--q-btn-color)',
        padding: 'calc(var(--spacing) * 0)',
        // Same `!important` reason as the base fab below: Quasar's QBtn adds
        // `q-btn--rounded` to mini fabs too (rounded || fab || fabMini), and
        // `.q-btn--rounded` (var(--q-btn-rounded-radius)) is emitted later.
        'border-radius': 'var(--q-fab-radius) !important',
        'flex-direction': 'row',
        'min-width': 'var(--q-fab-mini-size)',
        'min-height': 'var(--q-fab-mini-size)',
        height: 'var(--q-fab-mini-size)',
        'align-items': 'center',
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--fab-mini .q-icon`,
        'font-size': 'var(--q-comp-icon)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__content--hidden`,
        opacity: '0',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__progress-indicator`,
        'z-index': '-1',
        transform: 'translateX(-100%)',
        background: 'rgba(255, 255, 255, 0.25)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__progress--dark .q-btn__progress-indicator`,
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }
  ]
] as Rule[]
