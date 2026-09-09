import type { Preflight } from '@unocss/core'

export const spacePreflights: Preflight[] = [
  {
    getCSS: () => `.q-space {
  flex-grow: 1 !important;
}
`
  }
]
