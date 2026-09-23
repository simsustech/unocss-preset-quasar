import type { Rule } from '@unocss/core'

export const itemRules = [
  [
    /^q-item$/,
    function* (_, { symbols }) {
      // .q-item
      yield {
        display: 'flex',
        'flex-wrap': 'nowrap',
        padding: 'var(--q-item-padding-y) var(--q-space-lg)',
        'min-height': 'var(--q-item-min-height)',
        // Label colour role; the side sections override to on-surface-variant.
        color: 'inherit',
        transition: 'color 0.3s, background-color 0.3s',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}.q-router-link--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      yield {
        // The base rule's geometry, kept as the reference's longhands (the gate
        // measures longhands, not the shorthand), but taken from tokens. The
        // `min-height: 28px` that used to sit here was the literal copy that
        // beat the token and sized every item to 28px instead of md3's 56px —
        // and the block padding it declares here must be the token too, or it
        // overrides the shorthand and md2 never gets its spec's 4px.
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-item-padding-y)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}.q-router-link--active`,
        color:
          'color-mix(in oklab, var(--q-primary) var(--q-text-opacity), transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-focus-helper + .q-item__section--thumbnail`,
        'margin-left': '-16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-item__section--thumbnail:first-child`,
        'margin-left': '-16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-item__section--thumbnail:last-of-type`,
        'margin-right': '-16px'
      }
      yield {
        // Dark overrides without a scheme-token equivalent stay literal, as the
        // reference emits them.
        [symbols.selector]: (selector) => `${selector}--dark`,
        color: 'color-mix(in oklab, #fff var(--q-text-opacity), transparent)',
        'border-color': 'rgba(255, 255, 255, 0.28)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__label--caption`,
        color: 'rgba(255, 255, 255, 0.8)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__label--overline`,
        color: 'rgba(255, 255, 255, 0.8)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__label--header`,
        color: 'rgba(255, 255, 255, 0.64)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-item__section--side:not(.q-item__section--avatar)`,
        color: 'rgba(255, 255, 255, 0.7)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--clickable`,
        cursor: 'pointer',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--clickable`,
        cursor: 'pointer',
        'user-select': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--active`,
        // Selected colours are per style: md3 uses `secondary-container` with
        // `on-secondary-container` text, md2 `primary` at 12% with `primary`
        // text (specs/reference/normalized/{md3,md2}-lists.json). The reference
        // has no such rule at all.
        'background-color': 'var(--q-item-active-bg)',
        color: 'var(--q-item-active-color)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--active`,
        // Selected colours are per style: md3 uses `secondary-container` with
        // `on-secondary-container` text, md2 `primary` at 12% with `primary`
        // text (specs/reference/normalized/{md3,md2}-lists.json). The reference
        // has no such rule at all.
        'background-color': 'var(--q-item-active-bg)',
        color: 'var(--q-item-active-color)'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}--active`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        'min-height': 'var(--q-item-dense-min-height)',
        gap: 'var(--q-space-md)',
        // The reference declares the dense padding as logical longhands; the
        // inline value is the space token, the 2px block inset is Quasar's own
        // density (not part of the md3 list spec).
        'padding-inline': 'var(--q-space-lg)',
        // quasar: Quasar's dense item padding
        'padding-block': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: 0.5,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inset`,
        'padding-left': 'calc(var(--q-space-md) + 56px)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--section`
        // Section item
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--tag`
        // Tag item
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section`,
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        'min-width': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section`,
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        'min-width': '0',
        'align-items': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--side`,
        'justify-content': 'center',
        'min-width': '40px',
        'flex-shrink': 0,
        // Spec (md3-lists.json): leading/trailing icon slots are
        // on-surface-variant, not the label colour. This was the reported
        // "wrong text colour" in lists.
        color: 'var(--q-on-surface-variant)',
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}__section--side > .q-avatar`,
        'font-size': 'var(--q-size-md)'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}__section--side > .q-icon`,
        'font-size': 'var(--q-size-icon)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--side`,
        'padding-right': '16px',
        flex: '0 1 auto !important',
        width: 'auto',
        color: 'var(--q-on-surface-variant)',
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--main`,
        flex: '10000 1 0%',
        width: 'auto',
        'min-width': 0,
        'max-width': '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--main:has(> :last-child:nth-child(2))`,
        // quasar: Quasar's line-box height for the main section
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--main:has(> :last-child:nth-child(3))`,
        // quasar: Quasar's line-box height for the main section
        'min-height': '44px'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}__section--main ~ .q-item__section--side`,
        'align-items': 'flex-end',
        'padding-right': 0,
        'padding-left': '16px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--main + ${selector}__section--main`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--main:has(>:last-child:nth-child(2))`,
        // quasar: Quasar's line-box height for the main section
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__section--main:has(>:last-child:nth-child(3))`,
        // quasar: Quasar's line-box height for the main section
        'min-height': '44px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--avatar`,
        'min-width': '56px',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--avatar`,
        flex: '0 1 auto !important',
        'min-width': '56px',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--thumbnail`,
        flex: '0 1 auto !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--thumbnail img`,
        width: '100px',
        height: '56px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        // Reference sets 1.2em!important here; without it the label inherits
        // the typography line-height (21px instead of 16.8px at 14px).
        // quasar: Quasar's item label line-height
        'line-height': '1.2em'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}__label + .q-item__label`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        // quasar: Quasar's item label line-height
        'line-height': '1.2em !important',
        'max-width': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--caption`,
        // quasar: relative caption scaling, not a type role
        'font-size': '0.75em',
        // Spec: supporting text is on-surface-variant (was a 70% currentColor
        // opacity, which washed out against the label colour).
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--header`,
        // Spec (md3-lists.json overline): label-small + on-surface-variant.
        // quasar: Quasar's header label size
        'font-size': '0.875rem',
        // quasar: Quasar's header label line-height
        'line-height': '1.25rem',
        'letter-spacing': '0.01786em',
        padding: 'var(--q-space-lg)',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--header`,
        // quasar: Quasar's header label size
        'font-size': '0.875rem',
        // quasar: wind4 spacing calc, not a type role
        'line-height': 'calc(var(--spacing) * 5)',
        'letter-spacing': '0.01786em',
        padding: '16px',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--inset`
        // Inset label
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__section--nowrap`,
        'white-space': 'nowrap'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--overline`,
        color: 'var(--q-on-surface-variant)'
      }
    }
  ]
] as Rule[]

// AUD-026: the dead `q-item > .q-item__section--thumbnail` matcher was removed
// rather than re-targeted — the `q-item` matcher already emits dist's own
// declarations for both edges (`.q-item > .q-item__section--thumbnail:first-child`
// and the focus-helper sibling at -16px), so the combinator matcher was a
// duplicate leftover whose only effect was to fight that cascade.
