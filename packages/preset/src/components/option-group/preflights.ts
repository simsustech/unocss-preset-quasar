import type { Preflight } from '@unocss/core'

export const optionGroupPreflights: Preflight[] = [
  {
    getCSS: () => `.q-option-group--inline > div {
  display: inline-block;
}
`
  }
]
