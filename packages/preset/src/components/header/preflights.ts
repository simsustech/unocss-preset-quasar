import type { Preflight } from '@unocss/core'

export const headerPreflights: Preflight[] = [
  {
    getCSS: () => `.q-header--hidden {
  transform: translateY(-110%);
}
.q-header--bordered {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.q-header .q-layout__shadow {
  bottom: -10px;
}
.q-header, .q-footer {
  z-index: 2000;
}
`
  }
]
