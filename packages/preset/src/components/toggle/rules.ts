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
        background: 'var(--q-toggle-state-layer-color)',
        opacity: 0.12,
        transform: 'scale3d(0, 0, 1)',
        transition: 'transform 0.22s cubic-bezier(0, 0, 0.2, 1)'
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
        transform: 'scale(2)'
      }
      // MD3 tints the on-state interaction layer with primary (MD2 keeps
      // currentColor, so this is a no-op there via the token).
      yield {
        [symbols.selector]: (sel: string) =>
          `${sel} .q-toggle__inner--truthy .q-toggle__thumb:before`,
        background: 'var(--q-toggle-state-layer-color-active)'
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
      '-webkit-print-color-adjust': 'exact'
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
        border: 'var(--q-toggle-track-outline)',
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
        transition:
          'left 0.22s cubic-bezier(0.4, 0, 0.2, 1), width 0.22s cubic-bezier(0.4, 0, 0.2, 1), height 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
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
        border: 'var(--q-toggle-track-outline-active)'
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
        color: 'var(--q-toggle-icon-color-active)'
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
        width: '0.8em',
        'min-width': '0.8em',
        height: '0.5em',
        padding: '0.07625em 0'
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
  ],
  // Dark: thumb and track. The resting thumb takes the highest surface so the
  // knob stays visible, and the truthy track takes the primary container.
  [
    /^q-toggle$/,
    function* (_, { symbols }) {
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

  // --- Reference parity: MD3 switch geometry and state layers ---
  [
    /^q-toggle$/,
    function* (_, { symbols }) {
      yield { 'vertical-align': 'middle' }
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled`,
        opacity: '75% !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__label`,
        'padding-left': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.reverse .q-toggle__label`,
        'padding-left': '0',
        'padding-right': '0.5em'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}:not(.disabled):hover .q-toggle__thumb:before`,
        opacity: '12%',
        transform: 'scale(2)'
      }
    }
  ],
  [
    /^q-toggle__inner$/,
    function* () {
      yield {
        height: '1em',
        width: '1.625em',
        'font-size': '32px',
        padding: '0',
        position: 'relative'
      }
    }
  ],
  [
    /^q-toggle--dense$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__inner`,
        'padding-inline': '0',
        'padding-block': '0',
        height: '1em',
        width: '1.625em',
        'min-width': '1.625em',
        'font-size': '28px'
      }
    }
  ],
  [
    /^q-toggle__track$/,
    function* (_, { symbols }) {
      yield {
        'outline-style': 'solid',
        'outline-width': '2px',
        'outline-color': 'var(--q-outline)',
        'border-radius': 'calc(infinity * 1px) !important',
        'background-color': 'var(--q-surface-container)',
        height: '1em',
        width: '1.625em',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        'outline-color': 'var(--q-outline)',
        'background-color': 'var(--q-surface-container)'
      }
    }
  ],
  [
    /^q-toggle__thumb$/,
    function* (_, { symbols }) {
      yield {
        color: 'var(--q-surface-container-highest)',
        width: '0.5em',
        height: '0.5em',
        'user-select': 'none',
        '-webkit-user-select': 'none',
        transition: 'left 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        top: '0.25em',
        left: '0.15em',
        position: 'absolute',
        'z-index': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}:after`,
        'border-radius': '50%',
        'background-color': 'var(--q-outline)',
        content: '""',
        'box-shadow':
          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `.q-toggle:not(.disabled) ${sel}:before`,
        'border-radius': '50%',
        'background-color': 'currentColor',
        opacity: '0%',
        content: '""',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        position: 'absolute'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-icon`,
        'font-size': '0.33em',
        color: 'rgba(0, 0, 0, 1)',
        opacity: '0.54',
        'z-index': '2'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}`,
        color: 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel}:after`,
        'background-color': 'var(--q-outline)'
      }
    }
  ],
  [
    /^q-toggle__inner--truthy$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        color: 'var(--q-on-primary-container)',
        width: '0.75em',
        height: '0.75em',
        left: '0.725em',
        top: '0.125em'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb .q-icon`,
        color: '#fff',
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:after`,
        'background-color': 'var(--q-on-primary) !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__track`,
        'background-color': 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} .q-toggle__thumb`,
        color: 'var(--q-on-primary-container)'
      }
      yield {
        [symbols.selector]: (sel) =>
          `.body--dark ${sel} .q-toggle__thumb:after`,
        'background-color': 'var(--q-on-primary) !important'
      }
      yield {
        [symbols.selector]: (sel) => `.body--dark ${sel} .q-toggle__track`,
        'background-color': 'var(--q-primary)'
      }
    }
  ],
  [
    /^q-toggle__inner--indet$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb`,
        left: '0.4375em'
      }
    }
  ],
  [
    /^q-toggle--dark$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:before`,
        opacity: '0.32 !important'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-toggle__thumb:after`,
        'box-shadow': 'none'
      }
    }
  ],
  [
    /^q-toggle__native$/,
    function* () {
      yield { width: '1px', height: '1px' }
    }
  ]
] as Rule[]
