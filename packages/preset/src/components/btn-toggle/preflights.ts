import type { Preflight } from '@unocss/core'

export const btnTogglePreflights: Preflight[] = [
  {
    getCSS: () => `.q-btn-toggle {
  position: relative;
}
`
  }
]
