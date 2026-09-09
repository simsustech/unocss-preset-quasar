import type { Preflight } from '@unocss/core'

export const breadcrumbsPreflights: Preflight[] = [
  {
    getCSS: () => `.q-breadcrumbs__el {
  color: inherit;
}
.q-breadcrumbs__el-icon {
  font-size: 125%;
}
.q-breadcrumbs__el-icon--with-label {
  margin-right: 8px;
}
`
  }
]
