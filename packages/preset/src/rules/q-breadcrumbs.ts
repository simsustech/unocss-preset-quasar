import type { Rule } from '@unocss/core'

export const qBreadcrumbsRules: Rule[] = [
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
      color: 'var(--q-primary)',
      'text-decoration': 'none'
    })
  ],
  [
    /^q-breadcrumbs__el-icon$/,
    () => ({
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
    () => ({
      margin: '0 var(--q-space-xs)',
      color: 'var(--q-on-surface-variant)'
    })
  ]
]
