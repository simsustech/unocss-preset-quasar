import type { Preflight } from '@unocss/core'

export const markupTablePreflights: Preflight[] = [
  {
    getCSS: () => `.q-markup-table {
  overflow: auto;
  background: #fff;
}
`
  }
]
