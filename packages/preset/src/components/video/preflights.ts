import type { Preflight } from '@unocss/core'

export const videoPreflights: Preflight[] = [
  {
    getCSS: () => `.q-video {
  position: relative;
  overflow: hidden;
  border-radius: inherit;
}
.q-video iframe,
.q-video object,
.q-video embed {
  width: 100%;
  height: 100%;
}
.q-video--responsive {
  height: 0;
}
.q-video--responsive iframe,
.q-video--responsive object,
.q-video--responsive embed {
  position: absolute;
  top: 0;
  left: 0;
}
`
  }
]
