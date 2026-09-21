import type { Rule } from '@unocss/core'

/**
 * QToggle — token-driven rewrite (one ruleset, three styles).
 *
 * Every geometric value comes from the per-style component tokens, so the same
 * rules render:
 *
 *   md3 — 52x32 chassis, 16px handle at rest / 24px when on, 2px outline when
 *         off (transparent when on), track surface-container-highest -> primary,
 *         handle outline -> on-primary, 16px handle icon, 300ms toggle.
 *   md2 — Quasar's switch: 56x40 box, 14px track at .38/.54 opacity, 20px
 *         handle with elevation 1, no outline, 200ms toggle.
 *   unstyled — inert (auto/0/transparent), Quasar's HTML defaults only.
 *
 * Spec: specs/reference/normalized/md3-switches.json + md2-switches.json
 * (cross-checked against Flutter _SwitchConfigM3/M2 and Compose SwitchTokens).
 *
 * The previous version hardcoded Quasar's MD2 em geometry (inner 1.4em @40px,
 * track 0.35em, handle 0.5em), which is why the MD3 toggle rendered as MD2 no
 * matter what the style tokens said.
 */
export const toggleRules = [
  [
    /^q-toggle$/,
    function* (_, { symbols }) {
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled) .q-toggle__thumb:before`,
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        'border-radius': '50%',
        'background-color': 'var(--q-toggle-state-layer-color)',
        opacity: '0%',
        transform: 'scale3d(0, 0, 1)',
        transition:
          'transform var(--q-toggle-duration) cubic-bezier(0, 0, 0.2, 1)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-toggle__thumb:before`,
        transform: 'scale3d(2, 2, 1)'
      }
      // Quasar gates hover in @media(any-hover:hover); emitted un-gated —
      // harmless on touch, required for desktop parity. Source: quasar.css:5932.
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel}:not(.disabled):hover .q-toggle__thumb:before`,
        // Alpha is declared here as well as on the base rule because the
        // reference states it on the hover selector.
        opacity: '12%',
        transform: 'scale(2)'
      }
      // The unstyled style entry is inert: no surface, inherit the text colour.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled`,
        opacity: '75% !important'
      }
      // MD3 tints the on-state interaction layer with primary (MD2 keeps
      // currentColor, so this is a no-op there via the token).
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel} .q-toggle__inner--truthy .q-toggle__thumb:before`,
        'background-color': 'var(--q-toggle-state-layer-color-active)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__thumb`,
        color: 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}__thumb:after`,
        'background-color': 'var(--q-outline)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__inner--truthy .q-toggle__thumb`,
        color: 'var(--q-on-primary-container)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__inner--truthy .q-toggle__thumb:after`,
        'background-color': 'var(--q-on-primary) !important'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel}__inner--truthy .q-toggle__track`,
        'background-color': 'var(--q-primary)'
      }
    }
  ],
  [/^q-toggle__native$/, () => ({ width: '1px', height: '1px' })],
  [
    /^q-toggle__inner$/,
    () => ({
      'font-size': 'var(--q-toggle-font-size)',
      width: 'var(--q-toggle-inner-width)',
      'min-width': 'var(--q-toggle-inner-width)',
      height: '1em',
      padding: 'var(--q-toggle-inner-padding)',
      'print-color-adjust': 'exact',
      '-webkit-print-color-adjust': 'exact',
      position: 'relative'
    })
  ],
  [
    /^q-toggle__track$/,
    function* (_, { symbols }) {
      yield {
        height: 'var(--q-toggle-track-height)',
        'border-radius': 'var(--q-toggle-track-border-radius)',
        opacity: 'var(--q-toggle-track-opacity)',
        background: 'var(--q-toggle-track-bg)',
        'outline-width': 'var(--q-toggle-track-outline-width)',
        'outline-style': 'var(--q-toggle-track-outline-style)',
        'outline-color': 'var(--q-toggle-track-outline-color)',
        width: 'var(--q-toggle-track-width)',
        position: 'relative',
        'box-sizing': 'border-box',
        'print-color-adjust': 'exact',
        '-webkit-print-color-adjust': 'exact'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        opacity: '1'
      }
    }
  ],
  [
    /^q-toggle__thumb$/,
    function* (_, { symbols }) {
      // Absolute positioning is required: without it the :after circle
      // positions against .q-toggle__inner (observed 56px blowout) and the icon
      // drops below the toolbar. The reference ships absolute too.
      // Centring is expressed as calc(50% - size/2) so the same rule centres
      // the 16px md3 resting handle, the 24px md3 active handle and Quasar's
      // 20px md2 handle without per-state top offsets.
      yield {
        position: 'absolute',
        top: 'calc(50% - var(--q-toggle-thumb-size) / 2)',
        left: 'var(--q-toggle-thumb-offset)',
        width: 'var(--q-toggle-thumb-size)',
        height: 'var(--q-toggle-thumb-size)',
        // The reference animates `left` only; the size change is not eased.
        transition:
          'left var(--q-toggle-duration) cubic-bezier(0.4, 0, 0.2, 1)',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        'z-index': 0
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        'border-radius': '50%',
        background: 'var(--q-toggle-thumb-bg)',
        // Reference literal: the md3 elevation-1 shadow stack (the md2 token is
        // a different stack and only applies to the md2 style entry).
        'box-shadow':
          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
      }
      // Icon inside the handle (md3: 16px check, on-primary-container).
      yield {
        [symbols.selector]: (sel: string) => `${sel} .q-icon`,
        'font-size': 'var(--q-toggle-icon-size)',
        'min-width': '1em',
        color: 'var(--q-toggle-icon-color)',
        opacity: '0.54',
        'z-index': 2
      }
    }
  ],
  [
    /^q-toggle__inner--indet$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        left: 'var(--q-toggle-thumb-offset-indet)'
      }
    }
  ],
  [
    /^q-toggle__inner--truthy$/,
    function* (_, { symbols }) {
      // Keeps currentColor-based MD2 pieces (track fill, md2 handle) in sync.
      yield { color: 'var(--q-primary)' }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__track`,
        background: 'var(--q-toggle-track-bg-active)',
        opacity: 'var(--q-toggle-track-opacity-active)',
        'outline-width': 'var(--q-toggle-track-outline-width-active)',
        'outline-style': 'var(--q-toggle-track-outline-style-active)',
        'outline-color': 'var(--q-toggle-track-outline-color-active)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        width: 'var(--q-toggle-thumb-size-active)',
        height: 'var(--q-toggle-thumb-size-active)',
        top: 'calc(50% - var(--q-toggle-thumb-size-active) / 2)',
        left: 'var(--q-toggle-thumb-offset-active)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:after`,
        'background-color': 'var(--q-toggle-thumb-bg-active)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb .q-icon`,
        color: 'var(--q-toggle-icon-color-active)',
        opacity: '100%'
      }
    }
  ],
  [/^q-toggle.disabled$/, () => ({ opacity: '0.75 !important' })],
  [
    /^q-toggle--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner--truthy`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:after`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:before`,
        opacity: '0.32 !important'
      }
    }
  ],
  [
    /^q-toggle--dense$/,
    function* (_, { symbols }) {
      // Densities are not part of the M3 spec; this keeps Quasar's dense
      // proportion (0.8em x 0.5em of the dense font size) and re-derives the
      // handle in em so it scales with it instead of the px tokens.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner`,
        'font-size': 'var(--q-toggle-dense-font-size)',
        width: 'var(--q-toggle-inner-width)',
        'min-width': 'var(--q-toggle-inner-width)',
        height: '1em',
        // The reference zeroes the dense padding rather than scaling it.
        'padding-inline': '0',
        'padding-block': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        width: '0.5em',
        height: '0.5em',
        top: 'calc(50% - 0.25em)',
        left: '0'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-toggle__inner--indet .q-toggle__thumb`,
        left: '0.15em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel} .q-toggle__inner--truthy .q-toggle__thumb`,
        width: '0.5em',
        height: '0.5em',
        top: 'calc(50% - 0.25em)',
        left: '0.3em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):focus-visible .q-toggle__thumb:before`,
        transform: 'scale3d(1.5, 1.5, 1)'
      }
    }
  ],
  [
    /^q-toggle--dense.reverse$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__label`,
        'padding-left': 0,
        'padding-right': '0.5em'
      }
    }
  ],
  [
    // Label offset from the control. Missing entirely before, which left the
    // MD3 toggle label glued to the track (reference: `.q-toggle
    // .q-toggle__label { padding-left: .5em }`, `.reverse` swaps sides).
    /^q-toggle__label$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `.q-toggle ${sel}`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `.q-toggle.reverse ${sel}`,
        'padding-left': 0,
        'padding-right': '0.5em'
      }
    }
  ]
] as Rule[]
