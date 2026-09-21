import type { Rule } from '@unocss/core'

export const breadcrumbsRules = [
  [
    /^q-breadcrumbs$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: 'var(--q-space-xs)'
    })
  ],
  [
    /^q-breadcrumbs__el$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      // Reference `.q-breadcrumbs__el { color: inherit }`: the active crumb is
      // styled by `.q-breadcrumbs--last`/`.q-link`, not by the element itself.
      color: 'inherit',
      'text-decoration': 'none'
    })
  ],
  [
    /^q-breadcrumbs__el-icon$/,
    () => ({
      // Reference `.q-breadcrumbs__el-icon { font-size: 125% }` — scales the icon
      // with the crumb's text rather than pinning it.
      'font-size': '125%',
      'margin-right': 'var(--q-space-xs)'
    })
  ],
  [
    /^q-breadcrumbs__el-label$/,
    () => ({
      // Label
    })
  ],
  [
    /^q-breadcrumbs__separator$/,
    function* (_, { symbols }) {
      yield {
        margin: '0 var(--q-space-xs)',
        color: 'var(--q-on-surface-variant)'
      }
      // Reference `[dir=rtl] .q-breadcrumbs__separator .q-icon`.
      yield {
        [symbols.selector]: (sel) => `[dir=rtl] ${sel} .q-icon`,
        transform: 'scaleX(-1)'
      }
    }
  ],
  [
    /^q-breadcrumbs__el-icon--with-label$/,
    function* () {
      yield { 'margin-right': '8px' }
    }
  ]
] as Rule[]
