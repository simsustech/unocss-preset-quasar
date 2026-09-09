import type { Preflight } from '@unocss/core'

export const innerLoadingPreflights: Preflight[] = [
  {
    getCSS: () => `.q-inner-loading {
  background: rgba(255, 255, 255, 0.6);
  border-radius: inherit;
}
.q-inner-loading--dark {
  background: rgba(0, 0, 0, 0.4);
}
.q-inner-loading__label {
  margin-top: 8px;
}
`
  }
]
