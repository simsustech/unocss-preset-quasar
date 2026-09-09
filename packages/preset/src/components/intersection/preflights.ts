import type { Preflight } from '@unocss/core'

export const intersectionPreflights: Preflight[] = [
  {
    getCSS: () => `.q-intersection {
  position: relative;
}
`
  }
]
