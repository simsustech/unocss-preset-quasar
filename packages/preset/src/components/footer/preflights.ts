import type { Preflight } from '@unocss/core'

export const footerPreflights: Preflight[] = [
  {
    getCSS: () => `.q-footer--hidden {
  transform: translateY(110%);
}
.q-footer--bordered {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.q-footer .q-layout__shadow {
  top: -10px;
}
`
  }
]
