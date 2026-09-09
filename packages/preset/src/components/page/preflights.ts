import type { Preflight } from '@unocss/core'

export const pagePreflights: Preflight[] = [
  {
    getCSS: () => `.q-page-sticky--shrink {
  pointer-events: none;
}
.q-page-sticky--shrink > div {
  display: inline-block;
  pointer-events: auto;
}
`
  }
]
