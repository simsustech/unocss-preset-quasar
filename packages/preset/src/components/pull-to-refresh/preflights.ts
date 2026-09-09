import type { Preflight } from '@unocss/core'

export const pullToRefreshPreflights: Preflight[] = [
  {
    getCSS: () => `.q-pull-to-refresh {
  position: relative;
}
.q-pull-to-refresh__sentinel {
  position: absolute;
  pointer-events: none;
}
.q-pull-to-refresh--top .q-pull-to-refresh__sentinel, .q-pull-to-refresh--bottom .q-pull-to-refresh__sentinel {
  left: 0;
  right: 0;
  height: 1px;
}
.q-pull-to-refresh--left, .q-pull-to-refresh--right {
  min-width: fit-content;
}
.q-pull-to-refresh--left .q-pull-to-refresh__sentinel, .q-pull-to-refresh--right .q-pull-to-refresh__sentinel {
  top: 0;
  bottom: 0;
  width: 1px;
}
.q-pull-to-refresh--top .q-pull-to-refresh__sentinel {
  top: 0;
}
.q-pull-to-refresh--bottom .q-pull-to-refresh__sentinel {
  bottom: 0;
}
.q-pull-to-refresh--left .q-pull-to-refresh__sentinel {
  left: 0;
}
.q-pull-to-refresh--right .q-pull-to-refresh__sentinel {
  right: 0;
}
.q-pull-to-refresh__puller {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--q-primary);
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
.q-pull-to-refresh__puller--animating {
  transition: transform 0.3s, opacity 0.3s;
}
`
  }
]
