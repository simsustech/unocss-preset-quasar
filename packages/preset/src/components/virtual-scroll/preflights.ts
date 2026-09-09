import type { Preflight } from '@unocss/core'

export const virtualScrollPreflights: Preflight[] = [
  {
    getCSS: () => `.q-virtual-scroll:focus {
  outline: 0;
}
.q-virtual-scroll__content {
  outline: none;
  contain: content;
}
.q-virtual-scroll__content > * {
  overflow-anchor: none;
}
.q-virtual-scroll__content > [data-q-vs-anchor] {
  overflow-anchor: auto;
}
.q-virtual-scroll__padding {
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(128, 128, 128, 0.03) 20%, rgba(128, 128, 128, 0.08) 50%, rgba(128, 128, 128, 0.03) 80%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0)) /* rtl:ignore */;
  background-size: var(--q-virtual-scroll-item-width, 100%) var(--q-virtual-scroll-item-height, 50px) /* rtl:ignore */;
}
.q-virtual-scroll__padding td {
  position: static !important;
}
.q-virtual-scroll--horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
}
.q-virtual-scroll--horizontal .q-virtual-scroll__content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.q-virtual-scroll--horizontal .q-virtual-scroll__padding, .q-virtual-scroll--horizontal .q-virtual-scroll__content, .q-virtual-scroll--horizontal .q-virtual-scroll__content > * {
  flex: 0 0 auto;
}
.q-virtual-scroll--horizontal .q-virtual-scroll__padding {
  background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 20%, rgba(128, 128, 128, 0.03) 20%, rgba(128, 128, 128, 0.08) 50%, rgba(128, 128, 128, 0.03) 80%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0)) /* rtl:ignore */;
  background-size: var(--q-virtual-scroll-item-width, 50px) var(--q-virtual-scroll-item-height, 100%) /* rtl:ignore */;
}
`
  }
]
