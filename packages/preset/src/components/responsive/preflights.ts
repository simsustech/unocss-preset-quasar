import type { Preflight } from '@unocss/core'

export const responsivePreflights: Preflight[] = [
  {
    getCSS: () => `.q-responsive {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}
.q-responsive__filler {
  width: inherit;
  max-width: inherit;
  height: inherit;
  max-height: inherit;
}
.q-responsive__content {
  border-radius: inherit;
}
.q-responsive__content > * {
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
}
`
  }
]
