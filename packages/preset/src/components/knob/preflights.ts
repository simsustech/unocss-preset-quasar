import type { Preflight } from '@unocss/core'

export const knobPreflights: Preflight[] = [
  {
    getCSS: () => `.q-knob {
  font-size: 48px;
}
.q-knob--editable {
  cursor: pointer;
  outline: 0;
}
`
  }
]
