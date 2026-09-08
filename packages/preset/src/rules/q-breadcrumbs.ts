import type { Rule } from '@unocss/core'

export const qBreadcrumbsRules: Rule[] = [
  [
    /^q-breadcrumbs$/,
    () => ({
      display: 'flex',
      'align-items': 'center',
      gap: '4px'
    })
  ],
  [
    /^q-breadcrumbs__el$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center'
    })
  ],
  [
    /^q-breadcrumbs__separator$/,
    () => ({
      margin: '0 4px'
    })
  ]
]
