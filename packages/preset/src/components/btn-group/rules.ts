import type { Rule } from '@unocss/core'

export const btnGroupRules = [
  [
    /^q-btn-group$/,
    function* (_, { symbols }) {
      // .q-btn-group
      yield {
        display: 'inline-flex',
        // Reference `.q-btn-group`: middle-aligned, `flex: 0 1 auto`, 28px corner
        // and the level-2 elevation, which the preset previously took from a token
        // whose resolved pair differs.
        'vertical-align': 'middle',
        flex: '0 1 auto',
        'border-radius': 'var(--q-corner-extra-large)',
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > .q-btn`,
        'border-radius': '0',
        'box-shadow': 'none',
        // MD3 segmented: the reference groups carry no fill, but every `.q-btn`
        // here is filled with `--q-btn-bg` — the unselected Day/Week segment
        // rendered rgb(0,95,175) primary. Reset both parts of the pair at the
        // group scope: no fill, text falls back to the page colour. The active
        // segment is painted below (secondary-container), and `.bg-primary`
        // keeps winning through its `!important` (specificity 0,3,0 > 0,2,0).
        'background-color': 'transparent',
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector} > .q-btn`,
        'background-color': 'var(--q-surface-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > .q-btn-item:before`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} > .q-btn-item`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > ${selector}:not(:first-child) > .q-btn:first-child:before`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > ${selector}:not(:last-child) > .q-btn:last-child:before`,
        'border-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item.q-btn--standard:before`,
        'z-index': '-1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > .q-btn-group`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-group:first-child > .q-btn:first-child`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-group:not(:first-child) > .q-btn:first-child`,
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-group:first-child > .q-btn--active`,
        'background-color':
          'color-mix(in oklab, var(--light-secondary-container) var(--q-bg-opacity), transparent) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} > .q-btn-item`,
        // No `color` here, deliberately. The reference is
        // `.q-btn-group > .q-btn-item { border-radius: inherit; align-self: stretch }`
        // — Quasar sets no colour on group items, and every button carries its
        // own paired tokens through `.q-btn` (`--q-btn-bg` / `--q-btn-color`, or
        // `transparent` / `inherit` in the unstyled entry). A hardcoded
        // `--light-on-surface` was only ever right while the base button painted
        // no fill: once MD3/MD2 filled it with `--q-btn-primary`, this rule won on
        // specificity (two classes against one) and put dark surface text on the
        // primary fill — the "dark blue button" contrast defect.
        'align-self': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item:not(:first-child)`,
        'border-top-left-radius': 'var(--radius-none)',
        'border-bottom-left-radius': 'var(--radius-none)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item:not(:last-child)`,
        'border-top-right-radius': 'var(--radius-none)',
        'border-bottom-right-radius': 'var(--radius-none)'
      }
      // MD3 segmented: the outer edges take the group's pill radius (the
      // `.q-btn-group > .q-btn` rule above zeroes every corner; the reference's
      // `border-radius: inherit` is what the first/last items inherit here).
      // Inner corners stay square via the :not(:first/:last) rules above.
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item:first-child`,
        'border-top-left-radius': 'inherit',
        'border-bottom-left-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item:last-child`,
        'border-top-right-radius': 'inherit',
        'border-bottom-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item .q-badge--floating`,
        right: 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item.bg-primary`,
        color:
          'color-mix(in oklab, var(--light-on-primary) var(--q-text-opacity), transparent) !important',
        'background-color':
          'color-mix(in oklab, var(--light-primary) var(--q-bg-opacity), transparent) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} > .q-btn-item.bg-primary`,
        color: 'var(--q-on-primary) !important',
        'background-color': 'var(--q-primary) !important'
      }
      // MD3 segmented: the selected segment wears secondary-container.
      // q-btn-toggle marks selection with aria-pressed (its `toggle-color`
      // additionally paints the active item `bg-primary text-white`), so the
      // selector keys off the ARIA state: placed after the `.bg-primary`
      // special-cases and carrying `!important` at equal specificity (0,3,0),
      // the container pair wins the source-order tie for the pressed segment,
      // while a non-active `.bg-primary` item keeps its fill untouched.
      yield {
        [symbols.selector]: (selector) =>
          `${selector} > .q-btn-item[aria-pressed="true"]`,
        'background-color':
          'color-mix(in oklab, var(--light-secondary-container) var(--q-bg-opacity), transparent) !important',
        color:
          'color-mix(in oklab, var(--light-on-secondary-container) var(--q-text-opacity), transparent) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} > .q-btn-item[aria-pressed="true"]`,
        'background-color': 'var(--q-secondary-container) !important',
        color: 'var(--q-on-secondary-container) !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector} > .q-btn-group:first-child > .q-btn--active`,
        'background-color': 'var(--q-secondary-container) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--outline > .q-separator`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outline > .q-btn-item + .q-btn-item:before`,
        'border-left': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outline > .q-btn-item:not(:last-child):before`,
        'border-right': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--push`,
        // quasar: Quasar's push-button corner (7px is not the MD3 medium, 12px)
        'border-radius': '7px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push > .q-btn--push.q-btn--actionable`,
        transform: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push > .q-btn--push.q-btn--actionable .q-btn__content`,
        transition:
          'margin-top 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), margin-bottom 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push > .q-btn--push.q-btn--actionable:active .q-btn__content`,
        'margin-top': '2px',
        'margin-bottom': '-2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push__> .q-btn--push.q-btn--actionable.q-btn--active__.q-btn__content`,
        'margin-top': '2px',
        'margin-bottom': '-2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--push > .q-btn--push.q-btn--actionable.q-btn--active .q-btn__content`,
        'margin-top': '2px',
        'margin-bottom': '-2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rounded`,
        'border-radius': 'var(--q-corner-extra-large)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flat`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--unelevated`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--stretch`,
        'align-self': 'stretch',
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--glossy > .q-btn-item`,
        'background-image':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.12) 51%, rgba(0, 0, 0, 0.04)) !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--spread > .q-btn-group`,
        display: 'flex !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--spread > .q-btn-item`,
        width: 'auto',
        'min-width': '0',
        'max-width': '100%',
        flex: '10000 1 0%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--spread > .q-btn-group > .q-btn-item:not(.q-btn-dropdown__arrow-container)`,
        width: 'auto',
        'min-width': '0',
        'max-width': '100%',
        flex: '10000 1 0%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--spread__> .q-btn-group > .q-btn-item:not(.q-btn-dropdown__arrow-container)`,
        flex: '10000 1 0%',
        width: 'auto',
        'min-width': '0',
        'max-width': '100%'
      }
    }
  ]
] as Rule[]
