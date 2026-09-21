import type { Rule } from '@unocss/core'

export const barRules = [
  [
    /^q-bar$/,
    function* (_, { symbols }) {
      yield {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'padding-inline': '12px',
        'padding-block': 'calc(var(--spacing) * 0)',
        'min-height': '32px',
        // Reference `.q-bar`: a 20% tint of the dark surface, which reads as a
        // raised rail; a surface-container role is lighter than that.
        'background-color':
          'color-mix(in oklab, var(--dark-surface) 20%, transparent)',
        color: 'var(--q-on-surface)',
        gap: 'var(--q-space-sm)'
      }
      // Reference `.q-bar > …`: every child is offset from its left neighbour by
      // 2px (buttons/icons) or 8px (text), and the first child has no offset.
      for (const child of ['.q-btn', '.q-icon']) {
        yield {
          [symbols.selector]: (sel) => `${sel}>${child}`,
          'margin-left': '2px'
        }
        yield {
          [symbols.selector]: (sel) => `${sel}>${child}:first-child`,
          'margin-left': 'calc(var(--spacing) * 0)'
        }
      }
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        'margin-left': '8px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}>div:first-child`,
        'margin-left': 'calc(var(--spacing) * 0)'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}>div+.q-icon`,
        'margin-left': '8px'
      }
      // Reference `body.quasar-style-unstyled .q-bar`.
      yield {
        [symbols.selector]: (sel) => `body.quasar-style-unstyled ${sel}`,
        background: 'none',
        color: 'inherit'
      }
    }
  ],
  [
    /^q-bar--dense$/,
    function* (_, { symbols }) {
      yield {
        // Reference `.q-bar--dense`: 14px type, 24px track, no block padding.
        'font-size': '14px',
        'padding-inline': '8px',
        'padding-block': 'calc(var(--spacing) * 0)',
        height: '24px',
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        'font-size': '8px'
      }
    }
  ],
  [
    /^q-bar--dark$/,
    function* () {
      yield {
        // Dark roles rather than the `--q-*` aliases, which follow the body
        // class: a `q-bar--dark` on a light body kept the light surface.
        'background-color': 'var(--dark-surface-container)',
        color:
          'color-mix(in oklab, var(--dark-on-surface) var(--un-text-opacity), transparent)'
      }
    }
  ],
  [
    /^q-bar--standard$/,
    function* (_, { symbols }) {
      yield {
        // Reference `.q-bar--standard`: 18px type, 32px track, 12px inline.
        'font-size': '18px',
        'padding-inline': '12px',
        'padding-block': 'calc(var(--spacing) * 0)',
        height: '32px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}>div`,
        'font-size': '16px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-btn`,
        'font-size': '11px'
      }
    }
  ]
] as Rule[]
