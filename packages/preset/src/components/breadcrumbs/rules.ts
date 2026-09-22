import type { Rule } from '@unocss/core'

export const breadcrumbsRules = [
  [
    /^q-breadcrumbs$/,
    function* (_, { symbols }) {
      // .q-breadcrumbs
      yield {
        display: 'flex',
        'align-items': 'center',
        gap: 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__el`,
        display: 'inline-flex',
        'align-items': 'center',
        // Reference `.q-breadcrumbs__el { color: inherit }`: the active crumb is
        // styled by `.q-breadcrumbs--last`/`.q-link`, not by the element itself.
        color: 'inherit',
        'text-decoration': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__el-icon`,
        // Reference `.q-breadcrumbs__el-icon { font-size: 125% }` — scales the icon
        // with the crumb's text rather than pinning it.
        'font-size': '125%',
        'margin-right': 'var(--q-space-xs)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__el-label`
        // Label
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__separator`,
        margin: '0 var(--q-space-xs)',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `[dir=rtl] ${selector}__separator .q-icon`,
        transform: 'scaleX(-1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__el-icon--with-label`,
        'margin-right': '8px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--last`
      }
    }
  ]
] as Rule[]
