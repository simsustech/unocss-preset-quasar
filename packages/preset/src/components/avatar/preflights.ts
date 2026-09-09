import type { Preflight } from '@unocss/core'

export const avatarPreflights: Preflight[] = [
  {
    getCSS: () => `.q-avatar {
  position: relative;
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  font-size: 48px;
  height: 1em;
  width: 1em;
}
.q-avatar__content {
  font-size: 0.5em;
  line-height: 0.5em;
}
.q-avatar__content, .q-avatar img:not(.q-icon):not(.q-img__image) {
  border-radius: inherit;
  height: inherit;
  width: inherit;
}
.q-avatar--square {
  border-radius: 0;
}
`
  }
]
