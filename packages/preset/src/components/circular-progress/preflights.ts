import type { Preflight } from '@unocss/core'

export const circularProgressPreflights: Preflight[] = [
  {
    getCSS: () => `.q-circular-progress {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: 1em;
  height: 1em;
  line-height: 1;
  content-visibility: auto;
}
.q-circular-progress.q-focusable {
  border-radius: 50%;
}
.q-circular-progress__svg {
  width: 100%;
  height: 100%;
}
.q-circular-progress__text {
  font-size: 0.25em;
}
.q-circular-progress--indeterminate .q-circular-progress__circle {
  stroke-dasharray: 1 400;
  stroke-dashoffset: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: q-spin 2s linear infinite, q-circular-progress-circle 1.5s ease-in-out infinite /* rtl:ignore */;
}
`
  }
]
