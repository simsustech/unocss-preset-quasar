import type { Preflight } from '@unocss/core'

/** Base dark-mode page styles, mirroring quasar.css `.body--dark`. */
export const darkPreflights: Preflight[] = [
  {
    getCSS: () => `.body--dark {
  color: #fff;
  background: var(--q-dark-page);
}`
  }
]
