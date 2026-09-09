import type { Preflight } from '@unocss/core'

export const toolbarPreflights: Preflight[] = [
  {
    getCSS: () => `.q-toolbar {
  position: relative;
  padding: 0 12px;
  min-height: 50px;
  width: 100%;
}
.q-toolbar--inset {
  padding-left: 58px;
}
.q-toolbar .q-avatar {
  font-size: 38px;
}
.q-toolbar__title {
  flex: 1 1 0%;
  min-width: 1px;
  max-width: 100%;
  font-size: 21px;
  font-weight: normal;
  letter-spacing: 0.01em;
  padding: 0 12px;
}
.q-toolbar__title:first-child {
  padding-left: 0;
}
.q-toolbar__title:last-child {
  padding-right: 0;
}
`
  }
]
