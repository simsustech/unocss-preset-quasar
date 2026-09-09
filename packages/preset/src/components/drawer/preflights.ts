import type { Preflight } from '@unocss/core'

export const drawerPreflights: Preflight[] = [
  {
    getCSS: () => `.q-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 1000;
}
.q-drawer--on-top {
  z-index: 3000;
}
.q-drawer--left {
  left: 0;
  transform: translateX(-100%);
}
.q-drawer--left.q-drawer--bordered {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.q-drawer--left .q-layout__shadow {
  left: 10px;
  right: -10px;
}
.q-drawer--right {
  right: 0;
  transform: translateX(100%);
}
.q-drawer--right.q-drawer--bordered {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
.q-drawer--right .q-layout__shadow {
  left: -10px;
}
.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini {
  padding: 0 !important;
}
.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item, .q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section {
  text-align: center;
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
  min-width: 0;
}
.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__label, .q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section--main, .q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section--side ~ .q-item__section--side {
  display: none;
}
.q-drawer--mini .q-mini-drawer-hide, .q-drawer--mini .q-expansion-item__content {
  display: none;
}
.q-drawer--mini-animate .q-drawer__content {
  overflow-x: hidden !important;
  white-space: nowrap;
}
.q-drawer--standard .q-mini-drawer-only {
  display: none;
}
.q-drawer--mobile .q-mini-drawer-only, .q-drawer--mobile .q-mini-drawer-hide {
  display: none;
}
.q-drawer__backdrop {
  z-index: 2999 !important;
  will-change: background-color;
}
.q-drawer__opener {
  z-index: 2001;
  height: 100%;
  width: 15px;
  user-select: none;
  -webkit-user-select: none;
}
`
  }
]
