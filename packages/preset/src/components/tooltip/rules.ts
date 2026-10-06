import type { Rule } from '@unocss/core'

export const tooltipRules = [
  [
    /^q-tooltip$/,
    function* (_, { symbols }) {
      yield {
        // Reference `.q-tooltip`: fixed and scrollable, with the tooltip's own
        // padding only up to 40rem — the smaller `padding-inline`/`padding-block`
        // pair below is the default and `tooltipMediaCss` widens it on larger
        // screens, exactly as the reference does.
        position: 'fixed',
        'z-index': 9000,
        'pointer-events': 'none',
        // quasar: this value is Quasar's own, not a forked token
        'padding-inline': '10px',
        'padding-block': '6px',
        'max-width': '95vw',
        'max-height': '65vh',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        'border-radius': 'var(--q-radius-sm)',
        'background-color': 'var(--q-inverse-surface)',
        color: 'var(--q-inverse-on-surface)',
        'font-size': '0.85em',
        'box-shadow': 'var(--q-elevation-level2)'
      }
      yield {
        [symbols.selector]: () => '.body--dark .q-tooltip--style',
        color: 'var(--q-inverse-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark`
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--style`,
        // quasar: this value is Quasar's own, not a forked token
        'font-size': '10px',
        color:
          'color-mix(in oklab, var(--light-inverse-on-surface) var(--q-text-opacity), transparent)',
        'line-height': 'var(--leading-normal)',
        'font-weight': 'var(--fontWeight-normal)',
        'padding-inline': 'var(--q-space-sm)',
        'padding-block': 'var(--q-space-xs)',
        'border-radius': 'var(--shape-corner-small)',
        'background-color':
          'color-mix(in oklab, var(--light-inverse-surface) var(--q-bg-opacity), transparent)',
        'max-width': '90vw',
        display: 'inline-block',
        'pointer-events': 'none',
        'text-transform': 'none'
      }
    }
  ]
] as Rule[]

/**
 * `@media (min-width: 40rem)` overrides for the tooltip.
 *
 * Emitted as CSS text because a UnoCSS rule body cannot carry an at-rule; the
 * reference widens the tooltip's padding and its `--style` variant's type and
 * max-width at 640px so a tooltip does not look cramped on desktop.
 */
export const tooltipMediaCss = [
  '@media (min-width: 40rem){',
  '.q-tooltip{padding-top:8px;padding-bottom:8px;padding-left:16px;padding-right:16px}',
  '.q-tooltip--style{font-size:14px;max-width:300px}',
  '}'
].join('')
