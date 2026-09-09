import type { Preflight } from '@unocss/core'

export const layoutPreflights: Preflight[] = [
  {
    getCSS: () => `.q-layout {
  width: 100%;
  outline: 0;
}
.q-layout-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.q-layout-container .q-layout {
  min-height: 100%;
}
.q-layout-container > div {
  transform: translate3d(0, 0, 0);
}
.q-layout-container > div > div {
  min-height: 0;
  max-height: 100%;
}
.q-layout__shadow {
  width: 100%;
}
.q-layout__section--marginal {
  background-color: var(--q-primary);
  color: #fff;
}
.q-layout, .q-header, .q-footer, .q-page {
  position: relative;
}
`
  }
]
