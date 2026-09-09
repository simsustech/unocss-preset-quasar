import type { Preflight } from '@unocss/core'

export const formPreflights: Preflight[] = [
  {
    getCSS: () => `.q-form {
  position: relative;
}
`
  }
]
