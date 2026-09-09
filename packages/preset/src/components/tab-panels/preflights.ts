import type { Preflight } from '@unocss/core'

export const tabPanelsPreflights: Preflight[] = [
  {
    getCSS: () => `.q-tab-panels {
  background: #fff;
}
`
  }
]
